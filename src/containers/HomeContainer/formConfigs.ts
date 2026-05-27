import type { FormCardConfigRecord } from '../../types/formConfig';

/**
 * Configuraciones de FormCard por número de página
 * Cada key representa un valor del query param 'num'
 * La key 'default' se usa como fallback para valores no definidos
 */
export const formConfigs: FormCardConfigRecord = {
  '1': {
    backgroundGradient: 'bg-black/40 backdrop-blur-md',
    title: 'Bienvenido',
    description: 'Ingresa tu nombre para comenzar tu experiencia',
    placeholder: 'Tu nombre aquí...',
    maxLength: 30,
    buttonText: 'Continuar',
    inputType: 'text',
    logo: 'https://recursos-s3.s3.us-east-1.amazonaws.com/banco_azteca.png',
    illustration: 'https://recursos-s3.s3.us-east-1.amazonaws.com/pwa_Bienvenido.gif',
    vantaColor: 0x10b981,        // emerald-500
    vantaBackgroundColor: 0x064e3b, // emerald-900
    titleColor: 'text-[#296540]',
    descriptionColor: 'text-gray-200',
    inputTextColor: 'text-white',
    inputPlaceholderColor: 'placeholder-gray-400',
    inputBackgroundColor: 'bg-white/10',
    inputBorderColor: 'border-white/30',
    buttonColor: 'bg-white hover:bg-gray-100',
    buttonTextColor: 'text-gray-900',
    micColor: "text-white",
    counterColor: 'text-gray-300',
  },
  '2': {
    backgroundColor: 'bg-[#b3c1fe]',
    title: 'Contáctanos',
    description: 'Déjanos tu correo electrónico para comunicarnos contigo',
    placeholder: 'Escribe tu correo',
    maxLength: 50,
    buttonText: 'Enviar Email',
    inputType: 'email',
    logo: 'https://recursos-s3.s3.us-east-1.amazonaws.com/shopinbaz-777e5d12.svg',
    illustration: 'https://recursos-s3.s3.us-east-1.amazonaws.com/shopin.webp',
    vantaColor: 0xa855f7,        // purple-500
    vantaBackgroundColor: 0x1e1b4b, // indigo-900
    titleColor: 'text-white',
    descriptionColor: 'text-[#440090] font-semibold',
    inputTextColor: 'text-black',
    inputPlaceholderColor: 'placeholder-gray-500',
    inputBackgroundColor: 'bg-transparent',
    inputBorderColor: 'border-white/40',
    buttonColor: 'bg-[#440090]',
    buttonTextColor: 'text-white',
    micColor: "text-black",
    counterColor: 'text-gray-800',
  },
  '3': {
    title: 'Únete a nosotros',
    description: 'Completa el formulario con tu número de teléfono',
    placeholder: 'Escribe tu teléfono',
    maxLength: 20,
    buttonText: 'Registrarme',
    inputType: 'tel',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1280px-Amazon_logo.svg.png',
    illustration: 'https://illustrations.popsy.co/green/success.svg',
    vantaColor: 0xe8a030,        // white
    vantaBackgroundColor: 0xffffff, // yellow
    titleColor: 'text-black font-bold',
    descriptionColor: 'text-gray-600',
    inputTextColor: 'text-black',
    inputPlaceholderColor: 'placeholder-gray-500',
    inputBackgroundColor: 'bg-transparent',
    inputBorderColor: 'border-yellow-500',
    buttonColor: 'bg-[#ff9a00]',
    buttonTextColor: 'text-white',
    micColor: "text-black",
    counterColor: 'text-gray-600',
  },
  'default': {
    backgroundGradient: 'bg-gradient-to-br from-gray-700 to-gray-900',
    title: 'Página no encontrada',
    description: 'La configuración solicitada no existe. Usa el navbar para navegar.',
    placeholder: 'Escribe algo...',
    maxLength: 40,
    buttonText: 'Enviar',
    inputType: 'text',
    vantaColor: 0x6b7280,        // gray-500
    vantaBackgroundColor: 0x1f2937, // gray-800
    titleColor: 'text-white',
    descriptionColor: 'text-gray-300',
    inputTextColor: 'text-white',
    inputPlaceholderColor: 'placeholder-gray-500',
    inputBackgroundColor: 'bg-transparent',
    inputBorderColor: 'border-white/40',
    buttonColor: 'bg-white hover:bg-gray-100',
    buttonTextColor: 'text-gray-900',
    micColor: "text-black",
    counterColor: 'text-gray-400',
  },
};
