# Especificación EARS para TD-05: ContactTerminal real (sin simulación)

## Contexto
- `ContactTerminal` actualmente simula éxito (`setSubmitted(true)`) sin enviar datos.
- Duplica el flujo de contacto de `ContactModal`, pero usa un esquema de datos diferente (`formData` con `service` fijo) y carece de validación Zod.
- Requisito: unificar flujo de contacto real, usar esquema Zod (`contactSchema`) y conectar con `/api/contact`.

## Requisitos (EARS)

### Ubicuo
`El componente ContactTerminal deberá enviar los datos del formulario al endpoint /api/contact.`

### Dirigido por evento
1. `Cuando el usuario envía el formulario con datos válidos, ContactTerminal deberá realizar una petición POST a /api/contact con el cuerpo { name, email, message }.`
2. `Cuando la petición POST tenga éxito (200), ContactTerminal deberá mostrar la pantalla de éxito ya existente (con el texto de translations.ts).`
3. `Cuando la petición POST falle (error de red, 4xx, 5xx), ContactTerminal deberá mostrar un mensaje de error transitorio (dentro de la UI, sin lanzar excepciones).`

### Dirigido por estado
`Mientras la petición esté en curso, ContactTerminal deberá deshabilitar el botón de envío y mostrar un indicador de carga (spinner o texto “Sending…”).`

### Comportamiento no deseado
1. `Si el formulario contiene datos que no pasan la validación Zod (ej. email inválido, nombre vacío), entonces ContactTerminal no deberá realizar la petición y deberá mostrar errores de validación junto a cada campo.`
2. `Si el usuario intenta reenviar el formulario mientras ya hay una petición en curso, entonces ContactTerminal deberá ignorar el segundo envío.`

### Característica opcional
`Donde se mantenga el campo “service” (fijo “Custom Software & SaaS”), el sistema deberá incluirlo en el cuerpo de la petición POST para mantener compatibilidad de datos.`

## Criterios de aceptación
- Validación Zod: usar `contactSchema` de `@/lib/validation` (el mismo que usa `ContactModal`).
- Campo `service` debe mantenerse como valor fijo (o eliminarse del esquema si no es necesario). Decisión: conservar como campo oculto o eliminarlo del state; el backend (`/api/contact`) no espera `service`; se puede omitir.
- Estados UI:
  1. `idle` – formulario editable, botón “Send Message”.
  2. `submitting` – formulario deshabilitado, botón con spinner y “Sending…”.
  3. `success` – pantalla de éxito (igual que ahora, con `t.contact.successTitle` y `t.contact.successMsg`).
  4. `error` – mensaje de error rojo/ambar debajo del botón, sin resetear el formulario.
- El esquema de datos POST debe coincidir con lo que espera `/api/contact`: `{ name, email, message }`. `service` no es requerido por el backend; se puede omitir para simplificar.
- Si el backend devuelve un error 400 (validación fallida), se muestra el mensaje de error del servidor; si es 500, un mensaje genérico.
- Accesibilidad: anunciar cambios de estado a lectores de pantalla (`aria-live`), mantener foco en lugar apropiado tras éxito/error.
- i18n: los textos de error y carga deben venir de `translations.ts` (crear nuevas claves bajo `contact` si es necesario).
- La transición entre estados debe preservar la identidad visual cyber (colores, bordes, sombras).

## Archivos afectados
- `src/components/ContactTerminal.tsx` – component principal.
- `src/lib/validation.ts` – ya tiene `contactSchema`; no requiere cambios.
- `src/lib/translations.ts` – añadir claves opcionales para `sending`, `errorGeneric`, `errorValidation`.
- `src/lib/api.ts` (opcional) – podría crearse un cliente HTTP ligero; por ahora basta `fetch`.

## Plan de pruebas (TDD)
1. **Test unitario** – validación Zod en el componente:
   - Dados datos válidos, `contactSchema.parse` pasa.
   - Dado email inválido, `contactSchema.parse` lanza ZodError.
   - Dado nombre vacío, `contactSchema.parse` lanza ZodError.
2. **Test de integración** – mock de `fetch`:
   - Mock de éxito 200 → el componente pasa a estado `success`.
   - Mock de error 400 → el componente muestra mensaje de error.
   - Mock de error de red → el componente muestra mensaje genérico.
   - Durante la petición, el botón está `disabled`.
3. **Test de accesibilidad** – verificar que `aria-live` y `aria-busy` se ajustan.
4. **Test de i18n** – los mensajes se obtienen de `translations.ts` para el idioma activo.

## Dependencias y riesgos
- Depende de la API `/api/contact` funcionando correctamente.
- Riesgo bajo: duplicidad de lógica con `ContactModal`. Se podría extraer hook `useContactForm`, pero eso es fuera de alcance (deuda).
- Riesgo medio: manejo de errores debe evitar filtración de información interna (TD-06 lo cubrirá).