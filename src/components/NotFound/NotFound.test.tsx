import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { NotFound } from './NotFound';

describe('NotFound', () => {
  const renderNotFound = () => {
    return render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );
  };

  it('debe renderizar el componente correctamente', () => {
    renderNotFound();
    
    // Verifica que el título 404 esté presente
    expect(screen.getByLabelText('Error 404')).toBeInTheDocument();
  });

  it('debe mostrar el mensaje de página no encontrada', () => {
    renderNotFound();
    
    expect(screen.getByText('¡Oops! Página no encontrada')).toBeInTheDocument();
    expect(screen.getByText(/La ruta que estás buscando no existe/i)).toBeInTheDocument();
  });

  it('debe tener un link para volver al inicio', () => {
    renderNotFound();
    
    const link = screen.getByRole('link', { name: /volver al inicio/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/pages/home?num=1');
  });

  it('debe tener un botón para regresar', () => {
    renderNotFound();
    
    const button = screen.getByRole('button', { name: /regresar/i });
    expect(button).toBeInTheDocument();
  });

  it('debe aplicar clases de Tailwind CSS correctamente', () => {
    const { container } = renderNotFound();
    
    // Verifica que el contenedor principal tenga las clases de fondo gradient
    const mainDiv = container.firstChild as HTMLElement;
    expect(mainDiv.className).toContain('bg-gradient-to-br');
  });

  it('debe mostrar información adicional de contacto', () => {
    renderNotFound();
    
    expect(screen.getByText(/Si crees que esto es un error/i)).toBeInTheDocument();
  });
});
