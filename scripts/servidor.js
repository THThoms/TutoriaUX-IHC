// Servidor estático mínimo para ejecutar la app sin instalar dependencias.
// Uso: node scripts/servidor.js [puerto]   (por defecto 5500)

import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = resolve(fileURLToPath(new URL('..', import.meta.url)));
const puerto = Number(process.argv[2] || process.env.PORT || 5500);
const TIPOS = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.md': 'text/markdown; charset=utf-8',
};

createServer(async (req, res) => {
  try {
    const ruta = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    let archivo = normalize(join(raiz, ruta));
    if (!archivo.startsWith(raiz)) { res.writeHead(403).end('Prohibido'); return; }
    if ((await stat(archivo).catch(() => null))?.isDirectory()) archivo = join(archivo, 'index.html');
    const contenido = await readFile(archivo);
    res.writeHead(200, { 'Content-Type': TIPOS[extname(archivo)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(contenido);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('No encontrado');
  }
}).listen(puerto, () => {
  console.log(`Tutoría UX disponible en http://localhost:${puerto}`);
});
