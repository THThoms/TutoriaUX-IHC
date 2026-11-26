# Evaluación heurística (Nielsen) — v1

**Responsable:** Carlos Bejarano
**Versión evaluada:** v1 (implementación de Tomás Solis) · Microsoft Edge, 1280 px y 375 px
**Escala de severidad (Nielsen):** 0 = no es problema · 1 = cosmético · 2 = menor · 3 = mayor · 4 = catastrófico

Se recorrieron las tareas T1 (reservar), T2 (modificar) y T3 (cancelar) y todas las pantallas del
[sitemap](../docs/sitemap.md). Cada problema tiene un código que se usa en
[`hallazgos.md`](hallazgos.md).

## Resumen por heurística

| # | Heurística | Valoración | Evidencia positiva | Problemas |
|---|---|---|---|---|
| H1 | Visibilidad del estado del sistema | Cumple | Indicador "Paso N de 4", insignias de estado, horarios "Ocupado", mensaje y código al confirmar, anuncios `aria-live` | — |
| H2 | Coincidencia entre el sistema y el mundo real | Cumple parcialmente | Lenguaje del estudiante ("Mis reservas", "Tus datos"), fechas en formato largo en español | P-03: botón "Cancelar" ambiguo en la tarjeta |
| H3 | Control y libertad del usuario | Cumple parcialmente | "Volver al paso anterior", "Cambiar" en el resumen, "Salir sin guardar cambios" al modificar | P-01: cancelar no se puede deshacer ni se confirma; P-07: sin salida explícita en una reserva nueva |
| H4 | Consistencia y estándares | Cumple | Mismos componentes en todos los pasos; botón principal siempre a la izquierda/arriba; radios nativos | P-03 (relacionado) |
| H5 | Prevención de errores | Cumple parcialmente | Calendario limitado a 30 días, horarios ocupados deshabilitados, modalidades filtradas por docente | P-01: cancelación accidental; P-02: el calendario permite elegir días sin atención |
| H6 | Reconocer antes que recordar | Cumple parcialmente | Tarjetas de docente con días y modalidades; resumen antes de confirmar | P-02: el estudiante debe recordar los días de atención al usar el calendario |
| H7 | Flexibilidad y eficiencia de uso | Cumple | Búsqueda de docente, borrador que permite continuar después, filtro por estado | P-04: "Mis reservas" no separa próximas de pasadas |
| H8 | Diseño estético y minimalista | Cumple | Un objetivo por pantalla, poco texto, jerarquía clara | — |
| H9 | Ayudar a reconocer, diagnosticar y recuperarse de errores | Cumple | Resumen de errores con enlaces, mensaje junto al campo con ejemplo ("nombre1234@uta.edu.ec"), datos conservados | — |
| H10 | Ayuda y documentación | Cumple parcialmente | Ayudas contextuales bajo cada campo, sección "¿Cómo funciona?" | P-05 (WCAG) anuncios de horarios extensos |

## Problemas encontrados

| Código | Heurística | Pantalla | Descripción | Severidad | Evidencia |
|---|---|---|---|---|---|
| P-01 | H3, H5 | Mis reservas, Detalle | Al pulsar "Cancelar" la reserva se cancela de inmediato, sin pedir confirmación y sin forma de deshacer. Un toque accidental en el móvil (el botón está junto a "Modificar") elimina la tutoría. | **3** | [`evidencias/antes/10-cancelacion-sin-confirmar.png`](../evidencias/antes/10-cancelacion-sin-confirmar.png) |
| P-02 | H5, H6 | Paso 2 | El campo de fecha permite elegir cualquier día; si el docente no atiende ese día, el estudiante recién lo descubre después y debe probar otra fecha. Depende de recordar "lunes y miércoles" leyendo la ayuda. | **3** | [`evidencias/antes/04-paso2-dia-sin-atencion.png`](../evidencias/antes/04-paso2-dia-sin-atencion.png) |
| P-03 | H2, H4 | Mis reservas | El botón visible dice solo "Cancelar" (el texto completo "Cancelar reserva TUT-…" está oculto para lectores de pantalla). Visualmente puede leerse como "cancelar esta acción". | 2 | [`evidencias/antes/09-mis-reservas.png`](../evidencias/antes/09-mis-reservas.png) |
| P-04 | H7, H6 | Mis reservas | El listado mezcla tutorías próximas, pasadas y canceladas en un solo orden por fecha; con varias reservas cuesta encontrar la siguiente. | 2 | [`evidencias/antes/09-mis-reservas.png`](../evidencias/antes/09-mis-reservas.png) |
| P-07 | H3 | Pasos 1–4 (reserva nueva) | En una reserva nueva no hay un botón "Descartar"; el estudiante solo puede salir por el menú y el borrador queda guardado. Al modificar sí existe "Salir sin guardar cambios". | 2 | [`evidencias/antes/05-paso2-horario.png`](../evidencias/antes/05-paso2-horario.png) |

Los problemas P-05 y P-06 provienen de la revisión de accesibilidad
([`accesibilidad-wcag.md`](accesibilidad-wcag.md)).
