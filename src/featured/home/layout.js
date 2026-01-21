import { Toaster } from "sonner";
import Header from "./layout/header";
import Main from "./layout/main";
import "@/config/maps.config";
import { useEffect } from "react";
import { usePermissions } from "@/context/PermissionsContext";
import { servicePushSubscribe } from "@/services/push.service";
import { useLocation } from "react-router-dom";
import { getOrCreateUserId } from "../../utils/user";

export default function AppLayout () {

    const { notifications } = usePermissions();
    const { requestNotificationPermission } = notifications;

    const location = useLocation();

    useEffect(() => {
        getOrCreateUserId();
    }, [])

    useEffect(() => {
        const params = new URLSearchParams(location.search);

        const utm = {
            source: params.get("utm_source"),
            medium: params.get("utm_medium"),
            campaign: params.get("utm_campaign"),
            content: params.get("utm_content"),
            term: params.get("utm_term")
        };

        console.log("UTM detectado:", utm);
    }, [location.search]);

    useEffect(() => {
        const permissionsNotifications = async () => {
            try {
                await requestNotificationPermission();
                await servicePushSubscribe();
                console.log(`Solicitando...`);
                
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