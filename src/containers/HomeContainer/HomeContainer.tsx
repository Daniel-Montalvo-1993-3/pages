import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FormCard } from '../../components/FormCard/FormCard';
import { Modal } from '../../components/Modal/Modal';
import { VantaBackground } from '../../components/VantaBackground/VantaBackground';
import { useModal } from '../../hooks/useModal';
import { formConfigs } from './formConfigs';

/**
 * Contenedor principal para la página Home
 * Maneja la lógica de lectura de query params, selección de configuración,
 * y gestión del estado del formulario y modal
 */
export const HomeContainer: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { isOpen, open, close } = useModal();
  const [userName, setUserName] = useState('');

  // Obtener el parámetro 'num' de la URL, defaultear a '1'
  const num = searchParams.get('num') || '1';

  // Obtener la configuración correspondiente, usar 'default' como fallback
  const config = formConfigs[num] || formConfigs['default'];

  // Handler para cuando el usuario envía el formulario
  const handleFormSubmit = (value: string) => {
    setUserName(value);
    open();
  };

  return (
    <>
      {/* Fondo oscuro base que se muestra antes de que Vanta cargue */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 z-0" />
      
      {/* Fondo animado con Vanta.js Topology */}
      <VantaBackground 
        color={config.vantaColor || 0xa855f7}
        backgroundColor={config.vantaBackgroundColor || 0x1e1b4b}
        scale={1.0}
        mouseControls={true}
        touchControls={true}
      />
      
      {/* Contenido principal con z-index superior para estar sobre Vanta */}
      <div className="relative min-h-screen p-8 z-10">
        <div className="max-w-2xl mx-auto space-y-8">
          <h1 className="text-4xl font-bold text-center text-white mb-8 drop-shadow-lg animate-in fade-in-up duration-500">
            Formulario {num}
          </h1>

        {/* Renderizar FormCard con la configuración seleccionada - key para forzar re-render en cambio de página */}
        <div key={num} className="animate-in fade-in-up duration-700">
          <FormCard
            backgroundImage={config.backgroundImage}
            backgroundColor={config.backgroundColor}
            backgroundGradient={config.backgroundGradient}
            title={config.title}
            description={config.description}
            placeholder={config.placeholder}
            maxLength={config.maxLength}
            buttonText={config.buttonText}
            inputType={config.inputType}
            logo={config.logo}
            illustration={config.illustration}
            onButtonClick={handleFormSubmit}
          />
        </div>

        {/* Modal de confirmación */}
        <Modal isOpen={isOpen} onClose={close} title="¡Éxito!">
          <div className="text-center py-4">
            <p className="text-lg text-gray-700 mb-2">
              Tu información ha sido recibida:
            </p>
            <p className="text-2xl font-bold text-blue-600 break-all">
              {userName}
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Presiona Escape o haz clic fuera del modal para cerrar
            </p>
          </div>
        </Modal>
      </div>
    </div>
    </>
  );
};
