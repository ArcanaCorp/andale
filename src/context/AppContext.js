import { createContext, useContext, useEffect, useState } from "react";
import { getServiceNotifications } from "../services/notifications.service";

const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const [ notifications, setNotifications ] = useState(() => {
        try {
            const saved = localStorage.getItem("notifications");
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    const getNotifications = async () => {
        try {
            const data = await getServiceNotifications();
            if (!data.ok) return;
            setNotifications(data.data)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (notifications.length === 0) {
            getNotifications();
        }
    }, [notifications]);

    const contextValue = {
        notifications,
    }

    return (
        <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
    )

}

export const useApp = () => useContext(AppContext);