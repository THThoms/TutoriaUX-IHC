// Capa de dominio: entidad Reserva y sus reglas de negocio.
// No depende del navegador, del almacenamiento ni de la interfaz.

export const ESTADOS = Object.freeze({
  CONFIRMADA: 'Confirmada',
  MODIFICADA: 'Modificada',
  CANCELADA: 'Cancelada',
});

export const MODALIDADES = Object.freeze(['Presencial', 'Virtual']);

export class ErrorDeDominio extends Error {
  constructor(mensaje, codigo = 'REGLA_DE_NEGOCIO') {
    super(mensaje);
    this.name = 'ErrorDeDominio';
    this.codigo = codigo;
  }
}

/**
 * Crea una reserva nueva en estado Confirmada.
 * Los datos ya deben venir validados por `validarReserva`.
 */
export function crearReserva(datos, { id, ahora }) {
  return {
    id,
    docenteId: datos.docenteId,
    asignaturaId: datos.asignaturaId,
    modalidad: datos.modalidad,
    fecha: datos.fecha,
    hora: datos.hora,
    estudiante: {
      nombre: datos.nombre.trim(),
      correo: datos.correo.trim().toLowerCase(),
    },
    motivo: datos.motivo.trim(),
    estado: ESTADOS.CONFIRMADA,
    creadaEn: ahora.toISOString(),
    historial: [{ estado: ESTADOS.CONFIRMADA, fecha: ahora.toISOString() }],
  };
}

/** Devuelve true si la reserva todavía puede modificarse o cancelarse. */
export function esEditable(reserva, hoyISO) {
  return reserva.estado !== ESTADOS.CANCELADA && reserva.fecha >= hoyISO;
}

/** Aplica los cambios a una reserva existente y la deja en estado Modificada. */
export function modificarReserva(reserva, datos, { ahora, hoyISO }) {
  if (reserva.estado === ESTADOS.CANCELADA) {
    throw new ErrorDeDominio('No se puede modificar una reserva cancelada.', 'RESERVA_CANCELADA');
  }
  if (!esEditable(reserva, hoyISO)) {
    throw new ErrorDeDominio('No se puede modificar una tutoría que ya pasó.', 'RESERVA_PASADA');
  }
  return {
    ...reserva,
    docenteId: datos.docenteId,
    asignaturaId: datos.asignaturaId,
    modalidad: datos.modalidad,
    fecha: datos.fecha,
    hora: datos.hora,
    estudiante: {
      nombre: datos.nombre.trim(),
      correo: datos.correo.trim().toLowerCase(),
    },
    motivo: datos.motivo.trim(),
    estado: ESTADOS.MODIFICADA,
    historial: [...reserva.historial, { estado: ESTADOS.MODIFICADA, fecha: ahora.toISOString() }],
  };
}

/** Cancela una reserva. Una reserva cancelada libera su horario. */
export function cancelarReserva(reserva, { ahora, hoyISO }) {
  if (reserva.estado === ESTADOS.CANCELADA) {
    throw new ErrorDeDominio('La reserva ya estaba cancelada.', 'RESERVA_CANCELADA');
  }
  if (!esEditable(reserva, hoyISO)) {
    throw new ErrorDeDominio('No se puede cancelar una tutoría que ya pasó.', 'RESERVA_PASADA');
  }
  return {
    ...reserva,
    estado: ESTADOS.CANCELADA,
    historial: [...reserva.historial, { estado: ESTADOS.CANCELADA, fecha: ahora.toISOString() }],
  };
}

/** Una reserva ocupa el horario del docente mientras no esté cancelada. */
export function ocupaHorario(reserva) {
  return reserva.estado !== ESTADOS.CANCELADA;
}
