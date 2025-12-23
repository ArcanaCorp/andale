import { Toaster } from "sonner";
import Header from "./layout/header";
import Tabs from "./layout/tabs";
import Main from "./layout/main";
import "@/config/maps.config";
import { useGlobalNotifications } from "@/hooks/notifications/useGlobalNotifications";
import { useEffect } from "react";
import { usePermissions } from "../../context/PermissionsContext";
import { servicePushSubscribe } from "../../services/push.service";

export default function AppLayout () {

    const { notifications } = usePermissions();
    const { requestNotificationPermission } = notifications;
    
    useGlobalNotifications();

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
    }, [])

    return (

        <>
            <Header/>
            <Main/>
            <Tabs/>
            <Toaster position="top-center" duration={3000} richColors />
        </>

    )

}