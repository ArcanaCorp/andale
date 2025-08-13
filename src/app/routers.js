import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../features/_layout";
import TabLayout from "../features/tabs/TabLayout";
import Search from "../features/search/page";
import Details from "../features/details/page";
import Notifications from "../features/notifications/page";
import Cart from "../features/cart/page";

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
    }
])

export default router;