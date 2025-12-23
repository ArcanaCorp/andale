import { createContext, useContext } from "react";

import { useLocationPermissions } from "@/hooks/permissions/useLocationPermissions";
import { useNotificationPermissions } from "@/hooks/permissions/useNotificationPermissions";
import { useCameraPermissions } from "@/hooks/permissions/useCameraPermissions";

const PermissionsContext = createContext();

export const PermissionsProvider = ({ children }) => {

    // --- Estados ---
    const location = useLocationPermissions();
    const notifications = useNotificationPermissions();
    const camera = useCameraPermissions();

    // -------------------------------------------------------------
    const contextValue = {
        ...location,
        notifications,
        ...camera
    };

    return (
        <PermissionsContext.Provider value={contextValue}>
            {children}
        </PermissionsContext.Provider>
    );
};

export const usePermissions = () => useContext(PermissionsContext);