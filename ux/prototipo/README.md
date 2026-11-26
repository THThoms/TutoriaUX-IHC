# Prototipo navegable

**Responsable:** Karen Molina

Prototipo de **fidelidad media** en HTML/CSS (sin JavaScript), pensado para móvil (375 px).
Se abre con doble clic en [`index.html`](index.html) o desde el servidor del proyecto en
<http://localhost:5500/ux/prototipo/>.

## Qué cubre

| Tipo de estado | Pantallas |
|---|---|
| Normal | Inicio, paso 1 con docente elegido, paso 2 con horario, mis reservas |
| Error | Paso 1 sin datos (resumen de errores), paso 2 día sin atención, paso 3 correo no institucional |
| Estado vacío | Búsqueda de docente sin resultados |
| Confirmación | Reserva confirmada (código y estado), cambios guardados, reserva cancelada |
| Recuperación | "Borrar búsqueda", elegir otra fecha, corregir correo sin perder datos, **"Cambiar" desde el resumen vuelve al paso 2 con todo lo demás guardado**, modificar con datos precargados, "Salir sin guardar cambios" |

Cada pantalla tiene una franja amarilla inferior que indica el estado que representa,
y la columna izquierda permite saltar a cualquier estado durante una revisión.

## Del wireframe al prototipo y a la implementación

1. Wireframes de baja fidelidad (Bryan): estructura y decisiones de interacción.
2. Este prototipo: colores, tipografía, estados y textos reales de los mensajes.
3. Implementación v1 (Tomás): mismos textos y componentes, con datos y validaciones reales.
