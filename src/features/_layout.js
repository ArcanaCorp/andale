import { useEffect, useState } from "react"
import { Outlet, useLocation, useSearchParams } from "react-router-dom";
import { Toaster } from "sonner";
import Cookies from "js-cookie";
import moment from "moment";

import SplashScreen from "./pages/SplashScreen";
import { useCart } from "./cart/context/CartContext";
import BannerShop from "./components/BannerShop";
import { addVisitUser } from "../services/analitycs.service";

import "moment/locale/es.js";
moment.locale('es')

export default function RootLayout () {

    const location = useLocation();
    const { cart } = useCart();
    const [searchParams] = useSearchParams();
    const [ showSplash, setShowSplash ] = useState(true);

    useEffect(() => {
        // --- 1️⃣ Guest ID ---
        const existingCookie = Cookies.get("guest_id");
        if (!existingCookie) {
            const code = Date.now().toString().slice(-13);
            Cookies.set("guest_id", code, { expires: 365 }); // 1 año
        }

        // --- 2️⃣ Tracking ---
        const sendTracking = async () => {
            const existingTracking = localStorage.getItem("tracking_info");
            if (!existingTracking) {
                const user = Cookies.get("guest_id");
                const source = searchParams.get("utm_source");
                const medium = searchParams.get("utm_medium");
                const campaign = searchParams.get("utm_campaign");
                const partnerId = searchParams.get("utm_partner") || "none";

                const device = /iPad|Tablet/i.test(navigator.userAgent)
                    ? "tablet"
                    : /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
                    ? "mobile"
                    : "desktop";

                const trackingData = {
                    user,
                    source: source || "directo",
                    medium: medium || "none",
                    campaign: campaign || "none",
                    partnerId,
                    landing: window.location.href,
                    device,
                    hour: moment().format('HH:mm:ss'),
                    date: moment().format("YYYY-MM-DD"),
                };

                localStorage.setItem("tracking_info", JSON.stringify(trackingData));
                Cookies.set("tracking_info", JSON.stringify(trackingData), { expires: 30 });

                try {
                    await addVisitUser(trackingData); // <-- Llamada al backend
                    console.log("Tracking enviado al servidor:", trackingData);
                } catch (error) {
                    console.error("Error enviando tracking:", error);
                }
            }
        };

        sendTracking(); // Llamamos la función async

        // --- 3️⃣ Splash screen ---
        const timer = setTimeout(() => setShowSplash(false), 3000);
        return () => clearTimeout(timer);

    }, [searchParams]); // eslint-disable-next-line

    if (showSplash) return <SplashScreen/>;

    return (

        <>
        
            <Outlet/>

            {cart?.products.length > 0 && location.pathname !== '/' && location.pathname !== '/cart' && location.pathname !== '/me'  && ( <BannerShop/> )}

            <Toaster position="top-center" richColors duration={1000} />

        </>

    )

}