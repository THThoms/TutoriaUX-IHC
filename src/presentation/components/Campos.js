// Campos de formulario accesibles: etiqueta visible, ayuda y error asociados
// con aria-describedby; el error se muestra junto al campo con texto, no solo color.

import { h } from './dom.js';

function descripciones(id, ayuda, error) {
  return [ayuda ? `${id}-ayuda` : '', error ? `${id}-error` : ''].filter(Boolean).join(' ') || null;
}

function mensajes(id, ayuda, error) {
  return [
    ayuda ? h('p', { class: 'campo__ayuda', id: `${id}-ayuda` }, ayuda) : null,
    error ? h('p', { class: 'campo__error', id: `${id}-error` }, h('span', { 'aria-hidden': 'true' }, '✕ '), error) : null,
  ];
}

export function CampoTexto({ id, etiqueta, valor = '', error, ayuda, tipo = 'text', multilinea = false, alCambiar, atributos = {} }) {
  const control = h(multilinea ? 'textarea' : 'input', {
    id,
    name: id,
    type: multilinea ? null : tipo,
    class: 'campo__control',
    'aria-invalid': error ? 'true' : null,
    'aria-describedby': descripciones(id, ayuda, error),
    oninput: (e) => alCambiar?.(e.target.value, e),
    ...atributos,
  });
  control.value = valor;
  return h('div', { class: `campo${error ? ' campo--error' : ''}` },
    h('label', { class: 'campo__etiqueta', for: id }, etiqueta),
    mensajes(id, ayuda, error),
    control);
}

export function CampoSelect({ id, etiqueta, opciones, valor = '', error, ayuda, alCambiar, vacio = 'Selecciona una opción' }) {
  const control = h('select', {
    id,
    name: id,
    class: 'campo__control',
    'aria-invalid': error ? 'true' : null,
    'aria-describedby': descripciones(id, ayuda, error),
    onchange: (e) => alCambiar?.(e.target.value, e),
  },
  h('option', { value: '' }, vacio),
  opciones.map((o) => h('option', { value: o.valor, selected: o.valor === valor }, o.texto)));
  return h('div', { class: `campo${error ? ' campo--error' : ''}` },
    h('label', { class: 'campo__etiqueta', for: id }, etiqueta),
    mensajes(id, ayuda, error),
    control);
}

/**
 * Grupo de opciones (radio) dentro de un fieldset con legend.
 * opciones: [{ valor, texto, detalle?, deshabilitada? }]
 */
export function GrupoOpciones({ id, leyenda, opciones, valor = '', error, ayuda, alCambiar, variante = '' }) {
  return h('fieldset', {
    class: `grupo ${variante ? `grupo--${variante}` : ''}${error ? ' campo--error' : ''}`,
    id,
    'aria-describedby': descripciones(id, ayuda, error),
    tabindex: '-1',
  },
  h('legend', { class: 'campo__etiqueta' }, leyenda),
  mensajes(id, ayuda, error),
  h('div', { class: 'grupo__opciones' },
    opciones.map((o, i) => {
      const idOpcion = `${id}-${i}`;
      return h('div', { class: `opcion${o.deshabilitada ? ' opcion--deshabilitada' : ''}` },
        h('input', {
          type: 'radio',
          id: idOpcion,
          name: id,
          value: o.valor,
          checked: o.valor === valor,
          disabled: Boolean(o.deshabilitada),
          onchange: (e) => alCambiar?.(e.target.value, e),
        }),
        h('label', { for: idOpcion, class: 'opcion__etiqueta' },
          h('span', { class: 'opcion__texto' }, o.texto),
          o.detalle ? h('span', { class: 'opcion__detalle' }, o.detalle) : null));
    })));
}

/** Resumen de errores al inicio del formulario con enlaces a cada campo. */
export function ResumenErrores(errores, etiquetas) {
  const claves = Object.keys(errores);
  if (!claves.length) return null;
  return h('div', { class: 'alerta alerta--error resumen-errores', role: 'alert', tabindex: '-1', id: 'resumen-errores' },
    h('span', { class: 'alerta__icono', 'aria-hidden': 'true' }, '!'),
    h('div', { class: 'alerta__cuerpo' },
      h('p', { class: 'alerta__titulo' },
        claves.length === 1 ? 'Falta corregir 1 dato' : `Faltan corregir ${claves.length} datos`),
      h('p', {}, 'Tus otras respuestas se conservaron.'),
      h('ul', {}, claves.map((c) => h('li', {},
        etiquetas[c]
          ? h('a', { href: `#${c}`, onclick: (e) => { e.preventDefault(); enfocarCampo(c); } }, `${etiquetas[c]}: ${errores[c]}`)
          : errores[c])))));
}

export function enfocarCampo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const objetivo = el.matches('fieldset')
    ? (el.querySelector('input:checked:not(:disabled)') || el.querySelector('input:not(:disabled)') || el)
    : el;
  objetivo.focus();
  el.scrollIntoView({ block: 'center', behavior: 'smooth' });
}
