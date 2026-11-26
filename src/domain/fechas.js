// Utilidades de fecha del dominio. Las fechas se manejan como texto ISO "AAAA-MM-DD"
// para evitar problemas de zona horaria al guardarlas.

export const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto',
  'septiembre', 'octubre', 'noviembre', 'diciembre'];

export function aISO(fecha) {
  const a = fecha.getFullYear();
  const m = String(fecha.getMonth() + 1).padStart(2, '0');
  const d = String(fecha.getDate()).padStart(2, '0');
  return `${a}-${m}-${d}`;
}

export function desdeISO(iso) {
  const [a, m, d] = iso.split('-').map(Number);
  return new Date(a, m - 1, d);
}

export function esFechaISOValida(iso) {
  if (typeof iso !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return false;
  return aISO(desdeISO(iso)) === iso;
}

export function sumarDias(iso, dias) {
  const f = desdeISO(iso);
  f.setDate(f.getDate() + dias);
  return aISO(f);
}

/** Número de día de la semana: 0 = domingo ... 6 = sábado. */
export function diaSemana(iso) {
  return desdeISO(iso).getDay();
}

/** "lunes 7 de diciembre de 2026" */
export function fechaLarga(iso) {
  const f = desdeISO(iso);
  return `${DIAS[f.getDay()]} ${f.getDate()} de ${MESES[f.getMonth()]} de ${f.getFullYear()}`;
}
