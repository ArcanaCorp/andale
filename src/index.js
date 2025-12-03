import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import Providers from "./app/providers";
import router from "./app/routers";

import '@/shared/css/variables.css'
import '@/shared/css/global.css'
import '@/shared/css/system.css'

createRoot(document.getElementById('root')).render(
    <>
        <Providers>
            <RouterProvider router={router} />
        </Providers>

    </>
)

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        const url = '/service-worker.js'
        navigator.serviceWorker
            .register(url)
            .then((registration) => {
                console.log(`SW registrado con éxito: ${registration.scope}`);
            })
            .catch((error) => {
                console.error(`Error al registrar SW: ${error}`);
            })
    })
}