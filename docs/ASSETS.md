# Recursos visuales

Este documento indica cómo se organizan y protegen las imágenes, figuras y fuentes de la presentación. Las reglas de uso en pantalla son las de D9 en [`DESIGN.md`](../DESIGN.md): estado de cada imagen y rótulo obligatorio. Aquí solo se registra dónde está cada recurso, de dónde viene y quién lo aprobó.

## Situación actual

- [Confirmado] **No hay ninguna imagen real** en el repositorio: ni láminas de CAMELYON16, ni recortes, ni mapas de atención, ni figuras de artículos.
- [Confirmado] Todas las figuras de la v1 son **esquemas del equipo** dibujados en SVG dentro del código (inventario más abajo).
- [Pendiente] Licencia de CAMELYON16 en la fuente primaria (P-07 en [`DECISIONS.md`](DECISIONS.md)). No se descarga ni se incorpora ninguna imagen real antes de verificarla.

## Estructura de `recursos/`

```
recursos/
  originales/    Archivos de fuente primaria tal como se descargan. Protegidos: no se editan nunca.
  aprobados/     Derivados aprobados para las diapositivas (recortes, exportaciones).
  generados/     Esquemas e ilustraciones del equipo exportados como archivo.
  referencias/   Referencias visuales externas, solo de inspiración; no se publican.
```

Cada carpeta tiene un `README.md` con su regla.

### Reglas por carpeta

| Carpeta | Qué entra | Qué no entra | Requisito para incorporar |
| --- | --- | --- | --- |
| `originales/` | Recortes o imágenes de una fuente primaria con licencia verificada | Láminas completas de varios GB (se registra su procedencia, no se suben); cualquier archivo editado | Licencia verificada en la fuente primaria; entrada en el manifiesto y en `SHA256SUMS` |
| `aprobados/` | Derivados de un original (recorte, escala, conversión), sin alterar el contenido diagnóstico | Retoques que cambien el tejido; anotaciones inventadas | Original identificado, transformación descrita y aprobación del usuario |
| `generados/` | Esquemas del equipo (SVG/PNG) | Imágenes que simulen histología o mapas de atención (D9) | Rótulo «Esquema ilustrativo: no son datos» |
| `referencias/` | Capturas o enlaces de referencia visual | Cualquier uso en la presentación | Fuente y licencia anotadas |

## Protección de los originales

1. **Agentes:** `.claude/settings.json` deniega `Edit` y `Write` sobre `recursos/originales/**`, así que Claude Code no puede modificarlos. Para incorporar un original nuevo hace falta una autorización explícita del usuario, que se aplica fuera de esas herramientas (copia verificada).
2. **Integridad:** `recursos/originales/SHA256SUMS` guarda la suma de cada archivo. La verificación es:
   ```bash
   cd recursos/originales && sha256sum -c SHA256SUMS
   ```
   Debe terminar sin errores antes de cualquier commit que toque `recursos/`.
3. **Git:** los originales se versionan una vez y no se modifican. Una versión nueva es un archivo nuevo, con su propia entrada.
4. **Derivados:** se trabaja siempre sobre una copia en `aprobados/`, nunca sobre el original.

## Plantilla de manifiesto

Una fila por recurso incorporado.

| Archivo | Carpeta | Origen (artículo, conjunto, lámina) | URL de la fuente primaria | Licencia y fecha de verificación | SHA-256 | Estado D9 | Derivado de | Uso (diapositiva y vista) | Aprobado por y fecha |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| — | — | — | — | — | — | — | — | — | — |

## Inventario de la v1

### Fuentes tipográficas (`presentacion/fuentes/`)

| Archivo | Licencia | Uso |
| --- | --- | --- |
| `AtkinsonHyperlegibleNext-Variable.ttf` e `-Italic-Variable.ttf` | SIL OFL 1.1 (`OFL-AtkinsonHyperlegibleNext.txt`) | Todo el texto |
| `AtkinsonHyperlegibleMono-Variable.ttf` | SIL OFL 1.1 (`OFL-AtkinsonHyperlegibleMono.txt`) | Dimensiones de tensor del pipeline |
| `NotoSansMath-Regular.ttf` | SIL OFL 1.1 (`OFL-NotoSansMath.txt`) | Símbolos y ecuaciones MathML |
| `SourceSans3-Variable.ttf` | SIL OFL 1.1 (`OFL-SourceSans3.txt`) | Cifras experimentales de 6 y 10 (DEC-08) |

### Esquemas del equipo (SVG en el código; estado D9: esquema ilustrativo)

| Recurso | Ubicación | Diapositiva |
| --- | --- | --- |
| `esquema-lamina` (lámina con tejido y contorno anotado) | `presentacion/index.html`, `<defs>` | 1, 3 |
| `esquema-region` (región ampliada) | `presentacion/index.html`, `<defs>` | 1, 3 |
| `trama-veneno` y `trama-congelado` (tramas) | `presentacion/index.html`, `<defs>` | 10.4 y 8 |
| `flecha` y `flecha-gradiente` (puntas de flecha) | `presentacion/index.html`, `<defs>` | 3, 5, 7, 8 |
| Zoom de la lámina al foco (`d1Zoom`) | `presentacion/js/figuras.js` | 1 |
| Cuadrícula, testigos y parches ampliados (`d3`) | `presentacion/js/figuras.js` | 3 |
| Bags estándar y colectivo (`d4`) | `presentacion/js/figuras.js` | 4 |
| Bloques f → σ → g (`d5`) | `presentacion/js/figuras.js` | 5.2 |
| Pesos de Max, Mean y Atención (`d6`) | `presentacion/js/figuras.js` | 6 |
| Bloques de ABMIL (`d7`) | `presentacion/js/figuras.js` | 7.1 |
| Pipeline (`d8`) | `presentacion/js/figuras.js` | 8 |
| Esquema del veneno (`d10`) | `presentacion/js/figuras.js` | 10.4 |

`d2()` en `figuras.js` busca elementos que ya no existen en `index.html` (`d2-supervisado`, `d2-mil`) y no dibuja nada. Es código inactivo, sin efecto visual; se registra para la limpieza de la v2.

### Capturas

Las capturas de las 20 vistas y las comparativas de antes y después de las correcciones se generaron en la carpeta temporal de la sesión y **no** forman parte del repositorio. Se regeneran con `node presentacion/pruebas/verificar.cjs <carpeta>`.
