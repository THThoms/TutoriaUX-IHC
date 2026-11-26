import { CampoTexto } from './Campos.js';
import { DIAS, sumarDias, fechaLarga } from '../../domain/fechas.js';
import { DIAS_MAXIMOS_ANTICIPACION } from '../../domain/validaciones.js';

/** Días de atención del docente en texto: "lunes y miércoles". */
export function diasDeAtencion(docente) {
  const dias = Object.keys(docente.horario).map((d) => DIAS[d]);
  return dias.length > 1 ? `${dias.slice(0, -1).join(', ')} y ${dias.at(-1)}` : dias[0];
}

/**
 * Selector de fecha (v1): campo de fecha nativo limitado a los próximos 30 días,
 * con los días de atención del docente como ayuda.
 */
export function SelectorFecha({ servicio, docente, valor, error, alCambiar }) {
  const hoy = servicio.hoyISO();
  const maximo = sumarDias(hoy, DIAS_MAXIMOS_ANTICIPACION);
  return CampoTexto({
    id: 'fecha',
    etiqueta: 'Fecha de la tutoría',
    tipo: 'date',
    valor,
    error,
    ayuda: `${docente.nombre} atiende los ${diasDeAtencion(docente)}. Puedes reservar hasta el ${fechaLarga(maximo)}.`,
    atributos: { min: hoy, max: maximo, required: true },
    alCambiar,
  });
}
