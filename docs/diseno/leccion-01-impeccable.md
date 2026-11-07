# Lección 1. La filosofía de Impeccable aplicada a la presentación MIL

## Contexto

Empieza la fase de aprendizaje y dirección de diseño. El contenido científico está cerrado en `docs/investigacion/MIL_Fase_2_Consolidada.md` (11 diapositivas, 12:00 min, Tablas A, B y C, Raff y Holt). Esta lección enseña la filosofía de Impeccable a partir de sus archivos originales, muestra cómo convertirla en decisiones verificables, enseña el comando `critique` y cierra con un ejercicio. No se define todavía el sistema visual, no se genera HTML y no se instala nada.

## 0. Qué está instalado y qué no (verificado el 7 nov 2026)

| Elemento | Qué es | Estado aquí | Cómo lo verifiqué |
| --- | --- | --- | --- |
| Impeccable 4.8.0 (Paul Bakaus, Apache 2.0) | Skill de agente con 24 comandos, más un CLI (`npx impeccable`) con un detector de 62 reglas deterministas, un hook de diseño y una extensión de Chrome | **No instalado** | No existe en `~/.claude/skills` ni en plugins. Leí `README.md`, `SKILL.md` y `reference/*.md` del repositorio público `pbakaus/impeccable` (rama main) |
| Playwright 1.63.0 con Chromium | Herramienta de automatización de navegador | **Instalado** (preinstalado en el contenedor) | `npx playwright --version` |
| Emil Kowalski | Recurso de aprendizaje: sus artículos y su curso de animación. No confirmé si existe una skill oficial | No instalado | Se verifica en la lección 3 |
| «Taste» | Término ambiguo. En el plugin ui-ux-pro-max instalado, «taste layer» designa la skill `frontend-design` de Anthropic, de la que Impeccable deriva. Puede haber otra skill comunitaria con ese nombre; no lo verifiqué | — | Se resuelve en la lección 4 |
| ui-ux-pro-max (incluye la skill `slides`) | Plugin con catálogo de estilos, paletas y pares tipográficos | Instalado | Lo usaría solo como consulta técnica: un catálogo de estilos predefinidos es justo el atajo que Impeccable intenta evitar |
| `dataviz`, `artifact-diagramming` | Skills instaladas | Disponibles | Útiles después para las tablas AUC y los diagramas |

Un hallazgo importante: **Impeccable no tiene un modo para diapositivas.** Busqué «slide», «deck», «presentation» y «projector» en todas sus referencias y no aparecen. Todo lo que diga abajo sobre diapositivas es una adaptación mía, y la marco como tal.

## 1. La idea central

El problema que Impeccable describe (README, «Why»): sin guía, los agentes repiten los mismos patrones en cualquier proyecto. Inter para todo, degradados de morado a azul, tarjetas dentro de tarjetas, texto gris sobre fondos de color y un icono en un cuadrado redondeado encima de cada título.

Su respuesta tiene dos partes:

1. **Vocabulario en lugar de adjetivos.** «Make it pop» deja que el agente adivine. Un comando (`typeset`, `layout`, `distill`) carga un manual escrito para una sola operación y lo aplica a un objetivo concreto.
2. **Una prueba de especificidad.** «Si alguien pudiera adivinar tu estética solo por la categoría, o por la categoría más lo que evitas, rehazla» (`reference/new-work.md`, §4, *Calibration*).

La frase que responde directamente a tu regla 1 está en `new-work.md`, §5: **«Si un bloque se lee como un estado de ánimo, la dirección todavía no está decidida.»** Impeccable no prohíbe los adjetivos; los considera síntoma de que falta una decisión.

## 2. Ocho principios documentados y la decisión que obliga cada uno

En cada principio separo lo que dice Impeccable (con su archivo) de cómo lo aplicaría yo al proyecto MIL.

### P1. Manda el brief, y las cifras no se inventan

