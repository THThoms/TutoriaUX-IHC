import { h, reemplazar, anunciar } from '../components/dom.js';
import { Alerta } from '../components/Alerta.js';
import { CampoSelect } from '../components/Campos.js';
import { TarjetaReserva } from '../components/TarjetaReserva.js';
import { solicitarCancelacion } from '../components/accionCancelar.js';
import { ESTADOS } from '../../application/reservaService.js';

export function vistaMisReservas(ctx, { estado = '' } = {}) {
  const { servicio } = ctx;
  let filtro = estado;
  let mensaje = null;
  const raiz = h('section', { class: 'vista' });
  const lista = h('div', { class: 'lista-reservas' });

  function pintarLista() {
    const reservas = servicio.listarReservas({ estado: filtro }).map((r) => servicio.describir(r));
    if (!reservas.length) {
      reemplazar(lista, Alerta({
        tipo: 'info',
        titulo: filtro ? `No tienes reservas en estado "${filtro}"` : 'Aún no tienes reservas',
        mensaje: filtro ? 'Cambia el filtro para ver las demás.' : 'Cuando reserves una tutoría aparecerá aquí.',
        acciones: [h('a', { class: 'btn btn--primario', href: '#/reservar' }, 'Reservar una tutoría')],
      }));
    } else {
      reemplazar(lista, reservas.map((r) => TarjetaReserva(r, {
        alModificar: (res) => ctx.navegar(`#/reservar/editar/${res.id}`),
        alCancelar: (res, disparador) => solicitarCancelacion(ctx, res, {
          disparador,
          alTerminar: (resultado) => {
            mensaje = resultado.ok
              ? Alerta({ tipo: 'exito', titulo: `Reserva ${res.id} cancelada`, mensaje: 'El horario quedó libre para otros estudiantes.' })
              : Alerta({ tipo: 'error', mensaje: resultado.error });
            render();
            raiz.querySelector('.alerta')?.focus();
          },
        }),
      })));
    }
    return reservas.length;
  }

  function render() {
    reemplazar(raiz,
      h('h1', { tabindex: '-1' }, 'Mis reservas'),
      mensaje,
      h('div', { class: 'barra-filtro' },
        CampoSelect({
          id: 'filtro-estado',
          etiqueta: 'Mostrar reservas',
          vacio: 'Todas',
          valor: filtro,
          opciones: Object.values(ESTADOS).map((e) => ({ valor: e, texto: e })),
          alCambiar: (valor) => {
            filtro = valor;
            const n = pintarLista();
            anunciar(`${n} reservas mostradas.`);
          },
        }),
        h('a', { class: 'btn btn--primario', href: '#/reservar' }, 'Nueva reserva')),
      lista);
    pintarLista();
  }

  render();
  return { titulo: 'Mis reservas · Tutoría UX', elemento: raiz };
}
