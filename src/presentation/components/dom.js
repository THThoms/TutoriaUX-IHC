// Ayudante mínimo para crear elementos del DOM sin librerías.
// h('button', { class: 'btn', onclick: fn }, 'Texto')

export function h(etiqueta, props = {}, ...hijos) {
  const el = document.createElement(etiqueta);
  for (const [clave, valor] of Object.entries(props || {})) {
    if (valor === false || valor === null || valor === undefined) continue;
    if (clave.startsWith('on') && typeof valor === 'function') {
      el.addEventListener(clave.slice(2).toLowerCase(), valor);
    } else if (clave === 'class') {
      el.className = valor;
    } else if (clave === 'html') {
      el.innerHTML = valor;
    } else if (clave in el && typeof valor !== 'string') {
      el[clave] = valor; // propiedades como checked, disabled, value
    } else {
      el.setAttribute(clave, valor === true ? '' : valor);
    }
  }
  agregar(el, hijos);
  return el;
}

function agregar(el, hijos) {
  for (const hijo of hijos.flat(Infinity)) {
    if (hijo === null || hijo === undefined || hijo === false) continue;
    el.append(hijo instanceof Node ? hijo : document.createTextNode(String(hijo)));
  }
}

export function reemplazar(contenedor, ...hijos) {
  contenedor.replaceChildren();
  agregar(contenedor, hijos);
}

/** Anuncia un mensaje a lectores de pantalla mediante la región viva global. */
export function anunciar(mensaje) {
  const region = document.getElementById('anuncios');
  if (!region) return;
  region.textContent = '';
  setTimeout(() => { region.textContent = mensaje; }, 50);
}
