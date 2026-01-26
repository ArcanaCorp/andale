import { Outlet } from "react-router-dom";
import Header from "../layout/header";
import { useAnalyticsVist } from "../hooks/analytics/useAnalytics";
import { useEffect } from "react";
import { getOrCreateUserId } from "../utils/user";

export default function RootLayout () {

    useAnalyticsVist();

    useEffect(() => {
        getOrCreateUserId();
    }, [])

    return (

        <>
        
            <Header/>

            <main className="w-full h overflow-y scroll-hidden py-md" style={{"--h": "calc(100dvh - 120px)"}}>
                <Outlet/>
            </main>

        </>

    )

}