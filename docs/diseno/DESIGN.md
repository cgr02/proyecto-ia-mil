---
name: Presentación MIL — dirección visual provisional v0
description: Exposición académica de 11 diapositivas sobre Multiple Instance Learning con CAMELYON16 como ejemplo conductor
status: propuesta v0  # se revisa tras construir y evaluar las primeras diapositivas
canvas:
  width: 1920   # propuesta v0
  height: 1080  # propuesta v0
  safeMargin: "5%"  # propuesta v0; margen para overscan, por validar en los televisores
colors:
  ground: "#F4F5F5"             # propuesta v0: fondo neutro claro
  ink: "#16181B"                # propuesta v0: texto principal, 16,3:1 sobre ground
  ink-secondary: "#4B5157"      # propuesta v0: texto secundario, 7,4:1
  patch-grid: "#6B7178"         # propuesta v0: bordes de parches, 4,5:1
  annotation: "#00796B"         # propuesta v0: anotación humana y testigos, 4,9:1
  attention-low: "#F6E3BF"      # propuesta v0: extremo bajo de la escala de atención
  attention-high: "#8A4B00"     # propuesta v0: extremo alto de la escala de atención, 6,2:1
  misleading-signal: "#B3261E"  # propuesta v0: «veneno» de Raff y Holt, 6,0:1
typography:
  title:
    fontFamily: "Atkinson Hyperlegible Next, Source Sans 3, sans-serif"  # propuesta v0
    fontSize: "88px"   # propuesta v0, supone 6 m; por validar
    fontWeight: 700
  message:
    fontFamily: "Atkinson Hyperlegible Next, Source Sans 3, sans-serif"
    fontSize: "64px"   # propuesta v0; por validar
    fontWeight: 400
  label:
    fontFamily: "Atkinson Hyperlegible Next, Source Sans 3, sans-serif"
    fontSize: "56px"   # propuesta v0; por validar
    fontWeight: 400
    fontFeature: "tnum"  # por verificar que la fuente lo incluye
  citation:
    fontFamily: "Atkinson Hyperlegible Next, Source Sans 3, sans-serif"
    fontSize: "32px"   # propuesta v0; nivel de lectura cercana
    fontWeight: 400
  dimension:
    fontFamily: "Atkinson Hyperlegible Mono, monospace"  # propuesta v0; solo dimensiones y tamaños
    fontSize: "56px"
rounded:
  none: "0px"  # propuesta v0
spacing:
  xs: "8px"    # propuesta v0
  sm: "16px"
  md: "32px"
  lg: "64px"
  xl: "128px"
---

# Design System: Presentación MIL

## Overview

**Dirección visual provisional v0.** Este documento propone una dirección; no es un sistema cerrado. Se revisa después de construir y evaluar las primeras diapositivas en los televisores reales. Impeccable recomienda escribir DESIGN.md a partir de lo construido, no antes (`reference/new-work.md`, §5). Por eso aquí todo valor visual es una hipótesis justificada, y se reescribirá con lo que muestre la evaluación.

### Dos clases de enunciados

- **Restricciones de contenido.** Vienen del documento académico (`docs/investigacion/MIL_Fase_2_Consolidada.md`) y son firmes porque no son decisiones de diseño: no comparar protocolos, la atención no es probabilidad, rotular lo ilustrativo y citar cada cifra. Se marcan **[Restricción]**.
- **Criterios visuales v0.** Colores, fuentes, tamaños, marcas y composición. Son propuestas revisables. Se marcan **[Propuesto]**. Lo que falta averiguar se marca **[Por validar]**, y lo comprobado, **[Confirmado]**.

### Contrato de dirección [Propuesto]

Sigue los seis bloques del contrato de dirección de Impeccable.

