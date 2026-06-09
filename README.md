# Festas de Ourense 2026 — Programa (web-app)

Web-app **optimizada para móviles** con el programa de las **Festas de Ourense 2026** (17–21 de xuño).

> ⚠️ **Proyecto personal, NO oficial.** Esta web no pertenece ni representa al Concello de Ourense.
> Información oficial en [ourense.gal](https://ourense.gal). Hecha por [jltaboada.com](https://jltaboada.com).

## ✨ Características

- 📱 Diseño *mobile-first*, responsive y rápido.
- 🗓️ Navegación por días (17–21) + actividades permanentes.
- 🏷️ Eventos categorizados por tipo (música, espectáculo, deporte, infantil).
- 🎆 Estética festiva basada en el cartel oficial 2026 (imágenes extraídas del PDF).
- 🌐 100% HTML + CSS + JavaScript, sin dependencias externas → listo para GitHub Pages.

## 🚀 Publicar en GitHub Pages

1. Crea un repositorio (p. ej. `festas-ourense-2026`) y sube **todo el contenido de esta carpeta** a la raíz.
2. En GitHub: **Settings → Pages**.
3. En *Build and deployment* → *Source*: selecciona **Deploy from a branch**.
4. Branch: `main` (o `master`) y carpeta `/ (root)`. Guarda.
5. En ~1 minuto estará disponible en `https://<tu-usuario>.github.io/<repo>/`.

> El archivo `.nojekyll` ya está incluido para evitar el procesado Jekyll.

## 📁 Estructura

```
.
├── index.html        # toda la app (HTML + CSS + JS)
├── .nojekyll
├── README.md
└── img/
    ├── cartel.jpg      # cartel oficial 2026 (del PDF)
    ├── og.jpg          # imagen para compartir (Open Graph)
    ├── icon.png        # favicon / apple-touch-icon
    ├── fireworks.png   # decoración (del PDF)
    └── fireworks2.png  # decoración (del PDF)
```

## ✏️ Editar el programa

Todos los datos están en el bloque `<script>` de `index.html`
(arrays `PERMANENTES` y `DIAS`). Edita ahí para añadir o cambiar actividades.

---
Imágenes extraídas del PDF del programa oficial. Datos sujetos a posibles cambios.
