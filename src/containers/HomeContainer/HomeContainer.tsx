import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FormCard } from '../../components/FormCard/FormCard';
import { Modal } from '../../components/Modal/Modal';
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
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
          Formulario {num}
        </h1>

        {/* Renderizar FormCard con la configuración seleccionada */}
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
          onButtonClick={handleFormSubmit}
        />

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
  );
};