- **THESIS.** La evidencia es la lámina. Cada diapositiva muestra el tejido, el mecanismo dibujado o la tabla que sostiene lo que se dice. El diseño separa tres saberes que una presentación genérica confunde: lo que anotó el patólogo, lo que el modelo procesa (parches) y lo que el modelo pondera (atención). Rechaza el arreglo por defecto de la categoría, que es fondo oscuro, redes de nodos luminosos y título con viñetas.
- **OWN-WORLD.** El aparato de la figura científica: letras de panel a, b, c, pie de figura, línea de fuente, tablas con reglas horizontales y barra de escala. A eso se suman las convenciones funcionales del visor de láminas (miniatura de navegación con recuadro de zoom, aumento, rejilla de teselado), todo sobre un fondo neutro claro y con color solo semántico.
- **STORY.** Es la secuencia confirmada del documento: problema → definición → vocabulario → regla → fórmula → agregación → mecanismo → sistema → evolución → evidencia y límites → conclusión.
- **FIRST VIEWPORT (diapositiva 1).** Los dos primeros pasos de la composición muestra → región de interés:
  - La muestra completa ocupa unos dos tercios del ancho.
  - Un recuadro sobre ella conduce a un panel ampliado del foco tumoral, con el contorno de la anotación humana.
  - A la derecha van el título y una línea con «< 10 % del tejido, en promedio» y su cita.
  - El expositor señala el recuadro.
  - Mientras la licencia de la imagen no esté verificada en la fuente primaria, se maqueta con un esquema rotulado.
- **FORM.** Figura de artículo científico, adaptada a lectura a distancia.
- **FINISH.** El trabajo no está terminado hasta que haya revisión del render, validación en los televisores y una nueva versión de este documento basada en lo construido.

### Por qué «editorial científico» no significa tipografía de periódico [Propuesto]

Impeccable identifica como patrón repetido de las interfaces generadas por IA la combinación de reglas finas de periódico, serif cursiva de display y etiquetas monoespaciadas espaciadas (`reference/new-work.md`, §4). Aquí el carácter editorial no sale de esa tipografía, sino de la forma en que una revista científica presenta evidencia: figuras con paneles, pies que dicen qué se ve y de dónde viene, y tablas que se leen por filas.

### Pendientes de validación

1. **Datos de la sala.** Distancia de la última fila, posición de los televisores, espejo o escritorio extendido, resolución, *overscan*, modo de imagen y reflejos.
2. **Licencia de CAMELYON.** Verificarla en la fuente primaria (GigaScience, GigaDB o la página del reto); hoy solo consta CC0 en el registro AWS Open Data. Ninguna imagen real se usa antes de esto, y se atribuye en todo caso.
3. **Fórmula de distancia.** Verificar su fuente (posiblemente AVIXA DISCAS) y hacer la prueba física de legibilidad.
4. **Halo del contorno.** Probarlo sobre recortes H&E reales (D6).
5. **Los tres parches ampliados de la diapositiva 3.** Pendiente sin propuesta de contenido: qué parches se muestran, con qué etiqueta según la anotación humana y con qué criterio de selección. Se decide sobre imágenes reales y con el equipo.
6. **Selección de láminas.** Elegir cuáles usar. Extraerlas requiere herramientas de lectura de láminas completas y descargas de varios gigabytes, así que necesita aprobación previa para instalar.
7. **Fuente del mapa de atención** de las diapositivas 7 y 8. No existe hoy. Las opciones son una figura publicada con licencia verificada, un experimento propio rotulado y separado (decisión del equipo pendiente en el documento académico), o prescindir del panel y dejar solo el diagrama.
8. **El «< 10 %» de la diapositiva 1.** Es un promedio. La lámina de ejemplo tendrá su propia fracción; si se calcula, es un dato propio y se rotula como tal.
9. **Fuentes tipográficas.** Verificar la licencia OFL, las cifras tabulares y la legibilidad a distancia. Alternativa: Source Sans 3.
10. **Simulación de daltonismo** de los colores semánticos.
11. **Elementos visuales sin decidir.** Una línea de mensaje bajo cada título, revelados por pasos en la diapositiva 10, una ilustración de la analogía de los llaveros y un esquema de la molécula de la diapositiva 2. Ninguno se incorpora sin aprobación.
12. **Ubicación de PRODUCT.md** si más adelante se instala Impeccable.

