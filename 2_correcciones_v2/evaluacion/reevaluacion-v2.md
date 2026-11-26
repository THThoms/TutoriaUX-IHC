# Reevaluación de la versión v2

**Responsable:** Carlos Bejarano

## 1. Verificación técnica de las correcciones

Ejecutada sobre v2 en Microsoft Edge (1280 px y 375 px) con un recorrido automatizado de las
tareas T1–T3 y con las pruebas del repositorio.

| Verificación | v1 | v2 |
|---|---|---|
| Al pulsar "Cancelar" aparece un diálogo de confirmación | No (cancela directo) | **Sí** |
| El foco entra al diálogo en la opción segura "No, conservarla" | — | **Sí** |
| Escape cierra el diálogo **sin** cancelar | — | **Sí** |
| Al cerrar, el foco vuelve al botón que abrió el diálogo | — | **Sí** |
| Tras "Sí, cancelar tutoría" la reserva queda "Cancelada" | Sí | **Sí** |
| El paso 2 solo ofrece fechas en que la docente atiende | No (calendario libre) | **Sí** |
| Cada fecha indica cuántos horarios libres quedan | No | **Sí** |
| Se puede elegir un día sin atención | **Sí** (error después) | No |
| Pruebas funcionales (`npm test`) | 22/22 | **26/26** (4 nuevas: F23–F26) |
| axe-core WCAG 2.2 AA, 320 y 1280 px | 0 violaciones | **0 violaciones** (incluye diálogo) |
| Desplazamiento horizontal a 375 px | No | No |
| Errores en consola | 0 | 0 |

Capturas comparativas:

| Corrección | Antes (v1) | Después (v2) |
|---|---|---|
| H-02 Elegir fecha | [04-paso2-dia-sin-atencion.png](../evidencias/antes/04-paso2-dia-sin-atencion.png) | [04-paso2-fechas-disponibles.png](../evidencias/despues/04-paso2-fechas-disponibles.png) |
| H-01 Cancelar | [10-cancelacion-sin-confirmar.png](../evidencias/antes/10-cancelacion-sin-confirmar.png) | [10-dialogo-cancelar.png](../evidencias/despues/10-dialogo-cancelar.png), [11-cancelada-confirmada.png](../evidencias/despues/11-cancelada-confirmada.png) |
| H-02 en móvil | [13-paso2-movil.png](../evidencias/antes/13-paso2-movil.png) | [13-paso2-movil.png](../evidencias/despues/13-paso2-movil.png) |

## 2. Reevaluación heurística

| Hallazgo | Heurística | Severidad v1 | Severidad v2 | Comentario |
|---|---|---|---|---|
| H-01 | H3, H5 | 3 | 0 | Se pide confirmación con resumen; la opción por defecto es la segura |
| H-02 | H5, H6 | 3 | 0 | Ya no es posible elegir un día sin atención; el estudiante reconoce las fechas válidas |
| H-03 | H2, H4 | 2 | 0 | Rótulo "Cancelar reserva" |

## 3. Reevaluación con usuarios (v2)

> Repetir **T1** (afectada por H-02) y **T3** (afectada por H-01) con al menos un participante real,
> que no sea del equipo, usando la misma consigna del plan. Registrar en
> `metricas.csv` con `version = v2` y comparar con v1. **Completar solo con datos reales.**

| Participante | Dispositivo | Tarea | Tiempo v1 (s) | Tiempo v2 (s) | Resultado v1 | Resultado v2 | Errores v1 | Errores v2 | SEQ v1 | SEQ v2 |
|---|---|---|---|---|---|---|---|---|---|---|
| | | T1 | | | | | | | | |
| | | T3 | | | | | | | | |

Observaciones de la reevaluación:

-

## 4. Conclusión

- Verificación técnica: las dos correcciones prioritarias funcionan y no introducen problemas de
  accesibilidad ni regresiones en las pruebas.
- Validación con usuarios: ___ (completar tras la sesión v2).
