/*
 * Navegación de la presentación.
 *
 * Teclado:
 *   Siguiente: →, ↓, Av Pág, Espacio, Intro
 *   Anterior:  ←, ↑, Re Pág, Retroceso
 *   Inicio / Fin: primera / última diapositiva
 *   Número + Intro: salta a esa diapositiva (p. ej. 1 0 Intro)
 *   F: pantalla completa
 *
 * Pasos: los elementos con data-paso="n" aparecen desde el paso n; los de data-solo="n"
 * solo se ven en el paso n. «Siguiente» avanza primero los pasos y después la diapositiva.
 * La URL refleja la posición (#3 o #10.2) para poder volver a un punto concreto.
 */
(function () {
  "use strict";

  var lienzo = document.getElementById("lienzo");
  var diapositivas = Array.prototype.slice.call(document.querySelectorAll(".diapositiva"));
  var botonAnterior = document.getElementById("anterior");
  var botonSiguiente = document.getElementById("siguiente");
  var posicion = document.getElementById("posicion");

  var estado = { indice: 0, paso: 1 };
  var numeroTecleado = "";
  var temporizadorNumero = null;

  function pasosDe(diapositiva) {
    var maximo = 1;
    diapositiva.querySelectorAll("[data-paso], [data-solo]").forEach(function (nodo) {
      var valor = parseInt(nodo.getAttribute("data-paso") || nodo.getAttribute("data-solo"), 10);
      if (valor > maximo) maximo = valor;
    });
    return maximo;
  }

  var totalPasos = diapositivas.map(pasosDe);

  function aplicarPasos(diapositiva, paso) {
    diapositiva.querySelectorAll("[data-paso]").forEach(function (nodo) {
      var visible = paso >= parseInt(nodo.getAttribute("data-paso"), 10);
      nodo.classList.toggle("oculto", !visible);
      nodo.setAttribute("aria-hidden", visible ? "false" : "true");
    });
    diapositiva.querySelectorAll("[data-solo]").forEach(function (nodo) {
      var visible = paso === parseInt(nodo.getAttribute("data-solo"), 10);
      nodo.classList.toggle("oculto", !visible);
      nodo.setAttribute("aria-hidden", visible ? "false" : "true");
    });
  }

  function mostrar(indice, paso, opciones) {
    indice = Math.max(0, Math.min(diapositivas.length - 1, indice));
    paso = Math.max(1, Math.min(totalPasos[indice], paso));
    estado.indice = indice;
    estado.paso = paso;

    diapositivas.forEach(function (d, i) {
      var activa = i === indice;
      d.classList.toggle("activa", activa);
      d.setAttribute("aria-hidden", activa ? "false" : "true");
      if ("inert" in d) d.inert = !activa;
    });
    aplicarPasos(diapositivas[indice], paso);

    var texto = (indice + 1) + " / " + diapositivas.length;
    var pasos = totalPasos[indice] > 1 ? '<span class="paso">paso ' + paso + " de " + totalPasos[indice] + "</span>" : "";
    posicion.innerHTML = texto + pasos;
    document.title = (indice + 1) + ". " + diapositivas[indice].getAttribute("data-titulo") + " · MIL";

    botonAnterior.disabled = indice === 0 && paso === 1;
    botonSiguiente.disabled = indice === diapositivas.length - 1 && paso === totalPasos[indice];

    if (!opciones || !opciones.sinHistorial) {
      var hash = "#" + (indice + 1) + (paso > 1 ? "." + paso : "");
      if (location.hash !== hash) history.replaceState(null, "", hash);
    }
  }

  function siguiente() {
    if (estado.paso < totalPasos[estado.indice]) {
      mostrar(estado.indice, estado.paso + 1);
    } else if (estado.indice < diapositivas.length - 1) {
      mostrar(estado.indice + 1, 1);
    }
  }

  function anterior() {
    if (estado.paso > 1) {
      mostrar(estado.indice, estado.paso - 1);
    } else if (estado.indice > 0) {
      // Al retroceder se llega a la diapositiva anterior completa, como la dejó el expositor.
      mostrar(estado.indice - 1, totalPasos[estado.indice - 1]);
    }
  }

  function leerHash() {
    var coincidencia = /^#(\d+)(?:\.(\d+))?$/.exec(location.hash);
    if (!coincidencia) return { indice: 0, paso: 1 };
    return {
      indice: parseInt(coincidencia[1], 10) - 1,
      paso: coincidencia[2] ? parseInt(coincidencia[2], 10) : 1
    };
  }

  function escalar() {
    var escala = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
    lienzo.style.setProperty("--escala", String(escala));
  }

  function pantallaCompleta() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen && document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen && document.exitFullscreen();
    }
  }

  document.addEventListener("keydown", function (evento) {
    if (evento.altKey || evento.ctrlKey || evento.metaKey) return;
    var tecla = evento.key;

    if (/^[0-9]$/.test(tecla)) {
      numeroTecleado += tecla;
      clearTimeout(temporizadorNumero);
      temporizadorNumero = setTimeout(function () { numeroTecleado = ""; }, 1500);
      return;
    }

    switch (tecla) {
      case "Enter":
        if (numeroTecleado) {
          mostrar(parseInt(numeroTecleado, 10) - 1, 1);
          numeroTecleado = "";
        } else {
          siguiente();
        }
        break;
      case "ArrowRight":
      case "ArrowDown":
      case "PageDown":
      case " ":
        siguiente();
        break;
      case "ArrowLeft":
      case "ArrowUp":
      case "PageUp":
      case "Backspace":
        anterior();
        break;
      case "Home":
        mostrar(0, 1);
        break;
      case "End":
        mostrar(diapositivas.length - 1, totalPasos[diapositivas.length - 1]);
        break;
      case "f":
      case "F":
        pantallaCompleta();
        break;
      default:
        return;
    }
    evento.preventDefault();
  });

  // Los botones no deben quedarse con el foco: Espacio e Intro seguirían «pulsándolos».
  botonAnterior.addEventListener("click", function () { anterior(); botonAnterior.blur(); });
  botonSiguiente.addEventListener("click", function () { siguiente(); botonSiguiente.blur(); });

  window.addEventListener("hashchange", function () {
    var destino = leerHash();
    mostrar(destino.indice, destino.paso, { sinHistorial: true });
  });
  window.addEventListener("resize", escalar);

  escalar();
  var inicio = leerHash();
  mostrar(inicio.indice, inicio.paso);

  // Expuesto solo para las pruebas automáticas.
  window.presentacion = {
    total: diapositivas.length,
    pasos: totalPasos.slice(),
    estado: function () { return { indice: estado.indice, paso: estado.paso }; },
    ir: function (indice, paso) { mostrar(indice, paso || 1); }
  };
})();