- **Impeccable** (`SKILL.md`, *How to design*; `new-work.md` §3): se respetan las restricciones fijadas por el usuario. «La verdad limita las afirmaciones, no las demostraciones»: el material ilustrativo se puede crear si se rotula como sintético; las afirmaciones factuales, como benchmarks o capacidades, nunca se inventan.
- **Aplicación:** el brief es tu documento. Los pesos de atención del ejemplo de la diapositiva 8 son hipotéticos (el documento lo dice), así que cualquier gráfico que los muestre lleva el rótulo «ilustrativo» en pantalla. Los AUC solo aparecen tal como figuran en las Tablas A, B y C.

### P2. El modo de la superficie fija la ambición

- **Impeccable** (`SKILL.md`, *Modes*) define cuatro modos: *Persuade* (el visitante decide y actúa), *Operate* (completa una tarea), *Read* (entiende algo) y *Experience* (está dentro de la obra). En Read, «la estructura sirve a la comprensión», y el mundo visual «es dueño del marco y sirve a la columna» (`mode-read.md`): cabecera, títulos, la forma de componer ecuaciones, tablas y figuras. El contenido se mantiene sereno y legible.
- **Mi adaptación:** una exposición académica cae en *Read*, porque el objetivo es que la audiencia entienda y no que compre. Traducido a diapositivas, el **marco** es el sistema de títulos, el indicador de avance, la línea de cita y el estilo de figuras y ecuaciones; la **columna** es el diagrama, la ecuación o la tabla que sostiene el argumento de cada lámina. Consecuencia práctica: la identidad visual vive en cómo se componen las figuras, no en fondos decorados. `mode-read.md` lo advierte: un documento nunca debe leerse como un póster.

### P3. El mundo visual sale de la cultura de la audiencia, no de la categoría

- **Impeccable** (`new-work.md` §3): primero se nombra «la página que esta categoría siempre entrega y su opuesto predecible»; los dos son el surco y quedan fuera. Luego se listan siete sistemas visuales, artefactos o rituales que la audiencia conoce de memoria, de al menos tres familias de materiales distintas. En Read, los candidatos que mejor transfieren vienen de tradiciones editoriales: libros de referencia, especímenes tipográficos, horarios, guías de campo, manuales técnicos y aparato académico. Las herramientas que usa la audiencia, como una terminal o un instrumento, vuelven como disfraz.
- **Aplicación:** el surco de una presentación de IA es fondo oscuro, nodos de red neuronal brillantes, cian y morado, y a veces un cerebro. Su opuesto predecible es el papel crema con serif editorial. Ambos quedan descartados. Una interfaz de visor de microscopio sería un disfraz; un atlas de histología o la convención de figuras con paneles a, b, c de las revistas son candidatos legítimos. Esto lo trabajas tú en el ejercicio.

### P4. Primero la estrategia de color; claro u oscuro según la escena física

- **Impeccable** (`new-work.md` §4; `colorize.md`): antes de elegir colores se elige una estrategia. Las opciones son *Restrained* (neutros más un acento), *Committed* (un color saturado en 30–60 % de la superficie), *Full palette* (3–4 roles con nombre) y *Drenched* (la superficie es el color). Se construyen **roles, no un muestrario de colores**. En Read, el color codifica jerarquía, estado y orientación, y es su escasez lo que le da fuerza al acento. En datos no se depende solo del color: se suman forma, etiqueta o patrón. Claro u oscuro nunca es un valor por defecto: se decide escribiendo una frase sobre quién lo usa, dónde y con qué luz.
- **Aplicación:** la frase de escena depende de la sala, que no conozco. ¿Aula iluminada con proyector, auditorio a oscuras o pantalla LED? Con luz ambiente, el proyector aplasta los oscuros, y eso empuja hacia fondos claros. Es una pregunta para ti.

### P5. Tipografía con roles, no con gustos

