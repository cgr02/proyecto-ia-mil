/*
 * Esquemas generados a partir de datos.
 *
 * Todo lo que se dibuja aquí es ILUSTRATIVO: ningún valor proviene de un experimento
 * ni de una lámina real. Los únicos datos publicados de la presentación están en las
 * tablas del HTML, copiados del documento académico consolidado.
 *
 * Codificación semántica (DESIGN.md, D2):
 *   anotación humana / testigo  -> línea verde azulada (discontinua si el modelo no la observa)
 *                                  más una muesca maciza en la esquina: se distingue sin el color.
 *                                  En el esquema del veneno (10.4) la marca va en tinta (DESIGN.md, D5).
 *   parche / instancia          -> celda cuadrada con borde gris, sin relleno
 *   peso de atención            -> relleno en escala ámbar
 *   veneno (Raff y Holt)        -> trama diagonal roja, solo en esquemas sintéticos
 *   gradientes (entrenamiento)  -> línea discontinua
 */
(function () {
  "use strict";

  var NS = "http://www.w3.org/2000/svg";

  var COLOR = {
    tinta: "#16181B",
    secundaria: "#4B5157",
    rejilla: "#6B7178",
    fondo: "#F4F5F5",
    anotacion: "#00796B",
    atencionBaja: [0xF6, 0xE3, 0xBF],
    atencionAlta: [0x8A, 0x4B, 0x00]
  };

  // ---- Datos ilustrativos -------------------------------------------------

  // Diapositiva 4: un bag sintético de seis instancias; la tercera es el testigo.
  var BAG_D4 = {
    etiquetas: [0, 0, 1, 0, 0, 0],
    probabilidades: [0.1, 0.2, 0.9, 0.1, 0.3, 0.2] // promedio = 0,30
  };

  // Diapositiva 6: un bag de 12 instancias; testigos en las posiciones 4 y 8 (base 0).
  // Cada fila suma 1 (distribución completa del bag, DESIGN.md D3b).
  var BAG_D6 = {
    testigos: [4, 8],
    max: [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    mean: repetir(1 / 12, 12),
    atencion: [0.02, 0.02, 0.03, 0.02, 0.34, 0.03, 0.02, 0.02, 0.40, 0.03, 0.04, 0.03]
  };

  // ---- Utilidades ---------------------------------------------------------

  function repetir(valor, n) {
    var lista = [];
    for (var i = 0; i < n; i++) lista.push(valor);
    return lista;
  }

  function el(nombre, atributos, padre) {
    var nodo = document.createElementNS(NS, nombre);
    Object.keys(atributos || {}).forEach(function (clave) {
      nodo.setAttribute(clave, atributos[clave]);
    });
    if (padre) padre.appendChild(nodo);
    return nodo;
  }

  // Texto con tramos: [["texto", "clase"], ...] para mezclar estilos en una línea.
  function texto(padre, x, y, tramos, atributos) {
    var nodo = el("text", Object.assign({ x: x, y: y }, atributos || {}), padre);
    (Array.isArray(tramos) ? tramos : [[tramos]]).forEach(function (tramo) {
      var span = el("tspan", tramo[1] ? { class: tramo[1] } : {}, nodo);
      span.textContent = tramo[0];
    });
    return nodo;
  }

  function flecha(padre, d, opciones) {
    opciones = opciones || {};
    return el("path", {
      d: d,
      fill: "none",
      stroke: opciones.gradiente ? COLOR.secundaria : COLOR.tinta,
      "stroke-width": 3,
      "stroke-dasharray": opciones.gradiente ? "14 10" : "none",
      "marker-end": opciones.gradiente ? "url(#flecha-gradiente)" : "url(#flecha)"
    }, padre);
  }

  function colorAtencion(t) {
    var c = COLOR.atencionBaja.map(function (bajo, i) {
      return Math.round(bajo + (COLOR.atencionAlta[i] - bajo) * t);
    });
    return "rgb(" + c.join(",") + ")";
  }

  // Marca de testigo: contorno interior (discontinuo si el modelo no lo observa) más una muesca
  // maciza en la esquina superior izquierda. La muesca distingue la marca sin depender del color.
  function marcaTestigo(padre, x, y, lado, opciones) {
    opciones = opciones || {};
    var color = opciones.color || COLOR.anotacion;
    var margen = opciones.margen || 5, grosor = opciones.grosor || 5;
    var x0 = x + margen, y0 = y + margen, interior = lado - 2 * margen;
    var muesca = opciones.muesca || Math.round(interior * 0.3);
    el("rect", {
      x: x0, y: y0, width: interior, height: interior,
      fill: "none", stroke: color, "stroke-width": grosor,
      "stroke-dasharray": opciones.oculto ? "10 6" : "none"
    }, padre);
    el("path", {
      d: "M" + x0 + "," + y0 + " h" + muesca + " L" + x0 + "," + (y0 + muesca) + " Z",
      fill: color, stroke: color, "stroke-width": grosor, "stroke-linejoin": "miter"
    }, padre);
  }

  function celda(padre, x, y, lado, opciones) {
    opciones = opciones || {};
    var g = el("g", {}, padre);
    el("rect", {
      x: x, y: y, width: lado, height: lado,
      fill: opciones.relleno || COLOR.fondo,
      stroke: COLOR.rejilla, "stroke-width": 3
    }, g);
    if (opciones.testigo) {
      marcaTestigo(g, x, y, lado, { oculto: opciones.testigo === "oculto", color: opciones.colorTestigo, muesca: opciones.muesca });
    }
    return g;
  }

  function llaves(padre, x1, x2, y, alto) {
    // Llaves de conjunto X = {x1, ..., xK}: el dibujo usa la notación de la ecuación.
    var medio = y + alto / 2;
    var curva = function (x, s) {
      return "M" + (x + 14 * s) + "," + y +
        " C" + x + "," + y + " " + (x + 14 * s) + "," + (medio - 6) + " " + x + "," + medio +
        " C" + (x + 14 * s) + "," + (medio + 6) + " " + x + "," + (y + alto) + " " + (x + 14 * s) + "," + (y + alto);
    };
    el("path", { d: curva(x1, 1), fill: "none", stroke: COLOR.tinta, "stroke-width": 4 }, padre);
    el("path", { d: curva(x2, -1), fill: "none", stroke: COLOR.tinta, "stroke-width": 4 }, padre);
  }

  function decimal(v) {
    return v.toFixed(1).replace(".", ",");
  }

  // ---- Diapositiva 2: supervisado frente a MIL ----------------------------

  function d2() {
    var sup = document.getElementById("d2-supervisado");
    if (sup) {
      celda(sup, 6, 14, 92);
      texto(sup, 52, 78, [["x"]], { class: "svg-n3", "text-anchor": "middle", "font-style": "italic" });
      flecha(sup, "M118,60 H200");
      texto(sup, 222, 80, [["y"]], { class: "svg-n3 fuerte", "font-style": "italic" });
    }
    var mil = document.getElementById("d2-mil");
    if (mil) {
      llaves(mil, 6, 470, 14, 92);
      for (var i = 0; i < 5; i++) {
        celda(mil, 36 + i * 86, 22, 76);
        texto(mil, 36 + i * 86 + 38, 80, [["?"]], { class: "svg-n3 secundario", "text-anchor": "middle" });
      }
      flecha(mil, "M500,60 H590");
      texto(mil, 612, 80, [["Y"]], { class: "svg-n3 fuerte", "font-style": "italic" });
    }
  }

  // ---- Diapositiva 3: cuadrícula sobre la región --------------------------

  function d3() {
    var svg = document.getElementById("d3-cuadricula");
    if (!svg) return;
    var paso = 50;
    for (var p = paso; p < 500; p += paso) {
      el("line", { x1: p, y1: 0, x2: p, y2: 500, stroke: COLOR.rejilla, "stroke-width": 3 }, svg);
      el("line", { x1: 0, y1: p, x2: 500, y2: p, stroke: COLOR.rejilla, "stroke-width": 3 }, svg);
    }
    // Testigos del esquema: celdas dentro del contorno anotado. Discontinuas: no se observan al entrenar.
    TESTIGOS_D3.forEach(function (c) {
      marcaTestigo(svg, c[0] * paso, c[1] * paso, paso, { oculto: true, grosor: 6 });
    });

    // La cuadrícula cubre toda la lámina, no solo la región ampliada: cuadrícula gruesa sobre el panel a.
    var lamina = document.getElementById("d3-lamina-cuadricula");
    if (lamina) {
      for (var gx = 100; gx < 1000; gx += 50) el("line", { x1: gx, y1: 40, x2: gx, y2: 440, stroke: COLOR.rejilla, "stroke-width": 2 }, lamina);
      for (var gy = 40; gy <= 440; gy += 50) el("line", { x1: 100, y1: gy, x2: 980, y2: gy, stroke: COLOR.rejilla, "stroke-width": 2 }, lamina);
    }

    // Parches ampliados: recortes de la misma región (celdas de la cuadrícula c). El primero es testigo.
    document.querySelectorAll(".d3-parche").forEach(function (parche) {
      var c = parche.getAttribute("data-celda").split(",").map(Number);
      parche.setAttribute("viewBox", (c[0] * paso) + " " + (c[1] * paso) + " " + paso + " " + paso);
      el("use", { href: "#esquema-region", x: 0, y: 0, width: 500, height: 500 }, parche);
      el("rect", { x: c[0] * paso + 0.6, y: c[1] * paso + 0.6, width: paso - 1.2, height: paso - 1.2, fill: "none", stroke: COLOR.rejilla, "stroke-width": 1.2 }, parche);
      if (parche.hasAttribute("data-testigo")) {
        marcaTestigo(parche, c[0] * paso, c[1] * paso, paso, { oculto: true, margen: 3, grosor: 1.8 });
      }
    });
  }

  // Celdas testigo del esquema de la diapositiva 3 (dentro del contorno anotado).
  var TESTIGOS_D3 = [[4, 3], [5, 3], [6, 3], [4, 4], [5, 4], [6, 4], [4, 5], [5, 5]];

  // ---- Diapositiva 4: supuesto estándar frente a colectivo ----------------

  function bagD4(svg, contenidoCelda, resultado) {
    svg.setAttribute("viewBox", "0 0 820 226");
    var lado = 92, separacion = 14, x0 = 44, y0 = 10;
    llaves(svg, 14, x0 + 6 * lado + 5 * separacion + 16, y0, lado);
    BAG_D4.etiquetas.forEach(function (y, i) {
      var x = x0 + i * (lado + separacion);
      // Muesca pequeña: la cifra ocupa casi todo el ancho de la celda.
      celda(svg, x, y0, lado, { testigo: y === 1 ? "visible" : null, muesca: 16 });
      texto(svg, x + lado / 2, y0 + 66, [[contenidoCelda(i)]], { class: "svg-n3", "text-anchor": "middle" });
    });
    flecha(svg, "M60,116 V180");
    texto(svg, 90, 196, resultado, { class: "svg-n3" });
  }

  function d4() {
    var estandar = document.getElementById("d4-estandar");
    if (estandar) {
      bagD4(estandar, function (i) { return String(BAG_D4.etiquetas[i]); },
        [["OR → "], ["Y", "fuerte"], [" = 1", "fuerte"]]);
    }
    var colectivo = document.getElementById("d4-colectivo");
    if (colectivo) {
      var media = BAG_D4.probabilidades.reduce(function (a, b) { return a + b; }, 0) / BAG_D4.probabilidades.length;
      bagD4(colectivo, function (i) { return decimal(BAG_D4.probabilidades[i]); },
        [["promedio → "], ["P(c | b) = " + media.toFixed(2).replace(".", ","), "fuerte"]]);
    }
  }

  // ---- Diapositiva 5: de la ecuación a los tres bloques f -> σ -> g --------

  function d5() {
    var svg = document.getElementById("d5-bloques");
    if (!svg) return;
    var bloques = [
      { x: 0, ancho: 500, lineas: [[["f", "fuerte cursiva"], ["  encoder", "fuerte"]], [["cada instancia"]]] },
      { x: 580, ancho: 568, lineas: [[["σ", "fuerte"], ["  agrega", "fuerte"]], [["Σ u otro operador"]], [["simétrico"]]] },
      { x: 1228, ancho: 500, lineas: [[["g", "fuerte cursiva"], ["  probabilidad", "fuerte"]], [["del bag"]]] }
    ];
    bloques.forEach(function (b, i) {
      el("rect", { x: b.x + 1.5, y: 1.5, width: b.ancho - 3, height: 213, fill: "none", stroke: COLOR.tinta, "stroke-width": 3 }, svg);
      b.lineas.forEach(function (linea, j) {
        var nodo = el("text", { x: b.x + 28, y: 66 + j * 60, class: "svg-n3" }, svg);
        linea.forEach(function (t) {
          var attrs = {};
          if ((t[1] || "").indexOf("fuerte") >= 0) attrs["font-weight"] = "700";
          if ((t[1] || "").indexOf("cursiva") >= 0) attrs["font-style"] = "italic";
          el("tspan", attrs, nodo).textContent = t[0];
        });
      });
      if (i < bloques.length - 1) flecha(svg, "M" + (b.x + b.ancho + 8) + ",108 H" + (bloques[i + 1].x - 8));
    });
  }

  // ---- Diapositiva 6: tres operadores sobre el mismo bag ------------------

  function d6() {
    var svg = document.getElementById("d6-pesos");
    if (!svg) return;
    var filas = [
      { nombre: "Max", pesos: BAG_D6.max, atencion: false },
      { nombre: "Mean", pesos: BAG_D6.mean, atencion: false },
      { nombre: "Atención", pesos: BAG_D6.atencion, atencion: true }
    ];
    // Geometría compacta: la leyenda pasó a N3 y necesita la altura (el texto del SVG no se reduce).
    var lado = 50, paso = 58, x0 = 290, altoBarra = 70, altoFila = 162;
    var maxAtencion = Math.max.apply(null, BAG_D6.atencion);

    filas.forEach(function (fila, f) {
      var y0 = 4 + f * altoFila;
      texto(svg, 0, y0 + 46, [[fila.nombre]], { class: "svg-n3 fuerte" });

      var base = y0 + lado + 16 + altoBarra;
      fila.pesos.forEach(function (peso, i) {
        var x = x0 + i * paso;
        celda(svg, x, y0, lado, { testigo: BAG_D6.testigos.indexOf(i) >= 0 ? "oculto" : null });
        var alto = Math.max(peso * altoBarra, peso > 0 ? 3 : 0);
        if (alto > 0) {
          el("rect", {
            x: x + 6, y: base - alto, width: lado - 12, height: alto,
            fill: fila.atencion ? colorAtencion(peso / maxAtencion) : COLOR.secundaria,
            stroke: fila.atencion ? "#8A4B00" : "none", "stroke-width": fila.atencion ? 2 : 0
          }, svg);
        }
      });
      el("line", { x1: x0 - 6, y1: base, x2: x0 + 11 * paso + lado + 6, y2: base, stroke: COLOR.rejilla, "stroke-width": 2 }, svg);
    });
  }

  // ---- Diapositiva 7: bloques de ABMIL y escala de atención reservada -----

  function d7() {
    var svg = document.getElementById("d7-bloques");
    if (svg) {
      var bloques = [
        { lineas: [["Encoder", "fuerte"]], expresion: [["f: x", ""], ["k", "sub"], [" → h", ""], ["k", "sub"]] },
        { lineas: [["Atención con", "fuerte"], ["compuerta", "fuerte"]], expresion: [["a", "atencion"], ["k", "sub atencion"]] },
        { lineas: [["Agregación", "fuerte"]], expresion: [["z = Σ a", ""], ["k", "sub"], [" h", ""], ["k", "sub"]] },
        { lineas: [["Clasificador", "fuerte"]], expresion: [["g → θ(X)", ""]] }
      ];
      var ancho = 392, sep = (1728 - 4 * 392) / 3;
      bloques.forEach(function (b, i) {
        var x = i * (ancho + sep);
        el("rect", { x: x + 1.5, y: 1.5, width: ancho - 3, height: 214, fill: "none", stroke: COLOR.tinta, "stroke-width": 3 }, svg);
        b.lineas.forEach(function (linea, j) {
          texto(svg, x + 24, 62 + j * 62, [linea], { class: "svg-n3" });
        });
        var yExp = 62 + b.lineas.length * 62 + 4;
        expresion(svg, x + 24, yExp, b.expresion);
        if (i < bloques.length - 1) flecha(svg, "M" + (x + ancho + 6) + ",108 H" + (x + ancho + sep - 6));
      });
    }
  }

  // Expresión con subíndices dibujados como tspan desplazados.
  function expresion(svg, x, y, tramos) {
    var nodo = el("text", { x: x, y: y, class: "svg-n3" }, svg);
    tramos.forEach(function (t) {
      var clases = (t[1] || "").split(" ");
      var attrs = {};
      if (clases.indexOf("sub") >= 0) {
        attrs["baseline-shift"] = "-28%";
        attrs["font-size"] = "40";
      }
      if (clases.indexOf("atencion") >= 0) {
        attrs.fill = "#8A4B00";
        attrs["font-weight"] = "700";
      }
      var span = el("tspan", attrs, nodo);
      span.textContent = t[0];
    });
    return nodo;
  }

  // ---- Diapositiva 8: pipeline general de MIL ----------------------------
  //
  // Fila 1: preprocesamiento común (sin entrenamiento; extractor congelado).
  // Fila 2: encoder (común) · agregación MIL (depende del método) · clasificador (común).
  // Fila 3: salida (inferencia), mapa de calor (opcional, solo con pesos de atención)
  //         y, en el paso 2, la pérdida (solo entrenamiento).
  // Canales separados: el avance usa los huecos entre filas y la vertical de la derecha;
  // los gradientes usan su propio canal (y = 466) y nunca comparten tramo con el avance.

  function caja(svg, x, y, w, h, opciones) {
    opciones = opciones || {};
    el("rect", {
      x: x + 1.5, y: y + 1.5, width: w - 3, height: h - 3,
      fill: opciones.relleno || COLOR.fondo,
      stroke: opciones.trazo || COLOR.tinta, "stroke-width": opciones.grosor || 3
    }, svg);
  }

  function d8() {
    var svg = document.getElementById("d8-pipeline");
    if (!svg) return;
    var L = 54; // interlínea dentro de las cajas

    // Fila 1 (y 0–196): preprocesamiento; en la configuración de referencia, sin entrenamiento.
    caja(svg, 0, 0, 544, 196);
    lineasCon(svg, 24, 62, L, [[[["1  ", "fuerte"], ["Segmentación", "fuerte"]]], [[["    de tejido", "fuerte"]]], [[["WSI → máscara"]]]]);
    caja(svg, 592, 0, 544, 196);
    lineasCon(svg, 616, 62, L, [[[["2  ", "fuerte"], ["Teselado", "fuerte"]]], [[["256 × 256 px"]]], [[["+ coordenadas", "secundario"]]]]);
    // Caja 3: la trama del extractor congelado ocupa todo el interior; el texto va sobre placas lisas
    // (se ajustan a cada línea cuando las fuentes están cargadas, en placasD8).
    caja(svg, 1184, 0, 544, 196, { relleno: "url(#trama-congelado)" });
    var placas = el("g", { id: "d8-placas" }, svg);
    var textoCaja3 = el("g", { id: "d8-texto-caja3" }, svg);
    lineasCon(textoCaja3, 1208, 62, L, [[[["3  ", "fuerte"], ["Extracción de", "fuerte"]]], [[["    características", "fuerte"]]], [[["congelada"]]]]);
    placas.setAttribute("data-pendiente", "1");
    flecha(svg, "M546,98 H588");                  // 1 → 2
    flecha(svg, "M1138,98 H1180");                // 2 → 3

    // Fila 2 (y 228–398): encoder · agregación (5–6, alternativas) · clasificador.
    caja(svg, 0, 228, 420, 170);
    lineasCon(svg, 24, 278, L, [[[["4  ", "fuerte"], ["Encoder", "fuerte"]]], [[["1024 → 512", "dim"]]]]);

    // 5–6: la agregación es la etapa 6 del documento; la atención (5) solo existe en ABMIL.
    caja(svg, 468, 228, 772, 210);
    lineasCon(svg, 492, 278, L, [[[["5–6  ", "fuerte"], ["Agregación MIL", "fuerte"]]]]);
    el("rect", { x: 492, y: 302, width: 140, height: 116, fill: "none", stroke: COLOR.rejilla, "stroke-width": 2 }, svg);
    lineasCon(svg, 510, 374, L, [[[["Max"]]]]);
    el("rect", { x: 648, y: 302, width: 172, height: 116, fill: "none", stroke: COLOR.rejilla, "stroke-width": 2 }, svg);
    lineasCon(svg, 666, 374, L, [[[["Mean"]]]]);
    // ABMIL: el cálculo de atención como mecanismo propio, seguido de la agregación ponderada.
    el("rect", { x: 836, y: 302, width: 380, height: 116, fill: "none", stroke: COLOR.rejilla, "stroke-width": 2 }, svg);
    lineasCon(svg, 852, 348, L, [
      [[["ABMIL:  ", "fuerte"], ["5  ", "secundario"], ["a", "atencion"], ["k", "sub atencion"]]],
      [[["6  ", "secundario"], ["z = Σ ", ""], ["a", "atencion"], ["k", "sub atencion"], ["  h", ""], ["k", "sub"]]]
    ]);

    caja(svg, 1288, 228, 440, 170);
    lineasCon(svg, 1312, 278, L, [[[["7  ", "fuerte"], ["Clasificador", "fuerte"]]], [[["g → θ(X)"]]]]);

    // Fila 3 (y 482–652): salida y mapa de calor opcional.
    caja(svg, 1288, 482, 440, 170);
    lineasCon(svg, 1312, 532, L, [[[["8  ", "fuerte"], ["Salida", "fuerte"]]], [[["diagnóstico"]]]]);
    caja(svg, 664, 482, 576, 170, { trazo: COLOR.secundaria, grosor: 2 });
    lineasCon(svg, 688, 532, L, [[[["Mapa de calor", "fuerte"]]], [[["opcional · requiere ", "secundario"], ["a", "atencion"], ["k", "sub atencion"]]]]);

    // Avance: continuo.
    flecha(svg, "M1456,198 V212 H210 V224");      // 3 → 4
    flecha(svg, "M422,313 H464");                 // 4 → 5–6
    flecha(svg, "M1242,313 H1284");               // 5–6 → 7
    flecha(svg, "M1600,400 V478");                // 7 → 8
    el("path", { d: "M1286,567 H1246", stroke: COLOR.secundaria, "stroke-width": 2, fill: "none", "marker-end": "url(#flecha-gradiente)" }, svg);

    // Paso 1: inferencia.
    var inferencia = el("g", { "data-solo": "1" }, svg);
    lineasCon(inferencia, 0, 532, L, [[[["Inferencia:", "fuerte"]]], [[["solo hacia adelante,"]]], [[["sin pérdida"]]]]);

    // Paso 2: entrenamiento. Canal de gradientes (y = 454) por encima del recorrido de θ(X) (y = 468):
    // los gradientes suben sin cruzar el avance.
    var ent = el("g", { "data-solo": "2", class: "oculto" }, svg);
    caja(ent, 0, 482, 560, 170);
    lineasCon(ent, 24, 532, L, [[[["Pérdida vs. ", "fuerte"], ["Y", "fuerte"]]]]);
    // Leyenda del discontinuo, a nivel N3: es la única clave para leer los gradientes.
    el("line", { x1: 24, y1: 600, x2: 120, y2: 600, stroke: COLOR.secundaria, "stroke-width": 3, "stroke-dasharray": "14 10" }, ent);
    texto(ent, 136, 618, [["gradientes"]], { class: "svg-n3 secundario" });
    flecha(ent, "M1430,400 V468 H640 V567 H564");
    flecha(ent, "M300,480 V454 H190 V402", { gradiente: true });
    flecha(ent, "M300,454 H1016 V422", { gradiente: true });
    flecha(ent, "M1016,454 H1340 V402", { gradiente: true });
  }

  // Placas lisas detrás de cada línea de la caja 3, medidas con las fuentes ya cargadas.
  function placasD8() {
    var placas = document.getElementById("d8-placas");
    var texto3 = document.getElementById("d8-texto-caja3");
    if (!placas || !texto3) return;
    while (placas.firstChild) placas.removeChild(placas.firstChild);
    Array.prototype.forEach.call(texto3.querySelectorAll("text"), function (t) {
      var c = t.getBBox();
      el("rect", { x: c.x - 10, y: c.y - 2, width: c.width + 20, height: c.height + 4, fill: COLOR.fondo }, placas);
    });
  }

  function lineasCon(svg, x, y, interlinea, filas) {
    filas.forEach(function (f, i) {
      var nodo = el("text", { x: x, y: y + i * interlinea, class: f[1] || "svg-n3" }, svg);
      f[0].forEach(function (t) {
        var clases = (t[1] || "").split(" ");
        var attrs = {};
        if (clases.indexOf("fuerte") >= 0) attrs["font-weight"] = "700";
        if (clases.indexOf("secundario") >= 0) attrs.fill = COLOR.secundaria;
        if (clases.indexOf("dim") >= 0) attrs["class"] = "svg-dim";
        if (clases.indexOf("sub") >= 0) { attrs["baseline-shift"] = "-28%"; attrs["font-size"] = "40"; }
        if (clases.indexOf("atencion") >= 0) { attrs.fill = "#8A4B00"; attrs["font-weight"] = "700"; }
        el("tspan", attrs, nodo).textContent = t[0];
      });
    });
  }

  // ---- Diapositiva 10: esquema del veneno ----------------------------------

  function d10() {
    var svg = document.getElementById("d10-esquema-veneno");
    if (!svg) return;
    var lado = 72, paso = 86;
    var paneles = [
      { titulo: "Entrenamiento", x: 0, negativo: [0, 0, "v", 0, 0], positivo: [0, "c", 0, 0, 0] },
      { titulo: "Prueba", x: 900, negativo: [0, 0, 0, 0, 0], positivo: [0, "c", 0, "v", 0] }
    ];
    paneles.forEach(function (p) {
      texto(svg, p.x, 48, [[p.titulo]], { class: "svg-n3 fuerte" });
      [["Bag negativo", p.negativo, 82], ["Bag positivo", p.positivo, 190]].forEach(function (fila) {
        texto(svg, p.x, fila[2] + 52, [[fila[0]]], { class: "svg-n3" });
        fila[1].forEach(function (tipo, i) {
          var x = p.x + 380 + i * paso;
          celda(svg, x, fila[2], lado, {
            relleno: tipo === "v" ? "url(#trama-veneno)" : COLOR.fondo,
            testigo: tipo === "c" ? "visible" : null,
            colorTestigo: COLOR.tinta
          });
        });
      });
    });
    el("line", { x1: 864, y1: 10, x2: 864, y2: 280, stroke: COLOR.rejilla, "stroke-width": 2 }, svg);

    // Leyenda.
    var y = 284;
    celda(svg, 0, y, 56);
    texto(svg, 72, y + 44, [["Fondo"]], { class: "svg-n3" });
    celda(svg, 330, y, 56, { testigo: "visible", colorTestigo: COLOR.tinta });
    texto(svg, 402, y + 44, [["Concepto positivo"]], { class: "svg-n3" });
    celda(svg, 960, y, 56, { relleno: "url(#trama-veneno)" });
    texto(svg, 1032, y + 44, [["Veneno"]], { class: "svg-n3" });
  }

  // ---- Diapositiva 1: líneas de zoom del recuadro de la muestra al panel ampliado -----

  function d1Zoom() {
    var svg = document.getElementById("d1-zoom");
    var roi = document.getElementById("d1-roi");
    var destino = document.querySelector(".d1-b .panel-figura");
    var lienzo = document.getElementById("lienzo");
    if (!svg || !roi || !destino) return;
    var escala = lienzo.getBoundingClientRect().width / 1920;
    var base = svg.getBoundingClientRect();
    var a = roi.getBoundingClientRect();
    var b = destino.getBoundingClientRect();
    var p = function (x, y) { return ((x - base.left) / escala).toFixed(1) + "," + ((y - base.top) / escala).toFixed(1); };
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    [[a.right, a.top, b.left, b.top], [a.right, a.bottom, b.left, b.bottom]].forEach(function (l) {
      el("path", { d: "M" + p(l[0], l[1]) + " L" + p(l[2], l[3]), stroke: COLOR.secundaria, "stroke-width": 2, fill: "none" }, svg);
    });
  }

  d2();
  d3();
  d4();
  d5();
  d6();
  d7();
  d8();
  d10();

  // Las líneas de zoom dependen de la maquetación final: se trazan con las fuentes cargadas y al reescalar.
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () { d1Zoom(); placasD8(); });
  } else {
    d1Zoom(); placasD8();
  }
  window.addEventListener("resize", d1Zoom);
})();
