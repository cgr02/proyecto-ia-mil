# Multiple Instance Learning — Base académica consolidada (Fase 2)

Nov 6, 2026 · @Ander

## Alcance y criterios

Este documento cierra el contenido científico de la exposición: 11 diapositivas, 12:00 minutos y 10 referencias fundamentales verificadas en la fuente original. Ningún dato numérico proviene de experimentos de nuestro equipo; todos son resultados publicados por otros autores y se citan junto a su protocolo.

Criterios aplicados:

- Cada cifra se tomó del texto, tabla o ecuación del artículo original (arXiv, PMLR, NeurIPS, PMC), no de resúmenes de terceros.
- Los resultados de artículos distintos se presentan en tablas separadas, porque usan extractores, particiones y semillas diferentes.
- Las interpretaciones propias se marcan como **Interpretación**; lo demás es lo que afirma la fuente.
- Estados de verificación: *verificado* (leído en la fuente primaria), *parcialmente verificado* (dato confirmado, pero falta un detalle de ubicación o alcance) y *pendiente*.

**Ajuste a la estructura de 11 diapositivas.** Se conserva la secuencia propuesta con un solo cambio de énfasis: la diapositiva 10 concentra CAMELYON16 y el trabajo de Raff y Holt (2023), y las demás aplicaciones quedan en una línea. La razón es de tiempo: con 1:40 minutos no es posible tratar resultados, limitaciones y seis dominios de aplicación sin caer en una lista de nombres. CAMELYON16 se introduce desde la diapositiva 1 como ejemplo conductor, de modo que en la 10 solo se agregan los resultados.

## Diapositivas 1 a 4: problema, definición, conceptos y supuestos

### Diapositiva 1. ¿Dónde está el problema?

