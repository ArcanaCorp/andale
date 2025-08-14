export function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker
                .register('/service-worker.js') // Debe iniciar con "/"
                .then((registration) => {
                    console.log('SW registrado con éxito:', registration.scope);
                })
                .catch((error) => {
                    console.error('Error registrando SW:', error);
                });
        });
    }
}