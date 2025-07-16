import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { UIProvider } from "./context/UIContext";

import TabLayout from "./app/tabs/layout";
import HomeTab from "./app/tabs";


import PlaceId from "./app/tabs/screens/places/details/PlaceId";

import './assets/css/variables.css'
import './assets/css/global.css'

const router = createBrowserRouter([
    {
        path: '/',
        element: <TabLayout/>,
        children: [
            {
                index: true,
                element: <HomeTab/>
            },
            {
                path: '/restaurants'
            },
            {
                path: '/hotels'
            },
            {
                path: '/transport'
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
    }
])

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(

    <>

        <UIProvider>
    
            <RouterProvider router={router} />
        
        </UIProvider>

    </>

)