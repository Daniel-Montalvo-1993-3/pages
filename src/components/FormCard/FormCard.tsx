import { useState, useCallback } from 'react';
import { useSpeechInput } from '../../hooks/useSpeechInput';

interface FormCardProps {
  /** Imagen de fondo. Si no se proporciona, se usa el color de fondo */
  backgroundImage?: string;
  /** Color de fondo sólido (ej: 'bg-blue-500') */
  backgroundColor?: string;
  /** Color de fondo con degradado (ej: 'bg-gradient-to-r from-purple-500 to-pink-500') */
  backgroundGradient?: string;
  /** Título del formulario */
  title?: string;
  /** Descripción del formulario */
  description?: string;
  /** Placeholder del input */
  placeholder?: string;
  /** Máximo de caracteres permitidos */
  maxLength?: number;
  /** Texto del botón */
  buttonText?: string;
  /** Callback al hacer click en el botón con el valor del input y el método de entrada */
  onButtonClick?: (value: string, method: 'manual' | 'voice') => void;
  /** Tipo de input */
  inputType?: 'text' | 'email' | 'tel' | 'number';
  /** URL del logo (se muestra en la parte superior) */
  logo?: string;
  /** URL de la ilustración (se muestra antes del título) */
  illustration?: string;
  /** Color del título (clases de Tailwind, ej: 'text-white' o 'text-gray-900') */
  titleColor?: string;
  /** Color de la descripción (clases de Tailwind) */
  descriptionColor?: string;
  /** Color del texto del input (clases de Tailwind) */
  inputTextColor?: string;
  /** Color del placeholder (clases de Tailwind) */
  inputPlaceholderColor?: string;
  /** Fondo del input (clases de Tailwind) */
  inputBackgroundColor?: string;
  /** Color del borde del input (clases de Tailwind) */
  inputBorderColor?: string;
  /** Color del botón (clases de Tailwind, ej: 'bg-blue-600 hover:bg-blue-700') */
  buttonColor?: string;
  /** Color del texto del botón (clases de Tailwind) */
  buttonTextColor?: string;
  /** Color del contador de caracteres (clases de Tailwind) */
  counterColor?: string;
  /** Color del ícono del micrófono (clases de Tailwind) */
  micColor?: string;
}

