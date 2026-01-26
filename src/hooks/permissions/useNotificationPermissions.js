import { useState } from "react";

export const useNotificationPermissions = () => {
    
    const [notificationPermission, setNotificationPermission] = useState(null);

    const requestNotificationPermission = async () => {
        if (!("Notification" in window)) {
            setNotificationPermission("unsupported");
            return;
        }
        const result = await Notification.requestPermission();
        setNotificationPermission(result);
    };

    return {
        notificationPermission,
        requestNotificationPermission
    };
};