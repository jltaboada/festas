/* Service Worker · Festas de Ourense 2026 (proxecto persoal jltaboada) */

/* === VERSIÓN / MARCA DE TEMPO ===
   Sube este valor cada vez que cambies o contido (ou usa a data).
   Ao cambiar, o navegador detecta un sw.js distinto, instala a nova
   versión e a app recárgase soa amosando o contido máis actualizado. */
const VERSION = '2026-06-09-6';
const CACHE = 'festas-ourense-' + VERSION;

const ASSETS = [
  './',
  './index.html',
  './eventos.json',
  './manifest.webmanifest',
  './img/cartel.jpg',
  './img/og.jpg',
  './img/icon.png',
  './img/icon-192.png',
  './img/icon-512.png',
  './img/icon-maskable-192.png',
  './img/icon-maskable-512.png',
  './img/apple-touch-icon.png',
  './img/fireworks.png',
  './img/fireworks2.png'
];

// Instalación: precache e activación inmediata da nova versión
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

// Activación: borrar caches antigas e tomar control de inmediato
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', (e) => {
  if (e.data === 'skipWaiting') self.skipWaiting();
});

// Fetch
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // mapas, etc. -> rede directa

  // HTML / navegación: REDE PRIMEIRO (sempre o máis novo), fallback á caché offline
  const isHTML = req.mode === 'navigate' ||
                 (req.headers.get('accept') || '').includes('text/html');
  if (isHTML) {
    e.respondWith(
      fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put('./index.html', copy));
        return res;
      }).catch(() => caches.match('./index.html').then((r) => r || caches.match('./')))
    );
    return;
  }

  // eventos.json: REDE PRIMEIRO (para que os cambios de eventos cheguen axiña),
  // con fallback á caché cando non hai conexión
  if (url.pathname.endsWith('/eventos.json') || url.pathname.endsWith('eventos.json')) {
    e.respondWith(
      fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put('./eventos.json', copy));
        return res;
      }).catch(() => caches.match('./eventos.json'))
    );
    return;
  }

  // Resto de assets propios: caché primeiro + actualización en segundo plano
  e.respondWith(
    caches.match(req).then((cached) => {
      const network = fetch(req).then((res) => {
        if (res && res.status === 200) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
        }
        return res;
      }).catch(() => cached);
      return cached || network;
    })
  );
});
