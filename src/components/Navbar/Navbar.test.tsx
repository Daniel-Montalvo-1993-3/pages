import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Navbar } from './Navbar';

describe('Navbar', () => {
  const mockNavItems = [
    { num: '1', label: 'Formulario 1' },
    { num: '2', label: 'Formulario 2' },
    { num: '3', label: 'Formulario 3' },
  ];

  const renderNavbar = (initialUrl = '/pages/home?num=1') => {
    window.history.pushState({}, '', initialUrl);
    return render(
      <BrowserRouter>
        <Navbar navItems={mockNavItems} />
      </BrowserRouter>
    );
  };

  it('debe renderizar todos los items de navegación', () => {
    renderNavbar();

    expect(screen.getAllByText('Formulario 1').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Formulario 2').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Formulario 3').length).toBeGreaterThanOrEqual(1);
  });

  it('debe marcar el item activo correctamente', () => {
    renderNavbar('/pages/home?num=2');
    
    const links = screen.getAllByRole('link');
    const activeLink = links.find(link => link.getAttribute('aria-current') === 'page');
    
    expect(activeLink).toBeInTheDocument();
    expect(activeLink?.textContent).toContain('Formulario 2');
  });

  it('debe aplicar estilos diferentes al item activo', () => {
    renderNavbar('/pages/home?num=1');

    const link1 = screen.getAllByText('Formulario 1')[0];
    const link2 = screen.getAllByText('Formulario 2')[0];

    // El link activo debe tener bg-white y text-purple-600
    expect(link1.className).toContain('bg-white');
    expect(link1.className).toContain('text-purple-600');

    // El link inactivo debe tener text-gray-900
    expect(link2.className).toContain('text-gray-900');
  });

  it('debe tener todos los links con las URLs correctas', () => {
    renderNavbar();
    
    const links = screen.getAllByRole('link').filter(link => 
      link.textContent?.includes('Formulario')
    );
    
    expect(links[0]).toHaveAttribute('href', '/pages/home?num=1');
    expect(links[1]).toHaveAttribute('href', '/pages/home?num=2');
    expect(links[2]).toHaveAttribute('href', '/pages/home?num=3');
  });

  it('debe tener atributos de accesibilidad correctos', () => {
    renderNavbar();
    
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'Navegación principal');
  });

  it('debe renderizar solo los items sin nav duplicado', () => {
    renderNavbar();

    const allLinks = screen.getAllByRole('link');
    // Solo debe haber exactamente mockNavItems.length links (sin duplicados móvil)
    expect(allLinks.length).toBe(mockNavItems.length);
  });

  it('debe aplicar clases de Tailwind CSS correctamente', () => {
    const { container } = renderNavbar();

    const nav = container.querySelector('nav');
    expect(nav?.className).toContain('sticky');
    expect(nav?.className).toContain('top-0');
    expect(nav?.className).toContain('z-50');
  });

  it('debe manejar caso cuando no hay query param num', () => {
    renderNavbar('/pages/home');
    
    // Debe defaultear a num=1
    const links = screen.getAllByRole('link');
    const activeLink = links.find(link => link.getAttribute('aria-current') === 'page');
    
    expect(activeLink?.textContent).toContain('Formulario 1');
  });
});
