import { createContext, useContext, useState } from "react";

const UIContext = createContext();

export const UIProvider = ({ children }) => {

    const [ tab, setTab ] = useState('places');

    const handleChangeTab = (t) => setTab(t);

    const contextValue = {
        tab,
        handleChangeTab
    }

    return (
        <UIContext.Provider value={contextValue}>{children}</UIContext.Provider>
    )

}

export const useUI = () => useContext(UIContext);