## Colors

**Estrategia [Propuesto]: *Restrained*.** Neutros y una tinta, más colores que solo codifican conceptos científicos. No hay color de marca ni acentos decorativos.

Razones:

- La presentación es una superficie de lectura y comprensión, no de persuasión.
- Las fotografías H&E ya aportan color. Si el diseño añade otros colores sin función, compiten con la evidencia y confunden el código semántico.

### D1. Fondo claro neutro [Propuesto]

**Ground** (`#F4F5F5`): fondo de todas las diapositivas. Se propone claro y neutro, y no oscuro ni crema, por estas razones:

- **El salón está iluminado** [Confirmado], y en esas condiciones las zonas oscuras de un televisor brillante reflejan la sala.
- **Las láminas H&E se escanean sobre vidrio, con un fondo casi blanco,** que se integra con un fondo claro sin necesidad de recuadros.
- **Un fondo teñido desplazaría la percepción del rosa y el morado del tejido.**
- **El crema es uno de los patrones por defecto que Impeccable señala** para interfaces generadas por IA.

[Por validar] Brillo y deslumbramiento en los televisores reales; el valor puede ajustarse.

### D2. Roles semánticos [Propuesto]

Cada concepto tiene un tipo de marca propio (línea, relleno, trama, número). El color refuerza esa marca, pero nunca es el único código.

| Rol | Marca propuesta | Color propuesto | Diapositivas |
| --- | --- | --- | --- |
| **Anotación humana** (contorno del patólogo, verdad de terreno) | Línea continua; sobre tejido, con halo claro (D6) | `annotation` `#00796B`. Verde azulado, que es el tono más alejado del rosa y morado del H&E | 1, 3, 7 |
| **Testigo** (parche positivo según la anotación) | Contorno del parche en el color de la anotación, porque su etiqueta viene de ella. **Discontinuo** cuando se quiere decir «existe, pero el modelo no lo observa al entrenar» | `annotation` | 3, 4, 6 |
| **Parche o instancia** | Celda cuadrada con borde gris y sin relleno, o miniatura real | `patch-grid` `#6B7178` | 3, 5, 6, 8 |
| **Bag** | Llaves `{ … }` alrededor de las instancias. Es la notación X = {x₁, …, x_K} del documento, de modo que el dibujo y la ecuación hablan el mismo idioma | `ink` | 2 a 6 |
| **Peso de atención ABMIL** | Relleno en escala secuencial (más oscuro, más peso), con leyenda condicional (D3b) | De `attention-low` `#F6E3BF` a `attention-high` `#8A4B00` | 6, 7, 8 |
| **Salida del modelo θ(X)** | Número en tinta, sin color, para que no se confunda con la atención | `ink` | 5, 7, 8 |
| **Señal engañosa** («veneno» de Raff y Holt) | Trama diagonal con la etiqueta «veneno». Solo en esquemas sintéticos, nunca sobre tejido | `misleading-signal` `#B3261E` | 10 |
| **Entrenamiento frente a inferencia** | Estilo de línea. El avance va en línea continua; los gradientes, solo de entrenamiento, en línea discontinua, que es la convención ya usada en el documento para la diapositiva 8. El extractor congelado lleva trama gris y la etiqueta «congelado» | `ink` y `ink-secondary` | 8 |
| **Protocolos A y B** | Sin color: separación espacial y encabezado con el protocolo | — | 6, 10 |

### D3. La anotación y la atención no comparten color ni marca [Restricción y Propuesto]

**[Restricción]** No confundir los pesos de atención con probabilidades de malignidad (corrección C del documento; Ilse et al., 2018, §2.4).

**[Propuesto]** Si los parches con mucha atención se pintaran con el color de la anotación tumoral, la lámina afirmaría visualmente que atención equivale a tumor. Por eso usan tonos distintos y también marcas distintas (línea frente a relleno), para que la diferencia se mantenga aunque alguien no distinga los colores.

