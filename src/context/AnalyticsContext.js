import { createContext, useContext, useEffect, useState } from "react";
import { getServiceAnalitycs } from "../services/analitycs.service";

const AnalyticsContext = createContext();

export const AnalyticsProvider = ({ children }) => {

    const [ favorites, setFavorites ] = useState([]);

    const getAnalitycsAll = async () => {
        try {
            const data = await getServiceAnalitycs();
            if (!data.ok) return;
                setFavorites(data.favorites)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const initAnalytics = async () => {
            if (favorites.length === 0) {
                getAnalitycsAll();
            }
        }
        initAnalytics();
    }, [])

    const contextValue = {
        favorites,
        getAnalitycsAll
    }

    return (
        <AnalyticsContext.Provider value={contextValue}>{children}</AnalyticsContext.Provider>
    )

}

export const useAnalytics = () => useContext(AnalyticsContext);