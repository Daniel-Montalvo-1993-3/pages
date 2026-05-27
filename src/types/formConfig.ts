/**
 * Tipos y configuraciones para FormCard
 */

export interface FormCardConfig {
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
  /** URL del logo (se muestra en la parte superior) */
  logo?: string;
  /** URL de la ilustración (se muestra antes del título) */
  illustration?: string;
  /** Color principal de Vanta en formato hexadecimal (ej: 0xa855f7) */
  vantaColor?: number;
  /** Color de fondo de Vanta en formato hexadecimal (ej: 0x1e1b4b) */
  vantaBackgroundColor?: number;
}

/**
 * Record de configuraciones de FormCard indexadas por el parámetro 'num'
 * Incluye una configuración 'default' como fallback
 */
export type FormCardConfigRecord = Record<string, FormCardConfig>;
