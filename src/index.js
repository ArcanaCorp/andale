import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { UIProvider } from "./context/UIContext";
import { DBProvider } from "./context/DBContext";
import { CartProvider } from "./context/CartContext";

import TabLayout from "./app/tabs/layout";
import HomeTab from "./app/tabs";
import FoodTab from "./app/tabs/food";
import EmptyTab from "./app/tabs/empty";
import Restaurant from "./app/tabs/screens/foods/Restaurant";
import OnlineGuard from "./guards/OnlineGuard";

import PlaceId from "./app/tabs/screens/places/details/PlaceId";

import Search from "./app/tabs/screens/search/search";
import Cart from "./app/tabs/screens/cart/Cart";

import './assets/css/variables.css'
import './assets/css/global.css'
import { BussinesProfileProvider } from "./context/BussinesProfileContext";

const router = createBrowserRouter([
    {
        path: '/',
        element: <OnlineGuard><TabLayout/></OnlineGuard>,
        children: [
            {
                index: true,
                element: <HomeTab/>
            },
            {
                path: '/restaurants',
                element: <FoodTab/>
            },
            {
                path: '/hotels',
                element: <EmptyTab/>
            },
            {
                path: '/transport',
                element: <EmptyTab/>
            }
        ]
    },
    {
        path: '/p/:slug',
        children: [
            {
                index: true,
                element: <PlaceId/>
            }
        ]
    },
    {
        path: '/r/:slug',
        children: [
            {
                index: true,
                element: <Restaurant/>
            }
        ]
    },
    {
        path: '/search',
        element: <Search/>
    },
    {
        path: '/cart',
        element: <Cart/>
    }
])

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(

    <>

        <UIProvider>

            <DBProvider>

                <BussinesProfileProvider>

                    <CartProvider>
    
                        <RouterProvider router={router} />
                    
                    </CartProvider>
                
                </BussinesProfileProvider>
            
            </DBProvider>
        
        </UIProvider>

    </>

)

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('ServiceWorker registrado con éxito:', registration)
            })
            .catch(error => {
                console.log('Error registrando ServiceWorker:', error)
            })
    })
}