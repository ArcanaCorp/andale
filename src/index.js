import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { UIProvider } from "./context/UIContext";

import TabLayout from "./app/tabs/layout";
import HomeTab from "./app/tabs";


import PlaceId from "./app/tabs/screens/places/details/PlaceId";

import Search from "./app/tabs/screens/search/search";

import './assets/css/variables.css'
import './assets/css/global.css'
import FoodTab from "./app/tabs/food";
import EmptyTab from "./app/tabs/empty";
import { DBProvider } from "./context/DBContext";

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
        path: '/search',
        element: <Search/>
    }
])

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(

    <>

        <UIProvider>

            <DBProvider>
    
                <RouterProvider router={router} />
            
            </DBProvider>
        
        </UIProvider>

    </>

)