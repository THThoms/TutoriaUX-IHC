# Tutoría UX — Gestión de tutorías universitarias

Prueba Práctica Integradora · **Interacción Humano-Computador** · Quinto semestre
Carrera de Ingeniería de Software · FISEI · Universidad Técnica de Ambato

Aplicación web para que los estudiantes **consulten docentes y asignaturas, elijan modalidad,
fecha y horario, reserven tutorías, consulten sus reservas y las modifiquen o cancelen**,
con estados, confirmaciones y mensajes de error claros, conservando los datos durante la
corrección y funcionando en móvil y escritorio.

## Equipo

| Integrante | Responsabilidad principal | Carpetas |
|---|---|---|
| Tomás Solis | Arquitectura e implementación, pruebas funcionales, README | `src/`, `tests/`, `scripts/`, `docs/arquitectura.md`, `docs/pruebas-funcionales.md` |
| Karen Molina | Análisis UX, curva emocional, prototipo interactivo, sesiones con usuarios P01–P02 y métricas | `ux/` (excepto wireframes), `evaluacion/sesiones/`, `evaluacion/resultados.md`, `evaluacion/metricas*` |
| Bryan Guatema | Requisitos, sitemap, user flow, wireframes, trazabilidad, plan de evaluación, consentimiento y piloto P00 | `docs/requisitos.md`, `docs/sitemap.md`, `docs/flujo-usuario.md`, `docs/trazabilidad.md`, `ux/wireframes/`, `evaluacion/plan*`, `evaluacion/consentimiento.md`, `evaluacion/piloto-P00.md` |
| Carlos Bejarano | Heurísticas de Nielsen, recorrido cognitivo, WCAG, hallazgos, backlog, correcciones v2 y evidencias antes/después | `evaluacion/heuristicas.md`, `evaluacion/recorrido-cognitivo.md`, `evaluacion/accesibilidad-wcag.md`, `evaluacion/hallazgos.md`, `evaluacion/backlog.md`, `evaluacion/reevaluacion-v2.md`, `evidencias/` |

El detalle de lo que aportó cada integrante está en [`docs/contribuciones/`](docs/contribuciones/)
y se puede verificar en el historial de commits.

## Instalación

Requisito: **Node.js 20 o superior** (no hay dependencias que instalar).

```bash
git clone https://github.com/THThoms/TutoriaUX-IHC.git
cd TutoriaUX-IHC
```

## Ejecución

```bash
npm start
```

Abrir <http://localhost:5500>. También funciona con cualquier servidor estático
(por ejemplo, Live Server de VS Code). No se puede abrir `index.html` con doble clic porque
los módulos ES requieren un servidor HTTP.

## Pruebas funcionales

```bash
npm test
```

22 pruebas que cubren los requisitos R1–R6. Detalle en [`docs/pruebas-funcionales.md`](docs/pruebas-funcionales.md).

## Arquitectura

Arquitectura por capas (presentación → aplicación → dominio, con infraestructura inyectada):

```
src/
├── domain/          Entidad Reserva, estados, reglas y validaciones
├── application/     ReservaService: casos de uso R1–R6 y borrador
├── infrastructure/  Catálogo de docentes y persistencia en localStorage
├── presentation/    Vistas, componentes reutilizables, enrutador y estilos
└── main.js          Punto de composición
```

Diagramas de componentes, secuencia y estados en [`docs/arquitectura.md`](docs/arquitectura.md).

## Funcionalidades

| ID | Funcionalidad | Dónde |
|---|---|---|
| R1 | Consultar docentes y asignaturas, con filtro por asignatura y búsqueda sin tildes | Reservar · paso 1 |
| R2 | Elegir modalidad, fecha y horario; horarios ocupados visibles y deshabilitados | Reservar · paso 2 |
| R3 | Registrar la reserva con validaciones y confirmación con código `TUT-XXXXX` | Reservar · pasos 3 y 4 |
| R4 | Consultar reservas con estado (Confirmada / Modificada / Cancelada) y filtro | Mis reservas, Detalle |
| R5 | Modificar una reserva con los datos actuales precargados | Mis reservas → Modificar |
| R6 | Cancelar una reserva y liberar el horario | Mis reservas / Detalle → Cancelar |

Además: el avance se guarda como **borrador** (volver, corregir o recargar no borra lo elegido),
**diseño mobile first**, **HTML semántico**, navegación completa por **teclado** con **foco visible**,
mensajes anunciados a lectores de pantalla y áreas táctiles de 44 px.

Los requisitos completos están en [`docs/requisitos.md`](docs/requisitos.md).

## Estructura del repositorio

```
README.md
docs/          requisitos, arquitectura, sitemap, flujo de usuario, trazabilidad, pruebas, contribuciones
ux/            perfil de usuario, touchpoints, curva emocional, wireframes, prototipo
src/           presentation, application, domain, infrastructure
tests/         pruebas funcionales (node --test)
evaluacion/    plan, consentimiento, piloto, heurísticas, recorrido cognitivo, accesibilidad,
               sesiones, resultados, métricas, hallazgos, backlog, reevaluación v2
evidencias/    antes/ (v1) y despues/ (v2)
```

## Enlaces a evidencias

- UX: [perfil](ux/perfil-usuario.md) · [touchpoints](ux/touchpoints.md) · [curva emocional](ux/curva-emocional.md) · [prototipo](ux/prototipo/index.html)
- Arquitectura de información: [requisitos](docs/requisitos.md) · [sitemap](docs/sitemap.md) · [user flow](docs/flujo-usuario.md) · [wireframes](ux/wireframes/README.md) · [trazabilidad](docs/trazabilidad.md)
- Evaluación: [plan](evaluacion/plan-evaluacion.md) · [consentimiento](evaluacion/consentimiento.md) · [piloto P00](evaluacion/piloto-P00.md) · [heurísticas](evaluacion/heuristicas.md) · [recorrido cognitivo](evaluacion/recorrido-cognitivo.md) · [WCAG](evaluacion/accesibilidad-wcag.md)
- Pruebas con usuarios: [sesiones](evaluacion/sesiones/) · [resultados](evaluacion/resultados.md) · [métricas](evaluacion/metricas.md)
- Hallazgos y validación: [hallazgos](evaluacion/hallazgos.md) · [backlog](evaluacion/backlog.md) · [reevaluación v2](evaluacion/reevaluacion-v2.md)
- Capturas: [antes (v1)](evidencias/antes/) · [después (v2)](evidencias/despues/)

## Versiones

| Versión | Contenido |
|---|---|
| v1 | Funcionalidad completa R1–R6 evaluada con heurísticas, recorrido cognitivo, WCAG y usuarios |
| v2 | Corrección de los dos problemas prioritarios encontrados en la evaluación (ver [hallazgos](evaluacion/hallazgos.md)) |

## Limitaciones

- No hay inicio de sesión: las reservas se guardan en el `localStorage` del navegador, por lo que
  cada navegador/dispositivo tiene sus propias reservas.
- El catálogo de docentes y horarios es de ejemplo (docentes ficticios) y está en
  `src/infrastructure/catalogoDatos.js`; no está conectado al sistema académico.
- No se envían correos ni notificaciones; el docente no recibe la reserva en tiempo real.
- La disponibilidad solo se comparte entre reservas del mismo navegador (sin servidor).
- Para pasar a una API basta con implementar otro repositorio con los métodos
  `listar`, `obtener` y `guardar` (ver arquitectura).