- **Impeccable** (`typeset.md`): se usan los mínimos roles y familias que hagan la jerarquía inconfundible. En Read, «una sola familia bien ajustada y una escala fija suelen ser lo correcto». Una segunda familia solo entra si cumple un rol que ninguna otra puede cumplir. La monoespaciada es para código, datos y medidas, nunca como disfraz de lo «técnico» (`craft-floor.md`). La lista de fuentes «por defecto del entrenamiento» (Fraunces, Playfair, Space Grotesk, IBM Plex, Inter como display, DM Sans…) se aplica a superficies Persuade y Experience. En Read, las fuentes de trabajo son válidas.
- **Aplicación:** los roles que necesita esta exposición, sin elegir fuentes todavía, son título de lámina, texto de apoyo, etiqueta de figura, cita bibliográfica, cifra de tabla (con números tabulares, para que los AUC se alineen por el decimal) y ecuación. Un uso justificado de la monoespaciada: las dimensiones de tensor «1024 → 512» del pipeline.

### P6. Demostrar, no afirmar; la primera vista es una tesis

- **Impeccable** (`new-work.md` §6): hay que «mostrar al sujeto haciendo su trabajo», es decir, el mecanismo dramatizado. Y propone la prueba de memoria: «si alguien se fuera tras una sola vista, ¿qué describiría una hora después? Si la respuesta honesta es un estado de ánimo, el concepto no se ha comprometido».
- **Mi adaptación:** aplico la prueba de memoria a cada lámina. De la diapositiva 6, la audiencia debería poder describir que el mismo conjunto de parches recibe pesos distintos según el operador. «Había tres tarjetas azules» sería un fracaso.

### P7. El piso de oficio: comprobaciones y rechazos

`craft-floor.md` mezcla dos clases de reglas: comprobaciones sobre el resultado renderizado y patrones por defecto que solo se aceptan si el brief los pide. Las que más afectan a diapositivas:

| Regla de Impeccable | Tipo | Consecuencia en MIL (mi lectura) |
| --- | --- | --- |
| Etiqueta o «eyebrow» sobre el título | **Prohibición absoluta** («ningún brief la recupera») | Nada de «MÉTODOS» en mayúsculas pequeñas sobre «Métodos de agregación» |
| Números de sección 01 / 02 / 03 | Solo si la secuencia aporta información | Sí en las 8 etapas del pipeline, porque el orden es el contenido. No como decoración del título |
| Tarjetas iguales de icono, título y texto como estructura | Por defecto rechazado | Max, mean y atención no son tres «features» equivalentes: son tres formas de repartir peso |
| La plantilla de cifra gigante con etiqueta pequeña | Por defecto rechazado | El «<10 %» de la diapositiva 1 tienta a ese formato |
| Texto con degradado, vidrio decorativo, borde izquierdo de color mayor de 1 px | Por defecto rechazado | — |
| Emojis o glifos Unicode como iconos | Por defecto rechazado | Iconos dibujados con un trazo coherente, o ninguno |
| Contraste ≥ 4,5:1 en texto y ≥ 3:1 en texto grande | Comprobación | En proyección conviene exigir más; ver la lección 5 |
| Movimiento: un solo momento con autoría, no efectos dispersos | Comprobación | Una animación que explique, como el veneno que cambia de lado en Raff y Holt, en lugar de una entrada idéntica en cada lámina |

### P8. Se verifica mirando el render

- **Impeccable** (`SKILL.md`, principios centrales): se verifica mirando el resultado renderizado a los tamaños en que se entrega, y las revisiones se agrupan.
- **Aplicación:** capturas con Playwright a 1920 × 1080 de cada lámina, más una simulación de lectura a distancia. Eso es la lección 5.

## 3. De principio a decisión: la cadena

El método que propongo, mío pero construido con piezas de Impeccable, tiene cinco pasos: **principio → pregunta que obliga → evidencia en el contenido → decisión verificable → cómo se comprueba.** Si una decisión no se puede comprobar, sigue siendo un adjetivo.

