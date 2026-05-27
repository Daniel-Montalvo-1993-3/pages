import { Routes, Route, Navigate } from 'react-router-dom';
import { PagesLayout } from './containers/PagesLayout/PagesLayout';
import { HomeContainer } from './containers/HomeContainer/HomeContainer';
import { NotFound } from './components/NotFound/NotFound';

/**
 * Componente principal de la aplicación
 * Define la configuración de rutas usando React Router v6
 */
function App() {
  return (
    <Routes>
      {/* Redirect de la raíz a /pages/home?num=1 */}
      <Route path="/" element={<Navigate to="/pages/home?num=1" replace />} />
      
      {/* Layout con Navbar que envuelve las rutas hijas */}
      <Route path="/pages" element={<PagesLayout />}>
        {/* Ruta principal con query params dinámicos */}
        <Route path="home" element={<HomeContainer />} />
      </Route>
      
      {/* Ruta catch-all para páginas no encontradas (404) */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
