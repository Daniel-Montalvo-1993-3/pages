import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FormCard } from '../../components/FormCard/FormCard';
import { Modal } from '../../components/Modal/Modal';
import { VantaBackground } from '../../components/VantaBackground/VantaBackground';
import { useModal } from '../../hooks/useModal';
import { formConfigs } from './formConfigs';
import { pushDataLayerEvent, type InputMethod } from '../../utils/dataLayer';

/** Colores por tipo de evento para el visor de DataLayer */
const EVENT_COLORS: Record<string, string> = {
  theme_loaded: 'text-purple-400',
  name_input: 'text-blue-400',
  name_displayed: 'text-green-400',
  datalayer_viewed: 'text-yellow-400',
};

/**
 * Contenedor principal para la página Home
 * Maneja la lógica de lectura de query params, selección de configuración,
 * y gestión del estado del formulario y modal
 */
export const HomeContainer: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { isOpen, open, close } = useModal();
  const { isOpen: isDataLayerOpen, open: openDataLayer, close: closeDataLayer } = useModal();
  const [userName, setUserName] = useState('');
  const [dataLayerSnapshot, setDataLayerSnapshot] = useState<Record<string, unknown>[]>([]);

  // Obtener el parámetro 'num' de la URL, defaultear a '1'
  const num = searchParams.get('num') || '1';

  // Obtener la configuración correspondiente, usar 'default' como fallback
  const config = formConfigs[num] || formConfigs['default'];

  // Trackear carga de tema al cambiar de página por URL
  useEffect(() => {
    pushDataLayerEvent({ event: 'theme_loaded', num });
  }, [num]);

  // Handler para cuando el usuario envía el formulario
  const handleFormSubmit = (value: string, method: InputMethod) => {
    setUserName(value);
    pushDataLayerEvent({ event: 'name_input', method });
    pushDataLayerEvent({ event: 'name_displayed' });
    open();
  };

  // Handler para abrir el visor de DataLayer
  const handleOpenDataLayer = () => {
    setDataLayerSnapshot([...(window.dataLayer ?? [])]);
    pushDataLayerEvent({ event: 'datalayer_viewed' });
    openDataLayer();
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
            titleColor={config.titleColor}
            descriptionColor={config.descriptionColor}
            inputTextColor={config.inputTextColor}
            inputPlaceholderColor={config.inputPlaceholderColor}
            inputBackgroundColor={config.inputBackgroundColor}
            inputBorderColor={config.inputBorderColor}
            buttonColor={config.buttonColor}
            buttonTextColor={config.buttonTextColor}
            counterColor={config.counterColor}
            micColor={config.micColor}
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

      {/* Botón flotante para ver el DataLayer */}
      <button
        onClick={handleOpenDataLayer}
        aria-label="Ver DataLayer"
        className="
          relative md:fixed bottom-5 right-0 md:right-6 z-20
          flex items-center gap-2
          px-4 py-2 rounded-full
          bg-gray-900/80 backdrop-blur-sm
          border border-purple-500/50
          text-purple-300 text-sm font-mono font-semibold
          shadow-lg shadow-purple-900/30
          hover:bg-gray-800/90 hover:border-purple-400 hover:text-purple-200
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-purple-500
        "
      >
        <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" aria-hidden="true" />
        dataLayer flujo
        <span className="
          inline-flex items-center justify-center
          w-5 h-5 rounded-full
          bg-purple-500/30 text-purple-200 text-xs
        ">
          {(window.dataLayer ?? []).length}
        </span>
      </button>

      {/* Modal visor de DataLayer */}
      <Modal isOpen={isDataLayerOpen} onClose={closeDataLayer} title="window.dataLayer">
        <div className="font-mono text-sm">
          {dataLayerSnapshot.length === 0 ? (
            <p className="text-gray-400 text-center py-4">No hay eventos registrados aún.</p>
          ) : (
            <ol className="space-y-2 max-h-96 overflow-y-auto pr-1">
              {dataLayerSnapshot.map((entry, index) => {
                const eventName = typeof entry.event === 'string' ? entry.event : '';
                const colorClass = EVENT_COLORS[eventName] ?? 'text-gray-300';
                const { event: _event, ...rest } = entry;
                return (
                  <li
                    key={index}
                    className="flex gap-2 items-start rounded-lg bg-gray-50 px-3 py-2 border border-gray-200"
                  >
                    <span className="text-gray-400 select-none w-5 shrink-0 text-right">{index + 1}.</span>
                    <div className="min-w-0">
                      <span className={`font-bold ${colorClass}`}>{eventName}</span>
                      {Object.keys(rest).length > 0 && (
                        <span className="text-gray-500 ml-2">
                          {Object.entries(rest).map(([k, v]) => (
                            <span key={k} className="mr-2">
                              <span className="text-gray-400">{k}:</span>{' '}
                              <span className="text-indigo-600">{String(v)}</span>
                            </span>
                          ))}
                        </span>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          )}
        </div>
      </Modal>
    </>
  );
};