Se descarta el rojo para la atención porque connota peligro o malignidad. También se descartan las paletas arcoíris (*jet*), habituales en mapas de calor, porque no son perceptualmente uniformes y sugieren categorías que no existen.

### D3b. Leyenda de atención según lo que se muestra [Restricción]

En todos los casos se mantiene el texto «no es probabilidad de tumor».

| Qué se muestra | Leyenda | Motivo |
| --- | --- | --- |
| **Distribución completa de un bag** (por ejemplo, un bag ilustrativo con todas sus instancias a la vista) | «Bag ilustrativo de N instancias. Los pesos suman 1 dentro del bag.» | Solo con todas las instancias visibles es cierto que lo mostrado suma 1 |
| **Selección de parches** de una lámina | «Pesos de N parches seleccionados de una lámina de K. No suman 1: son parte de una distribución que suma 1 en la lámina completa. Criterio de selección: …» | Afirmar que una selección suma 1 sería falso. Declarar el criterio evita sugerir que la selección es representativa |
| **Mapa de calor en percentiles** (convención de CLAM, según el documento) | «Percentil del peso de atención dentro de esta lámina. Importancia relativa; no comparable entre láminas.» | Los percentiles no suman 1, y los pesos dependen de las demás instancias del bag |
| **Pesos inventados para explicar** | La leyenda correspondiente más el rótulo «ilustrativo» | El documento indica que los pesos del ejemplo de la diapositiva 8 son hipotéticos |

### D4. Degradados [Propuesto]

La escala de atención es el único degradado propuesto, porque codifica un dato continuo. Cualquier otro degradado necesitaría una justificación escrita.

### D5. Veneno y anotación no aparecen juntos [Propuesto]

Su contraste de luminancia entre sí es bajo (1,23:1, calculado), así que no deben aparecer en la misma figura. En la práctica no coinciden: el veneno solo existe en los esquemas sintéticos de la diapositiva 10.

### D6. Contorno con halo sobre tejido: hipótesis por probar [Propuesto]

Calculé el contraste de luminancia del verde azulado frente a colores H&E aproximados, no frente a imágenes reales, y es bajo: entre 1,7:1 y 2,7:1. Se propone un halo claro de 2 px alrededor de la línea, una técnica habitual en cartografía para separar una línea de un fondo variable.

**No es una garantía de accesibilidad.** Se valida sobre recortes H&E reales, a la distancia real de la sala y con simulación de daltonismo. Si no basta, se cambia el grosor, el color o el tipo de marca.

### D7. Imagen original y resultado del modelo en paneles paralelos [Propuesto]

La comparación entre la imagen original y lo que produce el modelo se presenta en paneles paralelos, con el mismo recorte, la misma escala y el mismo encuadre: (a) original, (b) anotación humana, (c) atención. No se superponen.

Razones:

- La superposición altera la evidencia original.
- Mezcla los colores del H&E con la escala de atención.

Se admite un contorno de la anotación sobre el panel (c) para comparar posiciones. **El panel (c) solo existe si su fuente está resuelta** (D9 y pendiente 7).

### D9. Estado de cada imagen [Restricción]

Toda imagen o figura lleva en su pie uno de estos estados. Solo los cuatro primeros pueden aparecer en pantalla, y el cuarto requiere la decisión del equipo.

| Estado | ¿Puede usarse? | Rótulo |
| --- | --- | --- |
| Imagen real con fuente y licencia verificadas en la fuente primaria | Sí | «Fuente: CAMELYON16, lámina … (licencia …)» |
| Resultado publicado (figura o cifra de un artículo) con licencia de reproducción verificada | Sí | «Fuente: autor, año, figura n (licencia …)» |
| Esquema o ilustración del equipo | Sí | «Esquema ilustrativo; no son datos» |
| Experimento propio | Solo si el equipo lo decide, y separado de las Tablas A, B y C | «Experimento propio: configuración …» |
| Imagen o resultado sin fuente o sin licencia verificada | **No** | — |

