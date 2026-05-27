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
      className="bg-white shadow-lg sticky top-0 z-50 border-b-2 border-gray-100"
      role="navigation"
      aria-label="Navegación principal"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link 
              to="/pages/home?num=1"
              className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
            >
              FormCard
            </Link>
          </div>

          {/* Nav Items - Pills Style */}
          <div className="flex items-center space-x-2">
            {navItems.map(({ num, label }) => {
              const isActive = currentNum === num;
              
              return (
                <Link
                  key={num}
                  to={`/pages/home?num=${num}`}
                  className={`
                    px-6 py-2.5 rounded-full font-semibold text-sm
                    transition-all duration-300 transform
                    focus:outline-none focus:ring-2 focus:ring-purple-500/50
                    ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gradient-to-r hover:from-purple-100 hover:to-pink-100 hover:text-purple-700 hover:shadow-md hover:scale-105'
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

      {/* Mobile responsive version (opcional para mejora futura) */}
      <div className="sm:hidden px-4 pb-3">
        <div className="flex flex-col space-y-2">
          {navItems.map(({ num, label }) => {
            const isActive = currentNum === num;
            
            return (
              <Link
                key={`mobile-${num}`}
                to={`/pages/home?num=${num}`}
                className={`
                  px-4 py-2 rounded-lg font-medium text-sm text-center
                  transition-all duration-300
                  ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-purple-50'
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
    </nav>
  );
};
