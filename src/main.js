// Punto de composición: aquí se conectan las capas.
// presentación -> aplicación -> dominio, e infraestructura inyectada en aplicación.

import { ReservaService } from './application/reservaService.js';
import {
  AlmacenEnMemoria, CatalogoRepository, ReservaRepository, BorradorRepository,
} from './infrastructure/repositorios.js';
import { iniciarApp } from './presentation/app.js';

function obtenerAlmacen() {
  try {
    const prueba = '__tutoriaux__';
    localStorage.setItem(prueba, '1');
    localStorage.removeItem(prueba);
    return localStorage;
  } catch {
    console.warn('localStorage no disponible: los datos se perderán al cerrar la pestaña.');
    return new AlmacenEnMemoria();
  }
}

const almacen = obtenerAlmacen();

const servicio = new ReservaService({
  catalogo: new CatalogoRepository(),
  reservas: new ReservaRepository(almacen),
  borrador: new BorradorRepository(almacen),
});

iniciarApp({ servicio, contenedor: document.getElementById('contenido') });
