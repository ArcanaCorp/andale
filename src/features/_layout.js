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
            
            if (!Cookies.get("tracking_info")) {
                localStorage.removeItem("tracking_info");
            }
            
            const existingTracking = localStorage.getItem("tracking_info");
            if (!existingTracking) {
                const user = Cookies.get("guest_id");
                const source = searchParams.get("utm_source");
                const medium = searchParams.get("utm_medium");
                const campaign = searchParams.get("utm_campaign");
                const partnerId = searchParams.get("utm_partner") || "none";

                // --- 📱 Detección de dispositivo ---
                const userAgent = navigator.userAgent;
                const isTablet = /iPad|Tablet/i.test(userAgent);
                const isMobile = /iPhone|Android|iPod/i.test(userAgent);
                const device = isTablet ? "tablet" : isMobile ? "mobile" : "desktop";

                // --- 🌐 Detección de navegador ---
                const browser = (() => {
                    if (userAgent.includes("Chrome") && !userAgent.includes("Edge")) return "Chrome";
                    if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) return "Safari";
                    if (userAgent.includes("Firefox")) return "Firefox";
                    if (userAgent.includes("Edg")) return "Edge";
                    if (userAgent.includes("Opera") || userAgent.includes("OPR")) return "Opera";
                    return "Desconocido";
                })();

                // --- 💻 Detección de sistema operativo ---
                const os = (() => {
                    if (/Windows/i.test(userAgent)) return "Windows";
                    if (/Mac OS/i.test(userAgent)) return "MacOS";
                    if (/Android/i.test(userAgent)) return "Android";
                    if (/iOS|iPhone|iPad/i.test(userAgent)) return "iOS";
                    if (/Linux/i.test(userAgent)) return "Linux";
                    return "Desconocido";
                })();

                // --- 🌍 Datos adicionales ---
                const metadata = {
                    browser,
                    os,
                    language: navigator.language || "unknown",
                    screen: `${window.screen.width}x${window.screen.height}`,
                    userAgent,
                    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                    platform: navigator.platform || "unknown",
                    referrer: document.referrer || "directo",
                };

                const trackingData = {
                    user,
                    source: source || "directo",
                    medium: medium || "none",
                    campaign: campaign || "none",
                    partnerId,
                    landing: window.location.href,
                    device,
                    metadata,
                    hour: moment().format('HH:mm:ss'),
                    date: moment().format("YYYY-MM-DD"),
                };

                localStorage.setItem("tracking_info", JSON.stringify(trackingData));
                Cookies.set("tracking_info", JSON.stringify(trackingData), { expires: 1 });

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