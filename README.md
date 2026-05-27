# Proyecto React + TypeScript + Vite

Proyecto web moderno con React 19, Vite, TypeScript y Tailwind CSS siguiendo patrones de diseño profesionales.

## 🚀 Stack Tecnológico

- **React 19.2.6** + **TypeScript 6.0.2** + **Vite 8.0.12**
- **React Router 7.15.1** - Enrutamiento y navegación
- **Tailwind CSS 4.3.0** - Estilos utility-first
- **Vitest 4.1.7** + **Testing Library** - Testing
- **GSAP** - Animaciones de alto rendimiento
- **ESLint** - Linting y calidad de código

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes presentacionales (solo UI)
│   ├── FormCard/       # Componente de formulario reutilizable
│   ├── Modal/          # Modal con overlay y animaciones
│   ├── Navbar/         # Barra de navegación horizontal
│   └── NotFound/       # Página 404 personalizada
├── containers/          # Componentes con lógica de negocio
│   ├── HomeContainer/  # Container principal con lógica de routing
│   │   ├── HomeContainer.tsx
│   │   └── formConfigs.ts  # Configuraciones centralizadas
│   └── PagesLayout/    # Layout wrapper con Navbar
├── hooks/              # Custom hooks reutilizables
│   └── useModal.ts    # Hook para manejo de modales
├── test/               # Configuración de testing
│   └── setup.ts       # Setup de Testing Library
├── types/              # Tipos TypeScript
│   └── formConfig.ts  # Tipos para configuraciones
├── utils/              # Funciones utilitarias
└── animations/         # Configuraciones GSAP
```

## ✨ Patrones de Diseño

### Presentational & Container Pattern
- **Presentational**: Solo props y UI, sin lógica
- **Container**: Maneja estado, efectos, llamadas API

### Custom Hooks
- Encapsula lógica reutilizable
- Separa concerns del componente

### Reglas de Código
- ✅ TypeScript estricto (sin `any`)
- ✅ Solo Tailwind CSS (no estilos inline)
- ✅ Testing obligatorio para todo
- ✅ GSAP para animaciones complejas
- ✅ Accesibilidad integrada
- ✅ Actualizar README en cada cambio

## 🌐 Sistema de Routing

### Configuración de Rutas
La aplicación usa **React Router v7** con query params para controlar qué configuración de FormCard se muestra:

- **Ruta principal**: `/` redirige automáticamente a `/pages/home?num=1`
- **Rutas dinámicas**: `/pages/home?num=[1|2|3]` muestra diferentes configuraciones
- **Fallback**: Valores no definidos usan configuración `default`
- **404**: Rutas no válidas muestran página NotFound personalizada

### Configuración Centralizada
Las props de cada página están definidas en `src/containers/HomeContainer/formConfigs.ts`:

```typescript
export const formConfigs: FormCardConfigRecord = {
  '1': { /* Config para num=1 */ },
  '2': { /* Config para num=2 */ },
  '3': { /* Config para num=3 */ },
  'default': { /* Fallback */ },
};
```

### Agregar Nueva Página
1. Agrega nueva configuración en `formConfigs.ts`
2. Agrega nuevo item en el array `navItems` de `PagesLayout.tsx`
3. ¡Listo! No se requiere modificar rutas ni lógica

## 🛠 Comandos

```bash
# Desarrollo
npm run dev              # Servidor de desarrollo en http://localhost:5173

# Build
npm run build           # Compilar para producción
npm run preview         # Previsualizar build de producción

# Testing
npm test                # Modo watch (recarga automática)
npm run test:run        # Ejecutar tests una vez
npm run test:ui         # Interfaz visual de tests
npm run test:coverage   # Reporte de cobertura de tests

# Linting
npm run lint           # Ejecutar ESLint
```

## 📦 Instalación

```bash
# Instalar dependencias (incluye React Router y Vitest)
npm install

# Opcional: Instalar GSAP para animaciones complejas
npm install gsap

