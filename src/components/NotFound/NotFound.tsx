import { Link } from 'react-router-dom';

/**
 * Componente presentacional para página 404
 * No tiene estado ni lógica, solo renderiza UI
 */
export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Número 404 grande */}
        <div className="mb-8">
          <h1 
            className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 animate-pulse"
            aria-label="Error 404"
          >
            404
          </h1>
        </div>

        {/* Mensaje principal */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            ¡Oops! Página no encontrada
          </h2>
          <p className="text-xl text-gray-300 mb-2">
            La ruta que estás buscando no existe en nuestro sistema.
          </p>
          <p className="text-lg text-gray-400">
            Parece que te has perdido en el espacio digital.
          </p>
        </div>

        {/* Ilustración decorativa con emoji */}
        <div className="mb-12 text-8xl animate-bounce">
          🚀
        </div>

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/pages/home?num=1"
            className="
              px-8 py-4 rounded-xl
              bg-gradient-to-r from-purple-600 to-pink-600
              hover:from-purple-700 hover:to-pink-700
              text-white font-semibold text-lg
              transition-all duration-300
              transform hover:scale-105 hover:shadow-2xl
              focus:outline-none focus:ring-4 focus:ring-purple-500/50
              shadow-lg
            "
          >
            Volver al Inicio
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="
              px-8 py-4 rounded-xl
              bg-white/10 backdrop-blur-sm
              hover:bg-white/20
              text-white font-semibold text-lg
              border-2 border-white/30
              transition-all duration-300
              transform hover:scale-105
              focus:outline-none focus:ring-4 focus:ring-white/50
            "
          >
            Regresar
          </button>
        </div>

        {/* Info adicional */}
        <div className="mt-12 text-gray-400 text-sm">
          <p>Si crees que esto es un error, por favor contáctanos.</p>
        </div>
      </div>
    </div>
  );
};
