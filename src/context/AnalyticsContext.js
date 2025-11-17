import { createContext, useState } from "react";

const AnalyticsContext = createContext();

export const AnalyticsProvider = ({ children }) => {

    const [ views, setViews ] = useState(0)

    const contextValue = {
        views,
        setViews
    }

    return (
        <AnalyticsContext.Provider value={contextValue}>{children}</AnalyticsContext.Provider>
    )

}