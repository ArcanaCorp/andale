import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

import SplashScreen from "./pages/SplashScreen";

export default function RootLayout () {

    const [ showSplash, setShowSplash ] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSplash(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    if (showSplash) return <SplashScreen/>;

    return (

        <>
        
            <Outlet/>

            <Toaster position="top-center" richColors duration={1000} />

        </>

    )

}