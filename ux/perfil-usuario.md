# Perfil de usuario y necesidades

**Responsable:** Karen Molina

## 1. Usuario principal

**Estudiante de pregrado de la FISEI** que necesita resolver dudas de una asignatura con un
docente fuera del horario de clase.

| Característica | Descripción |
|---|---|
| Edad | 18 a 25 años |
| Semestre | Cualquiera; más frecuente en semanas de evaluación y entrega de proyectos |
| Dispositivo | Teléfono móvil la mayor parte del tiempo (entre clases, en el bus); computador en casa o laboratorio |
| Experiencia digital | Alta con redes sociales y Moodle; poca paciencia con formularios largos |
| Contexto de uso | Con prisa, entre clases, a veces con mala conexión; puede ser interrumpido a mitad del proceso |
| Motivación | Aprobar, entender un tema antes de un examen o recibir retroalimentación de un proyecto |
| Situación actual | Pregunta al docente al final de la clase, por correo o por WhatsApp del curso; no sabe con certeza cuándo está disponible |

## 2. Proto-persona

> La proto-persona se construyó con la experiencia del equipo como estudiantes. Es una
> **hipótesis**: se contrasta con las preguntas previas de las sesiones P01 y P02
> (ver [`evaluacion/resultados.md`](../evaluacion/resultados.md)).

**Daniela, 20 años, quinto semestre de Ingeniería de Software.**

- Tiene clases de 7:00 a 13:00 y trabaja medio tiempo por las tardes tres días a la semana.
- Usa el teléfono para casi todo; abre el computador solo para programar.
- Tiene una entrega de IHC la próxima semana y no entiende cómo calificar la severidad de los
  hallazgos.
- **Frase:** "Le escribí al profe, pero no sé si vio el mensaje ni si me va a poder atender."

**Objetivos**
1. Conseguir una tutoría antes de la entrega, en un horario compatible con su trabajo.
2. Saber con certeza que la tutoría quedó registrada.
3. Poder cambiarla si le cruza otra actividad.

**Frustraciones**
1. No saber qué días atiende cada docente.
2. Tener que escribir varias veces para coordinar una hora.
3. Formularios que borran todo cuando algo está mal.

## 3. Necesidades

| # | Necesidad | Tipo | Cómo la atiende el sistema |
|---|---|---|---|
| N1 | Saber qué docentes dan tutoría de su asignatura | Información | Filtro por asignatura y tarjetas de docente (R1) |
| N2 | Conocer días y horarios disponibles sin preguntar | Información | Días de atención y horarios libres/ocupados (R2) |
| N3 | Elegir presencial o virtual según su día | Control | Selección de modalidad según el docente (R2) |
| N4 | Reservar rápido desde el teléfono | Eficiencia | Asistente de 4 pasos, mobile first (R3, RNF1) |
| N5 | Tener certeza de que la reserva quedó hecha | Confianza | Confirmación con código y estado (R3, R4) |
| N6 | No perder lo escrito si se equivoca o se interrumpe | Seguridad | Borrador automático y errores por campo (RNF3) |
| N7 | Cambiar o cancelar sin escribirle al docente | Control | Modificar y cancelar desde "Mis reservas" (R5, R6) |
| N8 | Usarlo con teclado o lector de pantalla | Inclusión | HTML semántico, foco visible, WCAG 2.2 AA (RNF2) |

## 4. Usuario secundario (fuera de alcance de esta versión)

**Docente:** necesita ver quién viene, de qué tema y en qué modalidad. En esta versión el estudiante
escribe el motivo de la tutoría para que esa información exista cuando se agregue el panel docente.
