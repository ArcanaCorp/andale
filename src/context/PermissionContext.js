'use client';

import { useLocation } from "@/hooks/useLocation";
import { createContext, useContext } from "react";

const PermissionContext = createContext();

export const PermissionProvider = ({ children }) => {

    const location = useLocation();

    const contextValue = {
        location: location.location,
        address: location.address,
        region: location.region,
        locationPermission: location.locationPermission,
        loadingLocation: location.loadingLocation,
        requestLocation: location.requestLocationPermission
    }

    return (
        <PermissionContext.Provider value={contextValue}>{children}</PermissionContext.Provider>
    )

}

export const usePermission = () => useContext(PermissionContext);