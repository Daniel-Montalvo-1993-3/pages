import type { FormCardConfigRecord } from '../../types/formConfig';

/**
 * Configuraciones de FormCard por número de página
 * Cada key representa un valor del query param 'num'
 * La key 'default' se usa como fallback para valores no definidos
 */
export const formConfigs: FormCardConfigRecord = {
  '1': {
    backgroundGradient: 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500',
    title: 'Bienvenido',
    description: 'Ingresa tu nombre para comenzar tu experiencia',
    placeholder: 'Tu nombre aquí...',
    maxLength: 30,
    buttonText: 'Continuar',
    inputType: 'text',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1280px-Google_2015_logo.svg.png',
    illustration: 'https://illustrations.popsy.co/amber/man-riding-a-rocket.svg',
    vantaColor: 0xa855f7,        // purple-500
    vantaBackgroundColor: 0x1e1b4b, // indigo-900
  },
  '2': {
    backgroundColor: 'bg-blue-500',
    title: 'Contáctanos',
    description: 'Déjanos tu correo electrónico para comunicarnos contigo',
    placeholder: 'correo@ejemplo.com',
    maxLength: 50,
    buttonText: 'Enviar Email',
    inputType: 'email',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/1024px-Facebook_f_logo_%282019%29.svg.png',
    illustration: 'https://illustrations.popsy.co/blue/message-sent.svg',
    vantaColor: 0x3b82f6,        // blue-500
    vantaBackgroundColor: 0x1e3a8a, // blue-900
  },
  '3': {
    backgroundImage: 'https://images.unsplash.com/photo-1557683316-973673baf926',
    title: 'Únete a nosotros',
    description: 'Completa el formulario con tu número de teléfono',
    placeholder: '+1 234 567 8900',
    maxLength: 20,
    buttonText: 'Registrarme',
    inputType: 'tel',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1280px-Amazon_logo.svg.png',
    illustration: 'https://illustrations.popsy.co/green/success.svg',
    vantaColor: 0x10b981,        // emerald-500
    vantaBackgroundColor: 0x064e3b, // emerald-900
  },
  'default': {
    backgroundGradient: 'bg-gradient-to-br from-gray-700 to-gray-900',
    title: 'Página no encontrada',
    description: 'La configuración solicitada no existe. Usa el navbar para navegar.',
    placeholder: 'Ingresa algo...',
    maxLength: 40,
    buttonText: 'Enviar',
    inputType: 'text',
    vantaColor: 0x6b7280,        // gray-500
    vantaBackgroundColor: 0x1f2937, // gray-800
  },
};
