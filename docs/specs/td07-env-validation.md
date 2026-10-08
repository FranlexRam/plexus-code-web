# Especificación EARS para TD‑07: Validación de variables de entorno con Zod

## Contexto
- Ubicación: `src/lib/env.ts` (nuevo), `.env.example` (nuevo), `src/app/api/contact/route.ts` (actualizar).
- Problema: `process.env.RESEND_API_KEY` y `process.env.CONTACT_EMAIL` se leen directamente sin validación tipada. Si faltan, el servidor falla silenciosamente (ej. `new Resend(undefined)`). Además no existe un `.env.example` que guíe la configuración.
- Impacto: Build falla si `RESEND_API_KEY` no está definida; errores en producción si la variable está malformada.

## Requisitos (EARS)

1. **Ubicuo.**  
   `El sistema deberá validar las variables de entorno con un esquema Zod tipado antes de usarlas.`

2. **Dirigido por evento.**  
   `Cuando se importe el módulo `src/lib/env.ts`, el sistema deberá cargar y validar `RESEND_API_KEY` y `CONTACT_EMAIL` (opcional).`

3. **Comportamiento no deseado.**  
   `Si `RESEND_API_KEY` está ausente o no es una cadena no vacía, entonces el servidor deberá fallar de forma explícita y temprana (al arrancar) con un mensaje claro.`

4. **Característica opcional.**  
   `Donde `CONTACT_EMAIL` no esté definida, el sistema deberá usar un valor por defecto (`"contact@plexuscode.com"`).`

5. **Dirigido por estado.**  
   `Mientras el entorno sea de desarrollo (`NODE_ENV !== "production"`), el sistema deberá aceptar una clave dummy para `RESEND_API_KEY` (pero aún debe estar presente).`

## Criterios de aceptación

- Crear `src/lib/env.ts` con:
  - Esquema Zod que valide `RESEND_API_KEY` (string, no vacía) y `CONTACT_EMAIL` (string opcional, con formato email o vacía).
  - Exportar objeto `env` con las variables ya validadas y tipadas.
  - Lanzar un error descriptivo (sin exponer el valor) si la validación falla.
- Crear `.env.example` con:
  - Comentarios explicando cada variable.
  - `RESEND_API_KEY=` (clave de Resend, obligatoria).
  - `CONTACT_EMAIL=` (opcional, fallback a `contact@plexuscode.com`).
  - Sin valores reales.
- Actualizar `src/app/api/contact/route.ts`:
  - Importar `env` desde `@/lib/env`.
  - Usar `env.RESEND_API_KEY` y `env.CONTACT_EMAIL`.
  - Eliminar la lectura directa de `process.env`.
- Ejecutar `tsc --noEmit` y `npm run lint` sin errores.
- El build debe pasar **sin necesidad de definir `RESEND_API_KEY` en el entorno de CI** (porque la validación fallará y el servidor no arrancará; esto es correcto). Sin embargo, para pruebas locales se puede usar un valor dummy.

## Archivos afectados
- `src/lib/env.ts` (nuevo)
- `.env.example` (nuevo)
- `src/app/api/contact/route.ts`
- `package.json` (opcional, agregar script `validate-env` si se desea)

## Plan de pruebas
1. Ejecutar `npm run build` sin definir `RESEND_API_KEY` → debe fallar con error claro.
2. Definir `RESEND_API_KEY=dummy` → build pasa.
3. Ejecutar `tsc --noEmit` y `npm run lint` para comprobar tipado y lint.
4. Ejecutar `npm run dev` (con `RESEND_API_KEY=dummy`) y verificar que el endpoint `/api/contact` no lance excepciones de variable no definida.

## Dependencias y riesgos
- Depende de `zod` (ya declarado en TD‑01).
- Riesgo bajo: el esquema puede ser demasiado permisivo (aceptar espacios). Se debe usar `.min(1)`.
- Riesgo de breaking change: cualquier importación de `env` en otros lugares futuros debe seguir el mismo patrón.