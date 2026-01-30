# Lippu Event Sites (PRO builder)

Este repo implementa un **page builder por secciones** para landings de eventos, pensado para servir desde Netlify bajo subdominios:

- evento1.lippu.app
- evento2.lippu.app
- etc.

## Cómo funciona
- Detecta el subdominio (slug) y carga `/events/<slug>.json`.
- Renderiza una lista ordenada de `sections[]` (hero, highlights, schedule, map, cta).

## Probar en Netlify (sin DNS)
Usa:
- https://TU-SITIO.netlify.app/?event=evento1
- https://TU-SITIO.netlify.app/?event=evento2
- https://TU-SITIO.netlify.app/?event=demo

## Checkout
Cada evento define su `checkoutUrl`, por ejemplo:
`https://lippu.app/eventwa/eventuniqid`

## Agregar un nuevo evento
1) Crea `events/<slug>.json`
2) Visita:
- https://<slug>.lippu.app

