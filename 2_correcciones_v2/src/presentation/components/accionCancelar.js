// Acción de cancelar una reserva.
// v2 (corrige H-01): antes de cancelar se pide confirmación mostrando qué tutoría se
// cancelará y qué consecuencia tiene. "No, conservarla" es la opción enfocada por defecto.

import { h } from './dom.js';
import { DialogoConfirmacion } from './DialogoConfirmacion.js';
import { horaFin } from './TarjetaReserva.js';
import { fechaLarga } from '../../domain/fechas.js';

export async function solicitarCancelacion(ctx, reserva, { alTerminar, disparador }) {
  const r = reserva.docente ? reserva : ctx.servicio.describir(reserva);
  const confirmado = await DialogoConfirmacion({
    titulo: '¿Cancelar esta tutoría?',
    mensaje: 'El horario quedará libre para otros estudiantes y la reserva no se podrá volver a activar.',
    detalle: h('dl', { class: 'datos dialogo__detalle' },
      h('div', {}, h('dt', {}, 'Asignatura'), h('dd', {}, r.asignatura?.nombre)),
      h('div', {}, h('dt', {}, 'Docente'), h('dd', {}, r.docente?.nombre)),
      h('div', {}, h('dt', {}, 'Fecha'), h('dd', {}, fechaLarga(r.fecha))),
      h('div', {}, h('dt', {}, 'Hora'), h('dd', {}, `${r.hora} – ${horaFin(r.hora)}`)),
      h('div', {}, h('dt', {}, 'Código'), h('dd', {}, h('code', {}, r.id)))),
    confirmar: 'Sí, cancelar tutoría',
    volver: 'No, conservarla',
    disparador,
  });
  if (!confirmado) return;
  alTerminar(ctx.servicio.cancelar(r.id));
}
