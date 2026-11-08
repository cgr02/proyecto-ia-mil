# Registro de decisiones

Decisiones de diseño y de proceso de la presentación MIL. Cada entrada indica su estado y dónde está la evidencia. El contenido académico no se decide aquí: su fuente es [`investigacion/MIL_Fase_2_Consolidada.md`](investigacion/MIL_Fase_2_Consolidada.md). Las reglas D1–D9 se citan por su número y su texto vive en [`DESIGN.md`](../DESIGN.md).

Estados:

- **Aprobada:** el usuario la aprobó de forma explícita.
- **Aprobada (provisional):** aprobada para la v1, sujeta a revisión.
- **Pendiente:** falta una decisión o un dato.

Las decisiones aprobadas en conversación se fechan el día en que se aprobaron. Su evidencia es el commit que las implementa.

## Decisiones

| N.º | Fecha | Decisión | Motivo | Alternativa descartada | Estado | Evidencia |
| --- | --- | --- | --- | --- | --- | --- |
| DEC-01 | 2026-11-08 | Dirección visual provisional v0: fondo claro neutro, roles semánticos D1–D9, niveles tipográficos N1–N4 | Sala iluminada y dos televisores de 60″; ver [`PRODUCT.md`](../PRODUCT.md) | Fondo oscuro de conferencia | Aprobada (provisional) | `27cf60d` |
| DEC-02 | 2026-11-07 | El documento académico consolidado es la fuente única de contenido y no se modifica. Las 11 diapositivas, títulos, secuencia, cifras y conclusiones no cambian | Trabajo académico cerrado y trazado | — | Aprobada | `PRODUCT.md`, Capabilities and Constraints |
| DEC-03 | 2026-11-08 | Regla D9: ninguna imagen real, mapa de atención o resultado sin fuente y licencia verificadas; los esquemas del equipo se rotulan | No fabricar evidencia | Usar imágenes o mapas de ejemplo sin verificar | Aprobada | `DESIGN.md`, D9 |
| DEC-04 | 2026-11-08 | Diapositiva 3 como cadena muestra → región → cuadrícula → parches ampliados | Fijar el vocabulario con CAMELYON16 | — | Aprobada | `DESIGN.md`; `2fe130c` |
| DEC-05 | 2026-11-08 | Presentación en HTML, CSS y JavaScript estáticos, sin dependencias: lienzo fijo de 1920 × 1080 escalado, margen de seguridad del 5 % y recursos locales. Ecuaciones en MathML con Noto Sans Math (no se instaló KaTeX) | No instalar dependencias sin aprobación; funcionar sin conexión | KaTeX, propuesto en `PRODUCT.md` (Stack) y no aprobado | Aprobada | `2fe130c`; `presentacion/README.md` |
| DEC-06 | 2026-11-08 | Pipeline de la diapositiva 8: <br>• Max y Mean sin atención; ABMIL como alternativa. <br>• Etiqueta «5–6 Agregación MIL», que conserva la correspondencia con las 8 etapas del documento. <br>• Rótulo «Referencia: configuración publicada de CLAM y TransMIL». <br>• Inferencia (8.1) y entrenamiento con gradientes (8.2) en pasos separados. <br>• Mapa de calor opcional | Fidelidad al documento: la atención solo existe en ABMIL; la configuración es una referencia, no un estándar | Pipeline general con la atención como etapa obligatoria | Aprobada | `2fe130c` |
| DEC-07 | 2026-11-08 | Pasos controlados por el expositor: 2 en las diapositivas 2, 3, 5, 7 y 8; 5 en la 10; un total de 20 vistas | Revelar por partes sin recargar | Más pasos por diapositiva | Aprobada | `2fe130c`; `presentacion/README.md` |
| DEC-08 | 2026-11-08 | Source Sans 3 solo para las cifras experimentales de las diapositivas 6 y 10: a 59 px (escala 1,054, para igualar la altura de dígito de Atkinson a 56 px), con cifras tabulares y de caja alta. Años, referencias y numeración de etapas siguen en Atkinson Hyperlegible Next | Cifras tabulares legibles en tablas | Atkinson Mono en las cifras | Aprobada | `2fe130c`; `presentacion/css/base.css` |
| DEC-09 | 2026-11-08 | Tabla B conserva la fila completa «Totalmente supervisado (cota superior)» | Rótulo literal del documento | Abreviarla | Aprobada | `2fe130c` |
| DEC-10 | 2026-11-08 | Diapositiva 2: la tabla comparativa se muestra completa, sin pictogramas | Claridad de la comparación | Tabla con pictogramas | Aprobada | `2fe130c` |
| DEC-11 | 2026-11-08 | Correcciones de prioridad alta y media de la primera revisión con Impeccable (ver la nota 1) | Legibilidad a distancia, fidelidad y consistencia | — | Aprobada | `2fe130c`; `.impeccable/critique/` |
| DEC-12 | 2026-11-08 | Vista 10.3 con dos paneles independientes, uno por artículo (Shao et al.: DSMIL 0,8179; Li et al.: Tablas 1 y 3). Cada panel lleva su fuente y debajo va la línea «No es una comparación directa: cambia el protocolo» | Regla de no comparar protocolos en un mismo eje | Excepción documentada con tabla de protocolos | Aprobada | `2fe130c` |
| DEC-13 | 2026-11-08 | Diapositiva 4 en una sola vista. La notación b, n_b, x_i se mantiene porque coincide con el documento | Conservar el avance y las 20 vistas | Tres pasos (22 vistas) | Aprobada | `2fe130c` |
| DEC-14 | 2026-11-08 | Tamaños tipográficos vigentes (N3 = 56 px) hasta medir la distancia a la última fila. Nunca se reduce la letra para resolver problemas de espacio: se reorganiza | La validación depende de la sala | Subir N3 a 64 px a ciegas | Aprobada | Instrucción del usuario |
| DEC-15 | 2026-11-08 | Impeccable instalado en el proyecto con telemetría desactivada. No se usa `impeccable live-server` (modifica `index.html`) ni el subagente `impeccable-documenter` (reescribe `DESIGN.md`) | Revisión sin efectos secundarios | Instalación global | Aprobada | `2fe130c` |
| DEC-16 | 2026-11-08 | No instalar Graphify por ahora; reconsiderarlo si el corpus crece | Corpus pequeño; la extracción con un modelo de lenguaje no sustituye a la trazabilidad verificada | Instalarlo de inmediato | Aprobada | Auditoría del 2026-11-08 |
| DEC-17 | 2026-11-08 | `PRODUCT.md` y `DESIGN.md` se mueven a la raíz con `git mv` | Impeccable solo los lee en la raíz (verificado con `impeccable context`) | Mantenerlos en `docs/diseno/` | Aprobada | Este cambio |
| DEC-18 | 2026-11-08 | Estructura documental de la v2 ([`PROJECT_CONTEXT.md`](../PROJECT_CONTEXT.md), [`DESIGN_BRIEF.md`](../DESIGN_BRIEF.md), este registro, [`ASSETS.md`](ASSETS.md) y [`SLIDES.md`](SLIDES.md)) y carpeta `recursos/` con originales protegidos | Recuperar el contexto sin duplicar fuentes | — | Aprobada | Este cambio |
| DEC-19 | 2026-11-08 | Protección de la v1: commit `2fe130c` en `develop` con la presentación, Impeccable y la crítica. `.claude/settings.local.json` queda fuera de Git | La v1 solo existía en un contenedor efímero | — | Aprobada | `2fe130c` |

