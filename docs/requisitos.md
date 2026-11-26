# Requisitos — Tutoría UX

**Responsable:** Bryan Guatema

## 1. Alcance

Sistema web para que estudiantes de la FISEI reserven y gestionen tutorías con docentes.
Usuario principal: estudiante de pregrado. Fuera de alcance en esta versión: panel del docente,
inicio de sesión institucional y envío de correos.

## 2. Requisitos funcionales

| ID | Requisito | Criterios de aceptación | Prioridad |
|---|---|---|---|
| **R1** | **Consultar docentes y asignaturas.** El estudiante puede ver las asignaturas y los docentes que dan tutoría en cada una. | 1. Lista de asignaturas en un selector. 2. Al elegir asignatura solo aparecen sus docentes. 3. Búsqueda por nombre de docente o asignatura que ignora tildes y mayúsculas. 4. Si no hay resultados se muestra un mensaje y una forma de borrar la búsqueda. 5. Cada docente muestra asignaturas, modalidades y días de atención. | Alta |
| **R2** | **Elegir modalidad, fecha y horario.** El estudiante elige presencial o virtual, la fecha y un horario libre del docente. | 1. Solo se ofrecen las modalidades del docente. 2. Solo se aceptan fechas desde hoy hasta 30 días después. 3. Se indica qué días atiende el docente. 4. Los horarios ocupados se ven pero no se pueden elegir. 5. Cada horario muestra inicio y fin (45 min). | Alta |
| **R3** | **Registrar la reserva.** El estudiante ingresa sus datos, revisa un resumen y confirma. | 1. Nombre (solo letras, mínimo 5), correo `@uta.edu.ec` y motivo (10–300 caracteres) obligatorios. 2. Cada error se explica junto al campo y en un resumen al inicio. 3. Los datos ya escritos no se borran al mostrar errores. 4. Antes de confirmar se ve un resumen con opción "Cambiar" por dato. 5. Al confirmar se muestra un código `TUT-XXXXX` y el estado "Confirmada". 6. No se permite reservar un horario ya ocupado. | Alta |
| **R4** | **Consultar reservas.** El estudiante ve sus reservas con su estado. | 1. Listado ordenado por fecha y hora. 2. Cada reserva muestra asignatura, docente, fecha, hora, modalidad, código y estado. 3. Filtro por estado (Confirmada, Modificada, Cancelada). 4. Vista de detalle con lugar e historial. 5. Si no hay reservas se invita a crear una. | Alta |
| **R5** | **Modificar una reserva.** El estudiante cambia docente, modalidad, fecha, hora o sus datos. | 1. El formulario se abre con los datos actuales. 2. Puede ir y volver entre pasos sin perder lo elegido. 3. La reserva conserva su código y pasa a "Modificada". 4. Puede mantener su mismo horario. 5. No se puede modificar una reserva cancelada o pasada. | Media |
| **R6** | **Cancelar una reserva.** El estudiante cancela una tutoría que ya no necesita. | 1. La reserva pasa a "Cancelada" y el horario queda libre. 2. Se muestra un mensaje de confirmación del resultado. 3. No se puede cancelar una reserva pasada o ya cancelada. | Media |

## 3. Requisitos no funcionales

| ID | Requisito | Cómo se verifica |
|---|---|---|
| RNF1 | **Mobile first y adaptable**: usable desde 320 px hasta escritorio sin desplazamiento horizontal. | Prueba en 375 px y 1280 px; revisión WCAG 1.4.10 |
| RNF2 | **Accesibilidad WCAG 2.2 nivel AA** en los criterios revisados: HTML semántico, etiquetas, contraste, teclado y foco visible. | `evaluacion/accesibilidad-wcag.md` |
| RNF3 | **Conservar datos** durante la corrección, al volver atrás y al recargar. | Prueba F19 y prueba manual de recarga |
| RNF4 | **Mensajes claros**: cada error dice qué pasó y cómo corregirlo, en español sencillo. | Heurística 9 de Nielsen |
| RNF5 | **Persistencia local** (localStorage) con arquitectura preparada para API. | `docs/arquitectura.md` |
| RNF6 | **Eficiencia**: una reserva completa en menos de 3 minutos por un estudiante sin ayuda. | Tarea T1 en `evaluacion/plan-evaluacion.md` |

## 4. Reglas de negocio

- RN1. Cada tutoría dura 45 minutos.
- RN2. Se puede reservar desde hoy hasta 30 días después.
- RN3. Un docente no puede tener dos reservas activas en la misma fecha y hora.
- RN4. Una reserva cancelada libera su horario.
- RN5. Una tutoría que ya pasó no se puede modificar ni cancelar.
