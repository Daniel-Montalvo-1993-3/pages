# Proyecto React + TypeScript + Vite

Proyecto web moderno con React 19, Vite, TypeScript y Tailwind CSS siguiendo patrones de diseño profesionales.

# Ejecutar proyecto en local
- descargar repositorio
- en terminal ejecutar npm i 
- y npm run dev para correrlo localmente

## ��� Stack Tecnológico

| Tecnología | Decisión |
|---|---|
| React 19 + Vite | Ecosistema estándar; Vite ofrece HMR rápido y build optimizado sin configuración compleja |
| TypeScript estricto | Elimina errores en runtime, autocompletado preciso, refactoring seguro |
| Tailwind CSS | Estilos colocalizados con el componente, sin CSS files sueltos, purge automático en build |
| React Router v7 | Routing declarativo; query params permiten compartir URLs con estado sin backend |
| Vitest + Testing Library | Vitest corre en el mismo proceso que Vite (más rápido); Testing Library fuerza tests orientados al usuario |
| react-speech-recognition | Abstrae la Web Speech API con soporte cross-browser y manejo de estado integrado | facil integración |
| Vanta.js vía CDN | La librería es pesada; CDN con `defer` evita bloquear el parse del HTML y aprovecha cache del navegador |

## ��� Estructura del Proyecto

