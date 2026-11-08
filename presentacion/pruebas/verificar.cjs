/*
 * Pruebas de la presentación con el Playwright ya disponible en el entorno.
 *
 * Uso:
 *   node presentacion/pruebas/verificar.cjs [carpeta-de-capturas]
 *
 * Comprueba, para cada diapositiva y cada paso:
 *   - que las fuentes locales cargan y cubren los caracteres usados;
 *   - que ningún texto sale del área de seguridad (5 % por lado);
 *   - que ningún elemento HTML desborda su caja;
 *   - que no hay textos solapados;
 *   - qué textos quedan por debajo del nivel N3 (56 px) y si están autorizados (N4);
 *   - la proporción 16:9 en varios tamaños de ventana;
 *   - la navegación por teclado y botones.
 * Guarda una captura por paso si se indica una carpeta.
 */
"use strict";

const path = require("path");
const fs = require("fs");
const { chromium } = require("playwright");

const RAIZ = path.resolve(__dirname, "..");
const URL_BASE = "file://" + path.join(RAIZ, "index.html");
const CAPTURAS = process.argv[2] ? path.resolve(process.argv[2]) : null;

const SEGURO = { x0: 96, y0: 54, x1: 1824, y1: 1026 };
const MINIMO_OBLIGATORIO = 56; // N3
const CLASES_N4 = ["n4", "fuente", "estado", "posicion", "paso", "svg-n4"];

