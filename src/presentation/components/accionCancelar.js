// Acción de cancelar una reserva (v1): se ejecuta en cuanto se pulsa el botón.

export function solicitarCancelacion(ctx, reserva, { alTerminar }) {
  const resultado = ctx.servicio.cancelar(reserva.id);
  alTerminar(resultado);
}
