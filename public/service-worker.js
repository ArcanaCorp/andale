const CACHE_NAME = 'andale-app-cache-v1'
const urlsToCache = [
    '/',
    '/index.html',
    '/logo192.png',
]

// Instala y cachea archivos clave
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
    )
    self.skipWaiting()
})

// Activa y limpia caches viejos si hubiera
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(name => name !== CACHE_NAME)
                .map(name => caches.delete(name))
            )
        })
    )
})

// Intercepta peticiones
self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET') return

    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request).then(response => {
                return response || caches.match('/index.html')
            })
        })
    )
})