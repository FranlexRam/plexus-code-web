# Especificación EARS para TD-03 y TD-04: saneamiento de ESLint

## TD-03: Error `react-hooks/set-state-in-effect`

**Ubicación:** `src/components/ContactModal.tsx:45`.

**Contexto**
El componente `ContactModal` maneja la aparición y desaparición con un estado `mounted` y `animating`. El efecto:

```ts
useEffect(() => {
  if (isOpen) {
    setMounted(true);                 // línea 45 – error
    const timer = setTimeout(() => setAnimating(true), 20);
    return () => clearTimeout(timer);
  } else {
    setAnimating(false);             // línea 49 – también un setState sincrónico
    const timer = setTimeout(() => {
      setMounted(false);
      setSubmitted(false);
      setErrors({});
    }, 300);
    return () => clearTimeout(timer);
  }
}, [isOpen]);
```

La regla `react-hooks/set-state-in-effect` prohíbe llamar a `setState` directamente dentro de un efecto porque puede causar renders en cascada. Sin embargo, este patrón es común para modales que necesitan un retardo de animación.

**Requisitos EARS**

1. **Ubicuo.**  
   `El componente ContactModal deberá preservar el ciclo de montaje/desmontaje y las animaciones actuales (entrada tras 20 ms, salida tras 300 ms).`

2. **Dirigido por evento.**  
   `Cuando `isOpen` cambie a `true`, el modal deberá montarse (`mounted = true`) y, tras un breve retardo, activar la animación (`animating = true`).`

3. **Comportamiento no deseado.**  
   `Si el linting marca un error `react-hooks/set-state-in-effect`, entonces el código deberá reorganizarse para eliminar ese error sin desactivar la regla.`

4. **Característica opcional.**  
   `Donde se requiera un retardo de animación, el sistema deberá usar `setTimeout` (como ya lo hace).`

**Criterios de aceptación**
- `npm run lint` debe pasar **sin errores** (0 errores, solo warnings de TD-04 antes de corregirlos).
- La funcionalidad visual debe permanecer idéntica: el modal aparece con animación, desaparece con transición, y el estado `submitted` y `errors` se limpia tras el cierre.
- No se debe usar `// eslint-disable-next-line` ni ninguna otra forma de silenciar la regla.
- La solución debe seguir las mejores prácticas de React (evitar efectos innecesarios, derivar estado donde sea posible).

**Posibles enfoques**
1. **Derivar `mounted` y `animating`** de `isOpen` con un retardo usando un custom hook `useDelayedState`.
2. **Mover `setMounted` y `setAnimating`** a manejadores de eventos (pero `isOpen` es un prop, no un evento).
3. **Usar `requestAnimationFrame`** o `setTimeout` con 0 ms para hacer los `setState` asíncronos (aún dentro del efecto, pero la regla podría seguir considerándolo síncrono).
4. **Separar en dos efectos** (uno para entrada, otro para salida) y llamar a `setState` dentro de `setTimeout` (ya lo está, pero el primero `setMounted` sigue siendo síncrono).

**Archivos afectados**
- `src/components/ContactModal.tsx`.

---

## TD-04: Warnings `@typescript-eslint/no-unused-vars`

**Ubicaciones:**
-## Warnings `@typescript-eslint/no-unused-vars`

**Ubicaciones:**
- `src/components/CtaBanner.tsx:8`: `const { t } = useLanguage();` (no se usa).
- `src/components/Footer.tsx:10`: `const { t } = useLanguage();` (no se usa).

**Contexto**
Ambos componentes importan `useLanguage` pero no utilizan la variable `t`. Esto sugiere que el texto visible no está internacionalizado (usa strings hardcodeados) o que `t` se eliminó en algún refactor.

**Requisitos EARS**

1. **Ubicuo.**  
   `Todo texto visible deberá provenir de `translations.ts` (i18n).`

2. **Dirigido por evento.**  
   `Cuando un componente importa `useLanguage`, deberá usar la variable `t` para obtener los textos traducidos.`

3. **Comportamiento no deseado.**  
   `Si `t` está declarada pero no se usa, entonces el linting marcará una advertencia.`

**Criterios de aceptación**
- `npm run lint` debe pasar **sin warnings** (0 warnings).
- Los componentes `CtaBanner` y `Footer` deben mostrar los mismos textos que antes, pero obteniéndolos de `translations.ts`.
- No se deben eliminar las importaciones de `useLanguage` sin reemplazar los textos por traducciones.

**Archivos afectados**
- `src/components/CtaBanner.tsx`
- `src/components/Footer.tsx`

---

## Plan de pruebas
1. Ejecutar `npm run lint` antes del cambio (1 error + 2 warnings).
2. Implementar las correcciones.
3. Ejecutar `npm run lint` después (0 errores, 0 warnings).
4. Ejecutar `npx tsc --noEmit` para asegurar que no se introdujeron errores de tipo.
5. Ejecutar `npm run dev` y probar visualmente el modal y los textos de los componentes.

## Dependencias y riesgos
- **TD-03:** riesgo de romper la animación del modal si la refactorización altera los tiempos o la secuencia de estados.
- **TD-04:** riesgo de introducir regresiones si los textos no se mapean correctamente a las claves de `translations.ts`.
- Ninguna dependencia externa nueva.