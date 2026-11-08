---
target: presentación HTML MIL (presentacion/index.html)
total_score: 21
max_score: 32
na_heuristics: 9,10
p0_count: 0
p1_count: 7
target_identity: "file:/home/user/proyecto-ia-mil/presentacion/index.html"
target_fingerprint: "sha256:3136dca842eb16fd7adb6c7bfa0810d53ab24f5c2cfda49dbd773b8bed5ec4cd"
target_path: /home/user/proyecto-ia-mil/presentacion/index.html
timestamp: 2026-11-08T03-15-16Z
slug: presentacion-index-html
---
Method: dual-agent (A: revisión de diseño · B: detector + navegador). Superposición en navegador omitida: live-server prohibido para no tocar index.html.

## Puntuación (Nielsen, adaptado a exposición proyectada)
1 Estado 3 · 2 Lenguaje 2 · 3 Control 3 · 4 Consistencia 3 · 5 Prevención 3 · 6 Reconocer 2 · 7 Flexibilidad 3 · 8 Minimalismo 2 · 9 n/a · 10 n/a. Total 21/32 (66 %), Aceptable.

## Detector
Fuente: 0 hallazgos. URL (20 vistas, 1920×1080): line-length en pies de 3.2 y 9; straggler en 7.2 y 9. Sin slop. 4/4 verdaderos positivos.

## Problemas prioritarios
- P1 Estado de producción y referencias internas en pantalla (1, 2.2, 3.1, 7.2, 8.1).
- P1 Contenido necesario a N4 o menos (4, 6, 7.2, 8.2, 9, 10.1, 10.4, 10.5).
- P1 N3 56 px por debajo de los ~62 px que DESIGN.md calcula para 6 m (todas).
- P1 Testigo indistinguible del parche sin tono (1,08:1) y D5 incumplido en 10.4.
- P1 Cajas vacías dominantes (2.2, 3.2 d, 7.2; panel c de 7.2 contra D7).
- P1 Diapositiva 10.1-10.2: 21 y 30 cifras, ~20 s por paso, sin énfasis en las filas citadas.
- P1 10.5 «MIL-Pooling (Ilse)» no enlaza con ABMIL; la fuente dice «base de Attention MIL».
- P2 10.3 cifras de A y B en un mismo eje frente a DESIGN.md (decisión).
- P2 Diapositiva 6: orden, nombre y peso visual de Max; matiz de max sobre embeddings.
- P2 Diapositiva 5 sin σ ni puente f → σ → g; paréntesis MathML estirados.
- P2 Discontinuo sobrecargado; trama del extractor congelado se lee como borde.
- P2 Diapositiva 1: tejido sobre reserva 1,11:1.
- P2 Diapositiva 8: sin flechas en fila 1, holguras de 7-8 px, «Extracción… congelado».
