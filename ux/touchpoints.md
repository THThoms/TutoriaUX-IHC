# Touchpoints, momentos críticos y oportunidades de mejora

**Responsable:** Karen Molina

## 1. Cinco touchpoints del proceso de reserva

| # | Touchpoint | Canal | Qué hace el estudiante | Qué necesita sentir | Riesgo si falla |
|---|---|---|---|---|---|
| TP1 | **Enterarse de que existe el sistema** | Docente en clase, Moodle, grupo del curso | Recibe el enlace a Tutoría UX | "Esto me sirve y es oficial" | No lo usa y sigue escribiendo por WhatsApp |
| TP2 | **Pantalla de inicio** | Web (móvil/escritorio) | Entiende qué puede hacer y pulsa "Reservar una tutoría" | Claridad: "son 4 pasos" | Abandona por no saber por dónde empezar |
| TP3 | **Elegir docente, fecha y horario** (asistente pasos 1–2) | Web | Filtra por asignatura, elige docente, modalidad, fecha y hora | Control y certeza de disponibilidad | Prueba fechas a ciegas, se frustra |
| TP4 | **Confirmación de la reserva** (pasos 3–4 y pantalla de éxito) | Web | Escribe sus datos, revisa el resumen, confirma, ve su código | Seguridad: "quedó registrada" | Duda si se guardó; reserva duplicada |
| TP5 | **Mis reservas: consultar, modificar o cancelar** | Web | Revisa el estado; cambia o cancela si algo cambia | Flexibilidad sin depender del docente | Cancela por error o no sabe cómo cambiar |

Touchpoint posterior (fuera del sistema): la tutoría en sí (oficina o Teams). Se considera en la
curva emocional, pero no se diseña en esta versión.

## 2. Dos momentos críticos

### MC1 — Elegir fecha y horario (TP3)

Es el punto de **mayor incertidumbre**. Hoy el estudiante no sabe qué días atiende el docente ni qué
horas están libres; si el sistema le deja elegir una fecha sin atención, siente que pierde el tiempo
adivinando. Es el punto más bajo de la curva emocional actual.

**Diseño en v1:** ayuda con los días de atención del docente, límites del calendario, horarios
ocupados visibles y mensaje claro si el día no tiene atención.
**A vigilar en la evaluación:** cuántas fechas prueba el participante antes de encontrar una válida.

### MC2 — Confirmar y saber que quedó registrada / poder cambiarla (TP4–TP5)

Es el momento de la **verdad**: si el estudiante no recibe una confirmación clara, o si al corregir un
error pierde lo escrito, la confianza en el sistema se rompe. También es crítico cancelar: una acción
irreversible hecha por error genera ansiedad.

**Diseño en v1:** resumen con "Cambiar" por dato, borrador automático, código `TUT-XXXXX`, estado
visible y mensajes de resultado.
**A vigilar en la evaluación:** si el participante sabe decir su código; si duda al cancelar.

## 3. Oportunidades de mejora justificadas

| # | Oportunidad | Justificación (necesidad / momento crítico) | Estado |
|---|---|---|---|
| O1 | Mostrar solo las fechas en que el docente atiende, con cuántos horarios quedan | MC1: elimina el ensayo y error; heurística "reconocer antes que recordar" | Propuesta para v2 (ver hallazgos) |
| O2 | Pedir confirmación antes de cancelar y explicar qué pasa con el horario | MC2: evita cancelaciones accidentales; heurística "prevención de errores" | Propuesta para v2 (ver hallazgos) |
| O3 | Guardar el avance automáticamente | N6: contexto de interrupciones constantes en el móvil | Implementado en v1 |
| O4 | Código de reserva visible y fácil de dictar (sin 0/O ni 1/I) | MC2 / N5: certeza y posibilidad de consultarla luego | Implementado en v1 |
| O5 | Recordatorio por correo el día anterior | N5: reduce ausencias | Backlog (requiere servidor) |
| O6 | Que el docente vea las reservas y el motivo | Usuario secundario | Backlog |
