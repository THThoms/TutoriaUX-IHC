// Validaciones de dominio. Devuelven mensajes claros en español que la interfaz
// muestra junto a cada campo (qué pasó y cómo corregirlo).

import { MODALIDADES } from './reserva.js';
import { esFechaISOValida, diaSemana, sumarDias, DIAS } from './fechas.js';

export const DIAS_MAXIMOS_ANTICIPACION = 30;
const CORREO_UTA = /^[a-z0-9._%+-]+@uta\.edu\.ec$/i;

export function validarSeleccion(datos, docente) {
  const errores = {};
  if (!datos.asignaturaId) errores.asignaturaId = 'Elige la asignatura en la que necesitas ayuda.';
  if (!datos.docenteId) {
    errores.docenteId = 'Elige un docente de la lista para continuar.';
  } else if (!docente) {
    errores.docenteId = 'El docente elegido ya no está disponible. Elige otro.';
  } else if (datos.asignaturaId && !docente.asignaturas.includes(datos.asignaturaId)) {
    errores.docenteId = 'Este docente no dicta la asignatura elegida. Elige otro docente o cambia la asignatura.';
  }
  return errores;
}

export function validarHorario(datos, docente, { hoyISO, horasOcupadas = [] }) {
  const errores = {};
  if (!datos.modalidad) {
    errores.modalidad = 'Elige si la tutoría será presencial o virtual.';
  } else if (!MODALIDADES.includes(datos.modalidad) || (docente && !docente.modalidades.includes(datos.modalidad))) {
    errores.modalidad = `Este docente solo atiende en modalidad ${docente ? docente.modalidades.join(' o ').toLowerCase() : ''}.`;
  }

  if (!datos.fecha) {
    errores.fecha = 'Elige la fecha de la tutoría.';
  } else if (!esFechaISOValida(datos.fecha)) {
    errores.fecha = 'La fecha no es válida. Usa el calendario para elegirla.';
  } else if (datos.fecha < hoyISO) {
    errores.fecha = 'La fecha ya pasó. Elige hoy o un día posterior.';
  } else if (datos.fecha > sumarDias(hoyISO, DIAS_MAXIMOS_ANTICIPACION)) {
    errores.fecha = `Solo puedes reservar con un máximo de ${DIAS_MAXIMOS_ANTICIPACION} días de anticipación.`;
  } else if (docente && !docente.horario[diaSemana(datos.fecha)]) {
    const dias = Object.keys(docente.horario).map((d) => DIAS[d]).join(' y ');
    errores.fecha = `El docente no atiende ese día. Atiende los ${dias}.`;
  }

  if (!datos.hora) {
    errores.hora = 'Elige un horario disponible.';
  } else if (!errores.fecha && docente) {
    const franjas = docente.horario[diaSemana(datos.fecha)] || [];
    if (!franjas.includes(datos.hora)) {
      errores.hora = 'Ese horario no pertenece a la atención del docente. Elige otro.';
    } else if (horasOcupadas.includes(datos.hora)) {
      errores.hora = 'Otro estudiante acaba de reservar ese horario. Elige otro disponible.';
    }
  }
  return errores;
}

export function validarEstudiante(datos) {
  const errores = {};
  const nombre = (datos.nombre || '').trim();
  const correo = (datos.correo || '').trim();
  const motivo = (datos.motivo || '').trim();

  if (!nombre) errores.nombre = 'Escribe tu nombre completo.';
  else if (nombre.length < 5 || !/^[\p{L} '.-]+$/u.test(nombre)) {
    errores.nombre = 'Escribe tu nombre y apellido usando solo letras.';
  }

  if (!correo) errores.correo = 'Escribe tu correo institucional.';
  else if (!CORREO_UTA.test(correo)) {
    errores.correo = 'Usa tu correo institucional, por ejemplo: nombre1234@uta.edu.ec';
  }

  if (!motivo) errores.motivo = 'Cuenta brevemente en qué tema necesitas ayuda.';
  else if (motivo.length < 10) errores.motivo = 'Describe el tema con al menos 10 caracteres.';
  else if (motivo.length > 300) errores.motivo = 'El motivo no puede superar 300 caracteres.';
  return errores;
}

/** Valida la reserva completa (los tres grupos de datos). */
export function validarReserva(datos, docente, contexto) {
  return {
    ...validarSeleccion(datos, docente),
    ...validarHorario(datos, docente, contexto),
    ...validarEstudiante(datos),
  };
}
