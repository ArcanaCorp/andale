import { createBrowserRouter } from "react-router-dom";

import RootLayout from "@/app/layout";
import HomePage from "@/app/home/page";

import EntityLayout from "@/app/entity/layout";
import EntityPage from "@/app/entity/page";

import SearchLayout from "@/app/search/layout";
import SearchPage from "@/app/search/page";

import NotificationsLayout from "@/app/notifications/layout";
import NotificationsPage from "@/app/notifications/page";

import LegalLayout from "@/app/legal/layout";
import TermsPage from "@/app/legal/page";
import PrivacyPage from "@/app/legal/privacy";

import ErrorScreen from "@/components/ErrorScreen";


export const routers = createBrowserRouter([
    {
        element: <RootLayout/>,
        children: [
            {
                index: true,
                element: <HomePage/>
            }
        ],
        errorElement: <ErrorScreen/>
    },
    {
        path: ':slug',
        element: <EntityLayout/>,
        children: [
            {
                index: true,
                element: <EntityPage/>,
            }
        ],
        errorElement: <ErrorScreen/>
    },
    {
        path: '/search',
        element: <SearchLayout/>,
        children: [
            {
                index: true,
                element: <SearchPage/>
            }
        ],
        errorElement: <ErrorScreen/>
    },
    {
        path: '/notifications',
        element: <NotificationsLayout/>,
        children: [
            {
                index: true,
                element: <NotificationsPage/>
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