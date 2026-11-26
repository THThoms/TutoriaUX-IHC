// Pruebas de las correcciones v2 (ver evaluacion/hallazgos.md).

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { crearServicio, datosValidos } from './ayudantes.js';

describe('v2 · H-02 Fechas disponibles en lugar de calendario libre', () => {
  test('F23 solo devuelve días en que el docente atiende, dentro de los 30 días', () => {
    const { servicio } = crearServicio(); // hoy: lunes 7/12/2026
    const fechas = servicio.fechasDisponibles('d01'); // atiende lunes y miércoles
    assert.ok(fechas.length > 0);
    for (const { fecha } of fechas) {
      const dia = new Date(`${fecha}T12:00:00`).getDay();
      assert.ok(dia === 1 || dia === 3, `${fecha} no es lunes ni miércoles`);
      assert.ok(fecha >= '2026-12-07' && fecha <= '2027-01-06');
    }
    assert.equal(fechas[0].fecha, '2026-12-07');
    assert.equal(fechas[1].fecha, '2026-12-09');
  });

  test('F24 indica cuántos horarios quedan libres y marca los días completos', () => {
    const { servicio } = crearServicio();
    servicio.crear(datosValidos({ hora: '14:00' }));
    let miercoles = servicio.fechasDisponibles('d01').find((f) => f.fecha === '2026-12-09');
    assert.deepEqual(miercoles, { fecha: '2026-12-09', libres: 1, total: 2 });
    servicio.crear(datosValidos({ hora: '15:00', correo: 'otro123@uta.edu.ec' }));
    miercoles = servicio.fechasDisponibles('d01').find((f) => f.fecha === '2026-12-09');
    assert.equal(miercoles.libres, 0);
  });

  test('F25 al modificar, el horario propio cuenta como libre', () => {
    const { servicio } = crearServicio();
    const { reserva } = servicio.crear(datosValidos({ hora: '14:00' }));
    const miercoles = servicio.fechasDisponibles('d01', { excluirId: reserva.id })
      .find((f) => f.fecha === '2026-12-09');
    assert.equal(miercoles.libres, 2);
  });

  test('F26 docente inexistente devuelve lista vacía', () => {
    const { servicio } = crearServicio();
    assert.deepEqual(servicio.fechasDisponibles('nadie'), []);
  });
});