**Situación actual [Confirmado]:** ninguna imagen real ni ningún mapa de atención cumple hoy las condiciones. Hasta resolverlo, las composiciones se diseñan con esquemas rotulados.

### Contrastes calculados [Confirmado, cálculo WCAG local]

Sobre `ground` `#F4F5F5`:

| Color | Contraste |
| --- | --- |
| `ink` | 16,3:1 |
| `ink-secondary` | 7,4:1 |
| `patch-grid` | 4,5:1 |
| `annotation` | 4,9:1 |
| `attention-high` | 6,2:1 |
| `misleading-signal` | 6,0:1 |

`attention-low` tiene 1,15:1 de forma deliberada: el peso bajo debe retroceder. Por eso la escala nunca es el único medio de leer un valor, y va siempre acompañada de su leyenda.

## Typography

### Familias [Propuesto]

- **Atkinson Hyperlegible Next** para todo el texto.
  - **Por qué:** fue diseñada por el Braille Institute para diferenciar caracteres en condiciones de baja visión (I, l y 1; 0 y O), que es el problema de leer a distancia.
  - **Riesgo:** sus formas son reconocibles y menos neutras que una sans convencional.
  - **Alternativa:** Source Sans 3.
- **Atkinson Hyperlegible Mono** solo para dimensiones y tamaños, como «1024 → 512» o «256 × 256 px». La monoespaciada se usa para datos y medidas, no como disfraz de lo técnico.
- **KaTeX** para las ecuaciones, porque es la tipografía matemática que la audiencia reconoce.
- **Fuentes locales.** Todas se sirven desde los archivos del proyecto, para que la exposición no dependa de Internet.

[Confirmado] Las tres familias están disponibles en Google Fonts. [Por validar] Licencia OFL, cifras tabulares (`tnum`) y prueba de legibilidad a distancia.

### Niveles según la importancia del contenido [Propuesto]

| Nivel | Contenido | ¿Debe leerse desde la última fila? |
| --- | --- | --- |
| N1 Título | Título de la diapositiva | Sí |
| N2 Mensaje | Cifras clave y encabezado de protocolo | Sí |
| N3 Etiqueta | Etiquetas de figura y valores de tabla | Sí |
| N4 Cita | Referencias bibliográficas | No: lectura cercana o copia en PDF. Es el único nivel que puede quedar por debajo del umbral |

### Umbral de tamaño: propuesta pendiente de validación

**No es un estándar confirmado.**

- **Hipótesis de trabajo:** la altura de la mayúscula debe ser al menos la distancia de lectura dividida entre 200.
- **Origen:** creo que procede de la norma AVIXA DISCAS (V202.01), para lectura básica, pero no he verificado la fuente ni su definición exacta de «altura del elemento».
- **Equivalencia:** con esa hipótesis, en una pantalla de 60″ a 1080p (unos 0,69 mm por píxel) y suponiendo una altura de mayúscula de 0,7 em, el tamaño de fuente mínimo sería de unos 10,3 px por metro de distancia.

| Distancia de la última fila | Tamaño de fuente estimado |
| --- | --- |
| 4 m | ~41 px |
| 6 m | ~62 px |
| 8 m | ~83 px |

Lo que sí parece robusto es la consecuencia cualitativa: en estos televisores cabe poco texto por diapositiva, así que las figuras deben cargar el argumento.

Los valores del frontmatter (88 / 64 / 56 / 32 px) suponen una distancia de 6 m y son solo un punto de partida. Los valores finales salen de dos pasos:

1. Verificar la fuente de la fórmula.
2. Hacer una prueba física desde la última fila con frases reales de la presentación.

### Formato [Restricción]

- Coma decimal, como en el documento académico.
- Cifras alineadas por la coma en las tablas.

## Layout

### Lienzo y márgenes [Propuesto]

