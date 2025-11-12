import { createContext } from "react";

const AnalyticsContext = createContext();

export const AnalyticsProvider = ({ children }) => {

    return (
        <AnalyticsContext.Provider>{children}</AnalyticsContext.Provider>
    )

}