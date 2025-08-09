import { createContext, useState } from "react";

const TabContext = createContext();

export const TabProvider = ({ children }) => {

    const [ tab, setTab ] = useState('home')

    const handleChangeTab = (tb) => setTab(tb)

    const contextValue = {
        tab,
        handleChangeTab
    }

    return (
        <TabContext.Provider value={contextValue}>{children}</TabContext.Provider>
    )

}

export default TabContext;