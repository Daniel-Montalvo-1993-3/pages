# Proyecto React + TypeScript + Vite

Proyecto web moderno con React 19, Vite, TypeScript y Tailwind CSS siguiendo patrones de diseño profesionales.

## 🚀 Stack Tecnológico

- **React 19.2.6** + **TypeScript 6.0.2** + **Vite 8.0.12**
- **Tailwind CSS 4.3.0** - Estilos utility-first
- **Vitest** + **Testing Library** - Testing
- **GSAP** - Animaciones de alto rendimiento
- **ESLint** - Linting y calidad de código

## 📁 Estructura del Proyecto

```
src/
├── components/      # Componentes presentacionales (solo UI)
├── containers/      # Componentes con lógica de negocio
├── hooks/          # Custom hooks reutilizables
├── utils/          # Funciones utilitarias
├── animations/     # Configuraciones GSAP
└── types/          # Tipos TypeScript
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

## 🛠 Comandos

```bash
# Desarrollo
npm run dev

# Build
npm run build
npm run preview

# Testing (después de instalar vitest)
npm test              # Modo watch
npm run test:run      # Ejecutar una vez
npm run test:coverage # Reporte de cobertura

# Linting
npm run lint
```

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Configurar testing
npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event @vitest/ui

# Instalar GSAP
npm install gsap

# Instalar ESLint plugins
npm install -D eslint-plugin-testing-library
```

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