- Lienzo de 1920 × 1080, escalado a la pantalla.
- Margen de seguridad del 5 % por lado (96 × 54 px), porque muchos televisores recortan los bordes. [Por validar] Si el televisor permite desactivar ese recorte.

### Marco común [Propuesto]

- Título arriba a la izquierda.
- Posición «n / 11» como orientación durante los 12 minutos. Se justifica porque la posición informa; no es decoración.
- Línea de fuente abajo.
- La figura que sostiene el argumento ocupa al menos el 60 % del área útil.

### Correspondencia entre diapositivas y composición [Confirmado y Propuesto]

La columna «En pantalla» se verificó contra la tabla del plan de exposición del documento académico. La columna de composición es la propuesta.

| # | Título | «En pantalla» según el documento [Confirmado] | Composición visual [Propuesto] |
| --- | --- | --- | --- |
| 1 | ¿Dónde está el problema? | Lámina completa y zoom a un foco tumoral; cifra «< 10 % de tejido tumoral» | **Muestra → región de interés**, los pasos 1 y 2 de la composición |
| 2 | ¿Qué es MIL? | Tabla de dos columnas; molécula con conformaciones | Instancia con su etiqueta frente a bag con etiquetas ocultas. Esquema de la molécula pendiente de decisión |
| 3 | Bag e Instance | Lámina dividida en cuadrícula; parches tumorales resaltados; llaveros | **Composición completa: muestra → región de interés → cuadrícula → tres parches ampliados.** Retoma la misma muestra de la diapositiva 1, en tamaño reducido, para mostrar que es la misma lámina. La cuadrícula es el bag, y los parches ampliados son instancias con su etiqueta según la anotación humana. Los testigos llevan contorno discontinuo. Cifra de 8.000 a 8.800 parches con su cita. **Pendiente:** cuáles son los tres parches (pendiente 5) y si se ilustran los llaveros (pendiente 11) |
| 4 | Supuestos de MIL | Dos esquemas: OR lógico frente a promedio | Dos esquemas sobre un mismo bag sintético rotulado: OR (supuesto estándar, asimétrico) frente a promedio (supuesto colectivo). El supuesto de umbral va en una línea. **No sustituye ni absorbe la composición de la diapositiva 3** |
| 5 | Formulación matemática | Ecuación Y = max y_k y S(X) = g(Σ f(x)) con flechas | Ecuaciones en KaTeX con f, σ y g vinculados a un diagrama de tres bloques. Nota de alcance: «plantilla general, no la forma literal de todo modelo» |
| 6 | Métodos de agregación | Tres barras de pesos sobre los mismos parches; AUC de mean y max dentro de un solo protocolo | El mismo bag ilustrativo repetido tres veces, una por operador, con barras de peso (leyenda D3b, distribución completa). Tabla del protocolo A encabezada por su protocolo, y nota del protocolo B en una línea |
| 7 | ABMIL | Diagrama de bloques y ecuación de a_k | Cuatro bloques (f, atención con compuerta, agregación, g) y la ecuación con compuerta. Panel comparativo D7 solo si se resuelve la fuente del mapa (pendiente 7) |
| 8 | Pipeline completo | Diagrama del pipeline | Ocho etapas numeradas; los números se justifican porque el orden es el contenido. Dimensiones en monoespaciada, gradientes en línea discontinua y extractor congelado señalado |
| 9 | Evolución | Línea de tiempo 2018–2021 con una frase por modelo | Línea de tiempo con la limitación que ataca cada modelo y su mecanismo. Sin AUC, como exige el documento para esta tabla |
| 10 | Aplicaciones, resultados y limitaciones | Tablas A y B en paneles separados, sin mezclar cifras; esquema del «veneno» de Raff y Holt | Paneles A y B separados con su protocolo como encabezado, Tabla C en pequeño y esquema sintético del veneno pasando de los bags negativos (entrenamiento) a los positivos (prueba), con AUC 1,000 → 0,000. Revelados por pasos, pendiente de aprobación |
| 11 | Conclusiones | Tres frases y la pregunta abierta | Tres frases y la pregunta, sin imágenes |

