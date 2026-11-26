# Métricas de usabilidad

**Responsable:** Karen Molina

## 1. Qué se mide

| Métrica | Definición | Fuente |
|---|---|---|
| Éxito | `Exito` = cumple el criterio sin ayuda; `ExitoConAyuda`; `Fallo` | Hoja de sesión |
| Tiempo | Segundos desde que termina la consigna hasta cumplir el criterio o abandonar | Cronómetro |
| Errores | Acciones que alejan del objetivo (mensaje de error, pantalla equivocada, reserva duplicada) | Observador |
| Ayudas | Pistas del moderador | Moderadora |
| SEQ | Single Ease Question, 1 (muy difícil) a 7 (muy fácil), tras cada tarea | Participante |
| SUS | System Usability Scale, 10 ítems al final; puntaje 0–100 | Participante |

## 2. Cómo registrar

1. Durante la sesión se llena `sesiones/P01.md` o `sesiones/P02.md`.
2. Al terminar, se copia una fila por tarea a [`metricas.csv`](metricas.csv):

   ```csv
   participante,version,dispositivo,tarea,tiempo_s,resultado,errores,ayudas,seq
   ```

3. Se copia una fila por participante a [`sus.csv`](sus.csv):

   ```csv
   participante,version,q1,q2,q3,q4,q5,q6,q7,q8,q9,q10
   ```

4. Se ejecuta desde la raíz del repositorio:

   ```bash
   node evaluacion/calcular-metricas.js
   ```

   El script imprime las tablas en Markdown (éxito, tiempo medio, errores, ayudas, SEQ por
   tarea y versión; SUS por participante y promedio) para pegarlas en
   [`resultados.md`](resultados.md).

## 3. Cálculo del SUS

Para cada participante: ítems impares aportan `respuesta − 1`, ítems pares aportan
`5 − respuesta`; la suma se multiplica por 2,5. Resultado entre 0 y 100.
Referencia: 68 es el promedio; ≥ 80 se considera muy bueno.

## 4. Metas (del plan de evaluación)

| Métrica | Meta |
|---|---|
| Éxito sin ayuda | ≥ 80 % |
| Tiempo | T1 ≤ 180 s, T2 ≤ 120 s, T3 ≤ 60 s |
| Errores | ≤ 2 por tarea |
| SEQ | ≥ 5,5 |
| SUS | ≥ 68 |

> Los archivos CSV se entregan vacíos (solo cabeceras) y se llenan con los datos reales de P01,
> P02 y la reevaluación v2. No se aceptan métricas inventadas.