# Opcional: Instalar plugins adicionales de ESLint
npm install -D eslint-plugin-testing-library
```

**Dependencias ya incluidas:**
- ✅ React Router 7.15.1
- ✅ Vitest 4.1.7 + Testing Library
- ✅ Tailwind CSS 4.3.0
- ✅ TypeScript 6.0.2

## 📝 Guía Rápida

### Crear Componente Presentacional
1. Ubicación: `src/components/NombreComponente/`
2. Archivo: `NombreComponente.tsx` + `NombreComponente.test.tsx`
3. Solo props, no lógica
4. Solo Tailwind CSS
5. Incluir tests

### Crear Componente Contenedor
1. Ubicación: `src/containers/NombreContainer/`
2. Archivo: `NombreContainer.tsx` + `NombreContainer.test.tsx`
3. Maneja lógica y estado
4. Usa custom hooks
5. Incluir tests

### Crear Custom Hook
1. Ubicación: `src/hooks/useNombreHook.ts`
2. Prefijo `use` obligatorio
3. Encapsula lógica reutilizable
4. Incluir `useNombreHook.test.ts`

## 📜 Historial

### [27/05/2026] - Sistema de Routing con React Router

**Cambios de Arquitectura:**
- ✅ Implementado **React Router v7.15.1** con query params dinámicos
- ✅ Sistema de navegación con **Navbar horizontal moderno** (pills style)
- ✅ **Configuración centralizada** de props por página en `formConfigs.ts`
- ✅ Layout wrapper con `PagesLayout` para estructura consistente
- ✅ Página 404 personalizada con diseño atractivo

**Nuevos Componentes:**
- `Navbar`: Navegación horizontal con active state, gradientes y responsive
- `NotFound`: Página 404 con animaciones y links de regreso
- `HomeContainer`: Contenedor que lee query params y aplica configuración
- `PagesLayout`: Layout que envuelve páginas con Navbar + Outlet

**Nuevos Archivos de Configuración:**
- `types/formConfig.ts`: Tipos TypeScript para configuraciones
- `containers/HomeContainer/formConfigs.ts`: Record con 3 configs + default fallback

**Estructura de Rutas:**
- `/` → Redirige a `/pages/home?num=1` (ruta principal)
- `/pages/home?num=1` → Formulario 1 (Bienvenido)
- `/pages/home?num=2` → Formulario 2 (Contáctanos)
- `/pages/home?num=3` → Formulario 3 (Únete a nosotros)
- `/pages/home?num=XXX` → Usa configuración default para valores no definidos
- `/*` → Página 404 (catch-all)

**Testing:**
- ✅ Todos los tests pasan (44 tests en 6 archivos)
- ✅ Configurado **Vitest 4.1.7** con jsdom y Testing Library
- ✅ Tests para Navbar, NotFound, HomeContainer y PagesLayout
- ✅ Scripts de test agregados: `test`, `test:run`, `test:ui`, `test:coverage`

**Uso:**
```tsx
// Navegar entre páginas
<Link to="/pages/home?num=1">Formulario 1</Link>

// Leer query params en contenedor
const [searchParams] = useSearchParams();
const num = searchParams.get('num') || '1';
const config = formConfigs[num] || formConfigs['default'];

// Renderizar con configuración
<FormCard {...config} onButtonClick={handleSubmit} />
```

**Características del Navbar:**
- Diseño horizontal con pills style
- Gradientes modernos (purple → pink)
- Indicación visual del item activo
- Versión responsive para móviles
- Efectos hover con scale y shadow
- Accesibilidad completa (aria-current, role, aria-label)

---

### [25/05/2026] - Componente FormCard Reutilizable

**Componentes Creados:**
- `FormCard`: Componente presentacional con fondo personalizable, título, descripción, input con contador de caracteres y botón de acción
- `Modal`: Modal elegante con overlay blur y animaciones
- `useModal`: Custom hook para manejar el estado del modal

**Características:**
- Props opcionales para máxima flexibilidad
- Fondos: imagen, color sólido o degradado
- Contador de caracteres dinámico con advertencias visuales
- Modal con cierre por overlay, botón X, botón footer o tecla Escape
- UI limpia y elegante con Tailwind CSS
- Tests completos para todos los componentes

**Uso:**
```tsx
const { isOpen, open, close } = useModal();
<FormCard
  backgroundGradient="bg-gradient-to-r from-purple-500 to-pink-500"
  title="Título"
  description="Descripción"
  maxLength={30}
  onButtonClick={(value) => open()}
/>
<Modal isOpen={isOpen} onClose={close} title="Título">
  Contenido del modal
</Modal>
```

### [25/05/2026] - Simplificación de Documentación
- ✅ Eliminados ejemplos de código de copilot-instructions.md para mayor claridad
- ✅ README simplificado con solo información esencial
- ✅ Mantiene patrones de diseño y directrices de desarrollo

### [25/05/2026] - Configuración Inicial
- ✅ React 19 + Vite + TypeScript + Tailwind CSS
- ✅ Patrones de diseño (Presentational & Container + Custom Hooks)
- ✅ Directrices de testing y linting
- ✅ Documentación completa

**Próximos pasos**: Instalar Vitest, crear componentes base, configurar CI/CD

---

Ver [directrices completas de desarrollo](.github/copilot-instructions.md) para más detalles.
