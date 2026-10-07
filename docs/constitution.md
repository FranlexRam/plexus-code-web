# Constitución Técnica de Plexus Code

> **Secure by design. Scalable by default.**
> Filosofía: **"Cero Fisuras, Conexión Total"**.

Este documento es la ley técnica del repositorio `plexus-code-web`. Prevalece sobre preferencias personales, atajos de plazo y sugerencias de herramientas automáticas. Una regla marcada como **MUST** no admite excepciones sin una enmienda formal (ver sección 9).

Palabras normativas: **MUST** (obligatorio), **MUST NOT** (prohibido), **SHOULD** (recomendado; la desviación se justifica por escrito).

---

## 1. Identidad y propósito

**Plexus Code** es un estudio de ingeniería de software y ciberseguridad defensiva. Esta web es un **showcase interactivo de alta ingeniería**: ultrarrápido, moderno y verificable. Debe demostrar con el propio sitio la excelencia técnica que ofrecemos.

Verticales que el sitio debe comunicar:

1. **Desarrollo web y plataformas SaaS** de alto rendimiento.
2. **Ciberseguridad defensiva / AppSec**: la seguridad se teje desde la primera línea, no se parchea al final.
3. **Automatizaciones B2B** y **Sistemas Multiagente (MAS)**.
4. **Core vertical**: proveedor de tecnología e integraciones **Meta** (agentes de IA para WhatsApp, Instagram y TikTok; reservas y CRM) y automatizaciones operativas SaaS (por ejemplo **OpsFlow AI**, y agentes conversacionales para Fintech como **AON Pay**).

**Principio rector.** El sitio no puede prometer lo que el propio código no cumple. Si afirmamos "seguridad por diseño", el repositorio debe resistir una auditoría.

---

## 2. Arquitectura y stack

| Área | Mandato |
|---|---|
| Framework | **Next.js (App Router)**. Prohibido `pages/`. |
| Lenguaje | **TypeScript estricto** (`strict: true`). |
| Estilos | **Tailwind CSS** (v4, tokens en `@theme` de `globals.css`). |
| Validación | **Zod**, declarado explícitamente en `dependencies`. |
| Email | **Resend**, solo desde Route Handlers del servidor. |
| Pruebas | **Vitest** (ver sección 4). |

Reglas:

- **MUST** leer la documentación local `node_modules/next/dist/docs/` antes de usar cualquier API de Next.js. Esta versión tiene cambios incompatibles respecto al conocimiento previo (ver el bloque `nextjs-agent-rules` en `AGENTS.md`).
- **MUST NOT** usar `any`, `@ts-ignore`, `@ts-expect-error` sin justificación en comentario, ni aserciones `as` para silenciar errores reales. Usar `unknown` más estrechamiento (narrowing) o esquemas Zod.
- **MUST** usar **Server Components por defecto**. `"use client"` solo en hojas interactivas, lo más abajo posible del árbol. Una página completa NO debe ser Client Component sin justificación.
- **MUST** importar con el alias `@/` (`src/*`).
- **MUST** respetar la separación de capas:
  - `src/app/**`: rutas, layouts y Route Handlers (orquestación fina).
  - `src/components/**`: UI. Sin lógica de negocio ni acceso a secretos.
  - `src/lib/**`: lógica pura, esquemas, utilidades y configuración tipada. Es la capa que se prueba con mayor rigor.
  - `src/context/**`: estado global mínimo.
- **MUST** declarar toda dependencia que se importe y eliminar la que no se use. No existen dependencias fantasma ni código muerto.
- **MUST NOT** añadir una dependencia nueva sin justificar su necesidad, tamaño y mantenimiento.
- El texto visible **MUST** vivir en `src/lib/translations.ts` (ver sección 5).

---

## 3. Principio "Secure by Design"

La seguridad es un requisito funcional, no una fase.

### 3.1 Entradas y formularios
- **MUST** tratar toda entrada como hostil: cuerpo de petición, query, headers, cookies y archivos.
- **MUST** validar en el **servidor** con Zod. La validación del cliente es solo UX y nunca sustituye a la del servidor.
- **MUST** mantener **un único esquema Zod** compartido entre cliente y servidor (`src/lib/validation.ts`). No se duplican reglas.
- **MUST** verificar tipos antes de operar sobre el valor (por ejemplo, no llamar `.trim()` sobre algo que no se ha comprobado como `string`). Un cuerpo malformado responde **400**, nunca 500.
- **MUST** limitar longitudes, formatos y tamaños de payload.
- El saneamiento por expresiones regulares **MUST NOT** ser la única defensa contra inyección. La defensa primaria es **validar y escapar según el contexto de salida**.
- **MUST** escapar HTML en toda interpolación dentro de plantillas de correo o de cualquier marcado generado en servidor.
- **MUST NOT** usar `dangerouslySetInnerHTML` ni `eval`/`new Function`.
- Los endpoints públicos **SHOULD** tener limitación de tasa y mecanismo anti-bot (honeypot o equivalente). Para el formulario de contacto, esto es **MUST** antes de salir a producción comercial.

