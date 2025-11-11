import { createContext, useContext, useEffect, useState } from "react";
import { reverseGeocodeCached } from "@/libs/geolocation";

const PermissionsContext = createContext();

export const PermissionsProvider = ({ children }) => {
    
    const [ location, setLocation] = useState(null);
    const [ locationAddress, setLocationAddress] = useState(null)
    const [ locationRegion, setLocationRegion ] = useState({
        district: '',
        province: '',
        region: '',
        country: ''
    })
    const [ locationPermission, setLocationPermission] = useState(null);     // 'granted' | 'denied' | 'prompt'
    const [ loadingLocation, setLoadingLocation ] = useState(false);
    
    const [notificationPermission, setNotificationPermission] = useState(null);
    
    const [cameraPermission, setCameraPermission] = useState(null);

    // Solicita permiso de ubicación
    const requestLocationPermission = async () => {
        if (!navigator.geolocation) {
            setLocationPermission('unsupported');
            return;
        }

        try {
            setLoadingLocation(true);
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    setLocationPermission('granted');
                    const coords = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    setLocation(coords);

                    const address = await reverseGeocodeCached(coords.lat, coords.lng);
                    setLocationRegion({
                        district: address?.district || '',
                        province: address?.province || '',
                        region: address?.department || '',
                        country: address?.country || ''
                    })
                    setLocationAddress(address?.street);
                },
                () => setLocationPermission('denied')
            );
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingLocation(false);
        }
    };

    // Solicita permiso de notificaciones
    const requestNotificationPermission = async () => {
        if (!("Notification" in window)) {
            setNotificationPermission('unsupported');
            return;
        }

        const result = await Notification.requestPermission();
        setNotificationPermission(result); // granted | denied | default
    };

    // Solicita permiso de cámara
    const requestCameraPermission = async () => {
        try {
            await navigator.mediaDevices.getUserMedia({ video: true });
            setCameraPermission('granted');
        } catch (error) {
            setCameraPermission('denied');
        }
    };

    // Puedes pedir los permisos automáticamente o dejarlo a componentes específicos
    useEffect(() => {
        requestNotificationPermission();
        requestLocationPermission();
    }, []);

    const contextValue = {
        location,
        locationAddress,
        locationRegion,
        locationPermission,
        loadingLocation,
        notificationPermission,
        cameraPermission,
        requestLocationPermission,
        requestNotificationPermission,
        requestCameraPermission
    }

    return (
        <PermissionsContext.Provider value={contextValue}>{children}</PermissionsContext.Provider>
    );
};

export const usePermissions = () => useContext(PermissionsContext);