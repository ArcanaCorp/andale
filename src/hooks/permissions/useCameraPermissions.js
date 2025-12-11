import { useState } from "react";

export const useCameraPermissions = () => {

    const [cameraPermission, setCameraPermission] = useState(null);

    const requestCameraPermission = async () => {
        try {
            await navigator.mediaDevices.getUserMedia({ video: true });
            setCameraPermission("granted");
        } catch {
            setCameraPermission("denied");
        }
    };

    return {
        cameraPermission,
        requestCameraPermission
    };
};