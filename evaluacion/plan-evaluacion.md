# Plan de evaluación de usabilidad

**Responsable:** Bryan Guatema

## 1. Objetivos

1. Verificar que un estudiante pueda **reservar, modificar y cancelar** una tutoría sin ayuda.
2. Detectar en qué pasos se equivoca, duda o pide ayuda.
3. Medir eficacia (éxito), eficiencia (tiempo) y satisfacción (SEQ por tarea y SUS al final).
4. Comparar v1 y v2 en las tareas afectadas por las correcciones.

## 2. Métodos

| Método | Quién | Cuándo | Documento |
|---|---|---|---|
| Pilotaje P00 | Equipo + 1 compañero | Antes de las sesiones reales | [piloto-P00.md](piloto-P00.md) |
| Heurísticas de Nielsen | Carlos Bejarano (+ equipo) | Sobre v1 | [heuristicas.md](heuristicas.md) |
| Recorrido cognitivo | Carlos Bejarano | Sobre v1, tareas T1–T3 | [recorrido-cognitivo.md](recorrido-cognitivo.md) |
| Revisión WCAG 2.2 AA | Carlos Bejarano | Sobre v1 y v2 | [accesibilidad-wcag.md](accesibilidad-wcag.md) |
| Pruebas con usuarios P01 y P02 | Karen Molina (moderadora) | Sobre v1 | [sesiones/](sesiones/) |
| Reevaluación v2 | Carlos Bejarano | Tras las correcciones | [reevaluacion-v2.md](reevaluacion-v2.md) |

## 3. Participantes

- **Perfil:** estudiantes de la UTA (cualquier carrera o semestre) que **no** participaron en el
  desarrollo. Al menos uno debe haber pedido una tutoría antes.
- **P00 (piloto):** compañero de otro equipo; sirve para probar guion, tiempos y tareas.
- **P01:** realiza las tareas en **teléfono móvil**.
- **P02:** realiza las tareas en **computador** (teclado y ratón).
- Ningún integrante del equipo puede ser participante.

## 4. Escenario y tareas

**Escenario que se lee al participante:**
"Estás cursando Interacción Humano-Computador y tienes dudas sobre la evaluación heurística de tu
proyecto. Quieres hablar con un docente antes de la entrega."

| Tarea | Consigna (se lee tal cual) | Criterio de éxito observable | Tiempo máximo | Requisitos |
|---|---|---|---|---|
| **T1** Reservar | "Reserva una tutoría de Interacción Humano-Computador con la Ing. Andrea Villacís, en modalidad presencial, en la primera fecha y horario disponibles. Usa tu nombre y tu correo institucional." | En "Mis reservas" aparece una reserva **Confirmada** con: asignatura IHC, docente Villacís, modalidad Presencial, fecha y hora válidas, correo `@uta.edu.ec`. El participante dice el código de reserva. | 4 min | R1, R2, R3 |
| **T2** Modificar | "Te equivocaste: la tutoría debía ser **virtual** y en **otro horario** del mismo día o de otro día. Cámbiala." | La **misma** reserva (mismo código) aparece **Modificada** con modalidad Virtual y un horario distinto al original. No se creó una reserva nueva. | 3 min | R4, R5 |
| **T3** Cancelar | "Ya resolviste tus dudas con un compañero. Cancela la tutoría." | La reserva aparece **Cancelada** y el participante puede decir que el horario quedó libre (o lo comprueba). | 2 min | R4, R6 |

Clasificación del resultado de cada tarea:

- **Éxito:** cumple el criterio sin ayuda.
- **Éxito con ayuda:** cumple el criterio pero el moderador tuvo que dar una pista.
- **Fallo:** no cumple el criterio, abandona o supera el tiempo máximo.

## 5. Métricas

| Métrica | Cómo se mide | Meta |
|---|---|---|
| Tasa de éxito | Tareas con "Éxito" / tareas intentadas | ≥ 80 % |
| Tiempo por tarea | Cronómetro desde que termina de leer la consigna hasta que cumple el criterio o abandona | T1 ≤ 3 min, T2 ≤ 2 min, T3 ≤ 1 min |
| Errores | Acciones que alejan del objetivo (p. ej. mensaje de error, pantalla equivocada, reserva duplicada) | ≤ 2 por tarea |
| Ayudas | Número de pistas del moderador | 0 |
| SEQ | "En general, ¿qué tan fácil o difícil fue esta tarea?" 1 = muy difícil, 7 = muy fácil | ≥ 5,5 |
| SUS | Cuestionario de 10 ítems al final (ver `sesiones/plantilla-sesion.md`) | ≥ 68 |

Las métricas se registran en [`metricas.csv`](metricas.csv) y se calculan con
`node evaluacion/calcular-metricas.js` (ver [metricas.md](metricas.md)).

## 6. Roles y materiales

| Rol | Responsable | Función |
|---|---|---|
| Moderador | Karen Molina | Lee el guion y las tareas, no ayuda salvo que el participante esté bloqueado > 1 min |
| Cronometrista | Bryan Guatema | Registra tiempos de inicio y fin |
| Observador / anotador | Carlos Bejarano | Anota errores, dudas, frases textuales y momentos de frustración |
| Soporte técnico | Tomás Solis | Prepara el equipo, limpia datos entre sesiones (`localStorage.clear()`), toma capturas |

Materiales: consentimiento impreso o digital, guion, hoja de registro por participante,
cronómetro, teléfono y computador con la app en `http://localhost:5500` (o la URL publicada).

## 7. Procedimiento (≈ 20 minutos por participante)

1. Bienvenida y explicación: "Evaluamos la aplicación, no a ti. No hay respuestas incorrectas."
2. Lectura y firma del [consentimiento](consentimiento.md).
3. Preguntas previas (perfil): carrera, semestre, ¿has pedido tutorías antes?, ¿cómo?
4. Pedir que **piense en voz alta**.
5. Tareas T1, T2, T3 en orden. Tras cada tarea, pregunta SEQ.
6. Cuestionario SUS.
7. Preguntas finales: ¿qué fue lo más fácil?, ¿qué fue lo más confuso?, ¿qué cambiarías?
8. Agradecimiento. Limpiar los datos del navegador antes del siguiente participante.

## 8. Ética y datos

- Participación voluntaria; puede retirarse en cualquier momento.
- En el repositorio se usan códigos (P00, P01, P02), nunca nombres reales.
- Si se graba la pantalla, solo con autorización en el consentimiento y sin mostrar el rostro.
- **No se inventan ni completan datos**: lo que no se observó se deja vacío.
