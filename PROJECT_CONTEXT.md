# Contexto del proyecto

Exposición académica de 11 diapositivas (12:00 min) sobre Multiple Instance Learning, con CAMELYON16 como ejemplo conductor. Curso de Inteligencia Artificial II. Este archivo es un índice: no repite contenido, indica dónde está cada cosa.

## Dónde está cada tema

| Tema | Fuente de verdad | Estado |
| --- | --- | --- |
| Contenido científico, cifras, guion y tiempos | [`docs/investigacion/MIL_Fase_2_Consolidada.md`](docs/investigacion/MIL_Fase_2_Consolidada.md) | Cerrado; solo lectura |
| Propósito, audiencia, sala y criterios de éxito | [`PRODUCT.md`](PRODUCT.md) | v0 |
| Sistema visual (tokens, D1–D9, niveles N1–N4) | [`DESIGN.md`](DESIGN.md) | v0 provisional; actualizar a v1 (P-03) |
| Encargo de diseño de la versión 2 | [`DESIGN_BRIEF.md`](DESIGN_BRIEF.md) | Objetivos de la v2 pendientes (P-10) |
| Decisiones, pendientes y errores aprendidos | [`docs/DECISIONS.md`](docs/DECISIONS.md) | Vigente |
| Recursos visuales y su protección | [`docs/ASSETS.md`](docs/ASSETS.md) y [`recursos/`](recursos/) | Sin imágenes reales todavía |
| Ficha por diapositiva y vista | [`docs/SLIDES.md`](docs/SLIDES.md) | Refleja la v1 |
| Presentación v1 (código, ejecución y pruebas) | [`presentacion/`](presentacion/) y su [`README.md`](presentacion/README.md) | Commit `2fe130c` |
| Primera crítica con Impeccable | [`.impeccable/critique/`](.impeccable/critique/) | Anterior a las correcciones |
| Formación en Impeccable | [`docs/diseno/leccion-01-impeccable.md`](docs/diseno/leccion-01-impeccable.md) | Histórico |

## Reglas de trabajo

1. El documento académico no se modifica. Las cifras en pantalla deben coincidir con su tabla de trazabilidad.
2. No se usa ninguna imagen real, mapa de atención ni resultado sin fuente y licencia verificadas (D9). Los esquemas del equipo se rotulan «Esquema ilustrativo: no son datos».
3. Las cifras de protocolos distintos nunca comparten fila ni eje.
4. La tipografía no se reduce para que algo quepa; se reorganiza (DEC-14).
5. Nada se confirma (commit), sube (push), mueve ni instala sin aprobación del usuario.
6. Impeccable se usa en el ámbito del proyecto. Para revisar o auditar la presentación no se usa `impeccable live-server`, y el subagente `impeccable-documenter` no se invoca, porque reescribiría `DESIGN.md` (DEC-15).
7. Los originales de `recursos/originales/` no se editan (ver [`docs/ASSETS.md`](docs/ASSETS.md)).
8. Graphify no está instalado (DEC-16).

## Ejecutar y probar

Ver [`presentacion/README.md`](presentacion/README.md). En resumen:

- Servir `presentacion/` con `python3 -m http.server` y abrirla en el navegador.
- Pruebas: `node presentacion/pruebas/verificar.cjs <carpeta-de-capturas>`.
