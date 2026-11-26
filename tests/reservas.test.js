// Pruebas funcionales de los requisitos R1–R6 (ver docs/pruebas-funcionales.md).
// Ejecutar con: npm test   (o: node --test tests/)

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { crearServicio, datosValidos } from './ayudantes.js';
import { ESTADOS } from '../src/domain/reserva.js';
import { ReservaRepository } from '../src/infrastructure/repositorios.js';

describe('R1 · Consultar docentes y asignaturas', () => {
  test('F01 lista todas las asignaturas del catálogo', () => {
    const { servicio } = crearServicio();
    assert.equal(servicio.listarAsignaturas().length, 7);
  });

  test('F02 filtra docentes por asignatura', () => {
    const { servicio } = crearServicio();
    const nombres = servicio.buscarDocentes({ asignaturaId: 'ihc' }).map((d) => d.id);
    assert.deepEqual(nombres, ['d01', 'd03']);
  });

  test('F03 busca docentes por texto sin importar tildes ni mayúsculas', () => {
    const { servicio } = crearServicio();
    assert.deepEqual(servicio.buscarDocentes({ texto: 'VILLACIS' }).map((d) => d.id), ['d01']);
    assert.deepEqual(servicio.buscarDocentes({ texto: 'interaccion' }).map((d) => d.id), ['d01', 'd03']);
  });

  test('F04 una búsqueda sin coincidencias devuelve lista vacía', () => {
    const { servicio } = crearServicio();
    assert.equal(servicio.buscarDocentes({ texto: 'zzz' }).length, 0);
  });
});

describe('R2 · Elegir modalidad, fecha y horario', () => {
  test('F05 muestra los horarios del docente para el día elegido', () => {
    const { servicio } = crearServicio();
    const horas = servicio.horariosDelDia('d01', '2026-12-09');
    assert.deepEqual(horas, [{ hora: '14:00', disponible: true }, { hora: '15:00', disponible: true }]);
  });

  test('F06 un horario reservado aparece como no disponible', () => {
    const { servicio } = crearServicio();
    servicio.crear(datosValidos());
    const horas = servicio.horariosDelDia('d01', '2026-12-09');
    assert.equal(horas.find((x) => x.hora === '14:00').disponible, false);
  });

  test('F07 rechaza un día en que el docente no atiende, indicando qué días sí atiende', () => {
    const { servicio } = crearServicio();
    const errores = servicio.validarPaso(2, datosValidos({ fecha: '2026-12-08' })); // martes
    assert.match(errores.fecha, /lunes y miércoles/);
  });

  test('F08 rechaza fechas pasadas y fechas a más de 30 días', () => {
    const { servicio } = crearServicio();
    assert.match(servicio.validarPaso(2, datosValidos({ fecha: '2026-12-02' })).fecha, /ya pasó/);
    assert.match(servicio.validarPaso(2, datosValidos({ fecha: '2027-01-13' })).fecha, /30 días/);
  });

  test('F09 rechaza una modalidad que el docente no ofrece', () => {
    const { servicio } = crearServicio();
    const errores = servicio.validarPaso(2, datosValidos({ docenteId: 'd03', modalidad: 'Presencial', fecha: '2026-12-09', hora: '09:00' }));
    assert.match(errores.modalidad, /virtual/);
  });
});

describe('R3 · Registrar reserva', () => {
  test('F10 registra una reserva válida en estado Confirmada y con código', () => {
    const { servicio } = crearServicio();
    const r = servicio.crear(datosValidos());
    assert.equal(r.ok, true);
    assert.equal(r.reserva.estado, ESTADOS.CONFIRMADA);
    assert.equal(r.reserva.id, 'TUT-T0001');
    assert.equal(r.reserva.estudiante.correo, 'mperez1234@uta.edu.ec');
  });

  test('F11 devuelve un mensaje claro por cada campo inválido', () => {
    const { servicio } = crearServicio();
    const r = servicio.crear(datosValidos({ nombre: 'A1', correo: 'maria@gmail.com', motivo: 'ayuda' }));
    assert.equal(r.ok, false);
    assert.deepEqual(Object.keys(r.errores).sort(), ['correo', 'motivo', 'nombre']);
    assert.match(r.errores.correo, /@uta\.edu\.ec/);
  });

  test('F12 impide reservar dos veces el mismo horario del mismo docente', () => {
    const { servicio } = crearServicio();
    servicio.crear(datosValidos());
    const r = servicio.crear(datosValidos({ nombre: 'Juan Torres', correo: 'jtorres9@uta.edu.ec' }));
    assert.equal(r.ok, false);
    assert.match(r.errores.hora, /acaba de reservar/);
  });

  test('F13 la reserva queda guardada en el almacenamiento local', () => {
    const { servicio, almacen } = crearServicio();
    servicio.crear(datosValidos());
    const otraSesion = new ReservaRepository(almacen);
    assert.equal(otraSesion.listar().length, 1);
  });
});

