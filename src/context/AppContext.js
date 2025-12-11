import { createContext, useContext, useEffect, useState } from "react";

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

    useEffect(() => {
        localStorage.setItem("notifications", JSON.stringify(notifications));
    }, [notifications]);

    const addNotification = (notif) => setNotifications(prev => [notif, ...prev]);

    const contextValue = {
        notifications,
        addNotification
    }

    return (
        <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
    )

}

export const useApp = () => useContext(AppContext);