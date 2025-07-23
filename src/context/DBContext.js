import { createContext, useContext, useState, useEffect } from "react";

const DBContext = createContext();

export const DBProvider = ({ children }) => {

    const [placesList, setPlacesList] = useState(() => {
        const stored = sessionStorage.getItem("placesList");
        return stored ? JSON.parse(stored) : [];
    });

    const [foodsList, setFoodsList] = useState(() => {
        const stored = sessionStorage.getItem("foodsList");
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        sessionStorage.setItem("placesList", JSON.stringify(placesList));
    }, [placesList]);

    useEffect(() => {
        sessionStorage.setItem("foodsList", JSON.stringify(foodsList));
    }, [foodsList]);

    const savedPlacesList = (lst) => setPlacesList(lst);
    const savedFoodsList = (lst) => setFoodsList(lst);

    const contextValue = {
        placesList,
        savedPlacesList,
        foodsList,
        savedFoodsList
    };

    return (
        <DBContext.Provider value={contextValue}>
            {children}
        </DBContext.Provider>
    );
};

export const useDB = () => useContext(DBContext);