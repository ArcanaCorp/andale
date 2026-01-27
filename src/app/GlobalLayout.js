import { Outlet } from "react-router-dom";
import { useGlobalTracking } from "../hooks/analytics/useGlobalTracking"
import { usePermissions } from "../context/PermissionsContext";
import { useAnalyticsVist } from "../hooks/analytics/useAnalytics";
import { getOrCreateUserId } from "../utils/user";
import { servicePushSubscribe } from "@/services/push.service";
import { useEffect } from "react";

export default function GlobalLayout () {

    const { notifications  } = usePermissions();
    const { requestNotificationPermission } = notifications;

    useAnalyticsVist();

    useGlobalTracking();
    
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
    }, [requestNotificationPermission])

    return <Outlet/>
}