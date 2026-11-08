# Product

<!-- impeccable:product-schema 1 -->

Registro del producto para la presentación académica sobre Multiple Instance Learning (MIL). Sigue el esquema de PRODUCT.md de Impeccable: contiene propósito, audiencia, contexto y restricciones, y deja las decisiones visuales en `DESIGN.md`.

Marcas usadas en este documento:

- **[Confirmado]**: consta en `docs/investigacion/MIL_Fase_2_Consolidada.md`, en el README o en indicaciones explícitas del equipo.
- **[Propuesto]**: recomendación pendiente de aprobación.
- **[Por validar]**: dato que falta y no debe suponerse.

Ubicación: este archivo está en `docs/diseno/` por decisión del equipo. Impeccable lo busca en la raíz del proyecto; si se instala más adelante, habrá que moverlo o enlazarlo [Por validar].

## Platform

web

## Stack

[Propuesto] HTML y CSS estáticos, con las ecuaciones compuestas con KaTeX y todos los recursos locales (fuentes, imágenes y scripts), de modo que la exposición funcione sin conexión. Es una decisión del equipo y está pendiente de confirmación. No se instala nada hasta aprobarla.

## Users

- [Confirmado] Docente y estudiantes del curso Inteligencia Artificial II (README).
- [Por validar] Conocimientos previos de la audiencia: aprendizaje supervisado, redes neuronales, AUC y patología. Determina cuánto se explica de cada término.
- [Por validar] Quién expone: una persona o un equipo, y cómo se reparten las diapositivas.
- [Propuesto] Personas de referencia para las críticas de diseño, a confirmar:
  - **El estudiante de la última fila.** Pone a prueba la legibilidad y la densidad de cada lámina.
  - **El docente evaluador.** Pone a prueba el rigor: si se mezclan protocolos, si se atribuyen a CLAM o DSMIL resultados de Raff y Holt, si la atención se presenta como explicación.
  - **El expositor.** Tiene 1:40 en la diapositiva 10 y necesita poder señalar en pantalla lo que dice.

## Product Purpose

[Confirmado] Explicar Multiple Instance Learning en 11 diapositivas y 12:00 minutos, usando CAMELYON16 como ejemplo conductor desde la primera diapositiva. La exposición recorre el problema, la definición, los conceptos, los supuestos, la formulación, la agregación, ABMIL, el pipeline, la evolución de las arquitecturas, los resultados con sus limitaciones y las conclusiones.

[Confirmado] Mensaje final: evaluar un modelo MIL exige más que el AUC; hay que declarar el supuesto que se pretende respetar, comprobarlo y reportar el protocolo completo.

Objetivos de comunicación por diapositiva [Confirmado, tabla del plan de exposición del documento académico]:

| # | Título | Objetivo comunicativo | Tiempo |
| --- | --- | --- | --- |
| 1 | ¿Dónde está el problema? | Que la audiencia sienta la «aguja en el pajar» | 0:50 |
| 2 | ¿Qué es MIL? | Distinguir MIL del aprendizaje supervisado | 0:55 |
| 3 | Bag e Instance | Fijar el vocabulario con CAMELYON16 | 1:00 |
| 4 | Supuestos de MIL | Mostrar que existe más de una regla posible | 1:05 |
| 5 | Formulación matemática | Pasar de la intuición a f → σ → g | 1:15 |
| 6 | Métodos de agregación | Comparar max, mean y atención | 1:10 |
| 7 | ABMIL | Explicar la atención con compuerta y sus límites | 1:20 |
| 8 | Pipeline completo | Separar entrenamiento e inferencia | 1:15 |
| 9 | Evolución | Mostrar el hilo de problemas y soluciones | 1:00 |
| 10 | Aplicaciones, resultados y limitaciones | Interpretar resultados con honestidad | 1:40 |
| 11 | Conclusiones | Dejar tres ideas y una pregunta | 0:30 |

## Positioning

[Confirmado] Lo que esta exposición puede afirmar y una presentación genérica sobre MIL no puede:

- Separa los resultados de CAMELYON16 por protocolo y explica por qué no se comparan entre artículos (Tablas A, B y C).
- Distingue los pesos de atención de las probabilidades de instancia y de las explicaciones causales (corrección C).
- Incluye la evidencia de Raff y Holt (2023): un AUC alto no certifica que el modelo respete el supuesto MIL que declara.

## Operating Context

- [Confirmado] La exposición se proyecta en **dos televisores de unos 60 pulgadas** en un **salón iluminado**.
- [Confirmado, derivado por cálculo] Una pantalla de 60″ en formato 16:9 mide unos 1,33 × 0,75 m. A 1920 × 1080, cada píxel mide unos 0,69 mm de alto.
- [Por validar] Datos de la sala que condicionan el diseño:
  - Distancia de la última fila a cada televisor.
  - Posición de los televisores: ambos al frente o uno a media sala.
  - Si ambos muestran la misma imagen (espejo) o escritorios distintos.
  - Resolución nativa (1080p o 4K) y conexión (HDMI desde un portátil u otra).
  - Si recortan los bordes (*overscan*) y qué modo de imagen tienen.
  - Ventanas, dirección de la luz y reflejos en las pantallas.
  - Equipo desde el que se expone, si hay Internet y si se dispone de control remoto o teclado.
  - Tiempo de preguntas después de los 12:00.

