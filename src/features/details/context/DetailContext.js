import { createContext, useContext, useState } from "react";

const DetailContext = createContext();

export const DetailProvider = ({ children }) => {

    const [ modalD, setModalD ] = useState({
        view: false,
        data: null
    });

    const toogleModalDetail = (product) => {
        setModalD((prev) => ({
            ...prev,
            view: !modalD.view,
            data: product
        }));
    }

    const contextValue = {
        modalD,
        toogleModalDetail
    }

    return (
        <DetailContext.Provider value={contextValue}>{children}</DetailContext.Provider>
    )

}

export const useDetail = () => useContext(DetailContext);