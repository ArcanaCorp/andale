import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../features/_layout";
import TabLayout from "../features/tabs/TabLayout";
import Search from "../features/search/page";
import Details from "../features/details/page";

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
            }
        ]
    }
])

export default router;