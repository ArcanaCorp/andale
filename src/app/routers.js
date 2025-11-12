import { createBrowserRouter } from "react-router-dom";

import AppLayout from "@/featured/home/layout";
import HomeView from "@/featured/home/views/HomeView";

import PlacesList from "@/featured/places/page";
import PlaceLayout from "@/featured/places/layout";
import PlaceSubPage from "@/featured/places/sub/page";

import AgencyLayout from "@/featured/companies/agency/layout";
import AgencyList from "@/featured/companies/agency/page";
import AgencySubPage from "@/featured/companies/agency/sub/page";

import FoodiesLayout from "@/featured/companies/foodies/layout";
import FoodiesList from "@/featured/companies/foodies/page";
import FoodieSubPage from "@/featured/companies/foodies/sub/page";

import HotelsLayout from "@/featured/companies/hotels/layout";
import HotelList from "@/featured/companies/hotels/page";
import HotelSubPage from "@/featured/companies/hotels/sub/page";

import StoreLayout from "@/featured/companies/store/layout";
import StoreList from "@/featured/companies/store/page";
import StoreSubPage from "@/featured/companies/store/sub/page";

import DriveLayout from "@/featured/drive/layout";
import DrivePage from "@/featured/drive/page";

import LegalLayout from "@/featured/legal/layout";
import TermsPage from "@/featured/legal/page";
import PrivacyPage from "@/featured/legal/privacy";

import ErrorScreen from "@/components/ErrorScreen";

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
                path: '/foodies/:sub',
                element: <FoodieSubPage/>
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
            },
            {
                path: '/hotels/:sub',
                element: <HotelSubPage/>
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
            },
            {
                path: '/store/:sub',
                element: <StoreSubPage/>
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