/* Service Worker · Festas de Ourense 2026 (proxecto persoal jltaboada) */
const CACHE = 'festas-ourense-2026-v1';
const ASSETS = [
  './',
  './index.html',
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

// Instalación: precache do contido estático
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

// Activación: limpar caches antigas
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch: stale-while-revalidate para navegacións e assets propios
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  // Só xestionamos peticións do mesmo orixe; o resto (mapas, etc.) van á rede
  if (url.origin !== self.location.origin) return;

  // Navegación: rede primeiro, fallback á caché (offline)
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put('./index.html', copy));
        return res;
      }).catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Resto de assets: caché primeiro + actualización en segundo plano
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
