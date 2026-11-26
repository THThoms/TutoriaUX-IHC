import { h } from './dom.js';
import { fechaLarga } from '../../domain/fechas.js';

export function InsigniaEstado(estado) {
  return h('span', { class: `insignia insignia--${estado.toLowerCase()}` }, estado);
}

export function horaFin(hora) {
  const [hh, mm] = hora.split(':').map(Number);
  const total = hh * 60 + mm + 45;
  return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
}

/** Tarjeta de una reserva para el listado "Mis reservas". */
export function TarjetaReserva(r, { alModificar, alCancelar }) {
  return h('article', { class: 'tarjeta tarjeta-reserva', 'aria-labelledby': `t-${r.id}` },
    h('div', { class: 'tarjeta-reserva__cabecera' },
      h('h2', { class: 'tarjeta__titulo', id: `t-${r.id}` }, r.asignatura?.nombre || 'Asignatura'),
      InsigniaEstado(r.estado)),
    h('dl', { class: 'datos' },
      h('div', {}, h('dt', {}, 'Docente'), h('dd', {}, r.docente?.nombre || '—')),
      h('div', {}, h('dt', {}, 'Fecha'), h('dd', {}, fechaLarga(r.fecha))),
      h('div', {}, h('dt', {}, 'Hora'), h('dd', {}, `${r.hora} – ${horaFin(r.hora)}`)),
      h('div', {}, h('dt', {}, 'Modalidad'), h('dd', {}, r.modalidad)),
      h('div', {}, h('dt', {}, 'Código'), h('dd', {}, h('code', {}, r.id)))),
    h('div', { class: 'tarjeta__acciones' },
      h('a', { class: 'btn btn--secundario', href: `#/reservas/${r.id}` }, 'Ver detalle', h('span', { class: 'sr-only' }, ` de ${r.id}`)),
      r.editable ? h('button', { class: 'btn btn--secundario', type: 'button', onclick: () => alModificar(r) },
        'Modificar', h('span', { class: 'sr-only' }, ` ${r.id}`)) : null,
      r.editable ? h('button', { class: 'btn btn--peligro', type: 'button', onclick: (e) => alCancelar(r, e.currentTarget) },
        'Cancelar reserva', h('span', { class: 'sr-only' }, ` ${r.id}`)) : null));
}
