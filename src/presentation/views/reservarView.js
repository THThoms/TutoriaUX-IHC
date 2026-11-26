// Vista "Reservar / Modificar tutoría": asistente de 4 pasos.
// Cada cambio se guarda como borrador, así al volver atrás, al corregir un error
// o al recargar la página no se pierde lo que el estudiante ya eligió.

import { h, reemplazar, anunciar } from '../components/dom.js';
import { Alerta } from '../components/Alerta.js';
import { CampoSelect, CampoTexto, GrupoOpciones, ResumenErrores, enfocarCampo } from '../components/Campos.js';
import { Pasos, NOMBRES_PASOS } from '../components/Pasos.js';
import { SelectorFecha, diasDeAtencion } from '../components/SelectorFecha.js';
import { horaFin } from '../components/TarjetaReserva.js';
import { fechaLarga } from '../../domain/fechas.js';

const TITULOS_PASO = [
  'Elige la asignatura y el docente',
  'Elige modalidad, fecha y hora',
  'Escribe tus datos',
  'Revisa y confirma',
];

const ETIQUETAS = {
  asignaturaId: 'Asignatura', docenteId: 'Docente', modalidad: 'Modalidad', fecha: 'Fecha',
  hora: 'Horario', nombre: 'Nombre completo', correo: 'Correo institucional', motivo: 'Motivo de la tutoría',
};

const PASO_DE_CAMPO = {
  asignaturaId: 1, docenteId: 1, modalidad: 2, fecha: 2, hora: 2, nombre: 3, correo: 3, motivo: 3, general: 4,
};

function datosVacios() {
  return { asignaturaId: '', docenteId: '', modalidad: '', fecha: '', hora: '', nombre: '', correo: '', motivo: '' };
}

function tieneAvance(datos) {
  return Object.values(datos).some(Boolean);
}

