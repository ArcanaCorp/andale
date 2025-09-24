import { useEffect, useState } from "react"
import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import Cookies from "js-cookie";
import moment from "moment";

import SplashScreen from "./pages/SplashScreen";
import { useCart } from "./cart/context/CartContext";
import BannerShop from "./components/BannerShop";

import "moment/locale/es.js";
moment.locale('es')

export default function RootLayout () {

    const location = useLocation();
    const { cart } = useCart();
    const [ showSplash, setShowSplash ] = useState(true);

    useEffect(() => {

        const existingCookie = Cookies.get("guest_id");

        if (!existingCookie) {
            // Generar código de 13 dígitos en base al timestamp
            const code = Date.now().toString().slice(-13);
            Cookies.set("guest_id", code, { expires: 365 }); // 1 año
        }

        const timer = setTimeout(() => {
            setShowSplash(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    if (showSplash) return <SplashScreen/>;

    return (

        <>
        
            <Outlet/>

            {cart?.products.length > 0 && location.pathname !== '/' && location.pathname !== '/cart' && location.pathname !== '/me'  && ( <BannerShop/> )}

            <Toaster position="top-center" richColors duration={1000} />

        </>

    )

}