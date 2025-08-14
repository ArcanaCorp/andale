// Nombre de caché
const CACHE_NAME = 'andale-app-cache-v3';
const IMAGE_CACHE = 'andale-images-cache-v1';

// Archivos iniciales a precachear
const PRECACHE_URLS = [
    '/',            // index.html implícito
    '/index.html',
    '/logo192.png',
];

// Instalación y precache
self.addEventListener('install', (event) => {
    console.log('[SW] Instalando Service Worker...');
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(PRECACHE_URLS);
        })
    );
    self.skipWaiting();
});

// Activación y limpieza de caches antiguos
self.addEventListener('activate', (event) => {
    console.log('[SW] Activando y limpiando caches antiguos...');
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME && key !== IMAGE_CACHE) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Intercepción de requests
self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;

    const url = new URL(event.request.url);

    // Estrategia para imágenes
    if (event.request.destination === 'image') {
        event.respondWith(
            caches.open(IMAGE_CACHE).then((cache) => {
                return cache.match(event.request).then((cachedResponse) => {
                if (cachedResponse) return cachedResponse;

                return fetch(event.request)
                    .then((networkResponse) => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    })
                    .catch(() => cachedResponse);
                });
            })
        );
        return;
    }

    // Estrategia para otros archivos
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;

        return fetch(event.request)
            .then((networkResponse) => {
                if (
                    networkResponse &&
                    networkResponse.status === 200 &&
                    networkResponse.type === 'basic'
                ) {
                    caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, networkResponse.clone());
                    });
                }
                return networkResponse;
            })
            .catch(() => caches.match('/index.html'));
        })
    );
});
