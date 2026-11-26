# Pruebas funcionales

**Responsable:** Tomás Solis · **Archivo:** [`tests/reservas.test.js`](../tests/reservas.test.js)

Se ejecutan sin instalar nada (Node.js 20 o superior):

```bash
npm test
```

Las pruebas usan un reloj fijo (lunes 7 de diciembre de 2026) y almacenamiento en memoria, así que
el resultado no depende del día en que se ejecutan ni de datos previos del navegador.

| ID | Requisito | Caso | Resultado esperado |
|---|---|---|---|
| F01 | R1 | Listar asignaturas | 7 asignaturas |
| F02 | R1 | Filtrar docentes por asignatura (IHC) | Villacís y Carrasco |
| F03 | R1 | Buscar "VILLACIS" / "interaccion" | Ignora tildes y mayúsculas |
| F04 | R1 | Búsqueda sin coincidencias | Lista vacía (la UI muestra estado vacío con "Borrar búsqueda") |
| F05 | R2 | Horarios de un miércoles | 14:00 y 15:00 disponibles |
| F06 | R2 | Horario ya reservado | Aparece como no disponible |
| F07 | R2 | Día sin atención (martes) | Error que indica "lunes y miércoles" |
| F08 | R2 | Fecha pasada / a más de 30 días | Error específico en cada caso |
| F09 | R2 | Modalidad no ofrecida | Error que indica la modalidad válida |
| F10 | R3 | Reserva válida | Estado Confirmada y código |
| F11 | R3 | Nombre, correo y motivo inválidos | Un mensaje por campo |
| F12 | R3 | Doble reserva del mismo horario | Rechazada con mensaje claro |
| F13 | R3 | Persistencia | La reserva se lee desde otra instancia del repositorio |
| F14 | R4 | Listado ordenado y filtro por estado | Orden por fecha y hora; filtro correcto |
| F15 | R4 | Detalle con nombres | Nombre del docente y de la asignatura |
| F16 | R5 | Modificar hora y modalidad | Mismo código, estado Modificada, historial con 2 entradas |
| F17 | R5 | Modificar manteniendo el mismo horario | Permitido (no choca consigo misma) |
| F18 | R5 | Modificar una cancelada | Rechazado |
| F19 | R5 | Borrador | Conserva paso y datos; se puede descartar |
| F20 | R6 | Cancelar | Estado Cancelada y horario liberado |
| F21 | R6 | Cancelar dos veces / código inexistente | Rechazado |
| F22 | R6 | Tutoría pasada | No se puede cancelar ni modificar |

## Resultado de la última ejecución (v1)

```
ℹ tests 22
ℹ suites 6
ℹ pass 22
ℹ fail 0
```

## Pruebas manuales en navegador (v1)

Recorrido completo realizado en Microsoft Edge a 1280 × 800 y 375 × 812:

| Verificación | Resultado |
|---|---|
| Continuar sin datos en el paso 1 muestra resumen de errores y el foco va a él | Correcto |
| Búsqueda sin resultados muestra estado vacío con botón "Borrar búsqueda" | Correcto |
| Fecha en un día sin atención muestra el mensaje con los días válidos | Correcto |
| Correo no institucional muestra error junto al campo y conserva los demás datos | Correcto |
| "Cambiar" desde el resumen vuelve al paso con la hora ya elegida | Correcto |
| Recargar la página en el paso 4 conserva paso y datos | Correcto |
| Confirmar muestra el código y la reserva aparece en "Mis reservas" | Correcto |
| Modificar carga los datos actuales y deja el estado en "Modificada" | Correcto |
| Cancelar deja el estado en "Cancelada" | Correcto (sin confirmación previa: ver hallazgos) |
| Sin desplazamiento horizontal a 375 px | Correcto |
| Primer Tab enfoca "Saltar al contenido" | Correcto |
| Errores en la consola del navegador | Ninguno |
