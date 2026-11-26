import { h, reemplazar } from '../components/dom.js';
import { Alerta } from '../components/Alerta.js';
import { InsigniaEstado, horaFin } from '../components/TarjetaReserva.js';
import { solicitarCancelacion } from '../components/accionCancelar.js';
import { fechaLarga } from '../../domain/fechas.js';

const MENSAJES_OK = {
  creada: { titulo: '¡Tutoría reservada!', texto: 'Guarda tu código. También puedes consultarla en "Mis reservas".' },
  modificada: { titulo: 'Cambios guardados', texto: 'Tu reserva quedó actualizada con los nuevos datos.' },
};

export function vistaDetalle(ctx, { id, ok }) {
  const { servicio } = ctx;
  const raiz = h('section', { class: 'vista' });
  let mensaje = MENSAJES_OK[ok]
    ? Alerta({ tipo: 'exito', titulo: MENSAJES_OK[ok].titulo, mensaje: MENSAJES_OK[ok].texto })
    : null;

  function render() {
    const guardada = servicio.obtenerReserva(id);
    if (!guardada) {
      reemplazar(raiz,
        h('h1', { tabindex: '-1' }, 'Reserva no encontrada'),
        Alerta({
          tipo: 'error',
          mensaje: `No existe una reserva con el código ${id}.`,
          acciones: [h('a', { class: 'btn btn--secundario', href: '#/reservas' }, 'Ir a mis reservas')],
        }));
      return;
    }
    const r = servicio.describir(guardada);
    reemplazar(raiz,
      h('h1', { tabindex: '-1' }, 'Reserva ', h('code', {}, r.id)),
      mensaje,
      h('article', { class: 'tarjeta' },
        h('div', { class: 'tarjeta-reserva__cabecera' },
          h('h2', { class: 'tarjeta__titulo' }, r.asignatura?.nombre),
          InsigniaEstado(r.estado)),
        h('dl', { class: 'datos datos--detalle' },
          h('div', {}, h('dt', {}, 'Docente'), h('dd', {}, r.docente?.nombre)),
          h('div', {}, h('dt', {}, 'Fecha'), h('dd', {}, fechaLarga(r.fecha))),
          h('div', {}, h('dt', {}, 'Hora'), h('dd', {}, `${r.hora} – ${horaFin(r.hora)}`)),
          h('div', {}, h('dt', {}, 'Modalidad'), h('dd', {}, r.modalidad)),
          h('div', {}, h('dt', {}, 'Lugar'), h('dd', {}, r.modalidad === 'Virtual' ? 'Microsoft Teams (el docente comparte el enlace)' : r.docente?.lugar)),
          h('div', {}, h('dt', {}, 'Estudiante'), h('dd', {}, `${r.estudiante.nombre} · ${r.estudiante.correo}`)),
          h('div', {}, h('dt', {}, 'Motivo'), h('dd', {}, r.motivo))),
        h('h3', {}, 'Historial'),
        h('ul', { class: 'historial' },
          r.historial.map((x) => h('li', {}, `${x.estado}: ${new Date(x.fecha).toLocaleString('es-EC')}`)))),
      h('div', { class: 'acciones-form' },
        r.editable ? h('a', { class: 'btn btn--primario', href: `#/reservar/editar/${r.id}` }, 'Modificar reserva') : null,
        r.editable ? h('button', {
          type: 'button',
          class: 'btn btn--peligro',
          onclick: (e) => solicitarCancelacion(ctx, r, {
            disparador: e.currentTarget,
            alTerminar: (resultado) => {
              mensaje = resultado.ok
                ? Alerta({ tipo: 'exito', titulo: 'Reserva cancelada', mensaje: 'El horario quedó libre para otros estudiantes.' })
                : Alerta({ tipo: 'error', mensaje: resultado.error });
              render();
              raiz.querySelector('.alerta')?.focus();
            },
          }),
        }, 'Cancelar reserva') : null,
        h('a', { class: 'btn btn--secundario', href: '#/reservas' }, 'Ir a mis reservas')));
  }

  render();
  return { titulo: `Reserva ${id} · Tutoría UX`, elemento: raiz };
}