| Principio | Pregunta | Evidencia en tu documento | Decisión verificable (ejemplo) | Comprobación |
| --- | --- | --- | --- | --- |
| P1 y P6 | ¿Cómo impide la composición que la audiencia compare lo que no se puede comparar? | «Las cifras de A y B no se comparan entre sí» (diap. 6 y 10) | Dos paneles con escalas propias, cada uno encabezado por su protocolo (extractor y partición). Ningún valor de A queda en la misma fila visual que uno de B | Prueba de entrecerrar los ojos: los dos grupos se perciben separados. Ninguna línea horizontal une un valor A con un valor B |
| P4 (roles de color) | ¿Qué objeto científico representa cada color y en qué láminas se repite? | Testigo (diap. 3), peso de atención (6, 7, 8), veneno (10) | El testigo, es decir la etiqueta real de tumor, y el peso de atención reciben **codificaciones distintas** | Ninguna figura pinta un parche muy atendido con el color de «tumor» |
| P7 (números de sección) | ¿La numeración aporta información? | Pipeline de 8 etapas ordenadas; exposición de 12 minutos | Numerar las etapas 1–8 y usar un indicador de avance discreto. No poner «01» decorativo en los títulos | Al tapar los números, ¿se pierde información? En el pipeline, sí; en los títulos, no |
| P5 (monoespaciada) | ¿Esto es un dato o un disfraz? | «1024 → 512», «256 × 256 px» | Monoespaciada solo en dimensiones de tensor y tamaños | Ningún título ni texto de apoyo va en monoespaciada |

La segunda fila contiene la lección más importante de este proyecto. **Un color puede introducir de contrabando una afirmación científica falsa.** Si los parches con mucha atención se pintan del mismo color que los testigos tumorales, la lámina afirma visualmente que la atención equivale a probabilidad de tumor, que es justo lo que corrige tu documento (corrección C; Ilse et al., §2.4: la atención es un *proxy*). En una presentación científica, el diseño puede cometer errores de contenido.

## 4. Ejemplo comparado: diapositiva 6, «Métodos de agregación»

Las dos versiones usan el mismo contenido del documento. No defino colores ni fuentes, porque eso pertenece al sistema visual que todavía no hemos decidido.

**Versión A (genérica).** Fondo azul marino con degradado. Sobre el título, la etiqueta «MÉTODOS» en mayúsculas espaciadas. Tres tarjetas iguales con un icono cada una: una flecha hacia arriba para max, un signo igual para mean y un ojo para atención. En cada tarjeta, tres viñetas de ventaja y desventaja y una cifra grande con degradado: 0,46, 0,86 y 0,88. Abajo, a la derecha, la fuente «Shao et al.» en gris claro.

**Versión B (intencional).** Un único bag de, digamos, 12 parches esquemáticos, dos de ellos marcados como testigos con la codificación de «tumor» que se fijó en la diapositiva 3. El bag aparece **tres veces, apilado**, una por operador, siempre con los mismos parches en el mismo orden. Bajo cada parche, una barra cuya altura es el peso que recibe:

- Max: una barra llena en un parche y cero en el resto.
- Mean: doce barras iguales de 1/12.
- Atención: una distribución desigual, rotulada «ilustrativo: pesos aprendidos».

A la derecha, una tabla compacta encabezada por su protocolo («Protocolo A · Shao et al., 2021 · ResNet50 ImageNet») con AUC 0,4647 / 0,8569 / 0,8760. Debajo, en el rol de nota: «Con otro extractor (protocolo B) mean sube a 0,7620: no se compara entre protocolos».

