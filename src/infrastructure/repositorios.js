// Capa de infraestructura: persistencia local.
// Los repositorios reciben un "storage" con la interfaz de Web Storage
// (getItem / setItem / removeItem). En el navegador se usa localStorage;
// en las pruebas se usa AlmacenEnMemoria.

import { ASIGNATURAS, DOCENTES } from './catalogoDatos.js';

export class AlmacenEnMemoria {
  constructor() { this.datos = new Map(); }
  getItem(clave) { return this.datos.has(clave) ? this.datos.get(clave) : null; }
  setItem(clave, valor) { this.datos.set(clave, String(valor)); }
  removeItem(clave) { this.datos.delete(clave); }
}

function leerJSON(storage, clave, porDefecto) {
  try {
    const texto = storage.getItem(clave);
    return texto ? JSON.parse(texto) : porDefecto;
  } catch {
    return porDefecto; // datos corruptos: se ignoran en lugar de romper la app
  }
}

export class CatalogoRepository {
  constructor({ asignaturas = ASIGNATURAS, docentes = DOCENTES } = {}) {
    this.asignaturas = asignaturas;
    this.docentes = docentes;
  }
  listarAsignaturas() { return [...this.asignaturas]; }
  listarDocentes() { return [...this.docentes]; }
  obtenerDocente(id) { return this.docentes.find((d) => d.id === id) || null; }
  obtenerAsignatura(id) { return this.asignaturas.find((a) => a.id === id) || null; }
}

export class ReservaRepository {
  constructor(storage, clave = 'tutoriaux.reservas') {
    this.storage = storage;
    this.clave = clave;
  }
  listar() { return leerJSON(this.storage, this.clave, []); }
  obtener(id) { return this.listar().find((r) => r.id === id) || null; }
  guardar(reserva) {
    const reservas = this.listar().filter((r) => r.id !== reserva.id);
    reservas.push(reserva);
    this.storage.setItem(this.clave, JSON.stringify(reservas));
    return reserva;
  }
}

/** Guarda el avance del formulario para no perder lo elegido al volver o recargar. */
export class BorradorRepository {
  constructor(storage, clave = 'tutoriaux.borrador') {
    this.storage = storage;
    this.clave = clave;
  }
  leer() { return leerJSON(this.storage, this.clave, null); }
  guardar(borrador) { this.storage.setItem(this.clave, JSON.stringify(borrador)); }
  limpiar() { this.storage.removeItem(this.clave); }
}