async function evaluarPaso(page) {
  return page.evaluate(({ SEGURO, MINIMO_OBLIGATORIO, CLASES_N4 }) => {
    const lienzo = document.getElementById("lienzo");
    const caja = lienzo.getBoundingClientRect();
    const escala = caja.width / 1920;
    const aLienzo = (r) => ({
      x0: (r.left - caja.left) / escala, y0: (r.top - caja.top) / escala,
      x1: (r.right - caja.left) / escala, y1: (r.bottom - caja.top) / escala
    });

    const activa = document.querySelector(".diapositiva.activa");
    const visible = (el) => {
      for (let n = el; n && n !== document.body; n = n.parentElement || n.parentNode) {
        if (n.nodeType !== 1) continue;
        const cs = getComputedStyle(n);
        if (cs.visibility === "hidden" || cs.display === "none" || parseFloat(cs.opacity) === 0) return false;
      }
      return true;
    };
    const BLOQUES = "p,td,th,h1,h2,figcaption,li,dt,dd,text,math";
    const zonas = [activa, document.querySelector(".controles")];

    const textos = [];
    for (const zona of zonas) {
      const recorrido = document.createTreeWalker(zona, NodeFilter.SHOW_TEXT);
      let nodo;
      while ((nodo = recorrido.nextNode())) {
        if (!nodo.textContent.trim()) continue;
        const padre = nodo.parentElement;
        if (!padre || !visible(padre) || padre.closest(".visualmente-oculto")) continue;
        const dueno = padre.closest(BLOQUES) || padre;
        const rango = document.createRange();
        rango.selectNodeContents(nodo);
        const rects = Array.from(rango.getClientRects()).filter((r) => r.width > 0 && r.height > 0);
        if (!rects.length) continue;
        const tam = parseFloat(getComputedStyle(padre).fontSize);
        const enSvg = !!padre.closest("svg");
        // En SVG el tamaño computado está en unidades del viewBox: se convierte a px del lienzo.
        let tamLienzo = tam;
        if (enSvg) {
          const svg = padre.closest("svg");
          const vb = svg.viewBox && svg.viewBox.baseVal;
          if (vb && vb.width) tamLienzo = tam * (svg.getBoundingClientRect().width / escala) / vb.width;
        }
        const autorizado = CLASES_N4.some((c) => padre.closest("." + c)) || !!padre.closest(".svg-n4");
        textos.push({ texto: nodo.textContent.trim().slice(0, 60), dueno, rects: rects.map(aLienzo), tam: Math.round(tamLienzo), autorizado, sub: !!padre.closest("sub, tspan[baseline-shift], msub, msubsup, munder, munderover, mfrac") });
      }
    }

    // La caja de línea de la fuente incluye el espacio interlineal del propio diseño (≈ 1,3 em en
    // Atkinson). Para el área de seguridad se usa la caja del glifo: 1 em centrado en esa caja.
    const fueraSeguro = [];
    for (const t of textos) {
      for (const r of t.rects) {
        const holgura = Math.max(0, (r.y1 - r.y0 - t.tam) / 2);
        if (r.x0 < SEGURO.x0 - 1 || r.y0 + holgura < SEGURO.y0 - 1 || r.x1 > SEGURO.x1 + 1 || r.y1 - holgura > SEGURO.y1 + 1) {
          fueraSeguro.push(t.texto + " [" + r.x0.toFixed(0) + "," + r.y0.toFixed(0) + "," + r.x1.toFixed(0) + "," + r.y1.toFixed(0) + "]");
          break;
        }
      }
    }

    const solapes = [];
    for (let i = 0; i < textos.length; i++) {
      for (let j = i + 1; j < textos.length; j++) {
        const a = textos[i], b = textos[j];
        if (a.dueno === b.dueno || a.dueno.contains(b.dueno) || b.dueno.contains(a.dueno)) continue;
        let choque = false;
        // Igual que en el área de seguridad: se compara la caja del glifo (1 em), no la caja de línea.
        const glifo = (r, t) => { const g = Math.max(0, (r.y1 - r.y0 - t.tam) / 2); return { x0: r.x0, x1: r.x1, y0: r.y0 + g, y1: r.y1 - g }; };
        for (const ra0 of a.rects) for (const rb0 of b.rects) {
          const ra = glifo(ra0, a), rb = glifo(rb0, b);
          const w = Math.min(ra.x1, rb.x1) - Math.max(ra.x0, rb.x0);
          const h = Math.min(ra.y1, rb.y1) - Math.max(ra.y0, rb.y0);
          if (w > 2 && h > 2) choque = true;
        }
        if (choque) solapes.push(a.texto + "  ×  " + b.texto);
      }
    }

    const desbordes = [];
    activa.querySelectorAll("*").forEach((el) => {
      if (el.closest("svg") || el.closest("math") || el.closest(".visualmente-oculto") || !visible(el)) return;
      const cs = getComputedStyle(el);
      if (cs.display === "inline") return;
      if (el.scrollWidth > el.clientWidth + 1 && el.clientWidth > 0) desbordes.push(el.tagName.toLowerCase() + "." + el.className + " ancho " + el.scrollWidth + " > " + el.clientWidth);
      // Diferencias de pocos píxeles en altura vienen de las métricas de la fuente, no de un desborde visible.
      if (el.scrollHeight > el.clientHeight + 16 && el.clientHeight > 0) desbordes.push(el.tagName.toLowerCase() + "." + el.className + " alto " + el.scrollHeight + " > " + el.clientHeight);
    });
    // Contenido que sobresale de la zona de contenido de la diapositiva.
    const contenido = activa.querySelector(".contenido");
    const rc = aLienzo(contenido.getBoundingClientRect());
    activa.querySelectorAll(".contenido *").forEach((el) => {
      // Dentro de un SVG solo cuenta el propio SVG: sus piezas internas pueden tener cajas virtuales.
      if (!visible(el) || (el.closest("svg") && el.tagName.toLowerCase() !== "svg")) return;
      const r = aLienzo(el.getBoundingClientRect());
      if (r.x1 - r.x0 === 0) return;
      if (r.y1 > rc.y1 + 16 || r.x1 > rc.x1 + 2) {
        desbordes.push("sale de .contenido: " + el.tagName.toLowerCase() + "." + (el.getAttribute("class") || "") + " hasta y=" + r.y1.toFixed(0) + " (límite " + rc.y1.toFixed(0) + ")");
      }
    });

    const pequenos = textos.filter((t) => t.tam < MINIMO_OBLIGATORIO && !t.autorizado && !t.sub).map((t) => t.tam + "px: " + t.texto);
    const tamanos = {};
    textos.forEach((t) => { tamanos[t.tam] = (tamanos[t.tam] || 0) + 1; });

    return { fueraSeguro, solapes, desbordes: Array.from(new Set(desbordes)), pequenos, tamanos };
  }, { SEGURO, MINIMO_OBLIGATORIO, CLASES_N4 });
}

