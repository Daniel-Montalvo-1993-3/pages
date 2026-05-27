import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { VantaBackground } from './VantaBackground';

// Mock de window.VANTA
const mockDestroy = vi.fn();
const mockTopology = vi.fn(() => ({ destroy: mockDestroy }));

describe('VantaBackground', () => {
  beforeEach(() => {
    // Limpiar mocks antes de cada test
    vi.clearAllMocks();
    
    // Configurar mock de window.VANTA
    window.VANTA = {
      TOPOLOGY: mockTopology,
    };
  });

  it('debe renderizar correctamente', () => {
    render(<VantaBackground />);
    
    const element = screen.getByRole('presentation', { hidden: true });
    expect(element).toBeInTheDocument();
  });

  it('debe aplicar clases de Tailwind CSS correctas', () => {
    render(<VantaBackground />);
    
    const element = screen.getByRole('presentation', { hidden: true });
    expect(element).toHaveClass('fixed', 'inset-0', 'z-0', 'w-full', 'h-full');
  });

  it('debe tener atributos de accesibilidad correctos', () => {
    render(<VantaBackground />);
    
    const element = screen.getByRole('presentation', { hidden: true });
    expect(element).toHaveAttribute('aria-hidden', 'true');
  });

  it('debe usar valores por defecto cuando no se pasan props', () => {
    render(<VantaBackground />);
    
    expect(mockTopology).toHaveBeenCalledWith(
      expect.objectContaining({
        color: 0xa855f7,        // purple-500
        backgroundColor: 0x1e1b4b, // indigo-900
        scale: 1.0,
        mouseControls: true,
        touchControls: true,
      })
    );
  });

  it('debe aceptar props de color personalizados', () => {
    render(
      <VantaBackground
        color={0xff0000}
        backgroundColor={0x0000ff}
      />
    );
    
    expect(mockTopology).toHaveBeenCalledWith(
      expect.objectContaining({
        color: 0xff0000,
        backgroundColor: 0x0000ff,
      })
    );
  });

  it('debe aceptar props de escala y controles', () => {
    render(
      <VantaBackground
        scale={2.0}
        scaleMobile={0.5}
        mouseControls={false}
        touchControls={false}
        gyroControls={true}
      />
    );
    
    expect(mockTopology).toHaveBeenCalledWith(
      expect.objectContaining({
        scale: 2.0,
        scaleMobile: 0.5,
        mouseControls: false,
        touchControls: false,
        gyroControls: true,
      })
    );
  });

  it('debe tener z-index 0 para estar detrás del contenido', () => {
    render(<VantaBackground />);
    
    const element = screen.getByRole('presentation', { hidden: true });
    expect(element).toHaveClass('z-0');
  });

  it('debe ocupar toda la pantalla con fixed y inset-0', () => {
    render(<VantaBackground />);
    
    const element = screen.getByRole('presentation', { hidden: true });
    expect(element).toHaveClass('fixed', 'inset-0');
  });
});
