# User flow — Reservar una tutoría

**Responsable:** Bryan Guatema

Camino exitoso en verde; caminos de error y recuperación en rojo. En todos los casos de error
**los datos ya elegidos se conservan** y el foco se mueve al resumen de errores.

```mermaid
flowchart TD
  A([Estudiante necesita tutoría]) --> B[Inicio]
  B --> C[Paso 1: elige asignatura]
  C --> D{¿Hay docentes<br/>con la búsqueda?}
  D -- No --> D1[Mensaje 'No encontramos docentes'<br/>+ botón Borrar búsqueda]:::err
  D1 --> C
  D -- Sí --> E[Elige docente]
  E --> F{Continuar:<br/>¿asignatura y docente válidos?}
  F -- No --> F1[Resumen de errores + mensaje en el campo]:::err
  F1 --> C
  F -- Sí --> G[Paso 2: modalidad y fecha]
  G --> H{¿El docente atiende<br/>esa fecha?}
  H -- No --> H1[Mensaje con los días de atención]:::err
  H1 --> G
  H -- Sí --> I{¿Hay horarios libres?}
  I -- No --> I1[Mensaje 'No hay horarios disponibles'<br/>→ elegir otra fecha]:::err
  I1 --> G
  I -- Sí --> J[Elige horario]
  J --> K[Paso 3: nombre, correo, motivo]
  K --> L{¿Datos válidos?}
  L -- No --> L1[Errores por campo<br/>p. ej. correo no institucional]:::err
  L1 --> K
  L -- Sí --> M[Paso 4: resumen]
  M --> N{¿Todo correcto?}
  N -- No --> N1[Cambiar → vuelve al paso<br/>con los datos conservados]
  N1 --> G
  N -- Sí --> O[Confirmar reserva]
  O --> P{¿El horario sigue libre?}
  P -- No --> P1[Error: 'Otro estudiante acaba de reservar'<br/>vuelve al paso 2]:::err
  P1 --> G
  P -- Sí --> Q([Confirmación con código TUT-XXXXX<br/>estado Confirmada]):::ok

  classDef err fill:#fdecee,stroke:#b00020,color:#1d1d1f;
  classDef ok fill:#e8f5ec,stroke:#1e6b34,color:#1d1d1f;
```

## Flujo: modificar o cancelar

```mermaid
flowchart TD
  A[Mis reservas] --> B{¿Qué necesita?}
  B -- Cambiar datos --> C[Modificar]
  C --> D[Asistente con datos actuales]
  D --> E{¿Cambios válidos?}
  E -- No --> E1[Errores por campo,<br/>datos conservados]:::err
  E1 --> D
  E -- Sí --> F([Detalle: 'Cambios guardados'<br/>estado Modificada]):::ok
  D -. Salir sin guardar .-> A
  B -- Ya no la necesita --> G[Cancelar reserva]
  G --> H([Estado Cancelada,<br/>horario liberado]):::ok
  B -- Ver datos --> I[Detalle]
  I --> C
  I --> G

  classDef err fill:#fdecee,stroke:#b00020,color:#1d1d1f;
  classDef ok fill:#e8f5ec,stroke:#1e6b34,color:#1d1d1f;
```

## Tabla de recuperación de errores

| Error | Dónde | Mensaje mostrado | Cómo se recupera |
|---|---|---|---|
| Sin asignatura o docente | Paso 1 | "Elige la asignatura en la que necesitas ayuda." | Enlace del resumen lleva al campo |
| Búsqueda sin resultados | Paso 1 | "No encontramos docentes con esa búsqueda" | Botón "Borrar búsqueda" |
| Día sin atención | Paso 2 | "El docente no atiende ese día. Atiende los lunes y miércoles." | Elegir otra fecha |
| Fecha pasada / muy lejana | Paso 2 | "La fecha ya pasó…" / "…máximo de 30 días…" | Elegir otra fecha (el calendario ya limita) |
| Correo no institucional | Paso 3 | "Usa tu correo institucional, por ejemplo: nombre1234@uta.edu.ec" | Corregir el campo; los demás datos siguen escritos |
| Horario tomado al confirmar | Paso 4 | "Otro estudiante acaba de reservar ese horario. Elige otro disponible." | Vuelve al paso 2 con lo demás conservado |
| Recarga accidental | Cualquiera | "Recuperamos tu reserva sin terminar" | Continúa donde la dejó o "Empezar de nuevo" |
