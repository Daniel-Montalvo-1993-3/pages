import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { HomeContainer } from './HomeContainer';

describe('HomeContainer', () => {
  const renderHomeContainer = (initialUrl = '/pages/home?num=1') => {
    window.history.pushState({}, '', initialUrl);
    return render(
      <BrowserRouter>
        <HomeContainer />
      </BrowserRouter>
    );
  };

  it('debe renderizar el componente correctamente', () => {
    renderHomeContainer();
    
    expect(screen.getByText('Formulario 1')).toBeInTheDocument();
  });

  it('debe usar la configuración correcta para num=1', () => {
    renderHomeContainer('/pages/home?num=1');
    
    expect(screen.getByText('Bienvenido')).toBeInTheDocument();
    expect(screen.getByText('Ingresa tu nombre para comenzar tu experiencia')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Tu nombre aquí...')).toBeInTheDocument();
  });

  it('debe usar la configuración correcta para num=2', () => {
    renderHomeContainer('/pages/home?num=2');
    
    expect(screen.getByText('Contáctanos')).toBeInTheDocument();
    expect(screen.getByText(/Déjanos tu correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('correo@ejemplo.com')).toBeInTheDocument();
  });

  it('debe usar la configuración correcta para num=3', () => {
    renderHomeContainer('/pages/home?num=3');
    
    expect(screen.getByText('Únete a nosotros')).toBeInTheDocument();
    expect(screen.getByText(/Completa el formulario con tu número de teléfono/i)).toBeInTheDocument();
  });

  it('debe usar la configuración default para num no definido', () => {
    renderHomeContainer('/pages/home?num=999');
    
    expect(screen.getByText('Página no encontrada')).toBeInTheDocument();
    expect(screen.getByText(/La configuración solicitada no existe/i)).toBeInTheDocument();
  });

  it('debe defaultear a num=1 cuando no hay query param', () => {
    renderHomeContainer('/pages/home');
    
    expect(screen.getByText('Bienvenido')).toBeInTheDocument();
  });

  it('debe abrir el modal al enviar el formulario', async () => {
    const user = userEvent.setup();
    renderHomeContainer();
    
    const input = screen.getByPlaceholderText('Tu nombre aquí...');
    const button = screen.getByRole('button', { name: /continuar/i });
    
    await user.type(input, 'Juan Pérez');
    await user.click(button);
    
    await waitFor(() => {
      expect(screen.getByText('¡Éxito!')).toBeInTheDocument();
      expect(screen.getByText('Juan Pérez')).toBeInTheDocument();
    });
  });

  it('debe cerrar el modal al hacer clic en el botón de cerrar', async () => {
    const user = userEvent.setup();
    renderHomeContainer();
    
    // Abrir modal
    const input = screen.getByPlaceholderText('Tu nombre aquí...');
    const submitButton = screen.getByRole('button', { name: /continuar/i });
    
    await user.type(input, 'Test User');
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('¡Éxito!')).toBeInTheDocument();
    });
    
    // Cerrar modal usando el botón X del header (aria-label="Cerrar")
    const closeButton = screen.getByLabelText('Cerrar');
    await user.click(closeButton);
    
    await waitFor(() => {
      expect(screen.queryByText('¡Éxito!')).not.toBeInTheDocument();
    });
  });

  it('debe renderizar FormCard con las props correctas de la configuración', () => {
    renderHomeContainer('/pages/home?num=2');
    
    // Verificar que el tipo de input sea email
    const input = screen.getByPlaceholderText('correo@ejemplo.com');
    expect(input).toHaveAttribute('type', 'email');
  });

  it('debe mostrar el número de formulario en el título', () => {
    renderHomeContainer('/pages/home?num=3');
    
    expect(screen.getByText('Formulario 3')).toBeInTheDocument();
  });

  it('debe manejar cambios en el query param num', () => {
    // Primero renderizar con num=1
    const { unmount } = renderHomeContainer('/pages/home?num=1');
    expect(screen.getByText('Bienvenido')).toBeInTheDocument();
    
    // Desmontar y renderizar de nuevo con num=2
    unmount();
    renderHomeContainer('/pages/home?num=2');
    expect(screen.getByText('Contáctanos')).toBeInTheDocument();
  });
});
