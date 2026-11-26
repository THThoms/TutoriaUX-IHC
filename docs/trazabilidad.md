# Matriz de trazabilidad

**Responsable:** Bryan Guatema

Relaciona cada requisito con las pantallas, los componentes y archivos que lo implementan,
las pruebas funcionales que lo verifican y la tarea de usabilidad que lo evalúa.

| Requisito | Pantallas (sitemap) | Wireframe | Componentes | Archivos de código | Pruebas funcionales | Tarea de usabilidad |
|---|---|---|---|---|---|---|
| R1 Consultar docentes y asignaturas | P-02 | WF-01 | `CampoSelect`, `CampoTexto` (búsqueda), `GrupoOpciones` (docentes), `Alerta` (sin resultados) | `views/reservarView.js` (paso 1), `application/reservaService.js#buscarDocentes`, `infrastructure/catalogoDatos.js` | F01, F02, F03, F04 | T1 |
| R2 Elegir modalidad, fecha y horario | P-03 | WF-02 | `GrupoOpciones` (modalidad y horas), `SelectorFecha`, `Pasos` | `views/reservarView.js` (paso 2), `reservaService.js#horariosDelDia`, `domain/validaciones.js#validarHorario` | F05, F06, F07, F08, F09 | T1, T2 |
| R3 Registrar reserva | P-04, P-05, P-06 | WF-03 | `CampoTexto`, `ResumenErrores`, `Alerta` (éxito), resumen `dl` | `views/reservarView.js` (pasos 3–4), `reservaService.js#crear`, `domain/reserva.js#crearReserva` | F10, F11, F12, F13 | T1 |
| R4 Consultar reservas | P-06, P-07 | — | `TarjetaReserva`, `InsigniaEstado`, `CampoSelect` (filtro) | `views/misReservasView.js`, `views/detalleView.js`, `reservaService.js#listarReservas` | F14, F15 | T2, T3 |
| R5 Modificar reserva | P-08 | WF-01–WF-03 (reutilizados) | Asistente completo, `Alerta` info "datos cargados" | `views/reservarView.js` (modo editar), `reservaService.js#modificar`, `domain/reserva.js#modificarReserva` | F16, F17, F18, F19 | T2 |
| R6 Cancelar reserva | P-06, P-07 | — | `accionCancelar`, `Alerta` (resultado) | `components/accionCancelar.js`, `reservaService.js#cancelar`, `domain/reserva.js#cancelarReserva` | F20, F21, F22 | T3 |
| RNF1 Mobile first | Todas | WF-01–03 (diseñados a 360 px) | `styles.css` | `presentation/styles.css` | Prueba manual 375 px | T1–T3 en móvil (P01) |
| RNF2 Accesibilidad | Todas | — | Todos (etiquetas, `aria-*`, foco) | `presentation/app.js` (foco), `components/Campos.js` | — | Revisión WCAG |
| RNF3 Conservar datos | P-02 a P-05, P-08 | WF-03 ("Cambiar") | `BorradorRepository` | `infrastructure/repositorios.js`, `reservarView.js` | F19 | T2 |

## Cobertura

- 6 de 6 requisitos funcionales tienen al menos una pantalla, un componente, una prueba funcional
  y una tarea de usabilidad.
- Las tareas T1–T3 se describen en [`evaluacion/plan-evaluacion.md`](../evaluacion/plan-evaluacion.md).
