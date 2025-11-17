import { createContext, useContext, useEffect, useState } from "react";
import { reverseGeocodeCached } from "@/libs/geolocation";

const PermissionsContext = createContext();

export const PermissionsProvider = ({ children }) => {

    // --- Estados ---
    const [location, setLocation] = useState(null);
    const [locationAddress, setLocationAddress] = useState(null);
    const [locationRegion, setLocationRegion] = useState({
        district: '',
        province: '',
        region: '',
        country: ''
    });
    const [locationPermission, setLocationPermission] = useState(null);
    const [loadingLocation, setLoadingLocation] = useState(false);

    const [notificationPermission, setNotificationPermission] = useState(null);
    const [cameraPermission, setCameraPermission] = useState(null);

    // -------------------------------------------------------------
    // 🧲 1. HIDRATACIÓN desde localStorage antes de pedir permisos
    // -------------------------------------------------------------
    const hydrateLocationFromCache = () => {
        try {
            const last = JSON.parse(localStorage.getItem("revgeo:lastCoord"));

            if (!last?.address) return; // no hay cache válido

            setLocation({
                lat: last.lat,
                lng: last.lng
            });

            setLocationAddress(last.address.street || null);

            setLocationRegion({
                district: last.address.district || '',
                province: last.address.province || '',
                region: last.address.department || '',
                country: last.address.country || ''
            });

        } catch (err) {
            console.error("Error al hidratar ubicación desde cache:", err);
        }
    };

    // -------------------------------------------------------------
    // 🚀 2. Solicitar permiso + reverse geocode
    // -------------------------------------------------------------
    const requestLocationPermission = async () => {
        if (!navigator.geolocation) {
            setLocationPermission("unsupported");
            return;
        }

        try {
            setLoadingLocation(true);

            // Estado previo del permiso
            if (navigator.permissions) {
                const status = await navigator.permissions.query({ name: "geolocation" });
                setLocationPermission(status.state);
            }

            navigator.geolocation.getCurrentPosition(
                async (pos) => {
                    setLocationPermission("granted");

                    const coords = {
                        lat: pos.coords.latitude,
                        lng: pos.coords.longitude
                    };
                    setLocation(coords);

                    // Obtener dirección CON cache
                    const address = await reverseGeocodeCached(coords.lat, coords.lng);

                    if (address) {
                        setLocationAddress(address.street);
                        setLocationRegion({
                            district: address.district || "",
                            province: address.province || "",
                            region: address.department || "",
                            country: address.country || "",
                        });
                    }
                },
                (err) => {
                    if (err.code === err.PERMISSION_DENIED) {
                        setLocationPermission("denied");
                    }
                }
            );
        } catch (e) {
            console.error("Error al solicitar ubicación:", e);
        } finally {
            setLoadingLocation(false);
        }
    };

    // -------------------------------------------------------------
    // 📌 3. Notificaciones
    // -------------------------------------------------------------
    const requestNotificationPermission = async () => {
        if (!("Notification" in window)) {
            setNotificationPermission("unsupported");
            return;
        }
        const result = await Notification.requestPermission();
        setNotificationPermission(result);
    };

    // -------------------------------------------------------------
    // 🎥 4. Cámara
    // -------------------------------------------------------------
    const requestCameraPermission = async () => {
        try {
            await navigator.mediaDevices.getUserMedia({ video: true });
            setCameraPermission("granted");
        } catch {
            setCameraPermission("denied");
        }
    };

    // -------------------------------------------------------------
    // 🛠 5. Inicialización del contexto
    // -------------------------------------------------------------
    useEffect(() => {

        // ① Primero hidratar datos persistidos → UI arranca lista
        hydrateLocationFromCache();

        // ② Luego pedir permisos y refrescar datos
        requestNotificationPermission();
        requestLocationPermission();

    }, []);

    // -------------------------------------------------------------
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
        requestCameraPermission,
    };

    return (
        <PermissionsContext.Provider value={contextValue}>
            {children}
        </PermissionsContext.Provider>
    );
};

export const usePermissions = () => useContext(PermissionsContext);