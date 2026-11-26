# Hallazgos de usabilidad

**Responsable:** Carlos Bejarano

Consolidación de los problemas encontrados con heurísticas ([heuristicas.md](heuristicas.md)),
recorrido cognitivo ([recorrido-cognitivo.md](recorrido-cognitivo.md)), revisión WCAG
([accesibilidad-wcag.md](accesibilidad-wcag.md)) y pruebas con usuarios
([resultados.md](resultados.md)).

**Severidad (Nielsen 0–4):** 0 no es problema · 1 cosmético · 2 menor · 3 mayor · 4 catastrófico.
**Prioridad** = severidad × frecuencia/impacto en las tareas T1–T3.

## 1. Hallazgos

| ID | Hallazgo | Fuente | Evidencia | Severidad | Recomendación | Estado |
|---|---|---|---|---|---|---|
| **H-01** | **Cancelar una reserva es inmediato e irreversible.** Un toque en "Cancelar" (junto a "Modificar") cancela la tutoría sin confirmar qué se cancela ni permitir deshacer. | Heurísticas H3/H5 (P-01), recorrido T3-3, WCAG 3.3.4 | [antes/10-cancelacion-sin-confirmar.png](../evidencias/antes/10-cancelacion-sin-confirmar.png) | **3** | Pedir confirmación en un diálogo accesible que muestre asignatura, docente, fecha, hora y código, explique la consecuencia y tenga la opción segura enfocada por defecto. | ✅ **Corregido en v2** |
| **H-02** | **Elegir fecha es ensayo y error.** El calendario acepta días en que el docente no atiende; el estudiante debe recordar los días de atención y probar varias fechas. | Heurísticas H5/H6 (P-02), recorrido T1-6, momento crítico MC1 | [antes/04-paso2-dia-sin-atencion.png](../evidencias/antes/04-paso2-dia-sin-atencion.png) | **3** | Reemplazar el calendario libre por la lista de fechas en que el docente atiende (próximos 30 días) con el número de horarios libres; las completas, visibles pero deshabilitadas. | ✅ **Corregido en v2** |
| H-03 | Rótulo "Cancelar" ambiguo en la tarjeta de reserva. | Heurísticas H2/H4 (P-03), recorrido T3-2 | [antes/09-mis-reservas.png](../evidencias/antes/09-mis-reservas.png) | 2 | Rótulo visible "Cancelar reserva". | ✅ Corregido en v2 (junto con H-01) |
| H-04 | "Mis reservas" mezcla próximas, pasadas y canceladas. | Heurísticas H6/H7 (P-04) | [antes/09-mis-reservas.png](../evidencias/antes/09-mis-reservas.png) | 2 | Separar en "Próximas" e "Historial" y destacar la siguiente tutoría. | Backlog |
| H-05 | Sin opción "Descartar" en una reserva nueva. | Heurística H3 (P-07) | [antes/05-paso2-horario.png](../evidencias/antes/05-paso2-horario.png) | 2 | Agregar "Descartar reserva" en todos los pasos con confirmación. | Backlog |
| H-06 | Anuncio verboso de horarios al cambiar la fecha. | WCAG 4.1.3 (P-05) | `reservarView.js`: la zona de horarios tiene `aria-live="polite"` y se reemplaza completa al cambiar la fecha | 1 | Anunciar solo "N horarios disponibles para el {fecha}" en la región global. | Backlog |
| H-07 | Borde de tarjetas de opción con contraste bajo. | WCAG 1.4.11 (P-06) | `styles.css` `--borde-suave: #d6d6dc` | 1 | Usar un borde ≥ 3:1 (#8a8a94) también en las tarjetas no seleccionadas. | Backlog |

### Hallazgos de las sesiones con usuarios P01 y P02

> Agregar aquí **solo** lo observado en las sesiones reales (ver `sesiones/P01.md` y `sesiones/P02.md`),
> con la frase textual o el minuto de grabación como evidencia. Si un participante confirma un hallazgo
> anterior (por ejemplo, duda al elegir fecha), se anota en la columna "Fuente" del hallazgo existente.

| ID | Hallazgo | Participante(s) | Evidencia | Severidad | Recomendación | Estado |
|---|---|---|---|---|---|---|
| H-08 | | | | | | |
| H-09 | | | | | | |

## 2. Priorización y decisión

| Hallazgo | Severidad | Tarea afectada | Esfuerzo | Decisión |
|---|---|---|---|---|
| H-01 | 3 | T3 (y cualquier cancelación) | Bajo | Corregir en v2 — evita pérdida de datos del usuario |
| H-02 | 3 | T1 y T2 (todas las reservas) | Medio | Corregir en v2 — es el punto más bajo de la curva emocional (MC1) |
| H-03 | 2 | T3 | Muy bajo | Corregir junto con H-01 |
| H-04 a H-07 | 1–2 | — | Bajo–medio | Backlog priorizado ([backlog.md](backlog.md)) |

## 3. Correcciones implementadas en v2

| Hallazgo | Cambio | Archivos |
|---|---|---|
| H-01 | Nuevo componente `DialogoConfirmacion` (`<dialog>` nativo con `showModal`, foco atrapado, Escape, retorno de foco). `accionCancelar` ahora pide confirmación con el resumen de la tutoría y la consecuencia. Opción segura "No, conservarla" enfocada. | `src/presentation/components/DialogoConfirmacion.js` (nuevo), `src/presentation/components/accionCancelar.js`, `src/presentation/styles.css` |
| H-02 | `ReservaService.fechasDisponibles()` calcula días con atención en los próximos 30 días y horarios libres. `SelectorFecha` muestra esas fechas como opciones ("mié 9 dic · 2 horarios libres"); las completas aparecen deshabilitadas como "Completo". | `src/application/reservaService.js`, `src/presentation/components/SelectorFecha.js`, `src/presentation/styles.css`, `tests/v2-correcciones.test.js` |
| H-03 | Rótulo visible "Cancelar reserva". | `src/presentation/components/TarjetaReserva.js` |

Comparación visual: [antes](../evidencias/antes/) / [después](../evidencias/despues/) y
validación en [reevaluacion-v2.md](reevaluacion-v2.md).
