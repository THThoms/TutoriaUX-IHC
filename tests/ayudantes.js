// Ayudantes para las pruebas: servicio con almacenamiento en memoria y reloj fijo.

import { ReservaService } from '../src/application/reservaService.js';
import {
  AlmacenEnMemoria, CatalogoRepository, ReservaRepository, BorradorRepository,
} from '../src/infrastructure/repositorios.js';

// Lunes 7 de diciembre de 2026, 10:00. Así las pruebas no dependen del día en que se ejecutan.
export const HOY = new Date(2026, 11, 7, 10, 0, 0);

export function crearServicio({ ahora = HOY } = {}) {
  const almacen = new AlmacenEnMemoria();
  let contador = 0;
  const servicio = new ReservaService({
    catalogo: new CatalogoRepository(),
    reservas: new ReservaRepository(almacen),
    borrador: new BorradorRepository(almacen),
    reloj: () => new Date(ahora),
    generarId: () => `TUT-T${String(++contador).padStart(4, '0')}`,
  });
  return { servicio, almacen };
}

// Reserva válida: Ing. Andrea Villacís atiende IHC los miércoles a las 14:00.
export function datosValidos(cambios = {}) {
  return {
    asignaturaId: 'ihc',
    docenteId: 'd01',
    modalidad: 'Presencial',
    fecha: '2026-12-09', // miércoles
    hora: '14:00',
    nombre: 'María Pérez',
    correo: 'mperez1234@uta.edu.ec',
    motivo: 'Dudas sobre la evaluación heurística del proyecto',
    ...cambios,
  };
}
