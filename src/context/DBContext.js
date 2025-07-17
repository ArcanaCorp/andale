import { createContext, useContext, useState } from "react";

const DBContext = createContext();

export const DBProvider = ({ children }) => {

    const [ sections, setSections ] = useState([]);

    const savedSections = (info) => setSections(info)

    const contextValue = {
        sections,
        savedSections
    }

    return (
        <DBContext.Provider value={contextValue}>{children}</DBContext.Provider>
    )

}

export const useDB = () => useContext(DBContext)