# Festas de Ourense 2026 — PWA del programa

**Aplicación web progresiva (PWA)** optimizada para móviles con el programa de las
**Festas de Ourense 2026** (17–21 de xuño). Instalable como app, funciona sin conexión.

> ⚠️ **Proyecto personal, NO oficial.** Esta web no pertenece ni representa al Concello de Ourense.
> Información oficial en [ourense.gal](https://ourense.gal). Hecha por [jltaboada.com](https://jltaboada.com).

## ✨ Características

- 📱 **PWA instalable** (Android / iOS / escritorio) con icono propio, pantalla completa y modo *standalone*.
- 🔌 **Funciona 100% offline**: el *service worker* **precachea la app, las imágenes y `eventos.json`**
  en la instalación, así que el programa se ve sin conexión. Avisa con un banner cuando estás offline.
- 🪧 Pantalla de inicio con el **cartel** + botón "Ver programa" (y botón "Instalar a app").
- 🗂️ **Desplegable** para elegir sección: ⭐ Favoritos · 📅 cada día (17–21) · 🎪 actividades permanentes.
- ⭐ **Favoritos** guardados en el dispositivo (`localStorage`).
- 📅 **Añadir al calendario** con un **modal**: muestra un resumen del evento y permite añadirlo a
  **Google Calendar** (se abre en una pestaña) o **descargar el `.ics`** (Apple Calendar, Outlook, etc.).
- 🗺️ **Botón "Cómo llegar"** que abre la ubicación en Google Maps / la app de mapas del dispositivo.
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
├── eventos.json            # ← TODOS los datos del programa (edítalo aquí)
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

## ✏️ Editar el programa (¡ahora muy fácil!)

**Todos los eventos están en `eventos.json`.** No hace falta tocar `index.html`. Para cambiar,
añadir o quitar un evento, edita ese archivo y súbelo a GitHub.

### Cómo es cada evento

```json
{
  "tipo": "musica",
  "titulo": "Miguel Ríos",
  "hora": "23.00 – 01.00 h",
  "lugar": { "gl": "Exterior Pavillón dos Remedios", "es": "Exterior Pabellón dos Remedios" }
}
```

- **`tipo`** (obligatorio): uno de `musica`, `espectaculo`, `deporte`, `infantil`, `permanente`.
  Define el color y el icono de la tarjeta.
- **`titulo`** (obligatorio): texto. Puede ser simple (`"Miguel Ríos"`) o bilingüe
  (`{ "gl": "...", "es": "..." }`). Usa la forma bilingüe solo si el texto cambia entre idiomas.
- **`hora`**: p. ej. `"21.00 h"` o `"21.00 – 22.30 h"`. De aquí se calcula el botón de calendario
  y el estado *"en directo"*. Si un evento no tiene hora, déjalo sin este campo.
- **`lugar`**: texto simple o bilingüe. Se usa para el chip 📍 y para Google Maps.
- **`icon`** (opcional): un emoji para la tarjeta (p. ej. `"🎡"`). Si no se pone, se usa el del tipo.
- **`detalle`** (opcional): texto largo, admite HTML (`<b>`, `<br>`). Útil para las permanentes.

### Dónde van

- Las actividades de cada día van en `dias` → el día con su `id` (`mer`, `xov`, `ven`, `sab`, `dom`)
  → array `eventos`. **El orden del array es el orden en que se muestran.**
- Las actividades de toda la fiesta van en el array `permanentes`.

### Consejos

- Respeta las **comillas** y las **comas** del JSON. Si algo falla, pega el archivo en
  [jsonlint.com](https://jsonlint.com) para validarlo antes de subir.
- Tras editar `eventos.json`, los cambios llegan **rápido** (se carga "red primero").
  Aun así, **lo recomendable es subir también `VERSION` en `sw.js`** (p. ej. `'2026-06-09-4'` →
  `'2026-06-09-5'`) para forzar la actualización completa en las apps ya instaladas.

> _(Nota técnica: los textos de la interfaz están en el objeto `I18N` dentro de `index.html`.
> Los datos del programa viven en `eventos.json`.)_

---
Imágenes e iconos derivados del PDF del programa oficial. Datos sujetos a posibles cambios.
