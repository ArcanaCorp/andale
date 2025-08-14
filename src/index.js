import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom";

//IMPORTAR RUTAS
import router from "./app/routers";

//IMPORTAR PROVIDERS
import AppProviders from './app/providers';

//IMPORTAR ESTILOS GLOBALES
import './shared/styles/variables.css'
import './shared/styles/global.css'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <>

        <AppProviders>
        
            <RouterProvider router={router} />
        
        </AppProviders>

    </>
)

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        const url = 'service-worker.js'
        navigator.serviceWorker
            .register(url) // Debe iniciar con "/"
            .then((registration) => {
                console.log('SW registrado con éxito:', registration.scope);
            })
            .catch((error) => {
                console.error('Error registrando SW:', error);
            });
    });
}