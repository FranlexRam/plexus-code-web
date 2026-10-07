# Especificación EARS para TD-02: error TS2339 en `ContactModal.tsx:132`

## Contexto
- Ubicación: `src/components/ContactModal.tsx`, línea 132.
- Error exacto: `Property 'errors' does not exist on type 'ZodError<...>'.`
- Causa: Zod 4 define `ZodError` con la propiedad `issues`, no `errors`. El código intenta leer `result.error?.errors` como fallback, pero esa propiedad no existe en el tipo `ZodError`.
- Impacto: Bloquea `tsc --noEmit` y `npm run build`. El fallback nunca se ejecutará, pero produce un error de tipo.

## Requisitos (EARS)

1. **Ubicuo.**  
   `El tipo ZodError de zod@4.4.3 deberá exponer únicamente la propiedad .issues para acceder a los errores de validación.`

2. **Dirigido por evento.**  
   `Cuando la validación del formulario falle (result.success === false), el componente ContactModal deberá extraer la lista de errores desde result.error.issues.`

3. **Comportamiento no deseado.**  
   `Si el código intenta acceder a result.error?.errors, entonces el chequeo de tipos de TypeScript deberá fallar (porque esa propiedad no existe).`

4. **Característica opcional.**  
   `Donde zod está en versión 4.4.3, el sistema deberá usar .issues, no .errors.`

## Criterios de aceptación

- `npx tsc --noEmit` debe pasar **sin errores** en esa línea específica.
- El linting (`npm run lint`) debe mantener el mismo número total de errores y warnings (TD-03 y TD-04 no cambian).
- La funcionalidad de validación del formulario debe seguir funcionando (los errores se asignan a `setErrors`).
- No debe haber ningún cast `as any`, `@ts-ignore` ni aserciones inseguras para silenciar el error.
- El código debe reflejar la realidad de Zod 4: `.issues` es el array de errores; `.errors` no existe y se debe eliminar del fallback.

## Archivos afectados
- `src/components/ContactModal.tsx`: línea 132 y posiblemente líneas cercanas si se necesita refactorizar la lógica de extracción.

## Plan de pruebas
Dado que F1-02 (Vitest) aún no está instalado, las pruebas se harán manualmente:
1. Ejecutar `npx tsc --noEmit` antes del cambio (línea 132 en rojo).
2. Corregir el código.
3. Ejecutar `npx tsc --noEmit` después del cambio (línea 132 verde).
4. Ejecutar `npm run lint` para confirmar que no se introdujeron nuevos problemas.
5. Ejecutar `npm run dev` (opcional) y probar manualmente el flujo de validación en el navegador (abrir modal, enviar formulario con datos inválidos, ver que los errores aparecen).

## Dependencias y riesgos
- Ninguna dependencia externa nueva.
- Riesgo: `result.error` puede ser `undefined` según el tipo, pero `safeParse` garantiza que `!result.success` implica `result.error` definido. Se puede añadir un `if (result.error)` para ser más explícito.
- Riesgo bajo: la lógica de mapeo de `err.path[0]` asume que `path` es un array no vacío; en Zod eso es cierto para errores de campo, pero conviene manejar el caso donde `err.path` esté vacío.