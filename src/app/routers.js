import { createBrowserRouter } from "react-router-dom";

import AppLayout from "@/featured/home/layout";
import HomeView from "@/featured/home/views/HomeView";

import LegalLayout from "@/featured/legal/layout";
import TermsPage from "@/featured/legal/page";
import PrivacyPage from "@/featured/legal/privacy";

import FoodiesLayout from "@/featured/foodies/layout";
import FoodiesList from "@/featured/foodies/page";

import PlacesList from "@/featured/places/page";
import PlaceLayout from "@/featured/places/layout";
import PlaceSubPage from "@/featured/places/sub/page";

import ErrorScreen from "@/components/ErrorScreen";
import AgencyLayout from "@/featured/agency/layout";
import AgencyList from "@/featured/agency/page";
import AgencySubPage from "@/featured/agency/sub/page";

import HotelsLayout from "@/featured/hotels/layout";
import HotelList from "@/featured/hotels/page";

import StoreLayout from "@/featured/store/layout";
import StoreList from "@/featured/store/page";

import DriveLayout from "@/featured/drive/layout";
import DrivePage from "@/featured/drive/page";

const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout/>,
        children: [
            {
                index: true,
                element: <HomeView/>
            },
            {
                path: '/favorites'
            },
            {
                path: '/promotions'
            },
            {
                path: '/orders'
            },
            {
                path: '/profile'
            }
        ],
        errorElement: <ErrorScreen/>
    },
    {
        path: '/places',
        element: <PlaceLayout/>,
        children: [
            {
                index: true,
                element: <PlacesList/>
            },
            {
                path: '/places/:sub',
                element: <PlaceSubPage/>
            }
        ],
        errorElement: <ErrorScreen/>
    },
    {
        path: '/agency',
        element: <AgencyLayout/>,
        children: [
            {
                index: true,
                element: <AgencyList/>
            },
            {
                path: '/agency/:sub',
                element: <AgencySubPage/>
            }
        ],
        errorElement: <ErrorScreen/>
    },
    {
        path: '/foodies',
        element: <FoodiesLayout/>,
        children: [
            {
                index: true,
                element: <FoodiesList/>,
            },
            {
                path: '/foodies/:sub'
            }
        ],
        errorElement: <ErrorScreen/>
    },
    {
        path: '/hotels',
        element: <HotelsLayout/>,
        children: [
            {
                index: true,
                element: <HotelList/>
            }
        ],
        errorElement: <ErrorScreen/>
    },
    {
        path: '/store',
        element: <StoreLayout/>,
        children: [
            {
                index: true,
                element: <StoreList/>
            }
        ],
        errorElement: <ErrorScreen/>
    },
    {
        path: '/drive',
        element: <DriveLayout/>,
        children: [
            {
                index: true,
                element: <DrivePage/>
            }
        ],
        errorElement: <ErrorScreen/>
    },
    {
        path: '/legal',
        element: <LegalLayout/>,
        children: [
            {
                index: true,
                element: <TermsPage/>
            },
            {
                path: '/legal/privacy-policy',
                element: <PrivacyPage/>
            }
        ],
        errorElement: <ErrorScreen/>
    }
])

export default router;