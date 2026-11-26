import { h } from './dom.js';

const ICONOS = { exito: '✓', error: '!', aviso: '!', info: 'i' };

/**
 * Mensaje de estado reutilizable.
 * tipo: 'exito' | 'error' | 'aviso' | 'info'
 * Los errores usan role="alert" para que se anuncien de inmediato.
 */
export function Alerta({ tipo = 'info', titulo, mensaje, acciones = [], id }) {
  return h('div', {
    class: `alerta alerta--${tipo}`,
    role: tipo === 'error' ? 'alert' : 'status',
    id,
    tabindex: '-1',
  },
  h('span', { class: 'alerta__icono', 'aria-hidden': 'true' }, ICONOS[tipo]),
  h('div', { class: 'alerta__cuerpo' },
    titulo ? h('p', { class: 'alerta__titulo' }, titulo) : null,
    mensaje ? (typeof mensaje === 'string' ? h('p', {}, mensaje) : mensaje) : null,
    acciones.length ? h('div', { class: 'alerta__acciones' }, acciones) : null));
}
