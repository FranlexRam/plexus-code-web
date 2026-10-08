# Especificación EARS para TD-06: Endurecer API (API hardening)

## Contexto
- El endpoint `/api/contact` actualmente sanitiza inputs con `sanitizeInput`, valida con Zod y envía correo mediante Resend.
- Faltan mecanismos de seguridad defensiva adicionales: rate limiting, honeypot anti‑spam y escape HTML completo (XSS).
- El riesgo: spam de bots, ataques de inyección XSS (aunque sanitizamos, podrían quedar vectores), y DoS por envío masivo de formularios.

## Requisitos (EARS)

### Ubicuo
`El endpoint /api/contact deberá rechazar peticiones que contengan payloads de XSS, spam o que superen el límite de envíos por IP.`

### Dirigido por evento
1. `Cuando una petición POST contenga un campo Honeypot (`honeypot`) no vacío, entonces el endpoint deberá responder 200 con un mensaje de éxito simulado, sin invocar a Resend y sin almacenar los datos.`
2. `Cuando una petición POST contenga scripts HTML/JavaScript en cualquier campo de texto, entonces el endpoint deberá sanitizar el contenido eliminando las etiquetas peligrosas y conservando el resto.`
3. `Cuando una IP envíe más de 5 peticiones en 60 segundos, entonces el endpoint deberá responder 429 (Too Many Requests) sin procesar la petición.`
4. `Cuando el cuerpo de la petición no sea un JSON válido, entonces el endpoint deberá responder 400 sin ejecutar sanitización.`

### Dirigido por estado
`Mientras la IP del cliente esté bloqueada por rate limit, el endpoint deberá rechazar todas sus peticiones POST a /api/contact hasta que expire la ventana temporal.`

### Comportamiento no deseado
`Si el campo Honeypot está vacío y los datos pasan la validación Zod, entonces el endpoint deberá proceder con el envío del correo y responder 200.`

### Característica opcional
`Donde se implemente rate limiting, el sistema deberá incluir los headers estándar `RateLimit‑*` (Limit, Remaining, Reset) en las respuestas.`

## Criterios de aceptación

### 1. Sanitización de inputs
- Extender `sanitizeInput` en `src/lib/validation.ts` para:
  - Eliminar todas las etiquetas HTML (`<`, `>`) y reemplazarlas por entidades seguras (`&lt;`, `&gt;`).
  - Eliminar atributos `on*`, `javascript:` y `data:` maliciosos.
  - Conservar espacios, saltos de línea y caracteres internacionales.
- La sanitización debe aplicarse **antes** de la validación Zod, para que Zod valide el texto ya limpio.
- Los campos `email` y `phone` no deben ser sanitizados con escape HTML (solo trim y lowercase). La sanitización se aplica solo a campos de texto libre (`name`, `company`, `message`, `topic`, `country`).

### 2. Honeypot anti‑spam
- Añadir un campo oculto `honeypot` en los formularios `ContactTerminal` y `ContactModal`.
- El campo debe tener `aria‑hidden="true"`, `tabindex="-1"`, `autocomplete="off"` y un nombre genérico (ej. `website`).
- El backend debe detectar si `honeypot` tiene valor (no vacío). Si tiene valor, responder `200 OK` con un JSON de éxito simulado (`{ success: true }`), sin llamar a Resend, sin guardar datos, sin registrar error.
- Los bots que rellenan automáticamente campos ocultos serán bloqueados silenciosamente.

### 3. Rate limiting básico
- Implementar un rate limit en memoria (Map) por dirección IP (`req.ip` o `x‑forwarded‑for`).
- Límite: **5 peticiones por 60 segundos** por IP.
- Al superar el límite, responder con status `429` y header `Retry‑After: 60`.
- Incluir headers opcionales `RateLimit‑Limit`, `RateLimit‑Remaining`, `RateLimit‑Reset`.
- El rate limit debe aplicarse **después** de la validación de honeypot (para no consumir cuota de bots).
- En entorno de desarrollo (`NODE_ENV !== 'production'`) el rate limit puede estar deshabilitado o con límites más altos (10/min).

### 4. Manejo de errores sin filtración
- Los errores de Zod, de Resend o de rate limit deben registrarse en el servidor (console.error) pero **no** enviarse al cliente.
- El cliente recibe mensajes genéricos: `400` para validación, `429` para rate limit, `500` para errores internos.
- Los mensajes de error en JSON deben ser constantes (ej. `{ error: "Validation failed" }`), sin detalles de los campos.

## Archivos afectados
. `src/app/api/contact/route.ts` – implementar rate limiting, honeypot y sanitización mejorada.
. `src/lib/validation.ts` – extender `sanitizeInput` y posiblemente añadir función `escapeHtml`.
. `src/components/ContactTerminal.tsx` – añadir campo honeypot oculto.
. `src/components/ContactModal.tsx` – añadir campo honeypot oculto.
. `src/lib/translations.ts` – añadir etiqueta para honeypot (opcional, puede quedar vacía).

## Plan de pruebas (TDD)
1. **Test de sanitización**: enviar `<script>alert('xss')</script>` en `message`, verificar que el texto recibido por Resend no contenga `<script>`.
2. **Test de honeypot**: enviar `honeypot: "spam"`, verificar que la respuesta es 200 pero Resend no fue llamado (mock).
3. **Test de rate limit**: simular 6 peticiones consecutivas desde la misma IP (mock), verificar que la 6ª recibe 429.
4. **Test de headers**: verificar que las respuestas incluyen `RateLimit‑Remaining`.
5. **Test de error genérico**: mockear error de Resend, verificar que la respuesta es 500 sin detalles internos.

## Dependencias y riesgos
- Rate limit en memoria no escala en múltiples instancias de servidor. Es suficiente para un showcase.
- IP puede ser spoofeada mediante `x‑forwarded‑for`. Para demo, usar `req.ip` de Next.js.
- Honeypot puede ser detectado por bots avanzados; es una capa básica.
. Las dependencias de tiempo real (`Date.now`) deben ser mockeadas en tests.