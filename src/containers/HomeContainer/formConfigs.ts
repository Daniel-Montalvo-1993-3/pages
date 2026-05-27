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
  },
  '2': {
    backgroundColor: 'bg-blue-500',
    title: 'Contáctanos',
    description: 'Déjanos tu correo electrónico para comunicarnos contigo',
    placeholder: 'correo@ejemplo.com',
    maxLength: 50,
    buttonText: 'Enviar Email',
    inputType: 'email',
  },
  '3': {
    backgroundImage: 'https://images.unsplash.com/photo-1557683316-973673baf926',
    title: 'Únete a nosotros',
    description: 'Completa el formulario con tu número de teléfono',
    placeholder: '+1 234 567 8900',
    maxLength: 20,
    buttonText: 'Registrarme',
    inputType: 'tel',
  },
  'default': {
    backgroundGradient: 'bg-gradient-to-br from-gray-700 to-gray-900',
    title: 'Página no encontrada',
    description: 'La configuración solicitada no existe. Usa el navbar para navegar.',
    placeholder: 'Ingresa algo...',
    maxLength: 40,
    buttonText: 'Enviar',
    inputType: 'text',
  },
};
