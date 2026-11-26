// Enrutador por hash y gestión de foco/título entre pantallas.

import { vistaInicio } from './views/inicioView.js';
import { vistaReservar } from './views/reservarView.js';
import { vistaMisReservas } from './views/misReservasView.js';
import { vistaDetalle } from './views/detalleView.js';
import { h } from './components/dom.js';
import { Alerta } from './components/Alerta.js';

export function iniciarApp({ servicio, contenedor }) {
  let primeraCarga = true;

  const ctx = {
    servicio,
    navegar(hash) {
      if (location.hash === hash) mostrar();
      else location.hash = hash;
    },
    recargar() { mostrar(); },
  };

  function resolver() {
    const [ruta, consulta] = (location.hash.slice(1) || '/').split('?');
    const params = new URLSearchParams(consulta || '');
    const partes = ruta.split('/').filter(Boolean).map(decodeURIComponent);

    if (!partes.length) return { vista: vistaInicio(ctx), seccion: 'inicio' };
    if (partes[0] === 'reservar' && partes[1] === 'editar' && partes[2]) {
      return { vista: vistaReservar(ctx, { editarId: partes[2] }), seccion: 'reservas' };
    }
    if (partes[0] === 'reservar') return { vista: vistaReservar(ctx), seccion: 'reservar' };
    if (partes[0] === 'reservas' && partes[1]) {
      return { vista: vistaDetalle(ctx, { id: partes[1], ok: params.get('ok') }), seccion: 'reservas' };
    }
    if (partes[0] === 'reservas') {
      return { vista: vistaMisReservas(ctx, { estado: params.get('estado') || '' }), seccion: 'reservas' };
    }
    return {
      seccion: '',
      vista: {
        titulo: 'Página no encontrada · Tutoría UX',
        elemento: h('section', { class: 'vista' },
          h('h1', { tabindex: '-1' }, 'No encontramos esta página'),
          Alerta({
            tipo: 'aviso',
            mensaje: 'El enlace puede estar incompleto.',
            acciones: [h('a', { class: 'btn btn--primario', href: '#/' }, 'Ir al inicio')],
          })),
      },
    };
  }

  function mostrar() {
    const { vista, seccion } = resolver();
    contenedor.replaceChildren(vista.elemento);
    if (!vista.mantenerTitulo) document.title = vista.titulo;

    document.querySelectorAll('[data-seccion]').forEach((enlace) => {
      if (enlace.dataset.seccion === seccion) enlace.setAttribute('aria-current', 'page');
      else enlace.removeAttribute('aria-current');
    });

    // Al cambiar de pantalla el foco va al título, así el lector de pantalla
    // anuncia la nueva página y el teclado continúa desde ahí.
    if (!primeraCarga) {
      window.scrollTo(0, 0);
      contenedor.querySelector('h1')?.focus();
    }
    primeraCarga = false;
  }

  // El enlace "Saltar al contenido" no debe cambiar la ruta (usamos hash para navegar).
  document.querySelector('.saltar')?.addEventListener('click', (e) => {
    e.preventDefault();
    contenedor.focus();
  });

  window.addEventListener('hashchange', mostrar);
  mostrar();
  return ctx;
}
