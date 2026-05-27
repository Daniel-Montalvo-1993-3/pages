import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormCard } from './FormCard';

describe('FormCard', () => {
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
    
    expect(screen.getByText(/16 caracteres restantes/i)).toBeInTheDocument();
  });

  it('muestra advertencia cuando quedan pocos caracteres', async () => {
    const user = userEvent.setup();
    render(<FormCard maxLength={15} />);
    
    const input = screen.getByPlaceholderText(/ingresa tu nombre/i);
    await user.type(input, 'Test text');
    
    const counter = screen.getByText(/caracteres restantes/i);
    expect(counter).toHaveClass('text-red-500');
  });

  it('llama onButtonClick con el valor del input', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    
    render(<FormCard onButtonClick={handleClick} />);
    
    const input = screen.getByPlaceholderText(/ingresa tu nombre/i);
    await user.type(input, 'John Doe');
    
    const button = screen.getByRole('button', { name: /enviar/i });
    await user.click(button);
    
    expect(handleClick).toHaveBeenCalledWith('John Doe');
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
    expect(logo).toHaveClass('h-8', 'md:h-10', 'object-contain');
  });

  it('debe renderizar ilustración cuando se proporciona', () => {
    render(<FormCard illustration="https://example.com/illustration.svg" />);
    
    const illustration = screen.getByAltText('Illustration');
    expect(illustration).toBeInTheDocument();
    expect(illustration).toHaveAttribute('src', 'https://example.com/illustration.svg');
    expect(illustration).toHaveClass('h-32', 'md:h-40', 'object-contain');
  });

  it('no debe renderizar logo cuando no se proporciona', () => {
    render(<FormCard />);
    
    const logo = screen.queryByAltText('Logo');
    expect(logo).not.toBeInTheDocument();
  });

  it('no debe renderizar ilustración cuando no se proporciona', () => {
    render(<FormCard />);
    
    const illustration = screen.queryByAltText('Illustration');
    expect(illustration).not.toBeInTheDocument();
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
});
