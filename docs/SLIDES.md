# Diapositivas: ficha por vista (estado v1)

Cada ficha remite al documento académico [`investigacion/MIL_Fase_2_Consolidada.md`](investigacion/MIL_Fase_2_Consolidada.md) (en adelante «Doc») para el contenido y las cifras. Aquí solo se registran la composición, los pasos, las figuras y las decisiones visuales de la v1 (commit `2fe130c`). Los objetivos y tiempos son los del plan de exposición del Doc («Plan de exposición y guion oral»). Las vistas se nombran `N.P` (diapositiva y paso), como en la URL de la presentación.

| N.º | Título | Contenido (Doc) | Objetivo | Tiempo | Vistas | Figuras (id) | Decisiones visuales | Pendientes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | ¿Dónde está el problema? | «Diapositiva 1» | Que la audiencia sienta la «aguja en el pajar» | 0:50 | 1 | `esquema-lamina`, `esquema-region`, `d1-zoom` | Lámina (a) y foco (b) en paneles de esquema; dato «< 10 %» en N2 (DEC-11) | Imagen real (P-07); foco a escala; el «< 10 %» es un promedio |
| 2 | ¿Qué es Multiple Instance Learning? | «Diapositiva 2» | Distinguir MIL del aprendizaje supervisado | 0:55 | 2.1 tabla; 2.2 origen (1997) | — | Tabla completa sin pictogramas (DEC-10); distinción MIL ≠ supervisión débil en 2.2; sin caja de molécula (DEC-11) | Esquema de la molécula, no aprobado (pendiente 11 de DESIGN.md) |
| 3 | Bag e Instance | «Diapositiva 3» | Fijar el vocabulario con CAMELYON16 | 1:00 | 3.1 muestra y región; 3.2 cuadrícula, parches y claves | `d3-cuadricula`, `d3-lamina-cuadricula`, `.d3-parche` | Cadena muestra → región → cuadrícula → parches (DEC-04); marca de testigo con muesca; parches del esquema (DEC-11) | Parches reales y criterio de selección (P-07); analogía de los llaveros, no incorporada |
| 4 | Supuestos de MIL | «Diapositiva 4» | Mostrar que existe más de una regla posible | 1:05 | 1 | `d4-estandar`, `d4-colectivo` | Una sola vista (DEC-13); fórmula colectiva en una línea a N3; notación del Doc; b y n_b definidos en el pie | Holgura de las cifras en las celdas (P-13) |
| 5 | Formulación matemática | «Diapositiva 5» | Pasar de la intuición a f → σ → g | 1:15 | 5.1 supuesto, Bernoulli y pérdida; 5.2 descomposición | `d5-bloques` | Nota de no diferenciabilidad en N3; franja f → σ → g con «Σ u otro operador simétrico» (DEC-11) | — |
| 6 | Métodos de agregación | «Diapositiva 6» | Comparar max, mean y atención | 1:10 | 1 | `d6-pesos` | Orden Max, Mean, Atención (ABMIL) en figura y tabla; protocolo A en N2; Source Sans 3 en cifras (DEC-08); leyenda en N3 (DEC-11) | — |
| 7 | Attention-based Deep MIL (ABMIL) | «Diapositiva 7» | Explicar la atención con compuerta y sus límites | 1:20 | 7.1 bloques y ecuación; 7.2 límites | `d7-bloques` | 7.2 sin paneles de imagen (D7, DEC-11); bloques ensanchados | Negritas vectoriales (P-13); mapa de atención (P-08) |
| 8 | Pipeline completo de MIL | «Diapositiva 8» | Separar entrenamiento e inferencia | 1:15 | 8.1 inferencia; 8.2 entrenamiento | `d8-pipeline` | Pipeline general con alternativas (DEC-06); flechas 1 → 2 → 3, trama del extractor y leyenda de gradientes en N3 (DEC-11) | — |
| 9 | Evolución de las arquitecturas | «Diapositiva 9» | Mostrar el hilo de problemas y soluciones | 1:00 | 1 | — | Tesis en N3 en negrita sobre la lista (DEC-11) | Palabra suelta (P-13) |
| 10 | Aplicaciones, resultados y limitaciones | «Diapositiva 10» y «Raff y Holt (NeurIPS 2023)» | Interpretar resultados con honestidad | 1:40 | 10.1 Tabla A; 10.2 Tabla B; 10.3 protocolos; 10.4 veneno; 10.5 Tabla 2 de Raff y Holt | `d10-esquema-veneno` | Tablas A y B separadas con protocolo; filas Mean y ABMIL resaltadas; 10.3 en dos paneles (DEC-12); concepto positivo en tinta (D5); fila completa de la Tabla B (DEC-09); rótulo literal en 10.5; Source Sans 3 en cifras (DEC-08) | Líneas de lectura de 10.2 y 10.5 (P-02); el «0,5» (P-01); cota supervisada y esquema del veneno por confirmar (P-04); ritmo de 20 s por paso |
| 11 | Conclusiones | «Diapositiva 11: conclusiones» | Dejar tres ideas y una pregunta | 0:30 | 1 | — | Tres ideas en N2 y la pregunta bajo una regla | — |
| | **Total** | | | **12:00** | **20 vistas** | | | |

## Marco común

Se aplica a todas las diapositivas:

- Título N1.
- Contenido con niveles N2 y N3.
- Pie N4 solo con citas y el rótulo «Esquema ilustrativo: no son datos».
- Controles en la esquina inferior derecha.
- Margen de seguridad del 5 %.

Los detalles están en [`DESIGN.md`](../DESIGN.md) (Layout y Typography) y [`presentacion/README.md`](../presentacion/README.md).
