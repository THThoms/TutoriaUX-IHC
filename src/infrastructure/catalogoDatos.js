// Datos de ejemplo del catálogo (docentes ficticios y asignaturas de la carrera).
// En una versión con API este archivo se reemplaza por un repositorio HTTP
// con la misma interfaz (ver CatalogoRepository).

export const ASIGNATURAS = [
  { id: 'ihc', nombre: 'Interacción Humano-Computador' },
  { id: 'req', nombre: 'Ingeniería de Requisitos' },
  { id: 'bd2', nombre: 'Base de Datos II' },
  { id: 'sd', nombre: 'Sistemas Distribuidos' },
  { id: 'web', nombre: 'Programación Web' },
  { id: 'ed', nombre: 'Estructuras de Datos' },
  { id: 'md', nombre: 'Matemática Discreta' },
];

// horario: clave = día de la semana (1 = lunes ... 5 = viernes), valor = horas de inicio.
// Cada tutoría dura 45 minutos.
export const DOCENTES = [
  {
    id: 'd01',
    nombre: 'Ing. Andrea Villacís',
    asignaturas: ['ihc', 'req'],
    modalidades: ['Presencial', 'Virtual'],
    lugar: 'FISEI, bloque 2, oficina 204',
    horario: { 1: ['08:00', '09:00', '10:00'], 3: ['14:00', '15:00'] },
  },
  {
    id: 'd02',
    nombre: 'Ing. Marcelo Paredes',
    asignaturas: ['bd2', 'sd'],
    modalidades: ['Presencial', 'Virtual'],
    lugar: 'FISEI, laboratorio 3',
    horario: { 2: ['11:00', '12:00'], 4: ['16:00', '17:00'] },
  },
  {
    id: 'd03',
    nombre: 'Ing. Lucía Carrasco',
    asignaturas: ['web', 'ihc'],
    modalidades: ['Virtual'],
    lugar: 'Microsoft Teams (el docente comparte el enlace)',
    horario: { 3: ['09:00', '10:00', '11:00'], 5: ['15:00', '16:00'] },
  },
  {
    id: 'd04',
    nombre: 'Ing. Diego Naranjo',
    asignaturas: ['ed', 'md'],
    modalidades: ['Presencial'],
    lugar: 'FISEI, bloque 1, oficina 112',
    horario: { 1: ['14:00', '15:00'], 4: ['08:00', '09:00'] },
  },
];
