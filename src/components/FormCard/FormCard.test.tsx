import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormCard } from './FormCard';

const mockToggleListening = vi.fn();
const mockStopListening = vi.fn();
let mockIsListening = false;
let mockIsSupported = true;
let capturedOnTranscript: ((value: string) => void) | null = null;

vi.mock('../../hooks/useSpeechInput', () => ({
  useSpeechInput: ({ onTranscript }: { onTranscript: (value: string) => void }) => {
    capturedOnTranscript = onTranscript;
    return {
      isListening: mockIsListening,
      isSupported: mockIsSupported,
      toggleListening: mockToggleListening,
      stopListening: mockStopListening,
    };
  },
}));

describe('FormCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockIsListening = false;
    mockIsSupported = true;
    capturedOnTranscript = null;
  });

  it('detiene el micrófono al enviar el formulario si estaba escuchando', async () => {
    mockIsSupported = true;
    mockIsListening = true;
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<FormCard onButtonClick={handleClick} />);

    const input = screen.getByPlaceholderText(/ingresa tu nombre/i);
    await user.type(input, 'Test');

    const submitBtn = screen.getByRole('button', { name: /enviar/i });
    await user.click(submitBtn);

    expect(mockStopListening).toHaveBeenCalled();
    expect(handleClick).toHaveBeenCalledWith('Test', 'manual');
  });

  it('registra method voice cuando el input fue rellenado por dictado', async () => {
    mockIsSupported = true;
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<FormCard onButtonClick={handleClick} />);

    // Simular que el transcript de voz actualiza el input
    const { act } = await import('@testing-library/react');
    act(() => { capturedOnTranscript?.('Hola por voz'); });

    const submitBtn = screen.getByRole('button', { name: /enviar/i });
    await user.click(submitBtn);

    expect(handleClick).toHaveBeenCalledWith('Hola por voz', 'voice');
  });

  it('renderiza correctamente con props por defecto', () => {
    render(<FormCard />);
    expect(screen.getByPlaceholderText(/ingresa tu nombre/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /enviar/i })).toBeInTheDocument();
  });

  it('muestra título y descripción cuando se proporcionan', () => {
    render(
      <FormCard
        title="Test Title"
        description="Test Description"
      />
    );
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('actualiza el contador de caracteres al escribir', async () => {
    const user = userEvent.setup();
    render(<FormCard maxLength={20} />);

    const input = screen.getByPlaceholderText(/ingresa tu nombre/i);
    await user.type(input, 'Test');

    expect(screen.getByText('16')).toBeInTheDocument();
  });

  it('muestra advertencia cuando quedan pocos caracteres', async () => {
    const user = userEvent.setup();
    render(<FormCard maxLength={12} />);

    const input = screen.getByPlaceholderText(/ingresa tu nombre/i);
    await user.type(input, 'Test text');

    const counter = screen.getByText('3');
    expect(counter).toHaveClass('text-red-400');
  });

  it('llama onButtonClick con el valor del input', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<FormCard onButtonClick={handleClick} />);

    const input = screen.getByPlaceholderText(/ingresa tu nombre/i);
    await user.type(input, 'John Doe');

    const button = screen.getByRole('button', { name: /enviar/i });
    await user.click(button);

    expect(handleClick).toHaveBeenCalledWith('John Doe', 'manual');
  });

  it('deshabilita el botón cuando el input está vacío', () => {
    render(<FormCard />);
    const button = screen.getByRole('button', { name: /enviar/i });
    expect(button).toBeDisabled();
  });

  it('respeta el maxLength del input', async () => {
    const user = userEvent.setup();
    render(<FormCard maxLength={5} />);

    const input = screen.getByPlaceholderText(/ingresa tu nombre/i) as HTMLInputElement;
    await user.type(input, '123456789');

    expect(input.value).toHaveLength(5);
  });

  it('debe renderizar logo cuando se proporciona', () => {
    render(<FormCard logo="https://example.com/logo.png" />);

    const logo = screen.getByAltText('Logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', 'https://example.com/logo.png');
    expect(logo).toHaveClass('h-10', 'md:h-16', 'object-contain');
  });

  it('debe renderizar ilustración cuando se proporciona', () => {
    render(<FormCard illustration="https://example.com/illustration.svg" />);

    const illustration = screen.getByAltText('Illustration');
    expect(illustration).toBeInTheDocument();
    expect(illustration).toHaveAttribute('src', 'https://example.com/illustration.svg');
    expect(illustration).toHaveClass('h-[250px]', 'object-contain');
  });

  it('no debe renderizar logo cuando no se proporciona', () => {
    render(<FormCard />);
    expect(screen.queryByAltText('Logo')).not.toBeInTheDocument();
  });

  it('no debe renderizar ilustración cuando no se proporciona', () => {
    render(<FormCard />);
    expect(screen.queryByAltText('Illustration')).not.toBeInTheDocument();
  });

  it('debe renderizar logo e ilustración juntos cuando ambos se proporcionan', () => {
    render(
      <FormCard
        logo="https://example.com/logo.png"
        illustration="https://example.com/illustration.svg"
      />
    );
    expect(screen.getByAltText('Logo')).toBeInTheDocument();
    expect(screen.getByAltText('Illustration')).toBeInTheDocument();
  });

  it('muestra el botón de micrófono cuando el navegador lo soporta', () => {
    mockIsSupported = true;
    render(<FormCard />);
    expect(screen.getByLabelText(/iniciar dictado por voz/i)).toBeInTheDocument();
  });

  it('oculta el botón de micrófono cuando el navegador no lo soporta', () => {
    mockIsSupported = false;
    render(<FormCard />);
    expect(screen.queryByLabelText(/dictado/i)).not.toBeInTheDocument();
  });

  it('llama toggleListening al hacer click en el micrófono', async () => {
    mockIsSupported = true;
    const user = userEvent.setup();
    render(<FormCard />);

    const micBtn = screen.getByLabelText(/iniciar dictado por voz/i);
    await user.click(micBtn);

    expect(mockToggleListening).toHaveBeenCalled();
  });

  it('muestra el botón en rojo con pulso cuando está escuchando', () => {
    mockIsSupported = true;
    mockIsListening = true;
    render(<FormCard />);

    const micBtn = screen.getByLabelText(/detener dictado/i);
    expect(micBtn).toHaveClass('text-red-400', 'animate-pulse');
  });
});

