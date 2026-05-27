import { Outlet } from 'react-router-dom';
import { Navbar } from '../../components/Navbar/Navbar';

/**
 * Layout principal que envuelve las páginas con el Navbar
 * Usa Outlet de React Router para renderizar las rutas hijas
 */
export const PagesLayout: React.FC = () => {
  // Definir las opciones de navegación
  const navItems = [
    { num: '1', label: 'Formulario 1' },
    { num: '2', label: 'Formulario 2' },
    { num: '3', label: 'Formulario 3' },
  ];

  return (
    <div className="min-h-screen">
      {/* Navbar sticky en la parte superior */}
      <Navbar navItems={navItems} />
      
      {/* Contenido de las rutas hijas */}
      <main>
        <Outlet />
      </main>
    </div>
  );
};