describe('R4 · Consultar reservas', () => {
  test('F14 lista las reservas ordenadas por fecha y hora y permite filtrar por estado', () => {
    const { servicio } = crearServicio();
    servicio.crear(datosValidos({ fecha: '2026-12-14', hora: '08:00' })); // lunes
    servicio.crear(datosValidos());
    const ids = servicio.listarReservas().map((r) => r.fecha);
    assert.deepEqual(ids, ['2026-12-09', '2026-12-14']);
    servicio.cancelar('TUT-T0001');
    assert.equal(servicio.listarReservas({ estado: ESTADOS.CANCELADA }).length, 1);
    assert.equal(servicio.listarReservas({ estado: ESTADOS.CONFIRMADA }).length, 1);
  });

  test('F15 describe la reserva con nombres de docente y asignatura', () => {
    const { servicio } = crearServicio();
    const { reserva } = servicio.crear(datosValidos());
    const vista = servicio.describir(reserva);
    assert.equal(vista.docente.nombre, 'Ing. Andrea Villacís');
    assert.equal(vista.asignatura.nombre, 'Interacción Humano-Computador');
    assert.equal(vista.editable, true);
  });
});

describe('R5 · Modificar reserva', () => {
  test('F16 modifica la reserva conservando el código y la deja en estado Modificada', () => {
    const { servicio } = crearServicio();
    const { reserva } = servicio.crear(datosValidos());
    const r = servicio.modificar(reserva.id, datosValidos({ hora: '15:00', modalidad: 'Virtual' }));
    assert.equal(r.ok, true);
    assert.equal(r.reserva.id, reserva.id);
    assert.equal(r.reserva.estado, ESTADOS.MODIFICADA);
    assert.equal(r.reserva.historial.length, 2);
  });

  test('F17 al modificar se puede mantener el mismo horario (no choca consigo misma)', () => {
    const { servicio } = crearServicio();
    const { reserva } = servicio.crear(datosValidos());
    const r = servicio.modificar(reserva.id, datosValidos({ motivo: 'Nuevo tema: pruebas con usuarios' }));
    assert.equal(r.ok, true);
  });

  test('F18 no permite modificar una reserva cancelada', () => {
    const { servicio } = crearServicio();
    const { reserva } = servicio.crear(datosValidos());
    servicio.cancelar(reserva.id);
    const r = servicio.modificar(reserva.id, datosValidos());
    assert.equal(r.ok, false);
    assert.match(r.errores.general, /cancelada/);
  });

  test('F19 el borrador conserva lo elegido al volver o recargar', () => {
    const { servicio } = crearServicio();
    servicio.guardarBorrador({ modo: 'nueva', paso: 3, datos: datosValidos({ nombre: '' }) });
    const recuperado = servicio.leerBorrador();
    assert.equal(recuperado.paso, 3);
    assert.equal(recuperado.datos.docenteId, 'd01');
    assert.equal(recuperado.datos.hora, '14:00');
    servicio.descartarBorrador();
    assert.equal(servicio.leerBorrador(), null);
  });
});

describe('R6 · Cancelar reserva', () => {
  test('F20 cancela la reserva y libera el horario', () => {
    const { servicio } = crearServicio();
    const { reserva } = servicio.crear(datosValidos());
    const r = servicio.cancelar(reserva.id);
    assert.equal(r.ok, true);
    assert.equal(r.reserva.estado, ESTADOS.CANCELADA);
    assert.equal(servicio.horariosDelDia('d01', '2026-12-09')[0].disponible, true);
  });

  test('F21 no permite cancelar dos veces ni una reserva inexistente', () => {
    const { servicio } = crearServicio();
    const { reserva } = servicio.crear(datosValidos());
    servicio.cancelar(reserva.id);
    assert.match(servicio.cancelar(reserva.id).error, /ya estaba cancelada/);
    assert.equal(servicio.cancelar('TUT-NOEXISTE').ok, false);
  });

  test('F22 una tutoría pasada no se puede cancelar ni modificar', () => {
    const { servicio, almacen } = crearServicio();
    const { reserva } = servicio.crear(datosValidos());
    const { servicio: despues } = crearServicio({ ahora: new Date(2026, 11, 10) });
    despues.reservas = new ReservaRepository(almacen);
    assert.equal(despues.cancelar(reserva.id).ok, false);
    assert.equal(despues.puedeEditarse(reserva), false);
  });
});
