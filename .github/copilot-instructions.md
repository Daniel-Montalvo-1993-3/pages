# Directrices de desarrollo para el Frontend

## Resumen del Proyecto
Este es un proyecto web construido con React 19, Vite, TypeScript y Tailwind CSS, que sigue patrones de diseño modernos para maximizar la reutilización de código y mantener una arquitectura limpia y testeable.

## Estructura de Proyecto
Organiza el código siguiendo esta estructura de carpetas:

```
src/
├── components/          # Componentes presentacionales puros
│   ├── Button/
│   │   ├── Button.tsx
│   │   └── Button.test.tsx
│   └── Card/
│       ├── Card.tsx
│       └── Card.test.tsx
├── containers/          # Componentes contenedores con lógica
│   ├── UserProfile/
│   │   ├── UserProfileContainer.tsx
│   │   └── UserProfileContainer.test.tsx
│   └── Dashboard/
│       ├── DashboardContainer.tsx
│       └── DashboardContainer.test.tsx
├── hooks/              # Custom hooks reutilizables
│   ├── useAuth.ts
│   ├── useAuth.test.ts
│   ├── useFetch.ts
│   └── useFetch.test.ts
├── utils/              # Funciones utilitarias
│   └── helpers.ts
├── animations/         # Configuraciones y utilidades de GSAP
│   └── transitions.ts
└── types/              # Definiciones de tipos TypeScript
    └── index.ts
```

**Nomenclatura:**
- Componentes: `PascalCase` (ej: `UserProfile.tsx`)
- Hooks: `camelCase` con prefijo `use` (ej: `useAuth.ts`)
- Utilidades: `camelCase` (ej: `formatDate.ts`)
- Tests: mismo nombre que el archivo + `.test.tsx` o `.test.ts`

## Pauta de Codificación

### Patrones Obligatorios

1. **Presentational & Container Pattern**: Separa componentes en dos categorías:
   - **Componentes Presentacionales**: Solo reciben props y renderizan UI. Sin lógica de negocio, sin estado local (excepto estado de UI), sin efectos secundarios.
   - **Componentes Contenedores**: Manejan lógica de negocio, estado, efectos secundarios, llamadas a APIs. Pasan datos y callbacks a componentes presentacionales.

2. **Custom Hooks**: Extrae toda lógica reutilizable que use hooks de React en custom hooks. Esto incluye: manejo de estado complejo, efectos secundarios, subscripciones, lógica de formularios, etc.

3. **TypeScript Estricto**: 
   - Utiliza siempre componentes funcionales con TypeScript.
   - Evita `any` completamente (usa `unknown` si es necesario y luego type guard).
   - Define interfaces para todas las props de componentes.
   - Usa tipos genéricos cuando sea apropiado.

4. **Tailwind CSS Exclusivo**:
   - Utiliza SOLO clases de Tailwind CSS para estilos.
   - **Prohibido**: estilos en línea con `style={{}}`, CSS Modules, styled-components.
   - **Excepción única**: valores dinámicos calculados en runtime que no pueden ser clases de Tailwind (ej: `style={{ transform: `translateX(${x}px)` }}` para animaciones GSAP). En este caso, documenta el motivo en un comentario.

5. **Accesibilidad**: 
   - Asegúrate de que todos los componentes sean accesibles.
   - Agrega `aria-*` y `role` cuando sea necesario.
   - Usa elementos semánticos de HTML5.

6. **Testing Obligatorio**:
   - Escribe tests unitarios para TODOS los componentes (presentacionales y contenedores).
   - Escribe tests para todos los custom hooks.
   - Escribe tests para todas las funciones utilitarias.
   - Mínimo: test de renderizado básico, test de props, test de eventos de usuario.

7. **Animaciones con GSAP**:
   - Para animaciones complejas o de alto rendimiento, utiliza GSAP.
   - Encapsula animaciones en custom hooks cuando sea posible.
   - Limpia (cleanup) animaciones en useEffect para evitar memory leaks.

8. **Documentación Automática**:
   - **IMPORTANTE**: Después de cada cambio significativo (nuevo componente, nueva feature, cambio de arquitectura), actualiza el archivo `README.md`.
   - Documenta en el README: qué cambió, por qué cambió, cómo usar la nueva funcionalidad de manera concisa para evitar que sea muy largo de leer.

## Bibliotecas preferidas
- **Animaciones**: `GSAP` para animaciones complejas, `Framer Motion` como alternativa
- **Testing**: `Vitest` + `@testing-library/react` + `@testing-library/user-event`
- **Routing**: `React Router` v6+ para aplicaciones multi-página

## Testing

### Directrices de Testing

1. **Cobertura Obligatoria**: Escribe tests para todos los componentes, hooks y utilidades.

2. **Estructura de Tests**: Usa `describe` e `it` con nombres descriptivos.

3. **Qué Testear**:
   - **Componentes Presentacionales**: props rendering, clases CSS, eventos, accesibilidad
   - **Componentes Contenedores**: flujos de datos, estados, efectos, integración con hooks
   - **Custom Hooks**: valores iniciales, cambios de estado, efectos, cleanup, errores

4. **Testing Library Queries** (orden de preferencia):
   - `getByRole` → `getByLabelText` → `getByPlaceholderText` → `getByText` → `getByTestId`

## Configuración de Testing

### Instalar dependencias:
```bash
npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event @vitest/ui
```

### Scripts en package.json:
```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage"
  }
}
```

## Configuración de ESLint

### Instalar plugins:
```bash
npm install -D eslint-plugin-testing-library @typescript-eslint/eslint-plugin
```

### Reglas clave:
- `@typescript-eslint/no-explicit-any`: Prohíbe `any`
- `react-hooks/rules-of-hooks`: Asegura reglas de hooks
- `@typescript-eslint/naming-convention`: Enforcea nombres (hooks con "use")
- `testing-library/prefer-screen-queries`: Prefiere queries de `screen`

## Documentación y README

### Regla de Actualización Automática

**IMPORTANTE**: Después de implementar cualquiera de los siguientes cambios, DEBES actualizar el `README.md`:

1. **Nuevo componente creado**: Documenta su propósito y cómo usarlo
2. **Nueva feature implementada**: Explica qué hace y cómo se usa
3. **Cambio en la arquitectura**: Describe qué cambió y por qué
4. **Nueva dependencia instalada**: Añade a la lista de tecnologías
5. **Nuevo comando o script**: Documenta en la sección de comandos
6. **Cambio en la estructura de carpetas**: Actualiza el diagrama de estructura

### Plantilla de Actualización:
```markdown
## [Fecha] - [Tipo de Cambio]
### Cambios Realizados
- Descripción breve
### Uso
- Cómo usar la funcionalidad de manera concisa

```
