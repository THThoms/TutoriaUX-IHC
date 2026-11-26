import { h } from '../components/dom.js';
import { Alerta } from '../components/Alerta.js';

export function vistaInicio({ servicio }) {
  const borrador = servicio.leerBorrador();
  const pendiente = borrador && borrador.modo === 'nueva' && Object.values(borrador.datos).some(Boolean);
  const proximas = servicio.listarReservas()
    .filter((r) => r.estado !== 'Cancelada' && r.fecha >= servicio.hoyISO()).length;

  return {
    titulo: 'Inicio · Tutoría UX',
    elemento: h('section', { class: 'vista' },
      h('h1', { tabindex: '-1' }, 'Reserva tu tutoría en 4 pasos'),
      h('p', { class: 'entradilla' },
        'Consulta docentes y asignaturas, elige modalidad, fecha y horario, y recibe tu código de reserva al instante.'),
      pendiente ? Alerta({
        tipo: 'info',
        titulo: 'Tienes una reserva sin terminar',
        mensaje: 'Guardamos lo que elegiste. Puedes continuar donde la dejaste.',
        acciones: [h('a', { class: 'btn btn--secundario', href: '#/reservar' }, 'Continuar reserva')],
      }) : null,
      h('div', { class: 'acciones-inicio' },
        h('a', { class: 'btn btn--primario btn--grande', href: '#/reservar' }, 'Reservar una tutoría'),
        h('a', { class: 'btn btn--secundario btn--grande', href: '#/reservas' },
          `Ver mis reservas${proximas ? ` (${proximas} próximas)` : ''}`)),
      h('h2', {}, '¿Cómo funciona?'),
      h('ol', { class: 'como-funciona' },
        h('li', {}, h('strong', {}, 'Docente: '), 'elige la asignatura y el docente que te ayudará.'),
        h('li', {}, h('strong', {}, 'Fecha y hora: '), 'elige presencial o virtual y un horario libre.'),
        h('li', {}, h('strong', {}, 'Tus datos: '), 'nombre, correo institucional y el tema a revisar.'),
        h('li', {}, h('strong', {}, 'Confirmar: '), 'revisa el resumen y recibe tu código.')),
      h('p', { class: 'nota' }, 'Puedes modificar o cancelar tus reservas desde "Mis reservas" hasta el día de la tutoría.')),
  };
}
