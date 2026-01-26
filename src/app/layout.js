import { Outlet } from "react-router-dom";
import Header from "../layout/header";
import { useAnalyticsVist } from "../hooks/analytics/useAnalytics";
import { useEffect } from "react";
import { getOrCreateUserId } from "../utils/user";
import { usePermissions } from "@/context/PermissionsContext";
import { servicePushSubscribe } from "@/services/push.service";

export default function RootLayout () {

    const { notifications  } = usePermissions();
    const { requestNotificationPermission } = notifications;

    useAnalyticsVist();

    useEffect(() => {
        getOrCreateUserId();
    }, [])

    useEffect(() => {
        const initPermissions = async () => {
            try {
                await requestNotificationPermission();
                await servicePushSubscribe();
            } catch (error) {
                console.error(error);
            }
        }
        initPermissions();
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