export function vistaReservar(ctx, { editarId = null } = {}) {
  const { servicio } = ctx;
  let borrador = servicio.leerBorrador();
  let avisoRecuperado = false;

  if (editarId) {
    const reserva = servicio.obtenerReserva(editarId);
    if (!reserva || !servicio.puedeEditarse(reserva)) {
      return {
        titulo: 'Reserva no disponible',
        elemento: h('section', { class: 'vista' },
          h('h1', { tabindex: '-1' }, 'No se puede modificar esta reserva'),
          Alerta({
            tipo: 'error',
            mensaje: reserva ? 'La reserva está cancelada o la fecha ya pasó.' : 'No encontramos una reserva con ese código.',
            acciones: [h('a', { class: 'btn btn--secundario', href: '#/reservas' }, 'Ir a mis reservas')],
          })),
      };
    }
    if (!borrador || borrador.reservaId !== editarId) {
      borrador = {
        modo: 'editar',
        reservaId: editarId,
        paso: 1,
        busqueda: '',
        datos: {
          asignaturaId: reserva.asignaturaId, docenteId: reserva.docenteId, modalidad: reserva.modalidad,
          fecha: reserva.fecha, hora: reserva.hora, nombre: reserva.estudiante.nombre,
          correo: reserva.estudiante.correo, motivo: reserva.motivo,
        },
      };
    }
  } else if (!borrador || borrador.modo !== 'nueva') {
    borrador = { modo: 'nueva', reservaId: null, paso: 1, busqueda: '', datos: datosVacios() };
  } else if (tieneAvance(borrador.datos)) {
    avisoRecuperado = true;
  }

  const d = borrador.datos;
  const editando = borrador.modo === 'editar';
  const tituloVista = editando ? `Modificar reserva ${borrador.reservaId}` : 'Reservar una tutoría';
  let errores = {};
  const raiz = h('section', { class: 'vista vista--formulario' });

  const guardar = () => servicio.guardarBorrador(borrador);
  const asignar = (campo, valor) => { d[campo] = valor; guardar(); };

  // ---------- Paso 1: asignatura y docente ----------
  function paso1() {
    const zonaDocentes = h('div', { class: 'zona-docentes' });

    function pintarDocentes() {
      const docentes = servicio.buscarDocentes({ texto: borrador.busqueda, asignaturaId: d.asignaturaId });
      if (!docentes.length) {
        reemplazar(zonaDocentes, Alerta({
          tipo: 'aviso',
          titulo: 'No encontramos docentes con esa búsqueda',
          mensaje: 'Revisa lo que escribiste o borra la búsqueda para ver todos los docentes de la asignatura.',
          acciones: [h('button', {
            type: 'button',
            class: 'btn btn--secundario',
            onclick: () => { borrador.busqueda = ''; guardar(); render('busqueda'); },
          }, 'Borrar búsqueda')],
        }));
        return 0;
      }
      reemplazar(zonaDocentes, GrupoOpciones({
        id: 'docenteId',
        leyenda: 'Docente',
        variante: 'tarjetas',
        valor: d.docenteId,
        error: errores.docenteId,
        opciones: docentes.map((doc) => ({
          valor: doc.id,
          texto: doc.nombre,
          detalle: `${doc.asignaturas.map((a) => servicio.obtenerAsignatura(a)?.nombre).join(', ')} · `
            + `${doc.modalidades.join(' y ')} · Atiende ${diasDeAtencion(doc)}`,
        })),
        alCambiar: (valor) => {
          if (valor !== d.docenteId) { d.hora = ''; d.fecha = ''; d.modalidad = ''; }
          asignar('docenteId', valor);
        },
      }));
      return docentes.length;
    }
    pintarDocentes();

    return [
      CampoSelect({
        id: 'asignaturaId',
        etiqueta: 'Asignatura',
        vacio: 'Elige una asignatura',
        valor: d.asignaturaId,
        error: errores.asignaturaId,
        opciones: servicio.listarAsignaturas().map((a) => ({ valor: a.id, texto: a.nombre })),
        alCambiar: (valor) => {
          asignar('asignaturaId', valor);
          const docente = servicio.obtenerDocente(d.docenteId);
          if (docente && valor && !docente.asignaturas.includes(valor)) asignar('docenteId', '');
          const n = pintarDocentes();
          anunciar(`${n} docentes disponibles para esta asignatura.`);
        },
      }),
      CampoTexto({
        id: 'busqueda',
        etiqueta: 'Buscar docente (opcional)',
        tipo: 'search',
        valor: borrador.busqueda,
        ayuda: 'Escribe el nombre del docente o de la asignatura.',
        atributos: { autocomplete: 'off' },
        alCambiar: (valor) => {
          borrador.busqueda = valor;
          guardar();
          const n = pintarDocentes();
          anunciar(n ? `${n} docentes encontrados.` : 'No se encontraron docentes.');
        },
      }),
      zonaDocentes,
    ];
  }

  // ---------- Paso 2: modalidad, fecha y hora ----------
  function paso2() {
    const docente = servicio.obtenerDocente(d.docenteId);
    if (docente.modalidades.length === 1 && !d.modalidad) asignar('modalidad', docente.modalidades[0]);
    const zonaHoras = h('div', { class: 'zona-horas', 'aria-live': 'polite' });

    function pintarHoras() {
      if (!d.fecha) {
        reemplazar(zonaHoras, h('p', { class: 'nota' }, 'Elige primero una fecha para ver los horarios.'));
        return;
      }
      const errorFecha = servicio.validarPaso(2, d, { excluirId: borrador.reservaId }).fecha;
      if (errorFecha) {
        reemplazar(zonaHoras, h('p', { class: 'nota nota--aviso' },
          errores.fecha ? 'Corrige la fecha para ver los horarios.' : errorFecha));
        return;
      }
      const horas = servicio.horariosDelDia(d.docenteId, d.fecha, { excluirId: borrador.reservaId });
      if (!horas.some((x) => x.disponible)) {
        reemplazar(zonaHoras, h('p', { class: 'nota nota--aviso' }, 'No hay horarios disponibles para esta fecha.'));
        return;
      }
      reemplazar(zonaHoras, GrupoOpciones({
        id: 'hora',
        leyenda: `Horarios del ${fechaLarga(d.fecha)}`,
        variante: 'chips',
        valor: d.hora,
        error: errores.hora,
        ayuda: 'Cada tutoría dura 45 minutos.',
        opciones: horas.map((x) => ({
          valor: x.hora,
          texto: `${x.hora} – ${horaFin(x.hora)}`,
          detalle: x.disponible ? 'Disponible' : 'Ocupado',
          deshabilitada: !x.disponible,
        })),
        alCambiar: (valor) => asignar('hora', valor),
      }));
    }
    pintarHoras();

    return [
      h('p', { class: 'contexto' }, 'Docente: ', h('strong', {}, docente.nombre), ` · ${docente.lugar}`),
      GrupoOpciones({
        id: 'modalidad',
        leyenda: 'Modalidad',
        variante: 'chips',
        valor: d.modalidad,
        error: errores.modalidad,
        ayuda: docente.modalidades.length === 1 ? `Este docente solo atiende en modalidad ${docente.modalidades[0].toLowerCase()}.` : null,
        opciones: docente.modalidades.map((m) => ({ valor: m, texto: m })),
        alCambiar: (valor) => asignar('modalidad', valor),
      }),
      SelectorFecha({
        servicio,
        docente,
        valor: d.fecha,
        error: errores.fecha,
        excluirId: borrador.reservaId,
        alCambiar: (valor) => {
          asignar('fecha', valor);
          asignar('hora', '');
          pintarHoras();
        },
      }),
      errores.hora && !zonaHoras.querySelector('#hora') ? h('p', { class: 'campo__error', id: 'hora' , tabindex: '-1' }, errores.hora) : null,
      zonaHoras,
    ];
  }

  // ---------- Paso 3: datos del estudiante ----------
  function paso3() {
    const contador = () => `Mínimo 10 y máximo 300 caracteres. Llevas ${d.motivo.trim().length}.`;
    const campoMotivo = CampoTexto({
      id: 'motivo',
      etiqueta: 'Motivo de la tutoría',
      multilinea: true,
      valor: d.motivo,
      error: errores.motivo,
      ayuda: contador(),
      atributos: { rows: 4, maxlength: 300 },
      alCambiar: (valor) => {
        asignar('motivo', valor);
        campoMotivo.querySelector('#motivo-ayuda').textContent = contador();
      },
    });
    return [
      CampoTexto({
        id: 'nombre', etiqueta: 'Nombre completo', valor: d.nombre, error: errores.nombre,
        atributos: { autocomplete: 'name' }, alCambiar: (v) => asignar('nombre', v),
      }),
      CampoTexto({
        id: 'correo', etiqueta: 'Correo institucional', tipo: 'email', valor: d.correo, error: errores.correo,
        ayuda: 'Con este correo el docente podrá contactarte. Debe terminar en @uta.edu.ec.',
        atributos: { autocomplete: 'email', inputmode: 'email' }, alCambiar: (v) => asignar('correo', v),
      }),
      campoMotivo,
    ];
  }

  // ---------- Paso 4: resumen ----------
  function paso4() {
    const docente = servicio.obtenerDocente(d.docenteId);
    const asignatura = servicio.obtenerAsignatura(d.asignaturaId);
    const fila = (termino, valor, paso) => h('div', { class: 'resumen__fila' },
      h('dt', {}, termino),
      h('dd', {}, valor),
      h('dd', { class: 'resumen__accion' },
        h('button', { type: 'button', class: 'btn-enlace', onclick: () => irAPaso(paso) },
          'Cambiar', h('span', { class: 'sr-only' }, ` ${termino.toLowerCase()}`))));
    return [
      h('p', {}, 'Revisa que todo esté correcto. Puedes cambiar cualquier dato sin perder los demás.'),
      h('dl', { class: 'resumen' },
        fila('Asignatura', asignatura?.nombre, 1),
        fila('Docente', docente?.nombre, 1),
        fila('Modalidad', d.modalidad, 2),
        fila('Fecha', d.fecha ? fechaLarga(d.fecha) : '—', 2),
        fila('Hora', d.hora ? `${d.hora} – ${horaFin(d.hora)}` : '—', 2),
        fila('Lugar', docente?.lugar, 2),
        fila('Nombre', d.nombre, 3),
        fila('Correo', d.correo, 3),
        fila('Motivo', d.motivo, 3)),
    ];
  }

  const PASOS = [paso1, paso2, paso3, paso4];

  function irAPaso(numero) {
    errores = {};
    borrador.paso = numero;
    guardar();
    render('titulo');
  }

  function continuar() {
    errores = servicio.validarPaso(borrador.paso, d, { excluirId: borrador.reservaId });
    if (Object.keys(errores).length) { render('errores'); return; }
    irAPaso(borrador.paso + 1);
  }

  function confirmar() {
    const resultado = editando ? servicio.modificar(borrador.reservaId, d) : servicio.crear(d);
    if (resultado.ok) {
      servicio.descartarBorrador();
      ctx.navegar(`#/reservas/${resultado.reserva.id}?ok=${editando ? 'modificada' : 'creada'}`);
      return;
    }
    errores = resultado.errores;
    borrador.paso = Math.min(...Object.keys(errores).map((c) => PASO_DE_CAMPO[c] || 4));
    guardar();
    render('errores');
  }

  function empezarDeNuevo() {
    servicio.descartarBorrador();
    borrador = { modo: 'nueva', reservaId: null, paso: 1, busqueda: '', datos: datosVacios() };
    ctx.recargar();
  }

  function render(enfoque) {
    if (borrador.paso > 1 && !servicio.obtenerDocente(d.docenteId)) borrador.paso = 1;
    const paso = borrador.paso;
    document.title = `${NOMBRES_PASOS[paso - 1]} · ${tituloVista} · Tutoría UX`;
    reemplazar(raiz,
      h('h1', { tabindex: '-1', id: 'titulo-vista' }, tituloVista),
      editando ? Alerta({
        tipo: 'info',
        mensaje: 'Los datos actuales de tu reserva ya están cargados. Cambia solo lo que necesites y guarda al final.',
      }) : null,
      avisoRecuperado && paso === 1 ? Alerta({
        tipo: 'info',
        titulo: 'Recuperamos tu reserva sin terminar',
        mensaje: 'Continúa donde la dejaste o empieza de nuevo.',
        acciones: [h('button', { type: 'button', class: 'btn btn--secundario', onclick: empezarDeNuevo }, 'Empezar de nuevo')],
      }) : null,
      Pasos(paso),
      h('form', {
        class: 'formulario',
        novalidate: true,
        'aria-labelledby': 'titulo-paso',
        onsubmit: (e) => { e.preventDefault(); if (paso < 4) continuar(); else confirmar(); },
      },
      h('h2', { id: 'titulo-paso' }, TITULOS_PASO[paso - 1]),
      ResumenErrores(errores, ETIQUETAS),
      errores.general ? Alerta({ tipo: 'error', mensaje: errores.general }) : null,
      PASOS[paso - 1](),
      h('div', { class: 'acciones-form' },
        h('button', { type: 'submit', class: 'btn btn--primario' },
          paso < 4 ? 'Continuar' : editando ? 'Guardar cambios' : 'Confirmar reserva'),
        paso > 1 ? h('button', { type: 'button', class: 'btn btn--secundario', onclick: () => irAPaso(paso - 1) }, 'Volver al paso anterior') : null),
      editando ? h('p', { class: 'salir' },
        h('a', {
          href: `#/reservas/${borrador.reservaId}`,
          onclick: () => servicio.descartarBorrador(),
        }, 'Salir sin guardar cambios')) : null));

    if (enfoque === 'errores') {
      raiz.querySelector('#resumen-errores')?.focus();
      anunciar('Hay datos por corregir.');
    } else if (enfoque === 'titulo') {
      raiz.querySelector('#titulo-paso').setAttribute('tabindex', '-1');
      raiz.querySelector('#titulo-paso').focus();
    } else if (enfoque === 'busqueda') {
      raiz.querySelector('#busqueda')?.focus();
    }
  }

  render(null);
  return { titulo: `${tituloVista} · Tutoría UX`, elemento: raiz, mantenerTitulo: true };
}