async function main() {
  if (CAPTURAS) fs.mkdirSync(CAPTURAS, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
  const errores = [];
  page.on("pageerror", (e) => errores.push(String(e)));
  page.on("console", (m) => { if (m.type() === "error") errores.push(m.text()); });
  page.on("requestfailed", (r) => errores.push("recurso no cargado: " + r.url()));

  await page.goto(URL_BASE + "#1");
  await page.evaluate(() => document.fonts.ready);

  const informe = { errores, fuentes: null, glifos: null, pasos: [], proporcion: [], navegacion: [] };

  informe.fuentes = await page.evaluate(() => Array.from(document.fonts).map((f) => f.family + " " + f.style + ": " + f.status));

  // Cobertura de glifos: un carácter que la fuente no tiene se dibuja con la de reserva.
  informe.glifos = await page.evaluate(() => {
    const textoTotal = document.getElementById("lienzo").innerText + Array.from(document.querySelectorAll("svg text")).map((t) => t.textContent).join("");
    const caracteres = Array.from(new Set(Array.from(textoTotal))).filter((c) => c.trim() && c.charCodeAt(0) > 126);
    const ctx = document.createElement("canvas").getContext("2d");
    const tiene = (familia, c) => {
      ctx.font = '56px "' + familia + '", serif';
      const a = ctx.measureText(c).width;
      ctx.font = '56px "' + familia + '", monospace';
      return Math.abs(a - ctx.measureText(c).width) < 0.01;
    };
    const enRespaldo = [], faltan = [];
    for (const c of caracteres) {
      if (tiene("Atkinson Hyperlegible Next", c)) continue;
      const nombre = c + " U+" + c.charCodeAt(0).toString(16).toUpperCase();
      if (tiene("Noto Sans Math", c)) enRespaldo.push(nombre); else faltan.push(nombre);
    }
    return { revisados: caracteres.length, enRespaldo, faltan };
  });

  const total = await page.evaluate(() => window.presentacion.total);
  const pasos = await page.evaluate(() => window.presentacion.pasos);
  for (let i = 0; i < total; i++) {
    for (let p = 1; p <= pasos[i]; p++) {
      await page.evaluate(([i, p]) => window.presentacion.ir(i, p), [i, p]);
      await page.waitForTimeout(320); // deja terminar la transición de opacidad
      const r = await evaluarPaso(page);
      informe.pasos.push(Object.assign({ diapositiva: i + 1, paso: p }, r));
      if (CAPTURAS) await page.screenshot({ path: path.join(CAPTURAS, "d" + String(i + 1).padStart(2, "0") + "-p" + p + ".png") });
    }
  }

  // Proporción 16:9 y ajuste a distintas ventanas.
  for (const [w, h] of [[1920, 1080], [3840, 2160], [1366, 768], [1280, 1024], [1024, 768]]) {
    await page.setViewportSize({ width: w, height: h });
    await page.waitForTimeout(150); // el reescalado se aplica en el evento resize
    const r = await page.evaluate(() => {
      const c = document.getElementById("lienzo").getBoundingClientRect();
      return { ancho: c.width, alto: c.height, x: c.left, y: c.top };
    });
    const proporcion = r.ancho / r.alto;
    const cabe = r.x >= -0.5 && r.y >= -0.5 && r.x + r.ancho <= w + 0.5 && r.y + r.alto <= h + 0.5;
    informe.proporcion.push(w + "×" + h + ": " + proporcion.toFixed(4) + (Math.abs(proporcion - 16 / 9) < 0.001 && cabe ? " ok" : " ERROR"));
  }
  await page.setViewportSize({ width: 1920, height: 1080 });

  // Navegación.
  const nav = informe.navegacion;
  const estado = () => page.evaluate(() => window.presentacion.estado());
  const esperar = async (nombre, esperado) => {
    const e = await estado();
    const ok = e.indice === esperado.indice && e.paso === esperado.paso;
    nav.push((ok ? "ok    " : "ERROR ") + nombre + " → " + (e.indice + 1) + "." + e.paso + (ok ? "" : " (esperado " + (esperado.indice + 1) + "." + esperado.paso + ")"));
  };
  await page.goto(URL_BASE + "#1");
  await esperar("carga #1", { indice: 0, paso: 1 });
  const pasosTotales = pasos.reduce((a, b) => a + b, 0);
  for (let k = 0; k < pasosTotales - 1; k++) await page.keyboard.press("ArrowRight");
  await esperar("→ × " + (pasosTotales - 1) + " llega al final", { indice: total - 1, paso: pasos[total - 1] });
  await page.keyboard.press("ArrowRight");
  await esperar("→ en el final no avanza", { indice: total - 1, paso: pasos[total - 1] });
  await page.keyboard.press("Home");
  await esperar("Inicio", { indice: 0, paso: 1 });
  await page.keyboard.press("End");
  await esperar("Fin", { indice: total - 1, paso: pasos[total - 1] });
  await page.keyboard.press("1");
  await page.keyboard.press("0");
  await page.keyboard.press("Enter");
  await esperar("1 0 Intro salta a la 10", { indice: 9, paso: 1 });
  await page.keyboard.press("PageDown");
  await esperar("Av Pág avanza un paso", { indice: 9, paso: 2 });
  await page.keyboard.press("PageUp");
  await page.keyboard.press("PageUp");
  await esperar("Re Pág ×2 vuelve a la 9 completa", { indice: 8, paso: pasos[8] });
  await page.keyboard.press(" ");
  await esperar("Espacio avanza", { indice: 9, paso: 1 });
  await page.click("#siguiente");
  await esperar("botón siguiente", { indice: 9, paso: 2 });
  await page.click("#anterior");
  await esperar("botón anterior", { indice: 9, paso: 1 });
  await page.keyboard.press(" ");
  await esperar("Espacio tras usar un botón no repite el clic", { indice: 9, paso: 2 });
  await page.goto(URL_BASE + "#7.2");
  await esperar("enlace directo #7.2", { indice: 6, paso: 2 });
  const hash = await page.evaluate(() => location.hash);
  nav.push((hash === "#7.2" ? "ok    " : "ERROR ") + "la URL refleja la posición: " + hash);

  await browser.close();

  // Resumen.
  const lineas = [];
  lineas.push("Errores de página: " + (errores.length ? errores.join(" | ") : "ninguno"));
  lineas.push("Fuentes: " + informe.fuentes.join("; "));
  lineas.push("Glifos revisados: " + informe.glifos.revisados + "; resueltos con Noto Sans Math: " + (informe.glifos.enRespaldo.join(", ") || "ninguno") + "; sin cobertura local: " + (informe.glifos.faltan.join(", ") || "ninguno"));
  lineas.push("Proporción: " + informe.proporcion.join(" | "));
  lineas.push("Navegación:\n  " + nav.join("\n  "));
  let problemas = 0;
  for (const p of informe.pasos) {
    const items = [];
    if (p.fueraSeguro.length) items.push("fuera del área de seguridad: " + p.fueraSeguro.join("; "));
    if (p.desbordes.length) items.push("desbordes: " + p.desbordes.join("; "));
    if (p.solapes.length) items.push("solapes: " + p.solapes.join("; "));
    if (p.pequenos.length) items.push("texto < 56 px no autorizado: " + p.pequenos.join("; "));
    problemas += items.length;
    lineas.push("D" + p.diapositiva + "." + p.paso + (items.length ? "\n    " + items.join("\n    ") : " ok") + "   tamaños " + JSON.stringify(p.tamanos));
  }
  lineas.push("Pasos con observaciones: " + informe.pasos.filter((p) => p.fueraSeguro.length || p.desbordes.length || p.solapes.length || p.pequenos.length).length + " de " + informe.pasos.length);
  console.log(lineas.join("\n"));
  if (CAPTURAS) fs.writeFileSync(path.join(CAPTURAS, "informe.json"), JSON.stringify(informe, null, 2));
  process.exitCode = problemas || errores.length || nav.some((l) => l.startsWith("ERROR")) ? 1 : 0;
}

main().catch((e) => { console.error(e); process.exit(2); });
