import { Toaster } from "sonner";
import Header from "./layout/header";
import Main from "./layout/main";
import "@/config/maps.config";
import { useEffect } from "react";
import { usePermissions } from "@/context/PermissionsContext";
import { servicePushSubscribe } from "@/services/push.service";
import { getOrCreateUserId } from "../../utils/user";
import { useAnalyticsVist } from "../../hooks/analytics/useAnalytics";

export default function AppLayout () {

    const { notifications } = usePermissions();
    const { requestNotificationPermission } = notifications;

    useAnalyticsVist();

    useEffect(() => {
        getOrCreateUserId();
    }, [])

    useEffect(() => {
        const permissionsNotifications = async () => {
            try {
                await requestNotificationPermission();
                await servicePushSubscribe();
            } catch (error) {
                console.error(error);
            }
        }
        permissionsNotifications();
    }, [requestNotificationPermission])

    return (

        <>
            <Header/>
            <Main/>
            <Toaster position="top-center" duration={3000} richColors />
        </>

    )

}