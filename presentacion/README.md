# Presentación: Multiple Instance Learning

Exposición de 11 diapositivas en HTML, CSS y JavaScript sin dependencias. Aplica la dirección visual provisional v0 de `DESIGN.md` y el contenido de `docs/investigacion/MIL_Fase_2_Consolidada.md`.

## Ejecutar

Abrir `presentacion/index.html` en Chrome, Edge o Firefox. Funciona sin conexión: fuentes, scripts y esquemas son locales.

Si el navegador bloquea las fuentes al abrir el archivo directamente, servir la carpeta:

```bash
python3 -m http.server 8000 --directory presentacion
```

y abrir `http://localhost:8000`.

## Navegar

| Acción | Teclas |
| --- | --- |
| Siguiente paso o diapositiva | → · ↓ · Av Pág · Espacio · Intro |
| Anterior | ← · ↑ · Re Pág · Retroceso |
| Primera / última | Inicio / Fin |
| Ir a una diapositiva | Número y luego Intro (p. ej. `1` `0` Intro) |
| Pantalla completa | F |

También hay botones en la esquina inferior derecha. La URL refleja la posición (`#10.3` = diapositiva 10, paso 3), de modo que un enlace o una recarga vuelven al mismo punto. Los mandos de presentación que envían Av Pág / Re Pág funcionan sin configuración.

Diapositivas con pasos controlados por el expositor: 2 (2), 3 (2), 5 (2), 7 (2), 8 (2) y 10 (5).

Tipografía: Atkinson Hyperlegible Next para el contenido; Source Sans 3 solo en cifras y métricas experimentales de las diapositivas 6 y 10; Noto Sans Math para símbolos y ecuaciones.

## Estructura

```
presentacion/
  index.html            11 diapositivas
  css/tokens.css        valores de DESIGN.md (colores, tamaños, fuentes)
  css/base.css          lienzo 16:9, marco común, tablas, paneles, controles
  css/diapositivas.css  composición de cada diapositiva
  js/figuras.js         esquemas ilustrativos generados a partir de datos
  js/presentacion.js    navegación, pasos y escalado
  fuentes/              Atkinson Hyperlegible Next y Mono, Noto Sans Math, Source Sans 3 (OFL)
  pruebas/verificar.cjs pruebas con Playwright
```

## Pruebas

```bash
node presentacion/pruebas/verificar.cjs /ruta/a/capturas
```

Comprueba carga de fuentes y cobertura de glifos, área de seguridad del 5 %, desbordes, solapes de texto, tamaños por debajo de 56 px no autorizados, proporción 16:9 en cinco tamaños de ventana y navegación por teclado y botones. Guarda una captura por paso si se indica una carpeta.

## Esquemas e imágenes

Ninguna imagen real ni mapa de atención se usa todavía (DESIGN.md, D9). Todas las figuras son esquemas del equipo y cada pie lo indica: «Esquema ilustrativo: no son datos». Las imágenes de CAMELYON16 se incorporarán solo después de verificar su licencia en la fuente primaria.

Marca de testigo: contorno (discontinuo si el modelo no lo observa) más una muesca maciza en la esquina, para distinguirla sin depender del color. En el esquema del veneno (10.4) la marca va en tinta, porque veneno y anotación no comparten figura (DESIGN.md, D5). Esta muesca es una ampliación de la v0 pendiente de registrar en DESIGN.md.