\`\`\`
src/
├── components/          # Componentes presentacionales (solo UI)
│   ├── FormCard/        # Componente de formulario reutilizable
│   ├── Modal/           # Modal con overlay y animaciones
│   ├── Navbar/          # Barra de navegación horizontal
│   └── NotFound/        # Página 404 personalizada
├── containers/          # Componentes con lógica de negocio
│   ├── HomeContainer/   # Container principal con lógica de routing
│   │   ├── HomeContainer.tsx
│   │   └── formConfigs.ts   # Configuraciones centralizadas
│   └── PagesLayout/     # Layout wrapper con Navbar
├── hooks/               # Custom hooks reutilizables
│   ├── useModal.ts      # Hook para manejo de modales
│   └── useSpeechInput.ts  # Hook para dictado por voz
├── test/                # Configuración de testing
│   └── setup.ts         # Setup de Testing Library
├── types/               # Tipos TypeScript
│   └── formConfig.ts    # Tipos para configuraciones
└── utils/               # Funciones utilitarias
    └── dataLayer.ts     # Utilidad de tracking con dataLayer
\`\`\`

## ✨ Patrones de Diseño

### Presentational & Container Pattern
- **Presentacional**: Solo props y UI → fácil de testear y reutilizar sin dependencias externas
- **Container**: Centraliza lógica → un solo lugar para cambiar comportamiento, los presentacionales no se tocan

### Custom Hooks
- Saca la lógica del componente → el componente queda limpio, la lógica es testeable de forma aislada
- Permite reusar la misma lógica en distintos componentes sin duplicar código

### Reglas de Código
- **Sin `any`**: Los errores de tipo se detectan en compilación, no en producción
- **Solo Tailwind**: Un único sistema de diseño, sin colisiones entre CSS files
- **Testing obligatorio**: Previene regresiones; los tests documentan el comportamiento esperado
- **Accesibilidad**: `aria-*` y semántica HTML5 por defecto, no como afterthought

## ��� Sistema de Routing

La aplicación usa **React Router v7** con query params para controlar qué configuración de FormCard se muestra.

**¿Por qué query params y no rutas separadas?** Todas las páginas son el mismo componente con distinta configuración. Usar `?num=` evita duplicar rutas y componentes; el estado vive en la URL (compartible, navegable con Back/Forward).

- **Ruta principal**: \`/\` redirige automáticamente a \`/pages/home?num=1\`
- **Rutas dinámicas**: \`/pages/home?num=[1|2|3]\` muestra diferentes configuraciones
- **Fallback**: Valores no definidos usan configuración \`default\`
- **404**: Rutas no válidas muestran página NotFound personalizada

### Agregar Nueva Página
1. Agrega nueva configuración en \`formConfigs.ts\`
2. Agrega nuevo item en el array \`navItems\` de \`PagesLayout.tsx\`
3. ¡Listo! No se requiere modificar rutas ni lógica

## ��� Dictado por Voz

\`FormCard\` incluye un botón de micrófono usando la Web Speech API vía \`react-speech-recognition\`.

\`\`\`ts
const { isListening, isSupported, toggleListening, stopListening } = useSpeechInput({
  onTranscript: (value) => setInputValue(value),
  maxLength: 30,
  lang: 'es-MX',
});
\`\`\`

- Se oculta automáticamente si el browser no tiene soporte
- Se detiene al enviar el formulario o navegar a otra página
- Animación de pulso rojo mientras escucha

## ��� Tracking con DataLayer

Integración lista para Google Tag Manager vía `window.dataLayer`.

**¿Por qué `dataLayer` y no un SDK de analytics directo?** `dataLayer` es el estándar de GTM: desacopla el código de la herramienta de analytics. Si el día de mañana se cambia GA4 por otro proveedor, el código de la app no cambia.

**¿Por qué tipos discriminados?** Cada evento tiene propiedades distintas. Con union types TypeScript garantiza en compilación que `theme_loaded` siempre lleva `num`, y `name_input` siempre lleva `method`.

| Evento | Cuándo | Propiedades |
|---|---|---|
| \`theme_loaded\` | Al cargar/cambiar \`?num\` | \`num\` |
| \`name_input\` | Al enviar el formulario | \`method: 'manual'\|'voice'\` |
| \`name_displayed\` | Al mostrar el nombre en modal | — |

Verificar en DevTools: \`window.dataLayer\`

## ��� Comandos

\`\`\`bash
npm run dev              # Servidor de desarrollo en http://localhost:5173
npm run build            # Compilar para producción
npm run preview          # Previsualizar build de producción
npm test                 # Modo watch
npm run test:run         # Ejecutar tests una vez
npm run test:coverage    # Reporte de cobertura
npm run lint             # Ejecutar ESLint
\`\`\`

## ��� Instalación

\`\`\`bash
npm install
\`\`\`

**Dependencias incluidas:**
- ✅ React Router 7.15.1
- ✅ Vitest 4.1.7 + Testing Library
- ✅ Tailwind CSS 4.3.0
- ✅ TypeScript 6.0.2
- ✅ react-speech-recognition 4.0.1

## ��� Historial

### [27/05/2026] - DataLayer Tracking
- ✅ \`src/utils/dataLayer.ts\` con tipos discriminados estrictos por evento
- ✅ 3 eventos trackeados: \`theme_loaded\`, \`name_input\`, \`name_displayed\`
- ✅ Detección automática \`manual\` vs \`voice\` según método de entrada
- ✅ 79 tests pasando (9 archivos)

---

### [27/05/2026] - Dictado por Voz
- ✅ \`react-speech-recognition 4.0.1\` integrado
- ✅ Hook \`useSpeechInput\` con cleanup automático al navegar
- ✅ Botón micrófono en \`FormCard\` con animación de pulso rojo
- ✅ Se detiene al enviar el formulario o cambiar de página

---

### [27/05/2026] - Mejoras de UI y Sistema de Color
- **Navbar**: transparente con \`backdrop-blur-md\`, links centrados en pill style, responsive sin duplicados
- **Input minimalista**: estilo underline con 10 props de color configurables: \`titleColor\`, \`descriptionColor\`, \`inputTextColor\`, \`inputPlaceholderColor\`, \`inputBackgroundColor\`, \`inputBorderColor\`, \`buttonColor\`, \`buttonTextColor\`, \`counterColor\`, \`micColor\`

---

### [27/05/2026] - Optimización de CDN
- Scripts Vanta.js y p5.js con \`defer\` + \`<link rel="preconnect">\`
- Versiones fijadas para cache efectivo (\`@0.5.24\`, \`1.4.0\`)
- Retry polling en \`VantaBackground\` para esperar scripts diferidos

---

### [27/05/2026] - Sistema de Routing con React Router
- ✅ React Router v7 con query params dinámicos
- ✅ Navbar horizontal con active state y pill style
- ✅ Configuración centralizada en \`formConfigs.ts\`
- ✅ Layout \`PagesLayout\` + página 404 personalizada

---

### [25/05/2026] - Componente FormCard Reutilizable
- \`FormCard\`: formulario con fondo personalizable y contador de caracteres
- \`Modal\`: overlay con blur y cierre por Escape/overlay/botón
- \`useModal\`: custom hook para estado del modal

---

Ver [directrices completas de desarrollo](.github/copilot-instructions.md) para más detalles.
