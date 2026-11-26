// Calcula las métricas de usabilidad a partir de los registros reales de las sesiones.
// Uso (desde la raíz del repositorio):  node evaluacion/calcular-metricas.js
//
// Lee:  evaluacion/metricas.csv  -> una fila por participante y tarea
//       evaluacion/sus.csv       -> una fila por participante con las 10 respuestas SUS
// Escribe en consola tablas en Markdown listas para pegar en resultados.md.

import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const carpeta = dirname(fileURLToPath(import.meta.url));

function leerCSV(nombre) {
  const ruta = join(carpeta, nombre);
  if (!existsSync(ruta)) return [];
  const lineas = readFileSync(ruta, 'utf8').split(/\r?\n/).filter((l) => l.trim() && !l.startsWith('#'));
  const [cabecera, ...filas] = lineas;
  if (!cabecera) return [];
  const campos = cabecera.split(',').map((c) => c.trim());
  return filas.map((fila) => {
    const valores = fila.split(',').map((v) => v.trim());
    return Object.fromEntries(campos.map((c, i) => [c, valores[i] ?? '']));
  });
}

const num = (v) => (v === '' || v === undefined ? NaN : Number(v));
const promedio = (xs) => {
  const v = xs.filter((x) => !Number.isNaN(x));
  return v.length ? v.reduce((a, b) => a + b, 0) / v.length : NaN;
};
const fmt = (x, dec = 1) => (Number.isNaN(x) ? '—' : x.toFixed(dec).replace('.', ','));

/** Puntaje SUS: ítems impares (r - 1), pares (5 - r); suma x 2,5. */
export function puntajeSUS(respuestas) {
  if (respuestas.length !== 10 || respuestas.some((r) => !(r >= 1 && r <= 5))) return NaN;
  const suma = respuestas.reduce((acc, r, i) => acc + (i % 2 === 0 ? r - 1 : 5 - r), 0);
  return suma * 2.5;
}

function main() {
  const registros = leerCSV('metricas.csv');
  if (!registros.length) {
    console.log('metricas.csv no tiene filas todavía. Registra las sesiones reales primero.');
  } else {
    const grupos = new Map();
    for (const r of registros) {
      const clave = `${r.version}|${r.tarea}`;
      if (!grupos.has(clave)) grupos.set(clave, []);
      grupos.get(clave).push(r);
    }
    console.log('| Versión | Tarea | n | Éxito sin ayuda | Tiempo medio (s) | Errores medios | Ayudas medias | SEQ medio |');
    console.log('|---|---|---|---|---|---|---|---|');
    for (const [clave, filas] of [...grupos].sort()) {
      const [version, tarea] = clave.split('|');
      const exitos = filas.filter((f) => f.resultado === 'Exito').length;
      console.log(`| ${version} | ${tarea} | ${filas.length} | ${exitos}/${filas.length} (${fmt((exitos / filas.length) * 100, 0)} %) `
        + `| ${fmt(promedio(filas.map((f) => num(f.tiempo_s))))} | ${fmt(promedio(filas.map((f) => num(f.errores))))} `
        + `| ${fmt(promedio(filas.map((f) => num(f.ayudas))))} | ${fmt(promedio(filas.map((f) => num(f.seq))))} |`);
    }
  }

  const sus = leerCSV('sus.csv');
  if (!sus.length) {
    console.log('\nsus.csv no tiene filas todavía.');
    return;
  }
  console.log('\n| Participante | Versión | SUS |');
  console.log('|---|---|---|');
  const puntajes = [];
  for (const fila of sus) {
    const respuestas = Array.from({ length: 10 }, (_, i) => num(fila[`q${i + 1}`]));
    const p = puntajeSUS(respuestas);
    puntajes.push(p);
    console.log(`| ${fila.participante} | ${fila.version} | ${Number.isNaN(p) ? 'incompleto' : fmt(p)} |`);
  }
  console.log(`\nSUS promedio: ${fmt(promedio(puntajes))} (referencia: 68 = promedio de la industria)`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) main();
