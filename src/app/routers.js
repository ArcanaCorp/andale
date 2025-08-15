import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../features/_layout";
import TabLayout from "../features/tabs/TabLayout";
import Search from "../features/search/page";
import Details from "../features/details/page";
import Notifications from "../features/notifications/page";
import Cart from "../features/cart/page";
import AuthLayout from "../features/auth/page";
import LoginPage from "../features/auth/login/page";
import VerifyPage from "../features/auth/verify/page";
import CompletePage from "../features/auth/complete/page";

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout/>,
        children: [
            {
                index: true,
                element: <TabLayout/>
            },
            {
                path: '/:slug',
                element: <Details/>
            },
            {
                path: '/search',
                element: <Search/>
            },
            {
                path: '/notify',
                element: <Notifications/>
            },
            {
                path: '/cart',
                element: <Cart/>
            }
        ]
    },
    {
        path: '/login',
        element: <AuthLayout/>,
        children: [
            {
                index: true,
                element: <LoginPage/>
            },
            {
                path: '/login/verify',
                element: <VerifyPage/>
            },
            {
                path: '/login/complete',
                element: <CompletePage/>
            }
        ]
    }
])

export default router;