| Criterio | A | B | Regla que lo explica |
| --- | --- | --- | --- |
| ¿Muestra el mecanismo? | No: las tarjetas dicen *qué es* cada operador | Sí: muestra *cómo reparte el peso* sobre los mismos parches | P6, demostrar en vez de afirmar (`new-work.md` §6) |
| Comparación válida | La estructura invita a comparar; el protocolo no se ve | El protocolo es el encabezado de la tabla | P1; tu documento, diap. 6 |
| Afirmaciones implícitas | El ojo sugiere que el modelo «mira» o explica | Rótulo «ilustrativo» y codificación separada de la atención | Corrección C del documento |
| Carga cognitiva | 9 viñetas, 3 iconos y 3 cifras compitiendo con el mismo peso | Una figura dominante y una tabla secundaria | Lista de carga cognitiva de `critique.md`: ≤ 4 elementos por grupo, una jerarquía clara |
| Patrones prohibidos | Eyebrow, tarjetas iguales, texto con degradado, cifra gigante | Ninguno | `craft-floor.md`, *Refuse* |
| Prueba de especificidad | Si se cambian los textos, sirve para cualquier tema | Solo funciona para MIL: el bag, los testigos y el reparto de pesos son el contenido | `critique.md`, *Design specificity* |
| Guion oral | El expositor lee viñetas | El expositor señala tres filas: «aquí solo gana uno, aquí todos igual, aquí aprende» | Coherencia con tu guion de 1:10 |

**Referencias externas que siguen esta lógica** (son mías, no de Impeccable; se estudian para aprender su mecanismo, no para copiar su aspecto):

- Los artículos de Distill.pub, que vinculan por color los términos de una ecuación con las partes de un diagrama.
- Los videos de 3Blue1Brown, donde cada objeto matemático conserva su color en todas las escenas.
- Los *small multiples* de Edward Tufte: la misma figura repetida con una sola variable cambiando.

La versión B es exactamente un *small multiple*.

## 5. Cómo se usa `critique`

### 5.1 Qué hace (documentado en `reference/critique.md`)

1. **Resuelve el objetivo** a un archivo o URL concreto. Prefiere la ruta del archivo, porque los puertos cambian y las rutas no.
2. Ejecuta **dos evaluaciones aisladas**, en subagentes que no ven el trabajo del otro:
   - **A, revisión de diseño:** un modelo que razona como director de diseño. Primero emite el veredicto de especificidad, antes de ver el detector, para que este no condicione su juicio.
   - **B, evidencia determinista:** `impeccable detect --json` sobre el código y un overlay en el navegador sobre la página renderizada.
3. Sintetiza un informe con este orden:
   - Encabezado con el método usado.
   - Veredicto de especificidad.
   - Puntuación de las 10 heurísticas de Nielsen, de 0 a 4. Las que no aplican se marcan `n/a` y el máximo se renormaliza.
   - Lo que funciona.
   - De 3 a 5 problemas prioritarios con severidad P0–P3, cada uno con *qué*, *por qué importa*, *arreglo* y *comando sugerido*.
   - Alertas por persona, observaciones menores y preguntas provocadoras.
4. **Guarda una instantánea** en `.impeccable/critique/` y muestra la tendencia de puntuaciones entre ejecuciones. `polish` la lee después.
5. **Termina siempre con preguntas** dirigidas a lo que encontró: prioridad, intención y alcance. Con tus respuestas recomienda una secuencia de comandos que acaba en `polish`.

Reglas que vale la pena interiorizar, incluso sin la herramienta:

- Si falta el detector o los subagentes, el informe debe empezar con el aviso `DEGRADED: single-context (motivo)`; en el original lleva un símbolo de advertencia. Una crítica degradada que no lo declara cuenta como fallida.
- Las severidades son: P0 bloquea, P1 es grave, P2 menor y P3 pulido. Ante la duda: «¿el usuario pediría ayuda por esto?».
- La carga cognitiva tiene 8 comprobaciones. Fallar 0–1 es carga baja; 2–3, moderada; 4 o más, crítica. La memoria de trabajo admite unos 4 elementos.

### 5.2 Invocación (cuando esté instalado)

- `/impeccable critique la diapositiva 6 de presentacion/index.html`. El README insiste en que **un objetivo estrecho da mejores resultados**: una lámina revisada a fondo es mejor que el deck entero de un vistazo.
- `npx impeccable detect --json presentacion/` aplica solo las reglas de patrones.
- `npx impeccable detect http://localhost:PUERTO` añade las reglas que necesitan la página renderizada, como el contraste bajo y el texto diminuto.

### 5.3 Adaptación a diapositivas (recomendación mía)

