// Diálogo de confirmación accesible (v2 · corrige H-01).
// Usa <dialog> nativo con showModal(): mantiene el foco dentro, se cierra con Escape
// y al cerrarse devuelve el foco al botón que lo abrió.

import { h } from './dom.js';

let contador = 0;

/**
 * @returns {Promise<boolean>} true si el usuario confirma.
 */
export function DialogoConfirmacion({ titulo, mensaje, detalle = null, confirmar, volver, disparador }) {
  contador += 1;
  const idTitulo = `dialogo-titulo-${contador}`;
  const idMensaje = `dialogo-mensaje-${contador}`;

  return new Promise((resolver) => {
    let confirmado = false;
    const dialogo = h('dialog', {
      class: 'dialogo',
      'aria-labelledby': idTitulo,
      'aria-describedby': idMensaje,
    },
    h('h2', { id: idTitulo, class: 'dialogo__titulo' }, titulo),
    h('p', { id: idMensaje }, mensaje),
    detalle,
    h('div', { class: 'dialogo__acciones' },
      h('button', {
        type: 'button',
        class: 'btn btn--secundario',
        autofocus: true, // la opción segura recibe el foco
        onclick: () => dialogo.close(),
      }, volver),
      h('button', {
        type: 'button',
        class: 'btn btn--peligro-solido',
        onclick: () => { confirmado = true; dialogo.close(); },
      }, confirmar)));

    dialogo.addEventListener('close', () => {
      dialogo.remove();
      if (!confirmado && disparador?.isConnected) disparador.focus();
      resolver(confirmado);
    });
    // Clic fuera del cuadro (en el fondo) = no cancelar.
    dialogo.addEventListener('click', (e) => { if (e.target === dialogo) dialogo.close(); });

    document.body.append(dialogo);
    dialogo.showModal();
  });
}
