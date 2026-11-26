# Revisión de accesibilidad WCAG 2.2 (nivel AA)

**Responsable:** Carlos Bejarano

## 1. Método

1. **Revisión automática** con axe-core 4 (reglas `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `wcag22aa`)
   ejecutada con Microsoft Edge en 320 px y 1280 px sobre: inicio, paso 1 con errores, paso 2,
   paso 3 con errores, paso 4, confirmación, mis reservas y (v2) diálogo de cancelar.
2. **Revisión manual**: recorrido con teclado (Tab, Shift+Tab, flechas, Enter, Espacio, Escape),
   ancho de 320 px (equivale a un zoom de 400 % en una pantalla de 1280 px), cálculo de contraste de
   los colores de `styles.css` y lectura del código (etiquetas, roles, `aria-*`).

## 2. Resultado automático (axe-core)

| Pantalla | v1 320 px | v1 1280 px | v2 320 px | v2 1280 px |
|---|---|---|---|---|
| Inicio | 0 violaciones | 0 | 0 | 0 |
| Paso 1 con errores | 0 | 0 | 0 | 0 |
| Paso 2 | 0 | 0 | 0 | 0 |
| Paso 3 con errores | 0 | 0 | 0 | 0 |
| Paso 4 (resumen) | 0 | 0 | 0 | 0 |
| Confirmación | 0 | 0 | 0 | 0 |
| Mis reservas | 0 | 0 | 0 | 0 |
| Diálogo cancelar | — (no existe) | — | 0 | 0 |
| Desplazamiento horizontal | No | No | No | No |

> Una herramienta automática solo detecta una parte de los problemas; por eso se complementa con la
> revisión manual siguiente.

## 3. Revisión manual por criterio

| Criterio | Nivel | Resultado | Evidencia / comentario |
|---|---|---|---|
| 1.1.1 Contenido no textual | A | Cumple | Íconos decorativos con `aria-hidden`; el estado siempre tiene texto |
| 1.3.1 Información y relaciones | A | Cumple | `header`, `nav`, `main`, `footer`, `h1–h3`, `fieldset/legend`, `label for`, `dl` en resúmenes |
| 1.3.5 Identificar el propósito de la entrada | AA | Cumple | `autocomplete="name"` y `autocomplete="email"` |
| 1.4.1 Uso del color | A | Cumple | Errores con ícono "✕" y texto; ocupados con texto "Ocupado" y borde punteado |
| 1.4.3 Contraste mínimo | AA | Cumple | Texto principal #1d1d1f/blanco ≈ 17:1; menú blanco/#7a1f2b ≈ 10:1; textos de ayuda #4a4a52 ≈ 8,8:1 |
| 1.4.10 Reflujo | AA | Cumple | Sin desplazamiento horizontal a 320 px |
| 1.4.11 Contraste de componentes | AA | Cumple con observación | Bordes de campos y círculos de radio #8a8a94 ≈ 3,4:1. El borde de las tarjetas de opción (#d6d6dc ≈ 1,4:1) es bajo, aunque el círculo del radio identifica el control → **P-06** |
| 1.4.12 Espaciado de texto | AA | Cumple | Sin alturas fijas en textos |
| 2.1.1 Teclado | A | Cumple | Todo el flujo se completa solo con teclado |
| 2.1.2 Sin trampas de teclado | A | Cumple | — |
| 2.4.1 Evitar bloques | A | Cumple | Enlace "Saltar al contenido" es el primer elemento enfocable |
| 2.4.2 Título de página | A | Cumple | El título cambia por pantalla y por paso ("Fecha y hora · Reservar una tutoría · Tutoría UX") |
| 2.4.3 Orden del foco | A | Cumple | Al cambiar de pantalla el foco va al `h1`; al cambiar de paso al `h2`; con errores al resumen |
| 2.4.6 Encabezados y etiquetas | AA | Cumple | Etiquetas visibles y descriptivas |
| 2.4.7 Foco visible | AA | Cumple | Contorno de 3 px #1a5fb4 con separación de 2 px |
| 2.4.11 Foco no oculto | AA | Cumple | El foco nunca queda bajo elementos fijos (no hay cabecera fija) |
| 2.5.8 Tamaño del objetivo | AA | Cumple | Botones, opciones y enlaces del menú ≥ 44 × 44 px |
| 3.1.1 Idioma de la página | A | Cumple | `lang="es"` |
| 3.2.2 Al recibir entradas | A | Cumple | Elegir asignatura filtra la lista, pero no cambia de pantalla |
| 3.3.1 Identificación de errores | A | Cumple | Mensaje junto al campo + `aria-invalid` + resumen con `role="alert"` |
| 3.3.2 Etiquetas o instrucciones | A | Cumple | Ayudas bajo los campos (formato del correo, longitud del motivo) |
| 3.3.3 Sugerencias ante errores | AA | Cumple | Los mensajes indican cómo corregir |
| 3.3.4 Prevención de errores (legales, financieros, datos) | AA | Cumple parcialmente | Hay resumen antes de confirmar, pero **cancelar** (acción que borra datos del usuario) no se confirma ni se puede revertir → **P-01** |
| 3.3.7 Entrada redundante | A | Cumple | El borrador evita volver a escribir datos |
| 4.1.2 Nombre, función, valor | A | Cumple | Controles nativos; pasos con `aria-current="step"` |
| 4.1.3 Mensajes de estado | AA | Cumple con observación | Resultados con `role="status"`/`"alert"` y región `aria-live`. La zona de horarios usa `aria-live="polite"` y al cambiar la fecha un lector de pantalla lee todos los horarios de nuevo → **P-05** |

## 4. Problemas de accesibilidad

| Código | Criterio | Descripción | Severidad |
|---|---|---|---|
| P-05 | 4.1.3 | Al cambiar la fecha se anuncia la lista completa de horarios (verboso con lector de pantalla) | 1 |
| P-06 | 1.4.11 | Borde de las tarjetas de opción con contraste bajo (1,4:1) | 1 |
| P-01 | 3.3.4 | Cancelación sin confirmación ni posibilidad de revertir | 3 |

## 5. Verificación en v2

- axe-core: 0 violaciones en todas las pantallas, incluido el nuevo diálogo.
- Diálogo de cancelar (manual y automatizado): el foco entra al diálogo en "No, conservarla",
  Tab no sale del diálogo, **Escape** lo cierra sin cancelar y el foco vuelve al botón que lo abrió;
  `aria-labelledby` y `aria-describedby` anuncian título y consecuencia.
- Fechas disponibles: ahora son un `fieldset` con radios; las fechas completas están deshabilitadas
  y rotuladas "Completo".
