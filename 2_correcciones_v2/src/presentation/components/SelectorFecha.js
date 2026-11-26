import { GrupoOpciones } from './Campos.js';
import { DIAS, sumarDias, fechaLarga, desdeISO } from '../../domain/fechas.js';
import { DIAS_MAXIMOS_ANTICIPACION } from '../../domain/validaciones.js';

const DIAS_CORTOS = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
const MESES_CORTOS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

/** Días de atención del docente en texto: "lunes y miércoles". */
export function diasDeAtencion(docente) {
  const dias = Object.keys(docente.horario).map((d) => DIAS[d]);
  return dias.length > 1 ? `${dias.slice(0, -1).join(', ')} y ${dias.at(-1)}` : dias[0];
}

function fechaCorta(iso) {
  const f = desdeISO(iso);
  return `${DIAS_CORTOS[f.getDay()]} ${f.getDate()} ${MESES_CORTOS[f.getMonth()]}`;
}

/**
 * Selector de fecha (v2 · corrige H-02).
 * En lugar de un calendario libre donde se podían elegir días sin atención,
 * muestra solo las fechas en que el docente atiende y cuántos horarios quedan.
 * Las fechas completas se ven pero no se pueden elegir.
 */
export function SelectorFecha({ servicio, docente, valor, error, excluirId, alCambiar }) {
  const maximo = sumarDias(servicio.hoyISO(), DIAS_MAXIMOS_ANTICIPACION);
  const fechas = servicio.fechasDisponibles(docente.id, { excluirId });
  return GrupoOpciones({
    id: 'fecha',
    leyenda: 'Fecha de la tutoría',
    variante: 'chips',
    valor,
    error,
    ayuda: `Solo ves los días en que ${docente.nombre} atiende (${diasDeAtencion(docente)}), hasta el ${fechaLarga(maximo)}.`,
    opciones: fechas.map(({ fecha, libres }) => ({
      valor: fecha,
      texto: fechaCorta(fecha),
      detalle: libres === 0 ? 'Completo' : `${libres} ${libres === 1 ? 'horario libre' : 'horarios libres'}`,
      deshabilitada: libres === 0 && fecha !== valor,
    })),
    alCambiar,
  });
}