Las heurísticas de Nielsen se pensaron para interfaces interactivas. En un deck distingo dos objetivos de crítica: el **contenedor** (navegación, teclado, avance) y **cada lámina**.

| # | Heurística | ¿Aplica a una lámina? | En qué se traduce |
| --- | --- | --- | --- |
| 1 | Visibilidad del estado | Contenedor | El indicador de avance; saber en qué lámina se está |
| 2 | Lenguaje del mundo real | **Sí** | Términos definidos al aparecer (bag, testigo); español e inglés usados de forma consistente |
| 3 | Control y libertad | Contenedor | Retroceder y saltar a la diapositiva 10 durante las preguntas |
| 4 | Consistencia | **Sí, crítica** | La misma codificación para el mismo objeto en las 11 láminas |
| 5 | Prevención de errores | n/a en la lámina | — |
| 6 | Reconocer en vez de recordar | **Sí** | Cada lámina lleva su propia clave visual; no obliga a recordar la de la diapositiva 3 |
| 7 | Flexibilidad | Contenedor | Atajos del expositor |
| 8 | Estética minimalista | **Sí** | Cada elemento sostiene el argumento |
| 9 | Recuperación de errores | n/a | — |
| 10 | Ayuda | n/a, o las notas del expositor | — |

Las personas genéricas de Impeccable (Alex, Jordan, Sam, Riley, Casey) sirven poco aquí. `critique.md` permite crear personas del proyecto **solo con contexto real** de `PRODUCT.md`, y prohíbe inventar detalles de la audiencia. Propongo estas tres, que tendrás que confirmar:

- El estudiante de la última fila, que pone a prueba la legibilidad y la densidad.
- El docente evaluador, que pone a prueba el rigor: ¿se mezclaron protocolos? ¿se atribuyeron a CLAM resultados de Raff y Holt?
- El expositor con 1:40 en la diapositiva 10, que necesita poder señalar lo que dice.

### 5.4 Demostración: crítica de la versión A

`DEGRADED: single-context (Impeccable no instalado; sin detector, sin subagentes, sin render. Es una crítica de una lámina descrita en texto, con fines didácticos)`

**Veredicto de especificidad.** Es intercambiable con cualquier categoría: con otros textos, la misma lámina serviría para tres planes de precios. El mecanismo que distingue a los operadores, el reparto de peso entre instancias, no aparece.

| # | Heurística | Puntuación | Problema clave |
| --- | --- | --- | --- |
| 2 | Lenguaje del mundo real | 2 | «Pooling» sin vincular al bag de la diapositiva 3 |
| 4 | Consistencia | 1 | Los iconos y colores no retoman la codificación de testigos de la diapositiva 3 |
| 6 | Reconocer en vez de recordar | 2 | Para interpretar 0,46 hay que recordar el protocolo, que no está en pantalla |
| 8 | Estética minimalista | 1 | 9 viñetas, 3 iconos y 3 cifras con el mismo peso |
| | **Total** | **6/16 (38 %)** | Banda *Poor* |

Problemas prioritarios:

1. **[P0] Cifras sin protocolo.** *Por qué importa:* el objetivo de la lámina es comparar dentro de un protocolo, y sin el encabezado la audiencia compara a ciegas; el docente lo señalará. *Arreglo:* encabezar la tabla con el protocolo y añadir la nota sobre el protocolo B. *Comando:* `clarify`.
2. **[P1] Tres tarjetas iguales ocultan el mecanismo.** *Arreglo:* el mismo bag repetido tres veces, con barras de peso. *Comandos:* `distill` y luego `layout`.
3. **[P1] El icono de ojo afirma que la atención «ve» o explica.** Contradice la corrección C. *Arreglo:* eliminar los iconos. *Comando:* `distill`.
4. **[P2] Cifras con degradado y etiqueta «MÉTODOS» sobre el título.** Las dos son patrones rechazados; el eyebrow es una prohibición absoluta. *Comando:* `typeset`.
5. **[P3] Fuente gris claro sobre azul marino.** Probablemente no llega a 4,5:1 en proyección. Hay que medirlo, no suponerlo. *Comando:* `audit`.