export const FormCard: React.FC<FormCardProps> = ({
  backgroundImage,
  backgroundColor = 'bg-gray-100',
  backgroundGradient,
  title,
  description,
  placeholder = 'Ingresa tu nombre',
  maxLength = 50,
  buttonText = 'Enviar',
  onButtonClick,
  inputType = 'text',
  logo,
  illustration,
  titleColor = 'text-white',
  descriptionColor = 'text-gray-200',
  inputTextColor = 'text-white',
  inputPlaceholderColor = 'placeholder-gray-400',
  inputBackgroundColor = 'bg-white/10',
  inputBorderColor = 'border-white/20',
  buttonColor = 'bg-white hover:bg-gray-100',
  buttonTextColor = 'text-gray-900',
  counterColor = 'text-gray-300',
  micColor = 'text-white/60',
}) => {
  const [inputValue, setInputValue] = useState('');
  const [voiceUsed, setVoiceUsed] = useState(false);

  const handleInputChange = useCallback((value: string) => {
    setInputValue(value);
    setVoiceUsed(true);
  }, []);

  const { isListening, isSupported, toggleListening, stopListening } = useSpeechInput({
    onTranscript: handleInputChange,
    maxLength,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onButtonClick && inputValue.trim()) {
      if (isListening) stopListening();
      onButtonClick(inputValue, voiceUsed ? 'voice' : 'manual');
      setVoiceUsed(false);
    }
    setInputValue('');
  };

  const remainingChars = maxLength - inputValue.length;

  // Determinar el estilo de fondo
  const getBackgroundStyle = () => {
    if (backgroundImage) {
      return 'bg-cover bg-center';
    }
    if (backgroundGradient) {
      return backgroundGradient;
    }
    return backgroundColor;
  };

  // Estilos inline solo para backgroundImage (excepción documentada)
  const backgroundStyle = backgroundImage
    ? { backgroundImage: `url(${backgroundImage})` }
    : undefined;

  return (
    <div
      className={`
        relative rounded-2xl p-8 py-12 shadow-xl
        min-h-[400px] flex flex-col justify-center
        ${getBackgroundStyle()}
      `}
      style={backgroundStyle}
    >
      {/* Overlay para mejorar legibilidad cuando hay imagen de fondo */}
      {backgroundImage && (
        <div className="absolute inset-0 bg-black/30 rounded-2xl" />
      )}

      <div className="relative z-10 max-w-md mx-auto w-full">
        {/* Logo */}
        {logo && (
          <div className="mb-6 flex justify-center">
            <img 
              src={logo} 
              alt="Logo" 
              className="h-10 md:h-16 object-contain"
              loading="lazy"
            />
          </div>
        )}

        {/* Ilustración */}
        {illustration && (
          <div className="mb-6 flex justify-center">
            <img 
              src={illustration} 
              alt="Illustration" 
              className="h-[250px] object-contain"
              loading="lazy"
            />
          </div>
        )}

        {/* Título */}
        {title && (
          <h2
            className={`
              text-3xl font-bold mb-4 text-center
              ${titleColor}
            `}
          >
            {title}
          </h2>
        )}

        {/* Descripción */}
        {description && (
          <p
            className={`
              text-lg mb-6 text-center
              ${descriptionColor}
            `}
          >
            {description}
          </p>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type={inputType}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={placeholder}
              maxLength={maxLength}
              className={`
                w-full px-0 py-3
                bg-transparent
                border-0 border-b-2
                focus:border-white focus:ring-0
                focus:outline-none
                transition-all duration-300
                ${isSupported ? 'pr-8' : ''}
                ${inputBorderColor}
                ${inputTextColor}
                ${inputPlaceholderColor}
              `}
              aria-label={placeholder}
            />
            {/* Botón de micrófono */}
            {isSupported && (
              <button
                type="button"
                onClick={toggleListening}
                aria-label={isListening ? 'Detener dictado' : 'Iniciar dictado por voz'}
                className={`
                  absolute left-0 bottom-0
                  transition-all duration-300
                  focus:outline-none
                  ${isListening ? 'text-red-400 animate-pulse scale-110' : `${micColor} hover:scale-110`}
                `}
              >
                {isListening ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M8.25 4.5a3.75 3.75 0 1 1 7.5 0v8.25a3.75 3.75 0 1 1-7.5 0V4.5Z" />
                    <path d="M6 10.5a.75.75 0 0 1 .75.75v1.5a5.25 5.25 0 1 0 10.5 0v-1.5a.75.75 0 0 1 1.5 0v1.5a6.751 6.751 0 0 1-6 6.709v2.291h3a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3v-2.291a6.751 6.751 0 0 1-6-6.709v-1.5A.75.75 0 0 1 6 10.5Z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M8.25 4.5a3.75 3.75 0 1 1 7.5 0v8.25a3.75 3.75 0 1 1-7.5 0V4.5Z" />
                    <path d="M6 10.5a.75.75 0 0 1 .75.75v1.5a5.25 5.25 0 1 0 10.5 0v-1.5a.75.75 0 0 1 1.5 0v1.5a6.751 6.751 0 0 1-6 6.709v2.291h3a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3v-2.291a6.751 6.751 0 0 1-6-6.709v-1.5A.75.75 0 0 1 6 10.5Z" />
                  </svg>
                )}
              </button>
            )}
            {/* Contador de caracteres */}
            <div className="mt-2 text-xs text-right">
              <span
                className={`
                  ${remainingChars < 10 ? 'text-red-400 font-semibold' : counterColor}
                `}
              >
                {remainingChars}
              </span>
            </div>
          </div>

          {/* Botón */}
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className={`
              w-full px-6 py-3 rounded-lg
              font-semibold
              transition-all duration-300
              disabled:opacity-50 disabled:cursor-not-allowed
              focus:outline-none focus:ring-2 focus:ring-white/50
              shadow-lg hover:shadow-xl
              transform hover:scale-[1.02]
              active:scale-[0.98]
              ${buttonColor}
              ${buttonTextColor}
            `}
            aria-label={buttonText}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};
