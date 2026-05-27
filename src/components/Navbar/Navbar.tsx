import { Link, useSearchParams } from 'react-router-dom';

/**
 * Props para el componente Navbar
 */
interface NavbarProps {
  /** Array de opciones de navegación */
  navItems: Array<{
    num: string;
    label: string;
  }>;
}

/**
 * Componente presentacional de navegación horizontal
 * Usa pills style con gradientes y efectos hover modernos
 */
export const Navbar: React.FC<NavbarProps> = ({ navItems }) => {
  const [searchParams] = useSearchParams();
  const currentNum = searchParams.get('num') || '1';

  return (
    <nav 
      className="sticky top-0 z-50"
      role="navigation"
      aria-label="Navegación principal"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-16">
          {/* Nav Items - Pills Style - Centrados */}
          <div className="flex items-center gap-3 flex-wrap justify-center">
            {navItems.map(({ num, label }) => {
              const isActive = currentNum === num;
              
              return (
                <Link
                  key={num}
                  to={`/pages/home?num=${num}`}
                  className={`
                    px-5 py-2 rounded-2xl font-semibold text-sm
                    transition-all duration-300 transform
                    focus:outline-none focus:ring-2 focus:ring-white/50
                    ${
                      isActive
                        ? 'bg-white text-purple-600 shadow-lg scale-105'
                        : 'bg-white text-gray-900 hover:bg-white/30 hover:shadow-md hover:scale-105'
                    }
                  `}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};
