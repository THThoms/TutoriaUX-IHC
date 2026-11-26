import { h } from './dom.js';

export const NOMBRES_PASOS = ['Docente', 'Fecha y hora', 'Tus datos', 'Confirmar'];

/** Indicador de progreso del asistente de reserva. */
export function Pasos(pasoActual) {
  return h('nav', { class: 'pasos', 'aria-label': 'Progreso de la reserva' },
    h('ol', {},
      NOMBRES_PASOS.map((nombre, i) => {
        const numero = i + 1;
        const estado = numero < pasoActual ? 'hecho' : numero === pasoActual ? 'actual' : 'pendiente';
        return h('li', { class: `pasos__item pasos__item--${estado}`, 'aria-current': estado === 'actual' ? 'step' : null },
          h('span', { class: 'pasos__numero', 'aria-hidden': 'true' }, estado === 'hecho' ? '✓' : numero),
          h('span', { class: 'pasos__nombre' },
            nombre,
            h('span', { class: 'sr-only' }, estado === 'hecho' ? ' (completado)' : estado === 'pendiente' ? ' (pendiente)' : ' (paso actual)')));
      })),
    h('p', { class: 'pasos__texto' }, `Paso ${pasoActual} de ${NOMBRES_PASOS.length}`));
}
