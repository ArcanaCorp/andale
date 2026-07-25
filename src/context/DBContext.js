"use client";

import { useBussines } from "@/hooks/useBussines";
import { usePlaces } from "@/hooks/usePlaces";
import { createContext, useContext, useEffect, useMemo } from "react";

const DBContext = createContext(null);

export const DBProvider = ({ children }) => {
    const places = usePlaces();
    const bussines = useBussines();

    useEffect(() => {
        bussines.getList();
    }, [bussines.getList]);

    const contextValue = useMemo(
        () => ({
            places: {
                feed: places.feed,
                details: places.details,
                filters: places.filters,

                loadMore: places.loadMore,
                updateFilters: places.updateFilters,
                clearFilters: places.clearFilters,
                getBySlug: places.getPlaceBySlug,
            },

            business: {
                list: bussines.list,
                load: bussines.load,
                error: bussines.error || "",
                reload: bussines.getList,
            },
        }),
        [
            places.feed,
            places.details,
            places.filters,
            places.loadMore,
            places.updateFilters,
            places.clearFilters,
            places.getPlaceBySlug,

            bussines.list,
            bussines.load,
            bussines.error,
            bussines.getList,
        ]
    );

    return (
        <DBContext.Provider value={contextValue}>{children}</DBContext.Provider>
    );
};

export const useDB = () => {
    const context = useContext(DBContext);
    if (!context) throw new Error("useDB debe utilizarse dentro de un DBProvider");
    return context;
};