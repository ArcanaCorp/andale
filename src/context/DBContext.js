'use client';

import { usePlaces } from "@/hooks/usePlaces";
import { createContext, useContext } from "react";

const DBContext = createContext();

export const DBProvider = ({ children }) => {

    const places = usePlaces();

    const refreshAll = async () => {
        await Promise.all([
            places.fetchPlaces(),
        ])
    }

    const contextValue = {
        places: places.places,
        nearbyPlaces: places.nearbyPlaces,
        fetchNearby: places.fetchNearby,
        refresh: refreshAll
    }

    return (
        <DBContext.Provider value={contextValue}>{children}</DBContext.Provider>
    )

}

export const useDB = () => useContext(DBContext);