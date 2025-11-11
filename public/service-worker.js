// sw.js - AndaleYa PWA (imágenes desde andale.ttutis.com)
const CACHE_VERSION = 'v2';
const CORE_CACHE = `andale-core-${CACHE_VERSION}`;
const IMAGE_CACHE = `andale-images-${CACHE_VERSION}`;

const CORE_ASSETS = [
    '/',
    '/index.html',
    '/manifest.json',
    '/favicon.ico',
    '/logo192.png',
    '/logo512.png',
    '/offline.html',      // crea este archivo en public/
    '/offline-image.png'  // crea este archivo en public/ (pequeña imagen de fallback)
];

// Patrón específico para tus endpoints de imagen (ajusta si cambian)
const IMAGE_API_PATTERN = new RegExp('^https://andale\\.ttutis\\.com/api/v1/');

const MAX_IMAGES = 80; // tope de imágenes en cache (ajusta según uso y tamaño)

// ---------- INSTALL ----------
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CORE_CACHE)
            .then(cache => cache.addAll(CORE_ASSETS.map(u => new Request(u, { cache: 'reload' }))))
            .then(() => self.skipWaiting())
    );
});

// ---------- ACTIVATE ----------
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(keys => Promise.all(keys
                .filter(k => k !== CORE_CACHE && k !== IMAGE_CACHE)
                .map(k => caches.delete(k))
            ))
            .then(() => self.clients.claim())
    );
});

// ---------- HELPERS ----------
async function trimCache(cacheName, maxItems) {
    const cache = await caches.open(cacheName);
    const requests = await cache.keys();
    if (requests.length <= maxItems) return;
    const deleteCount = requests.length - maxItems;
    for (let i = 0; i < deleteCount; i++) {
        await cache.delete(requests[i]);
    }
}

// Estrategia para imágenes: stale-while-revalidate
async function handleImageRequest(event) {
    
    const req = event.request;
    const cache = await caches.open(IMAGE_CACHE);

    // Intenta cache primero
    const cached = await cache.match(req);
    if (cached) {
        // refresco en background
        event.waitUntil((async () => {
            try {
                const net = await fetch(req);
                if (net && (net.status === 200 || net.type === 'opaque')) {
                    await cache.put(req, net.clone());
                    await trimCache(IMAGE_CACHE, MAX_IMAGES);
                }
            } catch (e) {
                // no hacemos nada; dejamos la versión cacheada
            }
        })());
        return cached;
    }

    // Si no está en cache, intenta la red
    try {
        const networkResp = await fetch(req);
        if (networkResp && (networkResp.status === 200 || networkResp.type === 'opaque')) {
            cache.put(req, networkResp.clone());
            trimCache(IMAGE_CACHE, MAX_IMAGES);
            return networkResp;
        } else {
            return caches.match('/offline-image.png');
        }
    } catch (err) {
        return caches.match('/offline-image.png');
    }
}

// ---------- FETCH ----------
self.addEventListener('fetch', event => {
    const req = event.request;

    if (req.method !== 'GET') return; // solo GET

    const url = new URL(req.url);

    // 1) SPA navigation: network-first con fallback a offline.html
    if (req.mode === 'navigate') {
        event.respondWith(
            fetch(req)
                .then(res => {
                    // opcional: actualizar cache core
                    const copy = res.clone();
                    caches.open(CORE_CACHE).then(c => c.put(req, copy));
                    return res;
                })
                .catch(() => caches.match('/offline.html'))
        );
        return;
    }

    // 2) Si coincide con el patrón de tu API -> usar estrategia de imágenes
    if (IMAGE_API_PATTERN.test(req.url) || req.destination === 'image') {
        event.respondWith(handleImageRequest(event));
        return;
    }

    // 3) Otros assets estáticos: cache-first (core)
    event.respondWith(
        caches.match(req).then(cached => {
            if (cached) return cached;
            return fetch(req)
                .then(networkResp => {
                    // opcional: cachear ciertos recursos estáticos dinámicamente
                    return networkResp;
                })
                .catch(() => {
                    // si falla y es imagen, fallback; si no, retornar lo que haya en cache (o undefined)
                    if (req.destination === 'image') return caches.match('/offline-image.png');
                        return caches.match('/offline.html');
                });
        })
    );
    
});