### Nota 1. Contenido de DEC-11

- **Marca del testigo:** contorno, discontinuo si no se observa, más una muesca maciza en la esquina superior izquierda, para distinguirla sin depender del color.
- **D5 en 10.4:** el «concepto positivo» se dibuja con esa marca en tinta, de modo que el veneno y la anotación no comparten figura.
- **Espacios reservados y notas internas:** se eliminan («DESIGN.md», «pendiente», «Espacio reservado»). Rótulo único en el pie: «Esquema ilustrativo: no son datos». Los paneles de esquema van sobre el fondo de la diapositiva con un marco fino (`.esquema-panel`).
- **Contenido trasladado desde los pies** a niveles legibles:
  - la distinción entre MIL y supervisión débil (pasa de 2.1 a 2.2);
  - «no se observa al entrenar» (3.2);
  - la no diferenciabilidad del máximo (5.1);
  - la leyenda de pesos (6);
  - la tesis de la 9, en N3 en negrita;
  - «Comparar solo filas de esta tabla» (10.1);
  - el criterio de fallo (10.4).
- **3.2 d:** tres parches del esquema ampliado en lugar de cajas vacías.
- **3.2:** cuadrícula sobre toda la lámina en el panel a.
- **5.2:** franja f → σ → g, con «Σ u otro operador simétrico» y paréntesis sin estirar.
- **Diapositiva 6:**
  - la tabla sigue el orden de la figura (Max, Mean, «Atención (ABMIL)»);
  - el protocolo va como encabezado N2;
  - la leyenda dice «Max: sobre puntuaciones de instancia».
