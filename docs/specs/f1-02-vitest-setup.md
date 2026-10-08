# Especificación EARS para F1-02: Instalación de Vitest y entorno de pruebas

## Contexto
- Necesidad: poder aplicar TDD en las tareas pendientes (TD‑05, TD‑06, etc.) y cumplir con la Constitución (cobertura obligatoria: lógica crítica ≥ 90%, global ≥ 70%).
- Estado actual: no hay runner de pruebas, ni config, ni dependencias de testing.
- Stack: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS.

## Requisitos (EARS)

1. **Ubicuo.**  
   `El sistema deberá disponer de un entorno de pruebas unitarias y de integración basado en Vitest.`

2. **Dirigido por evento.**  
   `Cuando se ejecute `npm run test`, el sistema deberá lanzar Vitest en modo `run` y ejecutar todas las pruebas encontradas en `src/`.`

3. **Característica opcional.**  
   `Donde se incluyan coberturas, el sistema deberá respetar los umbrales: lógica crítica ≥ 90 % líneas/ramas, global ≥ 70 %.`

4. **Comportamiento no deseado.**  
   `Si la configuración de Vitest no puede resolver módulos de Next.js o React, entonces el comando `npm run test` fallará con error.`

## Criterios de aceptación

- Instalar dependencias de desarrollo (todas como `devDependencies`):
  - `vitest`
  - `@vitest/coverage-v8` (para cobertura)
  - `@testing-library/react`
  - `@testing-library/dom`
  - `@testing-library/user-event`
  - `jsdom`
  - `@vitejs/plugin-react`
  - `@vitest/ui` (opcional, para interfaz)
- Crear `vitest.config.ts` en la raíz del proyecto, configurado para:
  - Entorno `jsdom`.
  - Soporte para TypeScript y JSX.
  - Excluir `node_modules`, `.next`, `public`.
  - Alias `@/` → `src/` (coherente con `tsconfig.json`).
  - Plugins necesarios para React.
- Añadir scripts en `package.json`:
  - `"test": "vitest run"`
  - `"test:watch": "vitest"`
  - `"test:coverage": "vitest run --coverage"`
- Configurar cobertura en `vitest.config.ts`:
  - Incluir `src/**/*.{ts,tsx}`.
  - Excluir archivos de types, índices, configuraciones.
  - Umbrales: `lines: 70`, `branches: 70`, `functions: 70`, `statements: 70` (global).
  - Umbrales para lógica crítica se definirán luego mediante anotaciones o carpetas.
- Ejecutar `npm run test` debe completarse sin errores (puede reportar `No test files found`).
- Ejecutar `npm run test:coverage` debe generar un reporte (vacío) sin fallos.

## Archivos afectados
- `package.json`
- `package-lock.json`
- `vitest.config.ts` (nuevo)
- `tsconfig.json` (opcional, para incluir `vitest/globals` si se desea)

## Plan de pruebas
1. Ejecutar `npm run test` antes de los cambios → falla porque el script no existe.
2. Instalar y configurar.
3. Ejecutar `npm run test` → éxito, sin errores de módulos.
4. Ejecutar `npm run test:coverage` → éxito, reporte vacío.
5. Ejecutar `npx tsc --noEmit` y `npm run lint` para confirmar que no se introdujeron errores de tipo o lint.

## Dependencias y riesgos
- Depende de `vite` (Vitest lo incluye), `@vitejs/plugin-react`.
- Riesgo: conflictos con la versión de React (19) y las tipificaciones; usar las más recientes compatibles.
- Riesgo bajo: la configuración de alias debe coincidir con la de Next.js.