Una lámina histológica digitalizada (whole slide image, WSI) puede medir unos 40.000 × 40.000 píxeles, y el tejido tumoral suele ocupar una fracción pequeña. En una lámina positiva de CAMELYON16 el tumor cubre en promedio menos del 10 % del tejido ([Li et al., 2021, §1 y §4.1](https://pmc.ncbi.nlm.nih.gov/articles/PMC8765709); [Shao et al., 2021, §4.1](https://ar5iv.labs.arxiv.org/html/2106.00908)).

- Anotar a nivel de píxel exige tiempo de patólogos y no escala ([Ilse et al., 2018, §4.3](https://ar5iv.labs.arxiv.org/html/1802.04712)).
- El diagnóstico de la lámina, en cambio, ya existe en el informe clínico. Campanella et al. (2019) entrenaron con 44.732 láminas de 15.187 pacientes usando solo los diagnósticos reportados como etiqueta ([resumen](https://scholars.mssm.edu/en/publications/clinical-grade-computational-pathology-using-weakly-supervised-de-2/)).
- La pregunta que motiva MIL: ¿cómo aprender a detectar el tumor si solo sabemos que la lámina lo contiene, pero no dónde?

### Diapositiva 2. ¿Qué es Multiple Instance Learning?

MIL es una variante del aprendizaje supervisado en la que una sola etiqueta se asigna a una bolsa (bag) de instancias. Las etiquetas de las instancias existen, pero no se observan durante el entrenamiento ([Ilse et al., 2018, resumen y §2.1](https://ar5iv.labs.arxiv.org/html/1802.04712)). Es una forma de aprendizaje débilmente supervisado, pero no un sinónimo de él: lo que la distingue es la estructura de conjunto y la regla que liga las etiquetas de las instancias con la del bag ([Foulds y Frank, 2010, §2.3](https://ics.uci.edu/~jfoulds/FouldsAndFrankMIreview.pdf)).

| Aspecto | Supervisado tradicional | MIL |
| --- | --- | --- |
| Unidad de entrada | Una instancia x | Un conjunto X = {x₁, …, x\_K}, con K variable |
| Etiqueta observada | y de cada instancia | Y del conjunto; y\_k ocultas |
| Orden de los elementos | No aplica | Irrelevante: la predicción debe ser invariante a permutaciones |
| Tareas posibles | Clasificar instancias | Clasificar bags y, de forma secundaria, localizar instancias clave |

El paradigma nació en 1997 con la predicción de actividad de fármacos: una molécula adopta varias conformaciones y solo se sabe si la molécula es activa. Según el resumen de Dietterich et al., los algoritmos que ignoran la estructura de bolsa funcionan muy mal, y el que identifica las instancias responsables alcanzó 89 % de aciertos en la tarea de olor a almizcle ([Dietterich, Lathrop y Lozano-Pérez, 1997](https://web.engr.oregonstate.edu/~tgd/publications/aij-musk-corrected.pdf)).

### Diapositiva 3. Bag e Instance

En CAMELYON16 la correspondencia es directa, y servirá de ejemplo en toda la exposición.

| Concepto | Definición | En CAMELYON16 |
| --- | --- | --- |
| Bag (bolsa) | Conjunto no ordenado de instancias con una etiqueta | Una lámina completa (WSI) |
| Instance (instancia) | Elemento individual, descrito por un vector | Un parche de tejido, p. ej. 224 × 224 o 256 × 256 px a 20× |
| Etiqueta del bag (Y) | Observada | Lámina con metástasis o sin ella |
| Etiqueta de instancia (y\_k) | Existe, no se observa al entrenar | Parche tumoral o no tumoral |
| Witness (testigo) | Instancia positiva que justifica la etiqueta positiva del bag | Los parches con células tumorales |
| Tamaño del bag | Variable entre bags | Unos 8.000 a 8.800 parches por lámina a 20×, según el preprocesamiento |

Li et al. (2021) generan bags de parches de 224 × 224 px sin solapamiento y obtienen unos 8.000 parches por bag a 20×; Shao et al. (2021) usan 256 × 256 px y reportan unos 8.800. Una lámina se considera positiva si contiene cualquier región tumoral anotada; las anotaciones de píxel existen en el conjunto de datos, pero estos métodos no las usan para entrenar ([Li et al., 2021, §4.1](https://pmc.ncbi.nlm.nih.gov/articles/PMC8765709)).

**Analogía (verificada en la literatura).** Foulds y Frank (2010, §2.3) recogen el *simple jailer problem* de Chevaleyre y Zucker (2001): hay una puerta cerrada y varios llaveros; un llavero es útil si alguna de sus llaves abre la puerta. El modelo debe aprender qué llavero sirve sin que nadie diga qué llave funciona.

### Diapositiva 4. Supuestos de MIL

Un supuesto MIL es la regla que relaciona las etiquetas ocultas de las instancias con la etiqueta del bag. Sin un supuesto, el espacio de hipótesis es demasiado amplio para aprender ([Foulds y Frank, 2010, §2.5 y §5](https://ics.uci.edu/~jfoulds/FouldsAndFrankMIreview.pdf)).

**Supuesto estándar.** Un bag es positivo si y solo si contiene al menos una instancia positiva; la etiqueta del bag es la disyunción (OR lógico) de las etiquetas de sus instancias (Foulds y Frank, 2010, §2.4, ec. 1). Es **asimétrico**: intercambiar las etiquetas positiva y negativa cambia el significado del problema. Un bag negativo informa que todas sus instancias son negativas; uno positivo solo informa que al menos una es positiva.

**Supuesto colectivo.** Fue propuesto por Xu (2003) y lo revisan Foulds y Frank (2010, §3.7). Todas las instancias contribuyen por igual a la etiqueta: la probabilidad del bag es el promedio de las probabilidades de clase de sus instancias.

```latex
P(c \mid b) = \frac{1}{n_b} \sum_{i=1}^{n_b} P(c \mid x_i)
```

Aquí *b* es el bag, *n\_b* su número de instancias y *P(c | x\_i)* la probabilidad de clase de la instancia *i*. Ojo con la terminología: Carbonneau et al. (2018, §2.1) usan «collective» en un sentido amplio, para cualquier supuesto en que más de una instancia define la etiqueta. Su ejemplo: una imagen de playa necesita a la vez segmentos de arena y de agua ([Carbonneau et al., 2018](https://arxiv.org/pdf/1612.03365)).

**Más allá de estos dos.** Weidmann et al. (2003) definen una jerarquía: estándar ⊂ basado en presencia ⊂ basado en umbral ⊂ basado en conteo. En el supuesto de umbral, un bag es positivo si contiene al menos *t\_i* instancias de cada concepto requerido (Foulds y Frank, 2010, §3.1). Esta jerarquía es la que pone a prueba Raff y Holt (2023), tratado más abajo.

**Para no simplificar en exceso.** El supuesto es una propiedad del problema; el operador de agregación es una decisión del modelo. Mean pooling sobre *probabilidades de instancia* implementa el supuesto colectivo de Xu. Mean pooling sobre *embeddings* produce un vector promedio que luego clasifica una red, y no implementa por sí mismo ninguna regla sobre etiquetas de instancia. Del mismo modo, max pooling sobre puntuaciones de instancia implementa el supuesto estándar, pero el máximo dimensión a dimensión sobre embeddings no equivale literalmente a él.

## Diapositivas 5 y 6: formulación matemática y agregación

### Diapositiva 5. Formulación matemática

La notación sigue a [Ilse et al. (2018, §2.1–2.4)](https://ar5iv.labs.arxiv.org/html/1802.04712), con los números de ecuación del artículo.

**Bag y etiquetas.** Un bag es X = {x₁, …, x\_K}, con x\_k ∈ ℝ^D y K variable entre bags. Las etiquetas de instancia y\_k ∈ {0, 1} existen pero no se observan. El supuesto estándar (ec. 1 y 2) se escribe así:

```latex
Y = \begin{cases} 0, & \text{si } \sum_k y_k = 0 \\ 1, & \text{en otro caso} \end{cases} \qquad \Longleftrightarrow \qquad Y = \max_k \{ y_k \}
```

Ilse et al. (§2.1) señalan dos problemas de optimizar un objetivo basado en el máximo de las etiquetas: lo describen como un problema de gradientes que se desvanecen, y advierten que esa formulación solo sirve con un clasificador de instancias. Dicho con precisión: las etiquetas y\_k son discretas, así que max\_k y\_k no es diferenciable respecto a los parámetros; y cuando el máximo se aplica a puntuaciones continuas, su gradiente no desaparece, sino que se concentra en la instancia que alcanza el máximo (ver diapositiva 6). Por eso los autores modelan θ(X) como parámetro de una Bernoulli y entrenan con la log-verosimilitud.

**Problema de clasificación.** Se aprende θ(X) ∈ \[0, 1\], la probabilidad de que Y = 1 dado el bag, maximizando la log-verosimilitud. Su negativo es la entropía cruzada binaria:

```latex
\mathcal{L}(X, Y) = -\big[\, Y \log \theta(X) + (1 - Y) \log\big(1 - \theta(X)\big) \big]
```

**Descomposición de funciones simétricas.** Como el bag no tiene orden, θ(X) debe ser invariante a permutaciones. Ilse et al. (Teorema 1, ec. 3) citan a Zaheer et al. (2017): una función de puntuación de un conjunto es simétrica si y solo si puede escribirse como

```latex
S(X) = g\Big( \sum_{x \in X} f(x) \Big)
```

- *f*: transforma cada instancia (encoder).
- Σ, o en general un operador simétrico σ: agrega (el *MIL pooling*).
- *g*: transforma el resultado agregado en la probabilidad del bag.

El Teorema 2 (ec. 4), tomado de PointNet (Qi et al., 2017), da una versión con el máximo elemento a elemento en lugar de la suma, válida como aproximación arbitraria de funciones continuas en la distancia de Hausdorff.

**Alcance de esta expresión (corrección E).** S(X) = g(Σ f(x)) es una plantilla general de agregación invariante a permutaciones bajo condiciones precisas, no la estructura literal de todo modelo MIL:

- La equivalencia exacta del Teorema 1 se demuestra para dominios numerables. Para funciones continuas en dominios no numerables, Wagstaff et al. (2019) muestran que la suma en el espacio latente exige, para representar cualquier función continua, una dimensión latente al menos igual al número máximo de elementos del conjunto ([arXiv:1901.09006](https://ar5iv.labs.arxiv.org/html/1901.09006)).
- Varias arquitecturas no siguen la forma *f* → suma → *g*. DSMIL promedia dos corrientes (máximo y atención respecto a una instancia crítica). TransMIL usa autoatención entre instancias, codificación posicional y un token de clase. Shao et al. (2021, Teorema 1 e Inferencia) proponen su propia forma de aproximación con un término adicional *h* que codifica información espacial.

**Instance-level frente a embedding-level** (Ilse et al., 2018, §2.1):

- *Instance-level*: *f* es un clasificador de instancias que produce puntuaciones; el pooling las agrega; *g* es la identidad. Da puntuaciones por instancia, pero su exactitud a nivel de instancia suele ser baja (Kandemir y Hamprecht, 2015, citado por Ilse et al.).
- *Embedding-level*: *f* produce embeddings; el pooling forma un vector del bag; *g* es un clasificador. Suele clasificar mejor el bag, pero no indica qué instancias activaron la decisión.

### Diapositiva 6. Métodos de agregación

Sea H = {h₁, …, h\_K} el conjunto de embeddings, con h\_k ∈ ℝ^M. Los tres operadores que se comparan son (Ilse et al., 2018, ec. 5 a 8):

```latex
\text{Max: } z_m = \max_{k=1,\dots,K} h_{km} \qquad \text{Mean: } \mathbf{z} = \frac{1}{K}\sum_{k=1}^{K} \mathbf{h}_k \qquad \text{Attention: } \mathbf{z} = \sum_{k=1}^{K} a_k \mathbf{h}_k
```

```latex
a_k = \frac{\exp\{\mathbf{w}^{\top} \tanh(\mathbf{V}\mathbf{h}_k^{\top})\}}{\sum_{j=1}^{K} \exp\{\mathbf{w}^{\top} \tanh(\mathbf{V}\mathbf{h}_j^{\top})\}}
```

- V ∈ ℝ^(L×M) y w ∈ ℝ^(L×1) son parámetros aprendidos; L es la dimensión oculta (los autores probaron 64, 128 y 256 con cambios menores).
- tanh permite valores positivos y negativos, lo que favorece el flujo de gradiente.
- El softmax normaliza los pesos para que sumen 1 dentro del bag, y el promedio ponderado produce un vector z de dimensión fija M, cualquiera que sea K; además, z no crece con K como ocurriría con una suma. Eso no hace al resultado independiente del bag: por el denominador, cada a\_k depende de todas las demás instancias, y si se añaden instancias los pesos se redistribuyen. Ilse et al. (§2.4) presentan la suma igual a 1 como invarianza al tamaño del bag; lo exacto es que la dimensión y la escala de z no dependen de K, pero los pesos sí dependen de la composición del bag.

**Cómo fluye el gradiente en max pooling.** El máximo no hace desaparecer el gradiente; lo concentra. En cada dimensión m, solo la instancia que alcanza el máximo recibe gradiente (en caso de empate, el reparto depende de la implementación):

```latex
\frac{\partial z_m}{\partial h_{km}} = \begin{cases} 1, & \text{si } k = \arg\max_j h_{jm} \\ 0, & \text{en otro caso} \end{cases}
```

- Si el máximo se aplica a puntuaciones de instancia, en cada paso solo la instancia de mayor puntuación de cada bag actualiza los parámetros. Lu et al. (2021, Introducción) lo describen como usar la señal de gradiente de una sola instancia por lámina.
- Si se aplica dimensión a dimensión sobre embeddings, cada dimensión puede tomar su máximo de una instancia distinta. El gradiente se reparte entonces entre varias instancias, pero es cero para las que no ganan en ninguna dimensión.

| Operador | Qué hace | Ventaja | Limitación | AUC en CAMELYON16, por protocolo (no comparables entre A y B) |
| --- | --- | --- | --- | --- |
| Max pooling | Toma, por dimensión o por puntuación, el valor máximo | Coherente con el supuesto estándar si se aplica a puntuaciones de instancia | No entrenable; en cada dimensión el gradiente solo llega a la instancia que alcanza el máximo | A: 0,8569 · B: 0,8641 |
| Mean pooling | Promedia todas las instancias | Simple; usa todas las instancias | Diluye señales raras cuando el tumor ocupa poca área | A: 0,4647 · B: 0,7620 |
| Attention pooling | Promedio ponderado con pesos aprendidos | Entrenable; los pesos permiten mapas de calor | Los pesos no son probabilidades de instancia (ver diapositiva 7) | ABMIL. A: 0,8760 · B: 0,8653 |

Protocolo A: Shao et al. (2021, Tabla 1), con características de ResNet50 preentrenada en ImageNet. Protocolo B: Li et al. (2021, Tabla 1), con características de SimCLR. Solo es válido comparar operadores dentro de un mismo protocolo, y en ambos mean queda por debajo de max y de atención. Las cifras de A y B no se comparan entre sí: el mismo mean pooling pasa de 0,4647 a 0,7620 solo por cambiar de protocolo.

Ilse et al. (2018, §2.4) señalan la limitación común de max y mean: son operadores predefinidos y no entrenables. Proponen sustituirlos por un promedio ponderado cuyos pesos calcula una red de dos capas.

## Diapositivas 7 y 8: ABMIL y pipeline completo

### Diapositiva 7. Attention-based Deep MIL (ABMIL)

ABMIL ([Ilse, Tomczak y Welling, 2018](https://proceedings.mlr.press/v80/ilse18a.html)) reemplaza max y mean por un promedio ponderado entrenable. Se elige como arquitectura central por tres razones: su ecuación cabe en una diapositiva, CLAM la extiende directamente (Lu et al., 2021, ec. 1 de Métodos) y DSMIL y TransMIL la usan como línea base.

Tiene cuatro bloques:

1. **Extracción de características y encoder (f).** Convierte cada instancia en un embedding h\_k ∈ ℝ^M. En los experimentos de histología del artículo, f es una red convolucional pequeña sobre parches de 27 × 27 o 32 × 32 px, entrenada de extremo a extremo (§4.3 y Tabla 15). En patología de láminas completas, f suele dividirse en un extractor preentrenado y una capa entrenable.
2. **Atención con compuerta (gated attention).** Calcula un peso a\_k por instancia (ec. 9). La compuerta sigmoide se añade porque tanh es casi lineal en \[−1, 1\], lo que limita las relaciones que puede aprender:

```latex
a_k = \frac{\exp\{\mathbf{w}^{\top}(\tanh(\mathbf{V}\mathbf{h}_k^{\top}) \odot \mathrm{sigm}(\mathbf{U}\mathbf{h}_k^{\top}))\}}{\sum_{j=1}^{K}\exp\{\mathbf{w}^{\top}(\tanh(\mathbf{V}\mathbf{h}_j^{\top}) \odot \mathrm{sigm}(\mathbf{U}\mathbf{h}_j^{\top}))\}}
```

U ∈ ℝ^(L×M) son parámetros adicionales y ⊙ es el producto elemento a elemento.

3. **Agregación.** z = Σ a\_k h\_k produce un vector de tamaño fijo aunque K varíe.
4. **Clasificador (g).** Una capa totalmente conectada con sigmoide produce θ(X). En el modelo de histología es fc-1 + sigm (Tabla 15).

**Resultados del artículo original.** ABMIL no se evaluó en CAMELYON16 en el trabajo de Ilse et al.

- COLON CANCER (100 imágenes H&E): AUC 0,968 con atención y con atención con compuerta, frente a 0,940 de Embedding+mean (Tabla 3).
- BREAST CANCER (58 imágenes): AUC 0,799 con compuerta y 0,775 sin compuerta (Tabla 2).
- MNIST-bags: la ventaja de la atención es mayor con pocos bags de entrenamiento (§4.2, Tablas 12 a 14).

**Qué significan los pesos de atención (corrección C).** Los propios autores aclaran que la red de atención no produce puntuaciones como un clasificador de instancias; puede considerarse un *proxy* (Ilse et al., 2018, §2.4, «Interpretability»). Por tanto:

- a\_k mide la importancia relativa de la instancia *k* dentro del promedio ponderado de ese bag. No es la probabilidad de que el parche sea tumoral.
- Los pesos suman 1 dentro de cada bag, así que dependen de las demás instancias del bag y no son comparables entre bags.
- No son una explicación causal ni necesariamente fiel de la decisión. Lu et al. (2021, sección de interpretabilidad) advierten que los mapas de atención no deben tomarse como máscaras de segmentación y que las puntuaciones son relativas.
- Raff y Holt (2023) muestran que la capa de pooling de Ilse et al. puede aprender a usar la *ausencia* de un patrón como señal positiva, lo cual un mapa de atención no revela (ver la sección dedicada).

**Independencia de las instancias (corrección A).** Ilse et al. (2018, §2.1 y §2.4) *suponen* que las instancias no tienen orden ni dependencia; es una hipótesis del modelo, no una propiedad de los datos. En una lámina, los parches vecinos están correlacionados espacial y morfológicamente. Lo que el modelo garantiza es la invarianza a permutaciones: tratar el bag como conjunto. CLAM reconoce como limitación que trata las regiones como independientes (Lu et al., 2021, Discusión). TransMIL se diseñó precisamente para modelar correlaciones entre parches mediante autoatención y codificación posicional (Shao et al., 2021, §1 y §3).

### Diapositiva 8. Pipeline completo de MIL

El recorrido se resume en ocho etapas. Las dimensiones corresponden a la configuración publicada de CLAM y TransMIL; son una referencia, no un estándar.

| # | Etapa | Entrada | Salida | ¿Se entrena? |
| --- | --- | --- | --- | --- |
| 1 | Segmentación de tejido | WSI | Máscara de tejido | No |
| 2 | Teselado (patching) | Regiones de tejido | Parches de 256 × 256 px con sus coordenadas | No |
| 3 | Extracción de características | Parche | Vector de 1024 dimensiones (ResNet50 de ImageNet truncada tras el tercer bloque residual, en CLAM) | Según la estrategia (ver tabla siguiente) |
| 4 | Encoder de instancias | Vector de 1024 | h\_k de 512 dimensiones (capa fc) | Sí |
| 5 | Atención | {h\_k} | Pesos a\_k que suman 1 | Sí |
| 6 | Agregación | {a\_k, h\_k} | Vector del bag z, de tamaño fijo | Sin parámetros propios |
| 7 | Clasificador | z | θ(X) o probabilidades por clase | Sí |
| 8 | Salida | θ(X), {a\_k} | Diagnóstico de la lámina y mapa de calor | — |

Fuentes de las etapas 1 a 4: [Lu et al. (2021), Métodos: segmentación, teselado y extracción](https://pmc.ncbi.nlm.nih.gov/articles/PMC8711640); [Shao et al. (2021), §4](https://ar5iv.labs.arxiv.org/html/2106.00908).

&#91;embedded content: pipeline MIL · preprocesamiento, entrenamiento e inferencia\]

La flecha discontinua marca lo único exclusivo del entrenamiento: los gradientes regresan desde la pérdida y actualizan el encoder, la atención y el clasificador. El extractor congelado no recibe gradientes; en inferencia el recorrido termina en el diagnóstico y el mapa de calor.

**Entrenamiento frente a inferencia (corrección D).**

- *Entrenamiento*: propagación hacia adelante del bag (etapas 4 a 7), cálculo de la pérdida contra la etiqueta Y, retropropagación y actualización de parámetros con un optimizador. Ilse et al. y CLAM usan Adam; TransMIL usa Lookahead con tasa 2e-4. En CLAM la pérdida total es c₁·L\_slide + c₂·L\_patch, con c₁ = 0,7.
- *Inferencia*: solo propagación hacia adelante; se obtiene θ(X) y, si se desea, el mapa de calor proyectando a\_k sobre las coordenadas de cada parche. No hay pérdida ni actualización de parámetros. CLAM, por ejemplo, convierte las puntuaciones de atención en percentiles antes de dibujarlas.

**Estrategias para el extractor (corrección G).**

| Estrategia | Cómo funciona | Flujo de gradientes | Ejemplo publicado |
| --- | --- | --- | --- |
| Extremo a extremo | El extractor se entrena junto con la atención y el clasificador | Llega hasta los píxeles | ABMIL en COLON y BREAST CANCER (red pequeña, parches de 27–32 px) |
| Congelado con características precomputadas | El extractor se ejecuta una sola vez; se guardan vectores en disco | Se detiene en el encoder de instancias | CLAM (ResNet50 de ImageNet); TransMIL (ResNet50 de ImageNet, 1024 → 512) |
| Preentrenado de forma autosupervisada y luego congelado | El extractor aprende de parches sin etiquetas (SimCLR) y después se fija | Se detiene en el agregador | DSMIL (ResNet18 con SimCLR) |

La razón práctica de congelar es la memoria. Li et al. (2021, §1) señalan que entrenar de extremo a extremo extractor y agregador es prohibitivamente costoso con bags grandes. CLAM indica que trabajar con características reduce el volumen de datos unas 200 veces y que el ajuste fino de extremo a extremo aumentaría mucho el tiempo de entrenamiento (Lu et al., 2021, Introducción y Discusión). El costo es que las características no se adaptan a la tarea; la elección del extractor puede pesar tanto como la del agregador (ver diapositiva 10).

**Tamaño del batch (corrección F).** Procesar un bag por paso es lo más frecuente porque K varía entre bags; así lo hacen Ilse et al. (§6.2), DSMIL, TransMIL y CLAM. No es obligatorio. La biblioteca torchmil rellena (padding) los bags hasta el tamaño máximo del lote y usa una máscara para que la atención ignore el relleno ([documentación de torchmil](https://torchmil.readthedocs.io/en/latest/api/data/collate/)). Otra opción es agrupar bags de tamaño parecido.

**Ejecución completa, ilustrativa (no es un experimento propio).** Una lámina de CAMELYON16 con metástasis (Y = 1) produce unos 8.800 parches a 20×, la media reportada por Shao et al. Cada parche pasa por ResNet50 y genera 1024 valores, que la capa fc reduce a 512. La atención asigna un peso a cada parche; supongamos que unos pocos parches tumorales concentran la mayor parte del peso. El vector z resultante entra al clasificador, que produce θ(X). En entrenamiento, θ(X) se compara con Y = 1 y los parámetros se ajustan; en inferencia, θ(X) se compara con un umbral, por ejemplo 0,5 en Shao et al. Los pesos concretos de este ejemplo son hipotéticos.

## Diapositiva 9: evolución de las arquitecturas

Cada arquitectura responde a una limitación concreta de la anterior. Ese hilo es el que debe contarse en la diapositiva, no una lista de nombres.

| Arquitectura | Limitación que ataca | Mecanismo central | Aporte | Limitación propia | Evaluación propia en CAMELYON16 |
| --- | --- | --- | --- | --- | --- |
| ABMIL (Ilse et al., 2018, ICML) | Max y mean son fijos, no entrenables ni interpretables | Promedio ponderado con atención (con o sin compuerta) | Pooling entrenable con pesos visibles | Supone instancias independientes; un solo concepto; atención como *proxy* | No evaluado por sus autores |
| CLAM (Lu et al., 2021, Nat. Biomed. Eng.) | Pocos datos etiquetados y problemas multiclase | Atención con compuerta, una rama por clase (CLAM-MB) o una sola (CLAM-SB), más agrupamiento de instancias | Usa los B parches más y menos atendidos como pseudo-etiquetas, con pérdida *smooth top-1 SVM* | Las pseudo-etiquetas pueden ser ruidosas; trata las regiones como independientes | Sí, con protocolo propio: ResNet50 de ImageNet, 270 láminas divididas 85/15 (diapositiva 10, «CLAM con su propio protocolo») |
| DSMIL (Li et al., 2021, CVPR) | Bags grandes y desbalanceados; extractor subóptimo | Dos corrientes: max pooling sobre puntuaciones de instancia y atención por similitud con la instancia crítica; extractor SimCLR; fusión multiescala | Combina enfoque de instancia y de embedding | Depende de que la instancia crítica sea correcta; costo del preentrenamiento SimCLR | Sí, con protocolo propio: ResNet18 con SimCLR, 271/129 láminas (Tabla B) |
| TransMIL (Shao et al., 2021, NeurIPS) | Supuesto de independencia entre instancias | Dos capas Transformer con atención de Nyström, codificación posicional PPEG y token de clase | Modela correlaciones entre parches | Más compleja; la posición se reconstruye reacomodando la secuencia en un cuadrado | Sí, con protocolo propio: ResNet50 de ImageNet, división 90/10 del entrenamiento oficial (Tabla A) |

Las cifras de CAMELYON16 no se colocan en esta tabla porque cada artículo usa un extractor, una partición y unas líneas base distintas. Ponerlas en una misma columna sugeriría una comparación que los protocolos no permiten; se presentan por separado en la diapositiva 10.

Fuentes: [Ilse et al. (2018)](https://ar5iv.labs.arxiv.org/html/1802.04712); [Lu et al. (2021), Resultados y Métodos](https://pmc.ncbi.nlm.nih.gov/articles/PMC8711640); [Li et al. (2021), ec. 3–8 y Tabla 1](https://pmc.ncbi.nlm.nih.gov/articles/PMC8765709); [Shao et al. (2021), §3.3 y Tabla 1](https://ar5iv.labs.arxiv.org/html/2106.00908).

**Detalles verificados de cada propuesta.**

- **CLAM.** Para cada rama, los B parches con menor atención reciben pseudo-etiqueta negativa y los B con mayor atención, positiva. Los autores usaron B = 8 en subtipificación renal y B = 32 en pulmón y metástasis ganglionar, con c₁ = 0,7 en la pérdida total (Métodos, «Training details»). Ellos mismos advierten que los parches más atendidos no necesariamente corresponden a la clase verdadera.
- **DSMIL.** La puntuación final es el promedio de las dos corrientes: c(B) = ½ (W₀ h\_m + W\_b Σ U(h\_i, h\_m) v\_i), donde h\_m es la instancia crítica (ec. 8). La atención compara la *query* de cada instancia con la de la instancia crítica, sin vectores *key* (ec. 5).
- **TransMIL.** PPEG aplica convoluciones de 3, 5 y 7 sobre la secuencia reacomodada en dos dimensiones (Algoritmo 3). La atención de Nyström reduce la complejidad de O(n²) a O(n) (ec. 9). El modelo tiene 2,669 millones de parámetros (Tabla 2).

**Efecto de PPEG (dato corregido respecto a la Fase 1).** En CAMELYON16, TransMIL sin codificación posicional obtiene AUC 0,8416; con codificación sinusoidal, 0,8941; con PPEG, 0,9309 (Shao et al., Tabla 2). La mejora de 0,9 % que mencionan los autores corresponde a otro experimento: comparar entrada ordenada frente a desordenada (§4.2.2).

**Interpretación.** La evolución puede leerse como tres preguntas sucesivas: cómo ponderar instancias (ABMIL), cómo aprovechar mejor pocas etiquetas (CLAM) y cómo incorporar relaciones entre instancias (DSMIL de forma parcial, TransMIL de forma explícita). Ninguno de los cuatro artículos incluye una verificación de que el modelo respete el supuesto MIL que asume. Esa verificación solo existe, con datos sintéticos, para la capa de pooling de Ilse et al. y para TransMIL (Raff y Holt, 2023); CLAM y DSMIL no fueron evaluados.

## Diapositiva 10: CAMELYON16, resultados y limitaciones

### El conjunto de datos

CAMELYON16 reúne láminas de ganglio linfático centinela axilar de pacientes operadas de cáncer de mama en dos hospitales de los Países Bajos. En la evaluación publicada en JAMA, el entrenamiento tiene 270 láminas (110 con metástasis y 160 sin ella) y la prueba, 129 (49 con metástasis y 80 sin ella) ([Ehteshami Bejnordi et al., 2017](https://core.ac.uk/download/145690356.pdf); [Tabla 1 de JAMA](https://pmc.ncbi.nlm.nih.gov/articles/PMC5820737/table/joi170113t1)).

**Sobre el número de láminas de prueba (129 frente a 130).** La página oficial del reto describe un conjunto de prueba de 130 láminas ([camelyon16.grand-challenge.org](https://camelyon16.grand-challenge.org/Data/)). La versión pública de los datos retira una de ellas, test\_049, por ser un duplicado, lo que deja 129; así lo recogen la documentación de terceros que distribuye el conjunto ([kaiko.ai](https://kaiko-ai.github.io/eva/dev/datasets/camelyon16); [Academic Torrents, versión de Bándi](https://academictorrents.com/details/afc995065b3e7a48db6dbebf184b8dc9205103af)). JAMA, CLAM y DSMIL usan 129. Shao et al. escriben «130 test sets» y ni el artículo ni el README del repositorio aclaran si su evaluación incluyó la lámina duplicada. **La discrepancia queda explicada en su origen, pero no resuelta para TransMIL.** No se pudo leer directamente el README de la versión de GigaScience; la exclusión de test\_049 se verificó en fuentes secundarias concordantes.

Es adecuado para ilustrar el aprendizaje a nivel de bolsa por tres razones:

- La etiqueta de la lámina (metástasis sí o no) cumple naturalmente el supuesto estándar: basta un foco tumoral.
- El tumor ocupa menos del 10 % del tejido de una lámina positiva, así que la proporción de testigos es baja y la agregación importa.
- Las anotaciones de contorno existen. Los métodos MIL no las usan para entrenar, pero permiten evaluar la localización con FROC (Li et al., 2021, §4.1).

En el reto original, el mejor algoritmo de clasificación de láminas obtuvo AUC 0,994 (IC 95 %: 0,983–0,999). Un panel de 11 patólogos con límite de tiempo promedió 0,810, y un patólogo sin límite de tiempo, 0,966 (JAMA, Resultados). Esos algoritmos podían usar las anotaciones de píxel; por eso no son comparables con métodos MIL entrenados solo con la etiqueta de la lámina.

### Resultados publicados

Las tablas se separan por artículo porque cambian el extractor, el tamaño de parche y la partición. Todos los valores son de los autores citados; ninguno es de nuestro equipo. Las comparaciones válidas son entre filas de una misma tabla; entre tablas, no.

**Tabla A. Shao et al. (2021), NeurIPS, Tabla 1.** Protocolo: ResNet50 de ImageNet, parches de 256 × 256 a 20×, 270 láminas oficiales divididas 90/10 en entrenamiento y validación, prueba oficial (el artículo dice 130 láminas y no aclara si excluye la duplicada). Las líneas base son reimplementaciones de los autores de TransMIL.

| Modelo | Exactitud | AUC |
| --- | --- | --- |
| Mean pooling | 0,6389 | 0,4647 |
| Max pooling | 0,8062 | 0,8569 |
| ABMIL | 0,8682 | 0,8760 |
| DSMIL | 0,7985 | 0,8179 |
| CLAM-SB | 0,8760 | 0,8809 |
| CLAM-MB | 0,8372 | 0,8679 |
| TransMIL | 0,8837 | 0,9309 |

**Tabla B. Li et al. (2021), CVPR, Tabla 1.** Protocolo: ResNet18 entrenada con SimCLR sobre parches de entrenamiento, parches de 224 × 224 a 20× (y 5× en multiescala), 271 láminas de entrenamiento y 129 de prueba. FROC mide la localización y requiere las anotaciones de prueba.

| Modelo | Escala | Exactitud | AUC | FROC |
| --- | --- | --- | --- | --- |
| Mean pooling | Una | 0,7984 | 0,7620 | 0,1162 |
| Max pooling | Una | 0,8295 | 0,8641 | 0,3313 |
| ABMIL | Una | 0,8450 | 0,8653 | 0,4056 |
| DSMIL | Una | 0,8682 | 0,8944 | 0,4296 |
| DSMIL-LC | Múltiple | 0,8992 | 0,9165 | 0,4371 |
| Totalmente supervisado (cota superior) | Una | 0,9147 | 0,9362 | 0,5254 |

**Tabla C. Efecto del extractor con el agregador DSMIL fijo.** Li et al. (2021), Tabla 3: con características de ImageNet, exactitud 0,6202 y AUC 0,5408; con características contrastivas (SimCLR), exactitud 0,8682 y AUC 0,8944.

**Dato aislado. CLAM con su propio protocolo.** Lu et al. (2021, Resultados) entrenan con las 270 láminas oficiales divididas 85/15 y reportan AUC 0,936 (IC 95 %: 0,890–0,983) en las 129 láminas de prueba oficiales.

### Qué permiten concluir y qué no

1. **La agregación importa cuando hay pocos testigos.** En los dos protocolos, mean pooling queda por debajo de max y de atención. Es coherente con lo que dicen ambos artículos sobre la baja proporción de tumor.
2. **La magnitud depende del protocolo.** Mean pooling pasa de 0,4647 (Tabla A) a 0,7620 (Tabla B). DSMIL obtiene 0,8944 en su propio artículo y 0,8179 en la reimplementación de Shao et al.
3. **El extractor puede pesar más que el agregador.** Con el mismo agregador, el AUC va de 0,5408 a 0,8944 al cambiar solo las características (Tabla C).
4. **Persiste una brecha frente a la supervisión completa.** En el protocolo de Li et al., el mejor MIL (0,9165) queda por debajo del modelo con anotaciones de parche (0,9362), y la localización todavía más (FROC 0,4371 frente a 0,5254).
5. **No permiten concluir** que un modelo sea mejor que otro en general, ni que sus mapas de atención localicen correctamente, ni que respeten el supuesto MIL. Ninguna de estas tablas lo mide.

### Limitaciones metodológicas que deben mencionarse

- **Pocos testigos y desbalance**: muchos parches negativos dentro de bags positivos (Li et al., 2021, §1 y §4.1).
- **Atención no es explicación**: pesos relativos, no probabilidades ni causas (Ilse et al., 2018, §2.4; Lu et al., 2021, Resultados).
- **Independencia supuesta**: ABMIL y CLAM tratan las regiones como independientes (Lu et al., 2021, Discusión).
- **Dependencia del extractor y del protocolo**: Tabla C y comparación de Tablas A y B.
- **Conteo del conjunto de prueba**: el reto anunció 130 láminas de prueba y la versión pública retira una duplicada (129). JAMA, CLAM y DSMIL usan 129; Shao et al. escriben 130 sin aclarar cuál usaron. Es una fuente más de no comparabilidad entre artículos.
- **Respeto del supuesto MIL no verificado**: Raff y Holt (2023) muestran que un buen AUC no certifica que el modelo aprenda la regla correcta (sección siguiente).

Otras aplicaciones documentadas, para una sola línea de la diapositiva: subtipificación de cáncer renal y de pulmón con TCGA (CLAM y TransMIL), y patología a escala clínica en próstata, piel y ganglios (Campanella et al., 2019).

## Raff y Holt (NeurIPS 2023): pruebas algorítmicas para MIL

Raff y Holt muestran, con datos sintéticos diseñados para ese fin, que cuatro modelos de deep MIL muy citados aprenden en entrenamiento una regla prohibida por el supuesto estándar y, en prueba, invierten por completo su capacidad de discriminar (AUC 0,000). Un quinto modelo, Hopfield MIL, tampoco pasa la prueba, pero porque no logró aprender ni siquiera los datos de entrenamiento. Fuente: [Raff y Holt (2023), arXiv:2310.17867](https://ar5iv.labs.arxiv.org/html/2310.17867), publicado en NeurIPS 2023.

### 1. Problema metodológico que plantean

**Hallazgo de los autores.** Los modelos estudiados se pueden reproducir: el código existe y corre. El problema es otro: no se diseñaron para imponer el supuesto MIL ni se comprobó que lo respetaran (§2). Ninguna de las formas habituales de evaluar reproducibilidad, como revisar etiquetas, metodología de comparación o diferencias entre código y artículo, habría detectado esa violación.

Su propuesta es la **prueba algorítmica unitaria**: un conjunto de datos sintético construido para exigir una propiedad concreta de la solución. Si el algoritmo viola esa propiedad, la prueba falla (§1, Tabla 1).

### 2. Supuestos que ponen a prueba

Hay que distinguir dos cosas: el supuesto que **declara** cada modelo, según la Tabla 1 del artículo, y la propiedad concreta que **evalúa** cada prueba.

| Prueba | Supuesto al que pertenece | Propiedad específica que evalúa | Criterio de fallo |
| --- | --- | --- | --- |
| Algoritmo 1, Single-Concept Standard-MIL (§3.1) | Estándar o de presencia (Dietterich et al., 1997) | Que la ausencia de una instancia (el «veneno») no se use como evidencia positiva | AUC de entrenamiento > 0,5 y de prueba < 0,5 (Teorema 1) |
| Algoritmo 2, Multi-Concept con veneno (§3.2.1) | Umbral (jerarquía de Weidmann) | Que el modelo exija la presencia de dos conceptos sin apoyarse en la ausencia del veneno | Mismo criterio (Teorema 2) |
| Algoritmo 3, False-Frequency (§3.2.2) | Umbral | Que el modelo reconozca dos conceptos distintos en lugar de apoyarse en la frecuencia o la magnitud de uno solo | Mismo criterio (Teorema 3) |

La prueba estándar es pertinente para todos los modelos, porque el supuesto estándar es un caso particular del de umbral: un modelo que la falla no es válido ni como modelo estándar ni como modelo de umbral, aunque pase las pruebas de umbral (§3.2 y nota de la Tabla 1). Las pruebas de umbral solo son exigibles a los modelos que declaran ese supuesto; que mi-Net las falle no lo invalida, porque declara el estándar (§4.1).

### 3. Diseño de la prueba estándar (Algoritmo 1)

- Instancias de 16 dimensiones. El fondo sigue N(0, I) y pertenece a la clase nula.
- Bags positivos: de 1 a 4 instancias del concepto positivo, tomadas de N(0, 3I) o de N(1, I), más fondo.
- Instancia «veneno»: N(−10; 0,1 I), muy fácil de reconocer. En entrenamiento aparece **solo en bags negativos**; en prueba, **solo en bags positivos**.
- Criterio de fallo (Teorema 1): AUC de entrenamiento mayor que 0,5 y AUC de prueba menor que 0,5. Un modelo que no aprende nada obtendría alrededor de 0,5.
- Escala: 100.000 bags de entrenamiento, 10.000 de prueba, 20 épocas, tres capas por modelo y optimizador Adam (§4).

La lógica: en entrenamiento, dos reglas separan perfectamente las clases. La regla MIL es «hay una instancia del concepto positivo». La regla prohibida es «no hay veneno, luego es positivo». Un modelo que respeta el supuesto no puede usar la segunda, porque la clase nula nunca puede indicar positivo.

### 4. Qué encontraron

Resultados de la prueba estándar (Raff y Holt, 2023, Tabla 2):

| Modelo | Supuesto que declara (Tabla 1) | AUC entrenamiento | AUC prueba | Resultado |
| --- | --- | --- | --- | --- |
| mi-Net | Estándar | 0,998 | 1,000 | Pasa |
| MI-Net | Estándar | 1,000 | 0,000 | Falla |
| MIL-Pooling (Ilse et al., base de Attention MIL) | Estándar | 1,000 | 0,000 | Falla |
| TransMIL | Umbral | 1,000 | 0,000 | Falla |
| GNN-MIL | Umbral | 1,000 | 0,000 | Falla |
| CausalMIL | Estándar | 0,999 | 1,000 | Pasa |
| Hopfield MIL | Umbral | 0,495 | 0,488 | No aprendió el entrenamiento |

Otros resultados relevantes:

- Entre los modelos basados en SVM, mi-SVM y MI-SVM pasan; NSK y STK fallan. **SIL, diseñado expresamente para ignorar el supuesto MIL, también pasa** (AUC de prueba 0,998). De ahí la conclusión de los autores: las pruebas sirven para invalidar, no para certificar (§4.1).
- En la primera prueba de umbral (Tabla 3), MIL-Pooling es el único que aprende la solución completamente correcta (AUC 1,000). Aun así, no es un modelo de umbral válido, porque el supuesto estándar es un caso particular del de umbral y ya falló ese (§4.2).
- TransMIL falla la primera prueba de umbral (AUC 0,000) y pasa la de frecuencia (AUC 1,000, Tabla 4). Los autores infieren que aprende que «deben aparecer dos conceptos», pero también que la ausencia de una instancia puede indicar positivo.
- Conclusión de los autores (§5): de los modelos de deep MIL posteriores a 2016 que evaluaron, solo CausalMIL parece calificar como modelo MIL.

### 5. Qué significa aprender de instancias anticorrelacionadas

En palabras del resumen, los modelos pueden aprender a dar «positivo» por defecto hasta ver un contraejemplo negativo. Un AUC de prueba de 0,000 no es azar: es un ordenamiento perfectamente invertido. El modelo aprendió con exactitud una regla, pero era la regla equivocada, y al moverse el veneno a los bags positivos su ranking se voltea.

Los autores dan la lectura clínica (§1): un diagnóstico de cáncer debería producirse porque se detectó cáncer, no por la ausencia de algo no relacionado. También mencionan el caso de seguridad informática: un modelo que no respeta MIL es vulnerable a ataques que añaden contenido inocuo para evadir la detección.

**Interpretación (no demostrada por el artículo).** En patología, una señal análoga al veneno podría ser un artefacto de preparación o de escáner presente solo en las láminas negativas de un centro. Un modelo que usa su ausencia rendiría bien en la validación interna y fallaría en otro hospital. El artículo no evalúa datos histológicos, así que este escenario es una hipótesis de riesgo, no un hallazgo.

### 6. Por qué importa para las arquitecturas de esta exposición

- **ABMIL.** Lo evaluado fue la capa MIL-Pooling de Ilse et al., que los autores describen como base de su Attention MIL (§2.1.2). Declara el supuesto estándar y falla la prueba estándar. El texto no precisa si se usó la versión con compuerta; el código está en un cuaderno del repositorio de los autores que no se pudo revisar en esta auditoría.
- **TransMIL.** Fue evaluado directamente. Declara el supuesto de umbral, falla la prueba estándar y la primera de umbral, y pasa la de frecuencia.
- **CLAM y DSMIL.** **No fueron evaluados.** El resumen del artículo formula una sospecha general sobre los trabajos derivados de los modelos probados; es una conjetura de los autores, no un resultado. Este documento no atribuye a CLAM ni a DSMIL ningún resultado de estas pruebas. Que CLAM use la atención con compuerta de Ilse et al. (Lu et al., 2021, ec. 1) o que DSMIL incluya una corriente de max pooling no permite anticipar cómo se comportarían sin ejecutar las pruebas.

### 7. Implicaciones para la reproducibilidad y la evaluación

- Un AUC alto en un conjunto de referencia no certifica que el modelo aprendió la regla del problema. Debe acompañarse de pruebas que verifiquen el supuesto que el modelo declara.
- Cada artículo debería declarar qué supuesto MIL pretende respetar y comprobarlo; los autores proponen que sus pruebas se reutilicen. Código: [AlgorithmicUnitTestsMIL](https://github.com/FutureComputing4AI/AlgorithmicUnitTestsMIL), cuaderno ReproducibilityMIL.ipynb.
- Las pruebas pueden dar falsos positivos (SIL pasa), así que superar una prueba no demuestra corrección.
- **Alcance y límites del estudio.** Los datos son gaussianos sintéticos de 16 dimensiones y los modelos tienen tres capas. El trabajo no mide el impacto en datos clínicos reales, y Hopfield MIL no logró entrenar. Lo que sí demuestra es que los modelos evaluados *pueden* aprender soluciones no-MIL cuando los datos lo permiten.

## Diapositiva 11: conclusiones

MIL permite aprender de etiquetas de conjunto cuando etiquetar cada elemento es inviable. Su valor depende de que el supuesto elegido corresponda al problema y de que el modelo realmente lo respete.

1. **Qué problema resuelve.** Aprender un clasificador cuando solo se conoce la etiqueta del conjunto, como el diagnóstico de una lámina, y no la de cada parche (Ilse et al., 2018; Campanella et al., 2019).
2. **Por qué es útil.** Aprovecha etiquetas que ya existen en la práctica clínica y evita la anotación de píxeles. En CAMELYON16, dentro de cada protocolo publicado, la agregación por atención supera a mean pooling usando solo la etiqueta de la lámina (Tablas A y B). Los valores absolutos dependen del protocolo y no se comparan entre artículos.
3. **Qué aporta la atención.** Convierte la agregación en un operador entrenable que se adapta a la tarea y produce pesos útiles para revisar la decisión. Esos pesos son importancia relativa dentro del bag, no probabilidades ni explicaciones causales.
4. **Desafíos.** Pocos testigos por bag, supuesto de independencia, dependencia del extractor y del protocolo, y comparaciones entre artículos poco homogéneas. Además, varios modelos de deep MIL muy citados pueden aprender reglas que el supuesto estándar prohíbe (Raff y Holt, 2023).
5. **Mensaje final.** Evaluar un modelo MIL exige algo más que el AUC: hay que declarar el supuesto que se pretende respetar, comprobarlo y reportar el protocolo completo.

Pregunta abierta sugerida para cerrar la exposición: ¿cómo diseñar arquitecturas con la flexibilidad de la atención y, a la vez, con garantías de respetar el supuesto MIL? Raff y Holt (2023) señalan a CausalMIL y mi-Net como punto de partida.

## Plan de exposición y guion oral

La exposición suma exactamente 12:00 minutos. El guion tiene cerca de 1.000 palabras: leído a un ritmo pausado de 100 a 110 palabras por minuto ocupa unos 9 a 10 minutos, y el resto queda para señalar ecuaciones y tablas y para las transiciones. Conviene ensayarlo con cronómetro, porque la diapositiva 10 es la que tiende a alargarse.

| # | Título | Objetivo comunicativo | Conceptos indispensables | En pantalla | Tiempo | Fuente principal |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | ¿Dónde está el problema? | Que la audiencia sienta la «aguja en el pajar» | WSI, etiqueta débil | Lámina completa y zoom a un foco tumoral; cifra «<10 % de tejido tumoral» | 0:50 | Li et al., 2021; Campanella et al., 2019 |
| 2 | ¿Qué es MIL? | Distinguir MIL del aprendizaje supervisado | Bag, etiqueta del bag, etiquetas ocultas | Tabla de dos columnas; molécula con conformaciones | 0:55 | Ilse et al., 2018; Dietterich et al., 1997 |
| 3 | Bag e Instance | Fijar el vocabulario con CAMELYON16 | Bag, instance, witness | Lámina dividida en cuadrícula; parches tumorales resaltados; llaveros | 1:00 | Li et al., 2021; Foulds y Frank, 2010 |
| 4 | Supuestos de MIL | Mostrar que existe más de una regla posible | Estándar (asimétrico), colectivo, umbral | Dos esquemas: OR lógico frente a promedio | 1:05 | Foulds y Frank, 2010 |
| 5 | Formulación matemática | Pasar de la intuición a f → σ → g | Invarianza a permutaciones, Bernoulli | Ecuación Y = max y\_k y S(X) = g(Σ f(x)) con flechas | 1:15 | Ilse et al., 2018 |
| 6 | Métodos de agregación | Comparar max, mean y atención | MIL pooling | Tres barras de pesos sobre los mismos parches; AUC de mean vs. max dentro de un solo protocolo | 1:10 | Ilse et al., 2018; Shao et al., 2021 |
| 7 | ABMIL | Explicar la atención con compuerta y sus límites | a\_k, compuerta, proxy | Diagrama de bloques y ecuación de a\_k | 1:20 | Ilse et al., 2018 |
| 8 | Pipeline completo | Separar entrenamiento e inferencia | Extractor congelado, batch de un bag | Diagrama del pipeline (en este documento) | 1:15 | Lu et al., 2021; Shao et al., 2021 |
| 9 | Evolución | Mostrar el hilo de problemas y soluciones | Pseudo-etiquetas, instancia crítica, correlación | Línea de tiempo 2018–2021 con una frase por modelo | 1:00 | Lu, Li, Shao et al., 2021 |
| 10 | Aplicaciones, resultados y limitaciones | Interpretar resultados con honestidad | Protocolo, extractor, prueba algorítmica | Tablas A y B en paneles separados, sin mezclar cifras; esquema del «veneno» de Raff y Holt | 1:40 | Shao et al.; Li et al.; Raff y Holt, 2023 |
| 11 | Conclusiones | Dejar tres ideas y una pregunta | — | Tres frases y la pregunta abierta | 0:30 | — |
|  | **Total** |  |  |  | **12:00** |  |

### Guion por diapositiva

**1. ¿Dónde está el problema? (0:50).** «Una lámina de patología digitalizada puede tener cuarenta mil por cuarenta mil píxeles. En una lámina con metástasis de CAMELYON16, el tumor ocupa en promedio menos del diez por ciento del tejido. Pedirle a un patólogo que marque cada célula tumoral es costoso y no escala. Lo que sí tenemos es el diagnóstico de la lámina, que ya está en el informe. La pregunta es: ¿podemos aprender a encontrar el tumor sabiendo solo que está ahí, pero no dónde?»

**2. ¿Qué es MIL? (0:55).** «Multiple Instance Learning es una variante del aprendizaje supervisado en la que la etiqueta no se asigna a cada ejemplo, sino a un conjunto, llamado bolsa o bag. Las etiquetas individuales existen, pero no las vemos. El paradigma nació en 1997, con moléculas que adoptan muchas formas: solo se sabía si la molécula era activa, no qué forma lo era. Dietterich y sus colegas mostraron que ignorar esta estructura da muy malos resultados.»

**3. Bag e Instance (1:00).** «En nuestro ejemplo, la bolsa es la lámina y las instancias son miles de parches pequeños; unos ocho mil por lámina. La etiqueta de la bolsa es metástasis sí o no. Los parches tumorales se llaman testigos: son los que justifican la etiqueta positiva. Una forma de pensarlo es el problema del carcelero: tengo llaveros y sé cuáles abren la puerta, pero nadie me dice qué llave funciona.»

**4. Supuestos (1:05).** «Para aprender necesitamos una regla que conecte las instancias con la bolsa. La más común es el supuesto estándar: la bolsa es positiva si al menos una instancia lo es. Es asimétrico: una bolsa negativa me dice que todo es negativo; una positiva, solo que algo es positivo. El supuesto colectivo dice otra cosa: todas las instancias contribuyen por igual. Y hay reglas de umbral, donde hacen falta varias instancias de distintos tipos. Elegir el supuesto es una decisión sobre el problema, no sobre la red.»

**5. Formulación (1:15).** «Formalmente, una bolsa es un conjunto X de K instancias, y K cambia de bolsa en bolsa. Bajo el supuesto estándar, la etiqueta es el máximo de las etiquetas ocultas. Optimizar ese máximo directamente da problemas de gradiente, así que Ilse y colegas modelan la probabilidad de la bolsa como una Bernoulli y entrenan con entropía cruzada. Como la bolsa no tiene orden, el modelo debe ser invariante a permutaciones. Eso lleva a la plantilla f, agregación, g: transformar cada instancia, agregarlas con un operador simétrico y clasificar. Es una plantilla general, no la forma exacta de todos los modelos.»

**6. Agregación (1:10).** «El corazón de MIL es cómo agregar. Max pooling toma la instancia más fuerte: encaja con el supuesto estándar, pero en cada paso el gradiente solo llega al parche que gana el máximo. Mean pooling promedia todo, y cuando el tumor es diminuto, la señal se diluye: en el protocolo de TransMIL obtiene un AUC de 0,46. Attention pooling hace un promedio ponderado donde una pequeña red aprende los pesos. Ojo: las cifras de dos artículos distintos no se comparan; con otro extractor, el mismo mean pooling sube a 0,76.»

**7. ABMIL (1:20).** «ABMIL calcula para cada parche un peso a sub k, con una red de dos capas y una compuerta sigmoide. Los pesos suman uno, así que el vector de la lámina tiene siempre el mismo tamaño, tenga los parches que tenga; pero cada peso depende de todos los demás parches de esa lámina. Con esos pesos se forma un vector de la lámina, y un clasificador da la probabilidad de metástasis. Los pesos permiten dibujar un mapa de calor. Pero los propios autores advierten que la atención es un proxy: importancia relativa dentro de la lámina, no la probabilidad de que el parche sea tumoral, ni una explicación causal. Y el modelo supone instancias independientes, cuando en la lámina los parches vecinos están relacionados.»

**8. Pipeline (1:15).** «El recorrido completo: segmentamos el tejido, lo cortamos en parches de 256 píxeles y pasamos cada parche por una red preentrenada, que en CLAM y TransMIL es una ResNet50 congelada. Esos vectores se guardan una sola vez, lo que reduce el volumen de datos unas doscientas veces. En entrenamiento, la bolsa pasa por el encoder, la atención y el clasificador, se calcula la pérdida y se actualizan los parámetros, normalmente una bolsa por paso porque cada lámina tiene un número distinto de parches. En inferencia solo hay propagación hacia adelante: diagnóstico y mapa de calor.»

**9. Evolución (1:00).** «Las arquitecturas que siguieron responden a límites concretos. CLAM, en 2021, usa los parches más y menos atendidos como pseudo-etiquetas para aprender con menos láminas. DSMIL combina una rama de máximo con una atención que mide la similitud con el parche más sospechoso, y entrena el extractor sin etiquetas. TransMIL rompe el supuesto de independencia: usa autoatención y codificación posicional para que los parches se miren entre sí.»

**10. Resultados y limitaciones (1:40).** «En CAMELYON16, dentro de cada protocolo publicado, los métodos con atención superan claramente a mean pooling, entrenando solo con la etiqueta de la lámina. Pero las cifras de artículos distintos no se comparan entre sí, y hay tres advertencias. Primera: DSMIL reporta 0,89 en su artículo y 0,82 en la reimplementación de TransMIL; incluso el número de láminas de prueba varía entre artículos, 129 o 130. Segunda: con el mismo agregador, cambiar solo el extractor lleva el AUC de 0,54 a 0,89. Tercera, y más profunda: Raff y Holt, en NeurIPS 2023, crearon datos sintéticos donde una señal fácil aparece solo en bolsas negativas al entrenar y solo en positivas al probar. Cuatro modelos, entre ellos la capa de pooling de Ilse y TransMIL, pasaron de AUC 1 a AUC 0: aprendieron que la ausencia de algo indica positivo, lo que el supuesto estándar prohíbe. CLAM y DSMIL no fueron evaluados en ese estudio. La lección: un buen AUC no garantiza que el modelo aprendió la regla correcta.»

**11. Conclusiones (0:30).** «MIL nos deja aprender de etiquetas de conjunto, como el diagnóstico de una lámina. La atención hace la agregación entrenable y ofrece pistas visuales, pero no explicaciones. Y evaluar bien un modelo MIL exige declarar su supuesto y comprobarlo, no solo reportar el AUC. La pregunta que queda abierta: ¿cómo combinar la flexibilidad de la atención con garantías de respetar ese supuesto?»

### Preguntas probables y respuestas breves

- *¿El peso de atención es la probabilidad de tumor?* No. Es importancia relativa dentro de la bolsa; los autores lo llaman proxy (Ilse et al., 2018, §2.4).
- *¿Por qué no usar siempre max pooling si encaja con el supuesto estándar?* Porque, aplicado a puntuaciones de instancia, el gradiente solo llega a la instancia que gana el máximo en cada bolsa, lo que CLAM señala como causa de baja eficiencia de datos (Lu et al., 2021, Introducción).
- *¿Raff y Holt probaron CLAM o DSMIL?* No. Probaron MI-Net, la capa MIL-Pooling de Ilse et al., TransMIL, GNN-MIL y Hopfield MIL; sobre los derivados solo plantean una sospecha.
- *¿Por qué no entrenar el extractor de extremo a extremo?* Por memoria y tiempo con bolsas de miles de parches (Li et al., 2021, §1; Lu et al., 2021, Discusión).
- *¿Se pueden comparar los AUC de distintos artículos?* Solo con cautela: cambian extractor, parche, partición y semillas (Tablas A, B y C).

## Trazabilidad de afirmaciones y datos

De las 30 afirmaciones que sostienen la exposición, 29 están verificadas en la fuente primaria y 1 queda parcialmente verificada; la discrepancia 129/130 se registra en las observaciones. Las ubicaciones usan secciones, tablas y ecuaciones porque la paginación cambia entre la versión de arXiv y la de las actas.

| # | Afirmación o dato | Fuente | Ubicación | Diapositiva | Estado |
| --- | --- | --- | --- | --- | --- |
| 1 | Una WSI típica mide unos 40.000 × 40.000 píxeles | Li et al., 2021 | §1 | 1 | Verificado |
| 2 | En CAMELYON16 el tumor ocupa en promedio menos del 10 % del tejido de una lámina positiva | Li et al., 2021; Shao et al., 2021 | §4.1 en ambos | 1, 3, 10 | Verificado |
| 3 | 44.732 láminas de 15.187 pacientes entrenadas con los diagnósticos reportados | Campanella et al., 2019 | Resumen | 1 | Verificado |
| 4 | MIL: una etiqueta por bag; etiquetas de instancia existentes pero no observadas | Ilse et al., 2018 | Resumen y §2.1 | 2 | Verificado |
| 5 | Ignorar la estructura de bolsa da resultados muy pobres; 89 % de aciertos en olor a almizcle | Dietterich et al., 1997 | Resumen | 2 | Verificado |
| 6 | Unos 8.000 parches por bag a 20× con parches de 224 px | Li et al., 2021 | §4.1, «Dataset» | 3 | Verificado |
| 7 | Unos 8.800 parches por bag a 20× con parches de 256 px | Shao et al., 2021 | §4, «Dataset» | 3, 8 | Verificado |
| 8 | Analogía de los llaveros (*simple jailer problem*) | Foulds y Frank, 2010 | §2.3 | 3 | Verificado |
| 9 | Supuesto estándar como disyunción y su asimetría | Foulds y Frank, 2010 | §2.4, ec. 1 | 4 | Verificado |
| 10 | Supuesto colectivo: promedio de probabilidades de instancia (Xu, 2003) | Foulds y Frank, 2010 | §3.7 | 4 | Verificado |
| 11 | Jerarquía estándar ⊂ presencia ⊂ umbral ⊂ conteo | Foulds y Frank, 2010 | §3.1.4 | 4 | Verificado |
| 12 | Y = max\_k y\_k y problema de gradientes al optimizar el máximo | Ilse et al., 2018 | §2.1, ec. 1–2 | 5 | Verificado |
| 13 | S(X) = g(Σ f(x)), citando a Zaheer et al. (2017) | Ilse et al., 2018 | §2.1, Teorema 1, ec. 3 | 5 | Verificado |
| 14 | La suma requiere dimensión latente del orden del tamaño del conjunto en el caso continuo | Wagstaff et al., 2019 | Resumen y §2.2 (Teorema 2.9); PMLR 97, pp. 6487–6494 | 5 | Verificado |
| 15 | Ecuaciones de max, mean, atención y atención con compuerta | Ilse et al., 2018 | §2.3–2.4, ec. 5–9 | 6, 7 | Verificado |
| 16 | Los pesos de atención son un proxy, no puntuaciones de instancia | Ilse et al., 2018 | §2.4, «Interpretability» | 7 | Verificado |
| 17 | ABMIL supone instancias sin orden ni dependencia | Ilse et al., 2018 | §2.1 y §2.4 | 7 | Verificado |
| 18 | COLON CANCER AUC 0,968; BREAST CANCER AUC 0,799 (con compuerta) | Ilse et al., 2018 | Tablas 2 y 3 | 7 | Verificado |
| 19 | Lote de 1 bag en todos los experimentos de ABMIL | Ilse et al., 2018 | §6.2 | 8 | Verificado |
| 20 | Padding con máscara para lotes de varios bags | Documentación de torchmil | API data/collate | 8 | Verificado |
| 21 | ResNet50 de ImageNet truncada, 1024 dimensiones; reducción de unas 200 veces del volumen | Lu et al., 2021 | Introducción; Métodos, «Feature extraction» | 8 | Verificado |
| 22 | CLAM: B = 8 (renal), B = 32 (pulmón y ganglios), c₁ = 0,7 | Lu et al., 2021 | Métodos, «Training details» | 9 | Verificado |
| 23 | CLAM: AUC 0,936 (IC 95 %: 0,890–0,983) en 129 láminas de prueba de CAMELYON16 | Lu et al., 2021 | Resultados (remite a la Tabla suplementaria 7) | 9, 10 | Verificado |
| 24 | DSMIL: ec. 3–8; AUC 0,8944 y 0,9165; FROC; cota supervisada 0,9362 | Li et al., 2021 | §3.2 y Tabla 1 | 9, 10 | Verificado |
| 25 | DSMIL con características de ImageNet: AUC 0,5408 | Li et al., 2021 | Tabla 3 | 10 | Verificado |
| 26 | TransMIL: Tabla 1 completa en CAMELYON16 | Shao et al., 2021 | §4.1, Tabla 1 | 6, 10 | Verificado |
| 27 | PPEG: AUC 0,8416 sin codificación y 0,9309 con PPEG; 2,669 M parámetros | Shao et al., 2021 | §4.2.1, Tabla 2 | 9 | Verificado |
| 28 | CAMELYON16: 399 láminas; 270 (110/160) y 129 (49/80); mejor algoritmo AUC 0,994; patólogos 0,810 | Ehteshami Bejnordi et al., 2017 | Resumen y Métodos | 10 | Verificado |
| 29 | Prueba estándar: cuatro modelos pasan de AUC 1,000 a 0,000; SIL pasa sin ser MIL | Raff y Holt, 2023 | §3.1, Algoritmo 1, Tabla 2 | 10 | Verificado |
| 30 | La capa probada es el MIL-Pooling de Ilse et al. (variante exacta no especificada) | Raff y Holt, 2023 | §2.1.2 | 10 | Parcialmente verificado |

Observaciones sobre los casos parciales:

- **Fila 14.** Verificada en esta auditoría: el resumen de Wagstaff et al. afirma que la representación universal práctica exige una dimensión latente al menos igual al número máximo de elementos de entrada; referencia de actas completada.
- **Fila 30.** Sigue parcial. El repositorio de Raff y Holt contiene un único cuaderno (ReproducibilityMIL.ipynb) que no se pudo revisar; la variante exacta de la capa de Ilse et al. sigue sin confirmar.
- **Conteo 129/130 (diapositivas 3 y 10).** Parcialmente verificado. La página del reto anuncia 130 láminas de prueba; JAMA (Tabla 1) evalúa 129; la exclusión de test\_049 por duplicada consta en documentación de terceros concordante, no en el README original leído directamente. No se sabe cuál usó TransMIL.
- La fila 2 combina dos fuentes que dicen lo mismo con palabras distintas; ambas fueron leídas.

## Registro de correcciones respecto a la Fase 1

Se corrigieron 15 puntos. Tres eran errores de dato (filas 1, 2 y 9) y el resto, formulaciones imprecisas o fuentes que no se volvieron a verificar.

| # | Formulación de la Fase 1 | Corrección | Motivo y fuente |
| --- | --- | --- | --- |
| 1 | «PPEG añade como máximo 0,9 puntos de AUC en CAMELYON16» | PPEG eleva el AUC de 0,8416 (sin codificación) a 0,9309; el 0,9 % corresponde a comparar entrada ordenada frente a desordenada | Error de dato. Shao et al., 2021, Tabla 2 y §4.2.2 |
| 2 | «B = 8 en la configuración habitual de CLAM» | B = 8 en subtipificación renal; B = 32 en pulmón y metástasis ganglionar; c₁ = 0,7 | Error de dato. Lu et al., 2021, Métodos |
| 3 | «Mean pooling encaja con el collective assumption» | Mean sobre probabilidades de instancia implementa el supuesto colectivo de Xu; mean sobre embeddings no implementa por sí mismo ninguna regla | Corrección B. Foulds y Frank, 2010, §3.7 |
| 4 | Las instancias se presentaban como independientes | La independencia es un supuesto de ABMIL; el bag se trata como conjunto e invariante a permutaciones, pero los parches están correlacionados | Corrección A. Ilse et al., §2.1; Lu et al., Discusión; Shao et al., §1 |
| 5 | S(X) = g(Σ f(x)) como estructura de todo modelo MIL | Plantilla general válida bajo condiciones (dominio numerable); DSMIL y TransMIL no la siguen literalmente | Corrección E. Ilse et al., Teorema 1; Wagstaff et al., 2019 |
| 6 | «Batch = 1 bag» presentado como regla | Es lo más frecuente, pero existen padding con máscara y agrupación de bags | Corrección F. torchmil |
| 7 | Extractor congelado como única vía | Se distinguen tres estrategias y su efecto en el flujo de gradientes | Corrección G. Ilse et al., Tabla 15; Lu et al.; Li et al. |
| 8 | El mapa de calor como «evidencia» para el patólogo | Pesos relativos dentro del bag; no son probabilidades, explicación causal ni segmentación | Corrección C. Ilse et al., §2.4; Lu et al., Resultados |
| 9 | «Solo mi-Net y CausalMIL superaron la prueba» | Entre los modelos profundos, sí. Entre los SVM también pasan mi-SVM, MI-SVM y SIL, que no es MIL. Hopfield «falla» porque no aprendió el entrenamiento | Error de alcance. Raff y Holt, 2023, Tabla 2 |
| 10 | El 89 % de Dietterich se atribuía a «Iterated-discrim APR según la survey de Zhou» | Se cita solo lo que dice el resumen: el algoritmo que identifica las instancias responsables logra 89 % | No se verificó la atribución a Zhou. Dietterich et al., 1997, resumen |
| 11 | El supuesto colectivo se atribuía a Foulds y Frank | Lo propuso Xu (2003); Foulds y Frank lo revisan | Atribución. Foulds y Frank, 2010, §3.7 |
| 12 | Cifras de CAMELYON16 de distintos artículos en una misma tabla | Tablas separadas por artículo, con protocolo | Comparabilidad. Shao et al., Tabla 1; Li et al., Tabla 1 |
| 13 | El ABMIL 0,8760 se presentaba sin aclarar su origen | Es una reimplementación de Shao et al.; los autores de ABMIL no evaluaron CAMELYON16 | Procedencia. Shao et al., Tabla 1; Ilse et al., §4 |
| 14 | Se citaban un benchmark de Nature Biomedical Engineering (2025) y un estudio de cáncer de ovario (Diagnostics, 2026) | Retirados de esta fase; el efecto del extractor se sustenta con la Tabla 3 de Li et al. (2021), fuente primaria | No se releyeron en esta fase |
| 15 | Ejemplo numérico de 8.000 parches con pesos concretos | Se mantiene como ilustrativo, con la media de 8.800 parches de Shao et al. y sin pesos inventados presentados como resultado | Separar ilustración de resultado |

También se retiraron de la presentación, aunque siguen siendo válidas como lectura complementaria, las aplicaciones en video (Sultani et al., 2018) y en análisis de sentimiento (Angelidis y Lapata, 2018). La razón es de tiempo, no de exactitud.

### Auditoría final antes de la fase visual

| # | Punto auditado | Cambio | Secciones afectadas |
| --- | --- | --- | --- |
| A1 | Comparabilidad de CAMELYON16 | Se retiraron las cifras puestas lado a lado en la tabla de la diapositiva 9; la tabla de la diapositiva 6 separa protocolo A y B; se añadió la regla «comparar solo filas de una misma tabla»; conclusiones y guion ya no dan un rango que mezcla protocolos | Diapositivas 6, 9, 10 y 11; plan y guion |
| A2 | 129 frente a 130 láminas | Se explica el origen (130 anunciadas, 129 tras retirar test\_049 duplicada) y se mantiene abierta la incógnita de TransMIL | Diapositiva 10 (conjunto de datos, Tabla A, limitaciones); trazabilidad; pendientes |
| A3 | Softmax en attention pooling | Normaliza los pesos y da un z de dimensión y escala fijas; los pesos dependen de la composición del bag | Diapositiva 6; guion de la diapositiva 7 |
| A4 | Raff y Holt | Tabla de pruebas con el supuesto al que pertenecen y la propiedad que evalúa; se eliminó la especulación sobre CLAM y DSMIL | Sección de Raff y Holt (§2 y §6); diapositiva 9; guion de la diapositiva 10 |
| A5 | Max pooling y gradientes | El máximo concentra el gradiente en la instancia ganadora (por dimensión); la «desaparición» se acota a la cita de Ilse sobre el máximo de etiquetas discretas | Diapositivas 5 y 6; guion y preguntas |
| A6 | Bibliografía | Raff y Holt con actas oficiales (Vol. 36, pp. 13530–13544); Wagstaff, Zaheer y torchmil verificados; enlace del repositorio de Raff actualizado | Bibliografía; trazabilidad; pendientes |

## Bibliografía depurada (APA 7.ª edición)

La bibliografía queda en 10 referencias fundamentales, que sostienen directamente la exposición, y 6 complementarias. Todas se comprobaron en la fuente original o en el registro oficial de la publicación (actas, DOI o DBLP). Los campos que no se pudieron confirmar se omiten en lugar de completarse.

### Referencias fundamentales

1. Campanella, G., Hanna, M. G., Geneslaw, L., Miraflor, A., Werneck Krauss Silva, V., Busam, K. J., Brogi, E., Reuter, V. E., Klimstra, D. S., & Fuchs, T. J. (2019). Clinical-grade computational pathology using weakly supervised deep learning on whole slide images. *Nature Medicine, 25*(8), 1301–1309. <https://doi.org/10.1038/s41591-019-0508-1>
2. Carbonneau, M.-A., Cheplygina, V., Granger, E., & Gagnon, G. (2018). Multiple instance learning: A survey of problem characteristics and applications. *Pattern Recognition, 77*, 329–353. <https://doi.org/10.1016/j.patcog.2017.10.009>
3. Dietterich, T. G., Lathrop, R. H., & Lozano-Pérez, T. (1997). Solving the multiple instance problem with axis-parallel rectangles. *Artificial Intelligence, 89*(1–2), 31–71. <https://doi.org/10.1016/S0004-3702(96)00034-3>
4. Ehteshami Bejnordi, B., Veta, M., Johannes van Diest, P., van Ginneken, B., Karssemeijer, N., Litjens, G., van der Laak, J. A. W. M., & the CAMELYON16 Consortium. (2017). Diagnostic assessment of deep learning algorithms for detection of lymph node metastases in women with breast cancer. *JAMA, 318*(22), 2199–2210. <https://doi.org/10.1001/jama.2017.14585>
5. Foulds, J., & Frank, E. (2010). A review of multi-instance learning assumptions. *The Knowledge Engineering Review, 25*(1), 1–25. <https://doi.org/10.1017/S026988890999035X>
6. Ilse, M., Tomczak, J. M., & Welling, M. (2018). Attention-based deep multiple instance learning. En J. Dy & A. Krause (Eds.), *Proceedings of the 35th International Conference on Machine Learning* (Vol. 80, pp. 2127–2136). PMLR. <https://proceedings.mlr.press/v80/ilse18a.html>
7. Li, B., Li, Y., & Eliceiri, K. W. (2021). Dual-stream multiple instance learning network for whole slide image classification with self-supervised contrastive learning. En *Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition* (pp. 14318–14328). <https://doi.org/10.1109/CVPR46437.2021.01409>
8. Lu, M. Y., Williamson, D. F. K., Chen, T. Y., Chen, R. J., Barbieri, M., & Mahmood, F. (2021). Data-efficient and weakly supervised computational pathology on whole-slide images. *Nature Biomedical Engineering, 5*(6), 555–570. <https://doi.org/10.1038/s41551-020-00682-w>
9. Raff, E., & Holt, J. (2023). Reproducibility in multiple instance learning: A case for algorithmic unit tests. En A. Oh, T. Naumann, A. Globerson, K. Saenko, M. Hardt, & S. Levine (Eds.), *Advances in Neural Information Processing Systems 36* (pp. 13530–13544). <https://proceedings.neurips.cc/paper_files/paper/2023/hash/2bab8865fa4511e445767e3750b2b5ac-Abstract-Conference.html>
10. Shao, Z., Bian, H., Chen, Y., Wang, Y., Zhang, J., Ji, X., & Zhang, Y. (2021). TransMIL: Transformer based correlated multiple instance learning for whole slide image classification. En *Advances in Neural Information Processing Systems 34* (pp. 2136–2147). <https://proceedings.neurips.cc/paper/2021/file/10c272d06794d3e5785d5e7c5356e9ff-Paper.pdf>

### Referencias complementarias

11. Andrews, S., Tsochantaridis, I., & Hofmann, T. (2003). Support vector machines for multiple-instance learning. En *Advances in Neural Information Processing Systems 15* (pp. 577–584). MIT Press. <https://papers.nips.cc/paper/2232-support-vector-machines-for-multiple-instance-learning> (Conferencia celebrada en 2002; algunas fuentes citan ese año.)
12. Castro-Macías, F. M., Sáez-Maldonado, F. J., Morales-Álvarez, P., & Molina, R. (2025). *torchmil: A PyTorch-based library for deep multiple instance learning* \[Preprint\]. arXiv. <https://doi.org/10.48550/arXiv.2509.08129>
13. Maron, O., & Lozano-Pérez, T. (1998). A framework for multiple-instance learning. En *Advances in Neural Information Processing Systems 10* (pp. 570–576). MIT Press. <https://proceedings.neurips.cc/paper_files/paper/1997/hash/82965d4ed8150294d4330ace00821d77-Abstract.html>
14. Wagstaff, E., Fuchs, F. B., Engelcke, M., Posner, I., & Osborne, M. A. (2019). On the limitations of representing functions on sets. En K. Chaudhuri & R. Salakhutdinov (Eds.), *Proceedings of the 36th International Conference on Machine Learning* (Vol. 97, pp. 6487–6494). PMLR. <http://proceedings.mlr.press/v97/wagstaff19a.html>
15. Wang, X., Yan, Y., Tang, P., Bai, X., & Liu, W. (2018). Revisiting multiple instance neural networks. *Pattern Recognition, 74*, 15–24. <https://doi.org/10.1016/j.patcog.2017.08.026>
16. Zaheer, M., Kottur, S., Ravanbakhsh, S., Póczos, B., Salakhutdinov, R., & Smola, A. J. (2017). Deep sets. En *Advances in Neural Information Processing Systems 30* (pp. 3391–3401). <https://proceedings.neurips.cc/paper/2017/file/f22e4747da1aa27e363d86d40ff442fe-Paper.pdf>

### Repositorios y documentación técnica

| Recurso | Para qué sirve en la exposición |
| --- | --- |
| [AMLab-Amsterdam/AttentionDeepMIL](https://github.com/AMLab-Amsterdam/AttentionDeepMIL) | Implementación oficial de ABMIL en PyTorch y experimento MNIST-bags |
| [mahmoodlab/CLAM](https://github.com/mahmoodlab/CLAM) | Pipeline completo: segmentación, teselado, características, entrenamiento y mapas de calor |
| [binli123/dsmil-wsi](https://github.com/binli123/dsmil-wsi) | Código oficial de DSMIL con preentrenamiento SimCLR |
| [szc19990412/TransMIL](https://github.com/szc19990412/TransMIL) | Código oficial de TransMIL con PPEG y atención de Nyström |
| [FutureComputing4AI/AlgorithmicUnitTestsMIL](https://github.com/FutureComputing4AI/AlgorithmicUnitTestsMIL) | Pruebas algorítmicas de Raff y Holt (cuaderno ReproducibilityMIL.ipynb); el artículo cita una ubicación anterior del repositorio |
| [Documentación de torchmil](https://torchmil.readthedocs.io/en/latest/api/data/collate/) | Manejo de bags de tamaño variable con padding y máscara |
| [Página de datos de CAMELYON16](https://camelyon16.grand-challenge.org/Data/) | Descripción oficial del reto y de su conjunto de prueba |

### Retiradas de la Fase 1

- Amores (2013), Sultani et al. (2018), Angelidis y Lapata (2018) y Bándi et al. (2019): válidas, pero no sostienen ninguna afirmación de la exposición.
- Benchmark de *Nature Biomedical Engineering* (2025) y estudio de cáncer de ovario en *Diagnostics* (2026): no se volvieron a verificar en esta fase.

## Pendientes y decisiones abiertas

Tras la auditoría final quedan cuatro verificaciones abiertas y tres decisiones del equipo; ninguna cambia el contenido científico de la exposición. Las tres primeras verificaciones de la lista ya se resolvieron.

**Verificaciones**

- [x] Referencia oficial de Raff y Holt: *Advances in Neural Information Processing Systems 36*, pp. 13530–13544.
- [x] Wagstaff et al. (2019) en las actas de ICML (PMLR 97, pp. 6487–6494).
- [x] Zaheer et al. (2017, pp. 3391–3401) y autores de torchmil.
- [ ] Variante de la capa de Ilse et al. que probaron Raff y Holt: revisar el cuaderno ReproducibilityMIL.ipynb de su repositorio, que no se pudo abrir en esta auditoría.
- [ ] Conjunto de prueba que usó TransMIL (129 o 130 láminas): ni el artículo ni el README lo aclaran; habría que revisar sus archivos de partición o consultar a los autores.
- [ ] Leer directamente el README de la versión de GigaScience que documenta la exclusión de test\_049; hoy consta en fuentes secundarias concordantes.
- [ ] Antes de afirmar que el mejor algoritmo del reto usó anotaciones de píxel, confirmarlo en el material suplementario de JAMA; hoy solo está verificado que esas anotaciones estaban disponibles.

**Decisiones del equipo**

- [ ] Incluir o no la cota totalmente supervisada (AUC 0,9362) en la diapositiva 10. Se recomienda incluirla: muestra la brecha que todavía deja la supervisión débil.
- [ ] Representar la prueba de Raff y Holt con un esquema visual (bags de entrenamiento y de prueba con el «veneno» cambiando de lado). Se recomienda, porque se entiende mejor visto que contado.
- [ ] Si el equipo decide mostrar una demostración propia, por ejemplo con el ToyDataset de torchmil, presentarla aparte y rotularla como experimento propio, nunca mezclada con las Tablas A, B y C.
