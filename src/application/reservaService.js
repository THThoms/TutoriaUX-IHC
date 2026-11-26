// Capa de aplicación: casos de uso del sistema de tutorías.
// Orquesta el dominio y los repositorios; no conoce el DOM.

import {
  ESTADOS, ErrorDeDominio, crearReserva, modificarReserva, cancelarReserva, ocupaHorario, esEditable,
} from '../domain/reserva.js';
import { validarSeleccion, validarHorario, validarEstudiante, validarReserva } from '../domain/validaciones.js';
import { aISO, diaSemana } from '../domain/fechas.js';

function normalizar(texto) {
  return texto.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
}

function generarCodigo() {
  const letras = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let codigo = 'TUT-';
  for (let i = 0; i < 5; i += 1) codigo += letras[Math.floor(Math.random() * letras.length)];
  return codigo;
}

export class ReservaService {
  constructor({ catalogo, reservas, borrador, reloj = () => new Date(), generarId = generarCodigo }) {
    this.catalogo = catalogo;
    this.reservas = reservas;
    this.borrador = borrador;
    this.reloj = reloj;
    this.generarId = generarId;
  }

  hoyISO() { return aISO(this.reloj()); }

  // --- R1: consultar docentes y asignaturas -------------------------------
  listarAsignaturas() { return this.catalogo.listarAsignaturas(); }
  obtenerAsignatura(id) { return this.catalogo.obtenerAsignatura(id); }
  obtenerDocente(id) { return this.catalogo.obtenerDocente(id); }

  buscarDocentes({ texto = '', asignaturaId = '' } = {}) {
    const consulta = normalizar(texto);
    return this.catalogo.listarDocentes().filter((docente) => {
      if (asignaturaId && !docente.asignaturas.includes(asignaturaId)) return false;
      if (!consulta) return true;
      const nombres = docente.asignaturas.map((id) => this.catalogo.obtenerAsignatura(id)?.nombre || '');
      return normalizar([docente.nombre, ...nombres].join(' ')).includes(consulta);
    });
  }

  // --- R2: disponibilidad de horarios ------------------------------------
  horasOcupadas(docenteId, fecha, excluirId = null) {
    return this.reservas.listar()
      .filter((r) => r.id !== excluirId && r.docenteId === docenteId && r.fecha === fecha && ocupaHorario(r))
      .map((r) => r.hora);
  }

  horariosDelDia(docenteId, fecha, { excluirId = null } = {}) {
    const docente = this.catalogo.obtenerDocente(docenteId);
    if (!docente || !fecha) return [];
    const franjas = docente.horario[diaSemana(fecha)] || [];
    const ocupadas = this.horasOcupadas(docenteId, fecha, excluirId);
    return franjas.map((hora) => ({ hora, disponible: !ocupadas.includes(hora) }));
  }

  /** Valida un paso del asistente: 1 = docente, 2 = horario, 3 = datos del estudiante. */
  validarPaso(paso, datos, { excluirId = null } = {}) {
    const docente = this.catalogo.obtenerDocente(datos.docenteId);
    if (paso === 1) return validarSeleccion(datos, docente);
    if (paso === 2) {
      return validarHorario(datos, docente, {
        hoyISO: this.hoyISO(),
        horasOcupadas: this.horasOcupadas(datos.docenteId, datos.fecha, excluirId),
      });
    }
    if (paso === 3) return validarEstudiante(datos);
    return {};
  }

  // --- R3: registrar reserva ---------------------------------------------
  crear(datos) {
    const docente = this.catalogo.obtenerDocente(datos.docenteId);
    const errores = validarReserva(datos, docente, {
      hoyISO: this.hoyISO(),
      horasOcupadas: this.horasOcupadas(datos.docenteId, datos.fecha),
    });
    if (Object.keys(errores).length) return { ok: false, errores };

    let id = this.generarId();
    while (this.reservas.obtener(id)) id = this.generarId();
    const reserva = crearReserva(datos, { id, ahora: this.reloj() });
    this.reservas.guardar(reserva);
    return { ok: true, reserva };
  }

  // --- R4: consultar reservas --------------------------------------------
  listarReservas({ estado = '' } = {}) {
    return this.reservas.listar()
      .filter((r) => !estado || r.estado === estado)
      .sort((a, b) => `${a.fecha} ${a.hora}`.localeCompare(`${b.fecha} ${b.hora}`));
  }

  obtenerReserva(id) { return this.reservas.obtener(id); }

  puedeEditarse(reserva) { return esEditable(reserva, this.hoyISO()); }

  /** Datos listos para mostrar: nombres en lugar de identificadores. */
  describir(reserva) {
    return {
      ...reserva,
      docente: this.catalogo.obtenerDocente(reserva.docenteId),
      asignatura: this.catalogo.obtenerAsignatura(reserva.asignaturaId),
      editable: this.puedeEditarse(reserva),
    };
  }

  // --- R5: modificar reserva ---------------------------------------------
  modificar(id, datos) {
    const actual = this.reservas.obtener(id);
    if (!actual) return { ok: false, errores: { general: 'No encontramos esa reserva. Revisa el código.' } };
    const docente = this.catalogo.obtenerDocente(datos.docenteId);
    const errores = validarReserva(datos, docente, {
      hoyISO: this.hoyISO(),
      horasOcupadas: this.horasOcupadas(datos.docenteId, datos.fecha, id),
    });
    if (Object.keys(errores).length) return { ok: false, errores };
    try {
      const reserva = modificarReserva(actual, datos, { ahora: this.reloj(), hoyISO: this.hoyISO() });
      this.reservas.guardar(reserva);
      return { ok: true, reserva };
    } catch (error) {
      if (error instanceof ErrorDeDominio) return { ok: false, errores: { general: error.message } };
      throw error;
    }
  }

  // --- R6: cancelar reserva ----------------------------------------------
  cancelar(id) {
    const actual = this.reservas.obtener(id);
    if (!actual) return { ok: false, error: 'No encontramos esa reserva.' };
    try {
      const reserva = cancelarReserva(actual, { ahora: this.reloj(), hoyISO: this.hoyISO() });
      this.reservas.guardar(reserva);
      return { ok: true, reserva };
    } catch (error) {
      if (error instanceof ErrorDeDominio) return { ok: false, error: error.message };
      throw error;
    }
  }

  // --- Borrador: conservar lo elegido durante la corrección --------------
  leerBorrador() { return this.borrador.leer(); }
  guardarBorrador(borrador) { this.borrador.guardar(borrador); }
  descartarBorrador() { this.borrador.limpiar(); }
}

export { ESTADOS };
