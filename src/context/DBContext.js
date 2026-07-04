'use client';

import { useBussines } from "@/hooks/useBussines";
import { usePlaces } from "@/hooks/usePlaces";
import { createContext, useContext, useEffect } from "react";

const DBContext = createContext();

export const DBProvider = ({ children }) => {

    const places = usePlaces();
    const bussines = useBussines();

    useEffect(() => {
        (async () => {
            await Promise.all([
                places.getListFeed(),
                bussines.getList(),
            ])
        })();
    }, []);

    const contextValue = {
        placesFeed: places.feed,
        placesDetails: places.details,
        getPlaceDetail: places.getPlaceBySlug,
        bussines: bussines.list,
        loadBussines: bussines.load,
    }

    return (
        <DBContext.Provider value={contextValue}>{children}</DBContext.Provider>
    )

}

export const useDB = () => useContext(DBContext);