## Capabilities and Constraints

Restricciones de contenido [Confirmado]:

- Las 11 diapositivas, sus títulos, su secuencia, sus cifras y sus conclusiones no se alteran.
- El documento académico original no se modifica.
- Las cifras de artículos distintos no se comparan. Las Tablas A, B y C van separadas, y solo son válidas las comparaciones entre filas de una misma tabla.
- Los pesos de atención son importancia relativa dentro del bag: no son probabilidades de tumor ni explicaciones causales.
- Raff y Holt no evaluaron CLAM ni DSMIL; no se les atribuye ningún resultado de esas pruebas.
- El ejemplo de unos 8.800 parches y sus pesos es ilustrativo, no un experimento.
- Ningún dato numérico procede de experimentos del equipo. Si se decide mostrar una demostración propia, se presenta aparte y rotulada como experimento propio, nunca mezclada con las Tablas A, B y C.
- Las interpretaciones propias se marcan como tales.

Terminología [Confirmado]: bag (bolsa), instance (instancia), witness (testigo), supuesto estándar, colectivo y de umbral, MIL pooling, ABMIL, CLAM, DSMIL, TransMIL, AUC y FROC. La coma es el separador decimal (0,8760).

[Por validar] Formato de respaldo: una copia en PDF por si falla el equipo de la sala.

## Evidence on Hand

Disponible:

- [Confirmado] El documento académico consolidado, con las Tablas A, B y C, los resultados de Raff y Holt (Tabla 2), la tabla de trazabilidad de 30 afirmaciones y una bibliografía de 10 referencias fundamentales.
- [Confirmado, fuente secundaria] El conjunto de datos CAMELYON con láminas completas y anotaciones de contorno de tumor. Su licencia figura como **CC0** en el registro AWS Open Data (`awslabs/open-data-registry`, archivo `datasets/camelyon.yaml`, gestionado por Radboudumc).
- [Por validar] Verificar la licencia en la fuente primaria (artículo de GigaScience, GigaDB o la página del reto). **Ninguna imagen real se usa antes de esa verificación.**

Ausente, y no debe fabricarse:

- Imágenes extraídas de las láminas.
- Mapas de atención de algún modelo.
- Figuras de artículos con licencia de reproducción revisada.
- Resultados experimentales propios.
- Fotografías o medidas de la sala.

## Product Principles

1. **La evidencia antes que la afirmación.** Cada diapositiva muestra el tejido, el mecanismo o la tabla que sostiene lo que se dice.
2. **Comparar solo lo comparable.** La composición nunca invita a comparar cifras de protocolos distintos.
3. **No sugerir más de lo que muestra la fuente.** Lo ilustrativo se rotula como ilustrativo y lo propio como propio.
4. **Legible desde la última fila.** Lo que debe leerse se lee a la distancia real de la sala.
5. **Una pregunta por lámina.** Cada diapositiva responde a la pregunta de su objetivo comunicativo.

## Accessibility & Inclusion

- [Propuesto] Contraste mínimo WCAG AA (4,5:1 en texto, 3:1 en texto grande y gráficos). Por tratarse de lectura a distancia, se propone aspirar a 7:1 en el texto principal.
- [Propuesto] El color nunca es el único código: cada concepto se distingue también por el tipo de trazo, relleno, trama o etiqueta.
- [Por validar] Simulación de daltonismo de los colores semánticos.
- [Por validar] Tamaño mínimo del texto, derivado de la distancia medida en la sala y comprobado con una prueba física (ver DESIGN.md, Typography).

## Criterios de éxito

Verificables antes o durante el ensayo [Propuesto]:

1. La exposición dura 12:00 ± 0:30 en un ensayo cronometrado.
2. Cada cifra en pantalla coincide con la tabla de trazabilidad del documento académico.
3. Ningún panel coloca cifras de los protocolos A y B en la misma fila visual.
4. Ninguna leyenda de atención usa las palabras «probabilidad», «explica» o «detecta», y ninguna afirma que suman 1 los pesos de una selección de parches.
5. Toda imagen lleva su fuente y su estado (real con licencia verificada, figura publicada, esquema ilustrativo o experimento propio).
6. Todo el texto que debe leerse desde la última fila supera el umbral validado en la sala.
7. Las capturas de cada diapositiva (Playwright, 1920 × 1080) no muestran desbordamientos ni texto cortado.
8. En el ensayo, personas ajenas al equipo pueden explicar con sus palabras qué es un bag, qué es un testigo, por qué la atención no es una probabilidad y qué mostraron Raff y Holt.
