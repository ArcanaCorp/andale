import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const [ online, setOnline ] = useState();

    const contextValue = {
        online
    }

    return (
        <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
    )

}

export const useApp = () => useContext(AppContext);