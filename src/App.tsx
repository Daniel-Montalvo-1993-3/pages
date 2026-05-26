import { useState } from 'react';
import { FormCard } from './components/FormCard/FormCard';
import { Modal } from './components/Modal/Modal';
import { useModal } from './hooks/useModal';

function App() {
  const { isOpen, open, close } = useModal();
  const [userName, setUserName] = useState('');

  const handleFormSubmit = (name: string) => {
    setUserName(name);
    open();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
          Componente FormCard Reutilizable
        </h1>

        {/* Ejemplo 1: Con degradado */}
        <FormCard
          backgroundGradient="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"
          title="Bienvenido"
          description="Ingresa tu nombre para comenzar"
          placeholder="Tu nombre aquí..."
          maxLength={30}
          buttonText="Continuar"
          onButtonClick={handleFormSubmit}
        />

        {/* Ejemplo 2: Con color sólido */}
        <FormCard
          backgroundColor="bg-blue-500"
          title="Contáctanos"
          description="Déjanos tu nombre"
          maxLength={50}
          onButtonClick={handleFormSubmit}
        />

        {/* Ejemplo 3: Con imagen de fondo */}
        <FormCard
          backgroundImage="https://images.unsplash.com/photo-1557683316-973673baf926"
          title="Únete a nosotros"
          description="Completa el formulario"
          buttonText="Enviar"
          maxLength={40}
          onButtonClick={handleFormSubmit}
        />

        {/* Modal */}
        <Modal isOpen={isOpen} onClose={close} title="¡Hola!">
          <div className="text-center py-4">
            <p className="text-lg text-gray-700 mb-2">
              Tu nombre es:
            </p>
            <p className="text-2xl font-bold text-blue-600">
              {userName}
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Presiona Escape o haz click fuera del modal para cerrar
            </p>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default App;
