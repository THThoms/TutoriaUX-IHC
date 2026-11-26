# Carlos Bejarano — qué te toca subir

**Tu parte:** métodos de evaluación (heurísticas, recorrido cognitivo, WCAG), hallazgos,
correcciones v2 y evidencias antes/después
(rúbrica: Métodos de evaluación 0,25 · Hallazgos, correcciones y validación 0,30).

Repositorio: https://github.com/THThoms/TutoriaUX-IHC
(Tomás te agrega como colaborador; acepta la invitación que llega a tu correo de GitHub).

Tu parte va en **dos momentos**, porque el profe revisa el historial: primero se evalúa la v1 y
después se corrige. **Sube la parte 2 después de las sesiones P01 y P02.**

## Parte 1 — Evaluación de la v1 (carpeta `1_evaluacion_v1/`)

```
evaluacion/heuristicas.md
evaluacion/recorrido-cognitivo.md
evaluacion/accesibilidad-wcag.md
evaluacion/hallazgos.md
evaluacion/backlog.md
evidencias/README.md
evidencias/antes/*.png   (12 capturas de la v1)
docs/contribuciones/carlos-bejarano.md
```

```powershell
git clone https://github.com/THThoms/TutoriaUX-IHC.git
cd TutoriaUX-IHC
git config user.name "Carlos Bejarano"
git config user.email "TU_CORREO_DE_GITHUB"
```

Copia el **contenido** de `1_evaluacion_v1` dentro de `TutoriaUX-IHC` y haz 2 commits:

```powershell
git pull
git add evaluacion/heuristicas.md evaluacion/recorrido-cognitivo.md evaluacion/accesibilidad-wcag.md
git commit -m "Evaluacion heuristica, recorrido cognitivo y revision WCAG de la v1"
git add evaluacion/hallazgos.md evaluacion/backlog.md evidencias docs/contribuciones/carlos-bejarano.md
git commit -m "Hallazgos con severidad, backlog y evidencias antes (v1)"
git push
```

## Parte 2 — Correcciones v2 (carpeta `2_correcciones_v2/`)

Corrige los dos hallazgos prioritarios: **H-01** (cancelar sin confirmación) y **H-02** (elegir fecha
por ensayo y error). Estos archivos **reemplazan** los de la v1 que subió Tomás (es lo esperado):

```
src/application/reservaService.js                     (agrega fechasDisponibles)
src/presentation/components/DialogoConfirmacion.js    (nuevo)
src/presentation/components/accionCancelar.js         (pide confirmación)
src/presentation/components/SelectorFecha.js          (fechas disponibles)
src/presentation/components/TarjetaReserva.js         (rótulo "Cancelar reserva")
src/presentation/styles.css                           (estilos del diálogo)
tests/v2-correcciones.test.js                         (4 pruebas nuevas)
evaluacion/reevaluacion-v2.md
evidencias/despues/*.png
```

Copia el **contenido** de `2_correcciones_v2` dentro de `TutoriaUX-IHC` (acepta reemplazar) y:

```powershell
git pull
npm test
git add src tests
git commit -m "v2: confirmacion al cancelar (H-01) y fechas disponibles en lugar de calendario libre (H-02)"
git add evaluacion/reevaluacion-v2.md evidencias/despues
git commit -m "Reevaluacion de la v2 y evidencias despues"
git push
```

`npm test` debe mostrar **26 pruebas pasadas**.

## Lo que falta y solo puedes hacer tú

1. Si en P01 o P02 aparecen problemas nuevos, agrégalos en `evaluacion/hallazgos.md`
   (tabla "Hallazgos de las sesiones con usuarios") con la frase o captura como evidencia.
2. Repetir T1 y T3 con al menos un participante real sobre la v2 y llenar la sección 3 de
   `evaluacion/reevaluacion-v2.md` (y las filas `v2` en `evaluacion/metricas.csv`).
3. Recorre tú mismo la app con el teclado (Tab, flechas, Escape) para poder explicar la revisión
   WCAG en la exposición.
