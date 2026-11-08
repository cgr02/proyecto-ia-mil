# Encargo de diseño: presentación MIL, versión 2

Este encargo resume lo que la v2 debe respetar y deja explícito lo que falta decidir. No repite las fuentes: las enlaza.

Marcas:

- **[Confirmado]:** consta en una fuente del repositorio.
- **[Aprobado]:** decisión aprobada, registrada en [`docs/DECISIONS.md`](docs/DECISIONS.md).
- **[Pendiente]:** falta decidirlo o medirlo; no se supone.

## Audiencia

- [Confirmado] Docente y estudiantes del curso Inteligencia Artificial II ([`PRODUCT.md`](PRODUCT.md), Users).
- [Pendiente] Conocimientos previos de la audiencia y quién expone (PRODUCT.md, Users).
- Personas de referencia para las críticas: el estudiante de la última fila, el docente evaluador y el expositor con 1:40 en la diapositiva 10. Constan en PRODUCT.md como [Propuesto] y no se han confirmado formalmente.

## Contexto de exposición

- [Confirmado] Dos televisores de unos 60″ (16:9) en un salón iluminado. A 1920 × 1080, cada píxel mide unos 0,69 mm (PRODUCT.md, Operating Context).
- [Confirmado] 11 diapositivas y 12:00 min, con los tiempos por diapositiva del plan de exposición del documento académico. Detalle en [`docs/SLIDES.md`](docs/SLIDES.md).
- [Pendiente] Distancia a la última fila, posición de los televisores, espejo, sobrebarrido y reflejos (P-06). Hasta tener esos datos se trabaja con la hipótesis de 6 m de DESIGN.md.

## Objetivos

- [Confirmado] Explicar MIL con CAMELYON16 como hilo conductor. El mensaje final es que evaluar un modelo MIL exige declarar el supuesto, comprobarlo y reportar el protocolo completo, no solo el AUC (PRODUCT.md, Product Purpose).
- [Confirmado] Objetivo comunicativo de cada diapositiva: tabla de PRODUCT.md y [`docs/SLIDES.md`](docs/SLIDES.md).
- [Confirmado] Criterios de éxito verificables: PRODUCT.md, sección «Criterios de éxito».
- **[Pendiente] Objetivos y alcance específicos de la v2** (P-10): qué debe mejorar respecto a la v1, qué se considera intocable y con qué criterio se dará por terminada. Se definen con el usuario antes de diseñar.

## Dirección visual vigente

- [Aprobado, provisional] Dirección v0 de [`DESIGN.md`](DESIGN.md) (DEC-01):
  - fondo claro neutro;
  - roles semánticos de color con marcas que no dependen solo del color (D1–D9);
  - niveles N1 88 px, N2 64 px, N3 56 px y N4 32 px;
  - Atkinson Hyperlegible Next y Noto Sans Math.
- [Aprobado] Ampliaciones de la v1 que aún no constan en DESIGN.md (P-03):
  - Source Sans 3 para las cifras experimentales (DEC-08);
  - muesca del testigo y paneles de esquema sin espacios reservados (DEC-11);
  - 10.3 con dos paneles (DEC-12).
- [Confirmado] Línea de base medible de la v1:
  - crítica de Impeccable de 21/32 antes de las correcciones;
  - pruebas de Playwright con 0 observaciones en 20 vistas tras las correcciones.

## Restricciones

- [Confirmado] Contenido intocable: títulos, secuencia, cifras y conclusiones de las 11 diapositivas. El documento académico no se modifica (DEC-02).
- [Aprobado] Ninguna imagen real ni mapa de atención sin fuente y licencia verificadas en la fuente primaria (DEC-03, P-07). No se generan imágenes que simulen histología.
- [Confirmado] Las cifras de protocolos distintos no se comparan ni comparten eje. La atención no es probabilidad ni explicación.
- [Aprobado] No reducir la tipografía para que algo quepa. N3 se mantiene en 56 px hasta medir la sala (DEC-14).
- [Aprobado] Sin dependencias nuevas sin aprobación. La presentación funciona sin conexión (DEC-05).
- [Confirmado] Errores aprendidos en la v1: [`docs/DECISIONS.md`](docs/DECISIONS.md), «Errores aprendidos».

## Entradas pendientes antes de diseñar la v2

P-10 (objetivos de la v2), P-06 (sala), P-07 (licencia), P-02 (líneas de 10.2 y 10.5) y P-03 (DESIGN.md v1).
