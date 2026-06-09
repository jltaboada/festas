# Festas de Ourense 2026 — PWA del programa

**Aplicación web progresiva (PWA)** optimizada para móviles con el programa de las
**Festas de Ourense 2026** (17–21 de xuño). Instalable como app, funciona sin conexión.

> ⚠️ **Proyecto personal, NO oficial.** Esta web no pertenece ni representa al Concello de Ourense.
> Información oficial en [ourense.gal](https://ourense.gal). Hecha por [jltaboada.com](https://jltaboada.com).

## ✨ Características

- 📱 **PWA instalable** (Android / iOS / escritorio) con icono propio, pantalla completa y modo *standalone*.
- 🔌 **Funciona offline**: un *service worker* cachea la app y las imágenes.
- 🪧 Pantalla de inicio con el **cartel** + botón "Ver programa" (y botón "Instalar a app").
- 🗂️ **Desplegable** para elegir sección: ⭐ Favoritos · 📅 cada día (17–21) · 🎪 actividades permanentes.
- ⭐ **Favoritos** guardados en el dispositivo (`localStorage`).
- 📅 **Añadir al calendario** (.ics) en cada evento (Google/Apple/Outlook), con horas de madrugada bien resueltas.
- 🗺️ **Ubicaciones en Google Maps** (chip de lugar + botón "Como chegar").
- 🔴 **"En directo agora"**: marca automáticamente los eventos que están sucediendo según la fecha/hora.
- ↗️ **Compartir evento** con la Web Share API (y copia al portapapeles como alternativa) + enlace directo (`#dia/evento`).
- 🔍 **Buscador** por nombre, lugar o tipo (ignora acentos).
- 🌙☀️ **Modo claro/oscuro** con preferencia recordada.
- 🌍 **Bilingüe galego/castelán** con selector de idioma (recuerda la preferencia).
- 🔄 **Auto-actualización:** el *service worker* usa una **marca de versión**; al cambiarla la app
  detecta la nueva versión, la instala y se recarga sola con el contenido más reciente.
- 🔘 Acciones de cada evento como **iconos** (calendario, mapa, compartir) a todo el ancho.

## 🚀 Publicar en GitHub Pages

1. Crea un repositorio y sube **todo el contenido de esta carpeta** a la raíz.
2. GitHub → **Settings → Pages**.
3. *Source*: **Deploy from a branch** → branch `main` y carpeta `/ (root)`. Guarda.
4. En ~1 minuto estará en `https://<tu-usuario>.github.io/<repo>/`.

> **Importante para la PWA:** GitHub Pages sirve por **HTTPS**, requisito del service worker, así que la
> instalación y el modo offline funcionarán correctamente. El `.nojekyll` evita el procesado Jekyll.
> Las rutas son **relativas** (`./`), por lo que funciona aunque el sitio cuelgue de un subdirectorio `/repo/`.

## 📁 Estructura

```
.
├── index.html              # app completa (HTML + CSS + JS)
├── manifest.webmanifest    # metadatos de la PWA
├── sw.js                   # service worker (offline / caché)
├── .nojekyll
├── README.md
└── img/
    ├── cartel.jpg                  # cartel oficial 2026 (del PDF)
    ├── og.jpg                      # imagen para compartir (Open Graph)
    ├── icon.png                    # icono usado en la barra
    ├── icon-192/512.png            # iconos PWA (any)
    ├── icon-maskable-192/512.png   # iconos PWA (maskable, Android)
    ├── apple-touch-icon.png        # icono iOS
    ├── fireworks.png / fireworks2.png  # decoración (del PDF)
```

## ✏️ Editar el programa

Los datos están en el bloque `<script>` de `index.html` (arrays `PERMANENTES` y `DIAS`).
**Importante:** cada vez que cambies cualquier archivo, edita la constante **`VERSION`** al
principio de `sw.js` (p. ej. `'2026-06-09-3'` → `'2026-06-09-4'`). Eso basta para que la app
detecte la actualización, la descargue y se recargue sola en los dispositivos de los usuarios.

> _(Nota técnica: los textos están traducidos en el objeto `I18N` y los datos bilingües del
> programa usan `{gl:'…', es:'…'}` dentro de los arrays.)_

---
Imágenes e iconos derivados del PDF del programa oficial. Datos sujetos a posibles cambios.