Preguntas que haría Impeccable al final: ¿qué atacamos primero, el rigor (P0) o la estructura (P1)? ¿El tono sobrio de la lámina es intencional? ¿Corregimos solo los tres primeros o todo?

## 6. Ejercicio práctico

Responde en el chat. Corregiré tus respuestas con las mismas reglas, señalando dónde aparecen estados de ánimo en lugar de decisiones.

1. **El surco.** Describe en dos líneas «la presentación que la categoría *IA aplicada a patología* siempre entrega» y su «opuesto predecible». Nombra al menos tres rasgos visuales concretos de cada una.
2. **Siete candidatos.** Te doy dos: el atlas de histología y las figuras de revista con paneles a, b, c. Agrega cinco más del mundo de tu audiencia (patología, aprendizaje automático, vida académica). Para cada uno escribe una línea sobre por qué puede cargar el mecanismo de MIL y otra sobre cómo se ve: fondo, colores, voces tipográficas y el rasgo que lo hace reconocible. Deben cubrir al menos tres familias de materiales. Marca cuál sería un disfraz de herramienta.
3. **Roles de color, sin colores.** Lista los objetos científicos que necesitan una codificación propia en las 11 láminas (por ejemplo testigo, instancia de fondo, peso de atención, veneno, flujo de entrenamiento frente a inferencia). Para cada uno indica en qué láminas se repite y si puede compartir codificación con otro. Explica por qué «testigo» y «peso de atención» no pueden compartirla. Una tensión para pensar: las láminas H&E reales ya son rosas y moradas. Si usas esa paleta como marca, ¿qué pasa con la legibilidad de las codificaciones sobre imágenes reales?
4. **Una primera vista sin adjetivos.** Escribe el bloque FIRST VIEWPORT de la diapositiva 4 (supuestos): qué va dónde, a qué escala, qué se ve primero y qué señala el expositor. Prohibido usar «moderno», «limpio», «elegante», «minimalista», «profesional» o «impactante».
5. **Crítica.** Toma la diapositiva 10 tal como la describe la tabla del plan de exposición («Tablas A y B en paneles separados; esquema del veneno»). Imagina su versión genérica y escribe tres problemas en formato P0–P3 con *qué*, *por qué importa*, *arreglo* y *comando*.
6. **La escena física.** Escribe una frase con la sala, la iluminación, el equipo de proyección y la distancia de la última fila. Si no la conoces, dilo: es un dato que hay que conseguir antes de la dirección de arte.

## 7. Qué sigue (sin avanzar todavía)

- **Lección 2:** `shape` y `PRODUCT.md` / `DESIGN.md`, con tus respuestas a los puntos 1, 2 y 6.
- **Lección 3:** Emil Kowalski (detalle, interacción, movimiento con propósito).
- **Lección 4:** Taste (referencias y criterio).
- **Lección 5:** Playwright (capturas, desbordamientos, lectura a distancia).
- **Después:** dirección de arte, revisada contigo.

**Decisión pendiente, que requiere tu aprobación: instalar Impeccable.** Tres opciones:

- **(a) `npx impeccable install` en el proyecto.** Incluye el hook y los subagentes, que son lo que permite una crítica no degradada. Ten en cuenta que los hooks se ejecutan fuera de la aprobación del modelo y descargan un binario. Además, al empezar un diseño nuevo, la skill consulta el catálogo de direcciones visuales en impeccable.style. Con `DO_NOT_TRACK=1` se desactiva el registro anónimo de qué direcciones se mostraron y cuál se eligió, pero la consulta al catálogo se hace igual.
- **(b) Copiar a mano `.claude/skills/impeccable`.** No incluye ni el hook ni los subagentes.
- **(c) No instalar** y aplicar los principios a mano, usando solo `npx impeccable detect` como verificador.

Recomiendo **(a)**, con alcance de proyecto y telemetría desactivada, pero solo cuando exista HTML que revisar. Antes de eso no aporta nada que esta lección no cubra.
