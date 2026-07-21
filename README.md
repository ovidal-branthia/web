# Branthia — Web

Sitio web de Branthia (consultora de IA + hub de producto SaaS).

Prototipo estático: React 18 + Babel standalone (vía CDN), sin build. Cada página
es un `.html` que monta un componente JSX.

## Páginas
- `Home.html` — home (app.jsx)
- `Estudio.html` — el estudio / fundador (estudio.jsx)
- `Legal.html` · `Privacidad.html` · `Cookies.html` — legales (legal.jsx)

## Local
```bash
python3 -m http.server 8848
# http://127.0.0.1:8848/Home.html
```
