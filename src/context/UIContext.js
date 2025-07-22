import { createContext, useContext, useEffect, useState } from "react";

const UIContext = createContext();

export const UIProvider = ({ children }) => {

    const [ online, setOnline ] = useState(navigator.onLine);
    const [ modal, setModal ] = useState({
        view: false,
        type: '',
        id: ''
    })
    
    const handleChangeModal = (type, id) => setModal({ view: !modal.view, type: type, id: id })

    useEffect(() => {
        const handleOnline = () => setOnline(true);
        const handleOffline = () => setOnline(false);
        
        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);
        
        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    const contextValue = {
        online,
        modal,
        handleChangeModal
    }

    return (
        <UIContext.Provider value={contextValue}>{children}</UIContext.Provider>
    )

}

export const useUI = () => useContext(UIContext);