- **7.2:** sin paneles a–c (D7). Las dos limitaciones van como bloques.
- **Diapositiva 8:**
  - flechas 1 → 2 → 3;
  - trama completa del extractor congelado;
  - «congelada» en lugar de «congelado»;
  - leyenda «gradientes» en N3.
- **10.1 y 10.2:** Mean pooling y ABMIL en negrita; el resto en tinta secundaria.
- **10.5:** rótulo literal «MIL-Pooling (Ilse et al., base de Attention MIL)».
- **Holguras:** al menos 16 px entre texto y borde en los diagramas de 5.2, 7.1 y 8.

## Pendientes

| N.º | Asunto | Qué falta | Bloquea |
| --- | --- | --- | --- |
| P-01 | El «0,5» del criterio de fallo en 10.4 | Decidir si va en Atkinson (umbral, situación actual) o en Source Sans 3 (cifra) | Nada |
| P-02 | Líneas de lectura de 10.2 («Dentro de B, ABMIL supera a mean») y de 10.5 («Las pruebas invalidan, no certifican»): no caben en N3 sin reducir la letra. Hoy la de 10.5 está en el pie y la de 10.2 no se muestra | Reorganizar en la v2 | Legibilidad de 10.2 y 10.5 |
| P-03 | Actualizar `DESIGN.md` a v1 con las ampliaciones aprobadas (muesca del testigo, `.esquema-panel`, Source Sans 3 en las cifras, rótulo único, compactación de las tablas B y de Raff, KaTeX no usado) | Redacción y aprobación | Coherencia entre `DESIGN.md` y el código |
| P-04 | Decisiones del equipo del documento académico: cota totalmente supervisada (ya incluida en 10.2) y esquema del veneno (ya incluido en 10.4, estático) | Confirmación formal | Nada |
| P-05 | Experimento propio (por ejemplo, ToyDataset de torchmil) | Decisión del equipo; si se hace, va aparte y rotulado | Nada |
| P-06 | Datos de la sala: distancia, posición de los televisores, espejo, sobrebarrido, reflejos | Medición en la sala | Tamaño final de N3 (DEC-14) |
| P-07 | Licencia de CAMELYON16 en la fuente primaria (GigaScience, GigaDB o la página del reto); hoy solo consta CC0 en el registro AWS Open Data | Verificación | Cualquier imagen real (DEC-03) |
| P-08 | Fuente de un mapa de atención para 7 y 8 | No existe | Panel de atención |
| P-09 | Verificaciones abiertas del documento académico: <br>• variante de Ilse probada por Raff y Holt; <br>• conjunto de prueba de TransMIL (129 o 130); <br>• README de GigaScience sobre test_049; <br>• suplemento de JAMA | Consulta de fuentes | Nada en pantalla |
| P-10 | Objetivos y alcance específicos de la v2 | Definirlos con el usuario en [`DESIGN_BRIEF.md`](../DESIGN_BRIEF.md) | Diseño de la v2 |
| P-11 | Etiqueta `presentacion-v1` en el remoto: existe en local (apunta a `2fe130c`), pero el acceso Git de la sesión rechazó subirla (HTTP 403) | Crearla desde GitHub (Releases → nueva versión → etiqueta `presentacion-v1` sobre `2fe130c`) | Nada; el commit ya está en remoto |
| P-12 | Halo del contorno sobre H&E real (D6) y simulación de daltonismo documentada | Pruebas | Uso de imágenes reales |
| P-13 | Hallazgos de prioridad baja: <br>• negritas vectoriales de 7.1; <br>• tecla de pantalla en negro; <br>• holguras de las celdas de 4 y de las columnas de 10.2; <br>• colores escritos directamente en el código; <br>• controles visibles; <br>• palabra suelta en 9 | Priorizar | Nada |
| P-14 | Ensayo cronometrado de 12:00 | Ensayo | Validación final |
| P-15 | Fuente de la fórmula de distancia (¿AVIXA DISCAS?) y prueba física de legibilidad | Verificación | P-06 |

## Errores aprendidos en la v1 (no repetir)

- Comparar cifras de los protocolos A y B en un mismo eje o fila.
- Presentar la atención como probabilidad o explicación.
- Dibujar un pipeline que presupone atención.
- Inventar imágenes, mapas, cifras o métricas.
- Reducir la tipografía para que algo quepa.
- Mostrar en pantalla referencias internas del proyecto.
- Dejar que las cajas vacías dominen la composición.
- Juntar veneno y anotación (D5).
- Usar el color como único código.
- Poner en el pie (N4) tesis o criterios necesarios para entender.
- Usar `impeccable live-server`.
- Revisar la presentación desde una vista estática del archivo en lugar de servirla con un servidor local.
