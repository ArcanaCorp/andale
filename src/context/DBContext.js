import { createContext, useContext, useState } from "react";

const DBContext = createContext();

export const DBProvider = ({ children }) => {

    const [ placesList, setPlacesList ] = useState([]);
    const [ foodsList, setFoodsList ] = useState([]);

    const savedPlacesList = (lst) => setPlacesList(lst)
    const savedFoodsList = (lst) => setFoodsList(lst)

    const contextValue = {
        placesList, savedPlacesList,
        foodsList, savedFoodsList
    }

    return (
        <DBContext.Provider value={contextValue}>{children}</DBContext.Provider>
    )

}

export const useDB = () => useContext(DBContext)