### 3.2 Variables de entorno
- **MUST** validar las variables de entorno con un esquema Zod tipado en un módulo único de servidor (por ejemplo `src/lib/env.ts`). El acceso directo a `process.env.*` fuera de ese módulo está prohibido.
- **MUST** fallar de forma explícita y temprana si falta una variable obligatoria, sin exponer su valor.
- **MUST NOT** exponer secretos al cliente. Solo se usan variables `NEXT_PUBLIC_*` para datos públicos.
- **MUST** mantener un `.env.example` sin valores reales. Los archivos `.env*` reales permanecen fuera de git.
- **MUST NOT** registrar en logs secretos, datos personales ni cuerpos completos de peticiones.

### 3.3 Endpoints API (Route Handlers)
Todo handler **MUST** seguir esta secuencia defensiva:

1. Validar método y `Content-Type`.
2. Parsear el cuerpo con control de errores (JSON inválido → 400).
3. Validar con Zod (`safeParse`) → 400 con errores por campo, sin filtrar internals.
4. Ejecutar la operación externa (por ejemplo Resend) con manejo de error explícito.
5. Responder con un contrato estable `{ success, ... }`. Los errores internos devuelven mensajes **genéricos** al cliente y el detalle solo va al log del servidor.

Además:
- El remitente de Resend **MUST** pertenecer a un dominio verificado en producción. El remitente de pruebas `onboarding@resend.dev` solo es válido en desarrollo.
- Las cabeceras de seguridad (CSP, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, HSTS) **SHOULD** configurarse en `next.config.ts`.

### 3.4 Cadena de suministro
- **MUST** mantener `package-lock.json` versionado y usar `npm ci` en CI.
- **SHOULD** ejecutar `npm audit` en CI y revisar las dependencias nuevas.

---

## 4. Principio "Zero Regressions & TDD"

- **MUST** aplicar TDD en la lógica crítica: **rojo → verde → refactor**. La prueba se escribe antes que la implementación.
- **Lógica crítica** (cobertura obligatoria, sin excepciones):
  - Esquemas y validadores (`src/lib/validation.ts`) y saneamiento.
  - Validación de entorno (`src/lib/env.ts`).
  - Route Handlers (`src/app/api/**`): casos felices, validación fallida, JSON malformado, fallo de Resend, método no permitido.
  - Funciones puras de `src/lib/**`.
  - Paridad de claves de traducción entre `es`, `en` y `pt`.
- Los componentes con lógica de estado o formularios **SHOULD** probarse con Testing Library.
- Todo bug corregido **MUST** incluir una prueba de regresión que falle sin el arreglo.
- **Umbral de cobertura**: lógica crítica ≥ **90 %** de líneas y ramas; proyecto global ≥ **70 %**. El umbral se aplica en CI.
- **Puerta de calidad (Definition of Done).** Ningún cambio se aprueba si no pasan, con **cero errores y cero warnings**:

  ```bash
  npx tsc --noEmit
  npm run lint
  npm run test
  npm run build
  ```

- **MUST NOT** desactivar reglas de lint ni omitir pruebas (`.skip`, `.only`) para conseguir una puerta verde.

---

## 5. Estándar visual, UX e internacionalización

### 5.1 Identidad visual
- Interfaz **moderna orientada a ingeniería y ciberseguridad**: tema oscuro, acentos cian (`cyber-cyan`), superficies tipo cristal y detalles de terminal.
- **MUST** usar los tokens de diseño (`cyber-*`, `background`, `foreground`) y la utilidad `cn()`. No se admiten colores hexadecimales sueltos si existe un token equivalente.
- Los breakpoints personalizados definidos en `globals.css` son parte del contrato visual y **MUST** respetarse.
- Las microinteracciones **MUST** tener un propósito (feedback, jerarquía, orientación) y respetar `prefers-reduced-motion`.

### 5.2 Responsive móvil-primero
- Los estilos base se escriben para móvil y se amplían con breakpoints ascendentes.
- **MUST NOT** existir scroll horizontal en ningún ancho de viewport.
- Los targets táctiles **MUST** medir al menos **44×44 px**.
- **MUST** respetar las safe areas en dispositivos con notch.