## Elevation & Depth

**[Propuesto] Ninguna:** sin sombras ni capas superpuestas. La profundidad no transmite información en estas diapositivas, y en un televisor una sombra suave se percibe como suciedad o falta de nitidez. La agrupación se resuelve con proximidad y con reglas horizontales.

## Shapes

[Propuesto]

- **Radio 0.** Los parches son cuadrados porque el teselado de la lámina lo es; redondearlos introduciría una geometría que no existe en el dato.
- **Cajas de diagrama solo con trazo,** sin relleno decorativo, con un grosor de 2–3 px para que se lean a distancia (por validar).
- **Tablas con reglas tipo *booktabs*:** superior, intermedia e inferior, sin líneas verticales. Es la convención de tablas de las publicaciones científicas y hace que se lean por filas, que es la unidad válida de comparación según el documento.

## Components

[Propuesto] Componentes previstos, sin implementar todavía:

- **Panel de figura** con letra a, b, c y pie que indica qué se ve y de dónde viene.
- **Línea de fuente** con el estado de la imagen (D9).
- **Miniatura de navegación con recuadro de zoom,** convención funcional del visor de láminas que dice dónde está la región ampliada.
- **Barra de escala** en las fotografías, calculada a partir de los micrones por píxel del archivo de la lámina (por validar al extraer las imágenes).
- **Rejilla de parches** y **bag con llaves.**
- **Celda de atención** con su leyenda condicional (D3b).
- **Tabla de resultados** con el protocolo como encabezado.
- **Nodo de diagrama** y **flecha** de avance o de gradiente.
- **Ecuación anotada,** con los términos vinculados al diagrama.
- **Indicador de posición** «n / 11».
- **Rótulo** «ilustrativo» o «experimento propio».

### Movimiento [Propuesto]

- Solo revelados que controla el expositor; nada se reproduce solo.
- Dos momentos animados, porque explican un proceso:
  - El paso de la muestra a la región de interés (diapositivas 1 y 3), que muestra la escala del problema.
  - El veneno cambiando de lado entre entrenamiento y prueba (diapositiva 10).
- Se respeta la preferencia de movimiento reducido del sistema.
- Duraciones y curvas pendientes de la lección sobre Emil Kowalski.

## Do's and Don'ts

### Restricciones de contenido [Restricción]

Firmes, porque vienen del documento académico:

- Nunca colocar cifras de los protocolos A y B en la misma fila visual ni en un mismo eje.
- Nunca usar «probabilidad», «explica» o «detecta» en leyendas de atención.
- Nunca afirmar que suman 1 los pesos de una selección de parches (D3b).
- Nunca usar imágenes, mapas de atención ni resultados sin fuente y licencia verificadas (D9).
- Rotular como «ilustrativo» o «experimento propio» lo que corresponda.
- No alterar el color ni el contenido de las fotografías H&E, salvo un ajuste documentado en el pie.
- No atribuir a CLAM ni a DSMIL resultados de Raff y Holt.

### Criterios visuales v0 [Propuesto]

Revisables tras la primera evaluación. Cada cambio se registra en este documento con su motivo.

**Se evitan por defecto, salvo justificación escrita:**

- Fondos oscuros (D1).
- Degradados, salvo la escala de atención (D4).
- Tarjetas como estructura; se agrupa por proximidad y reglas.
- Iconos decorativos; los únicos pictogramas son marcas de los diagramas.
- Etiquetas pequeñas sobre el título.
- Cifras gigantes como plantilla.
- Monoespaciada fuera de las dimensiones y tamaños.
- Paletas arcoíris en mapas de calor.
- Rojo para la atención.
- Imitación de la interfaz de un visor de láminas (barras de herramientas, botones).

**Prácticas propuestas:**

- Pie de figura con fuente en cada imagen.
- Barra de escala en las fotografías.
- Una sola figura dominante por diapositiva.
- Cada concepto científico con su propia marca, en todas las diapositivas en que aparece (D2).
