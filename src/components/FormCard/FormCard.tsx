import { useState } from 'react';

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
  /** Callback al hacer click en el botón con el valor del input */
  onButtonClick?: (value: string) => void;
  /** Tipo de input */
  inputType?: 'text' | 'email' | 'tel' | 'number';
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
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onButtonClick && inputValue.trim()) {
      onButtonClick(inputValue);
    }
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
        relative rounded-2xl p-8 shadow-xl
        min-h-[400px] flex flex-col justify-center
        ${getBackgroundStyle()}
      `}
      style={backgroundStyle}
    >
      {/* Overlay para mejorar legibilidad cuando hay imagen de fondo */}
      {backgroundImage && (
        <div className="absolute inset-0 bg-black/40 rounded-2xl" />
      )}

      <div className="relative z-10 max-w-md mx-auto w-full">
        {/* Título */}
        {title && (
          <h2
            className={`
              text-3xl font-bold mb-4
              ${backgroundImage ? 'text-white' : 'text-gray-900'}
            `}
          >
            {title}
          </h2>
        )}

        {/* Descripción */}
        {description && (
          <p
            className={`
              text-lg mb-6
              ${backgroundImage ? 'text-gray-100' : 'text-gray-600'}
            `}
          >
            {description}
          </p>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type={inputType}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={placeholder}
              maxLength={maxLength}
              className="
                w-full px-4 py-3 rounded-lg
                bg-white/90 backdrop-blur-sm
                border-2 border-gray-300
                focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
                focus:outline-none
                transition-all duration-200
                text-gray-900 placeholder-gray-500
              "
              aria-label={placeholder}
            />
            {/* Contador de caracteres */}
            <div className="mt-2 text-sm text-right">
              <span
                className={`
                  ${remainingChars < 10 ? 'text-red-500 font-semibold' : 'text-gray-500'}
                  ${backgroundImage && remainingChars >= 10 ? 'text-white/80' : ''}
                `}
              >
                {remainingChars} caracteres restantes
              </span>
            </div>
          </div>

          {/* Botón */}
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="
              w-full px-6 py-3 rounded-lg
              bg-blue-600 hover:bg-blue-700
              text-white font-medium
              transition-all duration-200
              disabled:opacity-50 disabled:cursor-not-allowed
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              shadow-lg hover:shadow-xl
              transform hover:scale-[1.02]
              active:scale-[0.98]
            "
            aria-label={buttonText}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};