### 5.3 Rendimiento (Core Web Vitals de primer nivel)
Objetivos medidos con Lighthouse/CrUX en producción:

| Métrica | Objetivo |
|---|---|
| LCP | ≤ 2,0 s |
| INP | ≤ 200 ms |
| CLS | ≤ 0,05 |
| Lighthouse (Performance, Accessibility, Best Practices, SEO) | ≥ 95 |

Reglas:
- **MUST** usar `next/image` para imágenes y `next/font` para tipografías. Los recursos pesados (por ejemplo `logo.png`, ~390 KB) se optimizan antes de publicarse.
- **MUST** minimizar JavaScript del cliente: Server Components por defecto, carga diferida de módulos pesados y de animaciones.
- **MUST** reservar espacio para elementos asíncronos y evitar saltos de layout.

### 5.4 Accesibilidad (WCAG 2.2 AA)
- HTML semántico, un solo `h1`, jerarquía de encabezados coherente.
- Contraste suficiente, foco visible y navegación completa por teclado.
- Los modales **MUST** atrapar y restaurar el foco, cerrar con `Escape` y exponer `role="dialog"` con `aria-modal` y `aria-labelledby`.
- Los errores de formulario **MUST** asociarse con `aria-describedby` y anunciarse a tecnologías de asistencia.

### 5.5 Internacionalización y copy
- Idiomas soportados: **español (es), inglés (en) y portugués (pt)**. El sitio es de alcance internacional.
- **MUST** pasar todo texto visible, `aria-label`, placeholders y mensajes de error por `translations.ts`. Cero strings hardcodeados en componentes.
- **MUST** garantizar la **paridad de claves** entre idiomas, verificada por tipo o por prueba automática.
- `<html lang>` **MUST** reflejar el idioma activo.
- El copy debe ser **profesional, preciso y verificable**: sin superlativos vacíos, sin métricas inventadas, sin versiones desactualizadas y sin enlaces genéricos o de administración. Un dato público (cifra, versión, cliente, enlace) solo se publica si es cierto y está confirmado.
- Los nombres de marca y producto (Plexus Code, OpsFlow AI, AON Pay, Meta, WhatsApp, Instagram, TikTok) se escriben **exactamente** como indican sus propietarios y no se traducen.

### 5.6 Contacto y conversión
- Existe **un único flujo de contacto** que realmente entrega el lead. **MUST NOT** existir formularios que simulen un envío exitoso sin enviarlo.
- Los estados de carga, éxito y error **MUST** ser explícitos, accesibles y traducidos.

---

## 6. Convenciones de código

- Archivos y componentes React: `PascalCase.tsx`. Utilidades y módulos de `lib`: `camelCase.ts`.
- Primera línea de cada archivo fuente: comentario con su ruta (convención actual del repo).
- Identificadores en inglés. Comentarios y documentación en español.
- Funciones pequeñas, con una sola responsabilidad y tipos de retorno explícitos en el API público.
- Sin `console.log` en código de producción. Los errores de servidor usan un logger mínimo y sin datos sensibles.
- Commits en formato Conventional Commits (`feat:`, `fix:`, `test:`, `docs:`, `refactor:`, `chore:`), un cambio lógico por commit.
- **MUST NOT** mezclar refactors no solicitados con una funcionalidad o corrección.

---

## 7. Proceso y gobernanza

- Todo trabajo sigue el flujo del sistema multiagente descrito en `AGENTS.md`: **Planner → Implementer → Reviewer**, con el **Coordinator** como garante de estado.
- Las funcionalidades se especifican en sintaxis **EARS** antes de implementarse.
- `MEMORY.md` es la fuente de verdad del estado del proyecto, el backlog y las decisiones. **MUST** actualizarse al cerrar cada tarea.
- Las decisiones de arquitectura relevantes se registran en `MEMORY.md` (sección de decisiones) con fecha y motivo.

---

## 8. Cumplimiento

- **MUST NOT** incluir en el repositorio secretos, credenciales, datos personales de clientes ni archivos `.env` reales.
- El contenido legal (Privacidad, Términos) **MUST** existir como páginas reales antes de enlazarse desde el pie de página.
- Los enlaces a redes y perfiles oficiales **MUST** ser URLs públicas, verificadas y de la cuenta oficial de Plexus Code. No se enlazan paneles de administración.

---

## 9. Enmiendas

Esta constitución solo se modifica mediante un cambio propio que incluya:
1. Motivo y alternativas consideradas.
2. Regla afectada y su impacto.
3. Registro en `MEMORY.md` (sección de decisiones).

Hasta que se apruebe una enmienda, esta versión es la vigente.

**Versión:** 1.0.0
