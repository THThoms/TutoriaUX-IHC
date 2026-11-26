# Recorrido cognitivo — v1

**Responsable:** Carlos Bejarano

**Usuario supuesto:** estudiante de la proto-persona ([`ux/perfil-usuario.md`](../ux/perfil-usuario.md)),
usa por primera vez el sistema desde el teléfono, conoce la asignatura pero no los horarios del docente.

Para cada acción se responden las cuatro preguntas del método:

- **Q1** ¿Intentará el usuario lograr el efecto correcto?
- **Q2** ¿Notará que la acción correcta está disponible?
- **Q3** ¿Asociará la acción correcta con el efecto que busca?
- **Q4** Si realiza la acción correcta, ¿verá que avanza hacia su objetivo?

## T1 — Reservar una tutoría de IHC con la Ing. Villacís, presencial

| # | Acción correcta | Q1 | Q2 | Q3 | Q4 | Comentario |
|---|---|---|---|---|---|---|
| 1 | Pulsar "Reservar una tutoría" en el inicio | Sí | Sí | Sí | Sí | Botón principal, primer elemento tras el título |
| 2 | Elegir "Interacción Humano-Computador" en Asignatura | Sí | Sí | Sí | Sí | Etiqueta visible; la lista de docentes se filtra al instante |
| 3 | Elegir la tarjeta "Ing. Andrea Villacís" | Sí | Sí | Sí | Sí | La tarjeta queda resaltada |
| 4 | Pulsar "Continuar" | Sí | Sí | Sí | Sí | Cambia a "Paso 2 de 4" |
| 5 | Elegir "Presencial" | Sí | Sí | Sí | Sí | — |
| 6 | **Elegir una fecha en que la docente atiende** | Sí | Sí | **Parcial** | **No** | El calendario ofrece todos los días. Si elige un martes, solo aparece un aviso y debe probar otra fecha. La relación "este día sirve" no es visible antes de elegir. → **P-02** |
| 7 | Elegir un horario disponible | Sí | Sí | Sí | Sí | Horarios ocupados deshabilitados y rotulados |
| 8 | Escribir nombre, correo y motivo; "Continuar" | Sí | Sí | Sí | Sí | Si usa un correo personal, el error explica el formato correcto y conserva lo demás |
| 9 | Revisar el resumen y pulsar "Confirmar reserva" | Sí | Sí | Sí | Sí | Verbo explícito; la siguiente pantalla muestra "¡Tutoría reservada!" y el código |

## T2 — Cambiar la reserva a virtual y a otro horario

| # | Acción correcta | Q1 | Q2 | Q3 | Q4 | Comentario |
|---|---|---|---|---|---|---|
| 1 | Ir a "Mis reservas" | Sí | Sí | Sí | Sí | Siempre visible en el menú |
| 2 | Pulsar "Modificar" en la tarjeta | Sí | Sí | Sí | Sí | Mensaje "Los datos actuales de tu reserva ya están cargados" |
| 3 | "Continuar" en el paso 1 sin cambiar nada | Sí | Sí | Parcial | Sí | Podría dudar si debe volver a elegir el docente; los datos precargados lo resuelven |
| 4 | Elegir "Virtual" y otro horario | Sí | Sí | Sí | Sí | — |
| 5 | "Continuar" hasta el resumen y "Guardar cambios" | Sí | Sí | Sí | Sí | Mensaje "Cambios guardados" e insignia "Modificada" |

## T3 — Cancelar la tutoría

| # | Acción correcta | Q1 | Q2 | Q3 | Q4 | Comentario |
|---|---|---|---|---|---|---|
| 1 | Ir a "Mis reservas" | Sí | Sí | Sí | Sí | — |
| 2 | **Pulsar "Cancelar" en la tarjeta** | Sí | Sí | **Parcial** | Sí | El rótulo corto "Cancelar" junto a "Modificar" puede leerse como "cancelar la acción" → **P-03** |
| 3 | (No existe) confirmar la cancelación | — | — | — | — | La acción ocurre al primer toque; no hay oportunidad de revisar qué se cancela → **P-01** |

## Conclusiones

1. El punto de falla más claro es **T1 · acción 6** (elegir fecha): coincide con el momento crítico
   MC1 de [`ux/touchpoints.md`](../ux/touchpoints.md). Se corrige en v2 mostrando solo fechas con
   atención (hallazgo **H-02**).
2. En **T3** la acción es demasiado directa para ser irreversible; se corrige en v2 con un diálogo de
   confirmación y un rótulo explícito (hallazgo **H-01**).
3. T2 no presenta fallas; la precarga de datos cumple el requisito de modificar sin perder información.
