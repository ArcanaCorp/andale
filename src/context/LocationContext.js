'use client';

import { createContext, useContext, useEffect, useRef, useState } from "react";

const LOCATION_STORAGE_KEY = "location-andaleya";

const MIN_DISTANCE_METERS = 10;

const INITIAL_LOCATION = {
    latitude: null,
    longitude: null,
    accuracy: null,
    updatedAt: null
};

const LocationContext = createContext(null);


/**
 * Calcula la distancia entre dos coordenadas
 * usando la fórmula de Haversine.
 *
 * @returns distancia en metros
 */
const calculateDistance = (locationA, locationB) => {

    if (!locationA || !locationB) {
        return Infinity;
    }

    const EARTH_RADIUS = 6371000;

    const toRadians = (degrees) => (
        degrees * Math.PI / 180
    );

    const lat1 = toRadians(locationA.latitude);
    const lat2 = toRadians(locationB.latitude);

    const deltaLat = toRadians(
        locationB.latitude - locationA.latitude
    );

    const deltaLng = toRadians(
        locationB.longitude - locationA.longitude
    );

    const a =
        Math.sin(deltaLat / 2) ** 2 +
        Math.cos(lat1) *
        Math.cos(lat2) *
        Math.sin(deltaLng / 2) ** 2;

    const c = 2 * Math.atan2(
        Math.sqrt(a),
        Math.sqrt(1 - a)
    );

    return EARTH_RADIUS * c;
};


/**
 * Convierte GeolocationPosition
 * a nuestro formato.
 */
const normalizePosition = (position) => ({
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
    accuracy: position.coords.accuracy,
    updatedAt: position.timestamp
});


export const LocationProvider = ({ children }) => {

    const [location, setLocation] = useState(INITIAL_LOCATION);

    const [status, setStatus] = useState("loading");

    const [error, setError] = useState(null);

    const [isLoaded, setIsLoaded] = useState(false);

    /**
     * Conservamos la última ubicación guardada
     * sin provocar renderizados.
     */
    const lastLocationRef = useRef(null);

    const getAddressFromCoordinates = async (latitude, longitude) => {

        const params = new URLSearchParams({
            latitude: String(latitude),
            longitude: String(longitude)
        });

        const response = await fetch(
            `/api/reverse-geocode?${params}`
        );

        if (!response.ok) {
            throw new Error(
                "No se pudo obtener la dirección"
            );
        }

        const data = await response.json();

        return data.location;
    };

    useEffect(() => {

        /**
         * 1. Cargar ubicación guardada
         */
        try {

            const savedLocation = localStorage.getItem(LOCATION_STORAGE_KEY);

            if (savedLocation) {

                const parsedLocation = JSON.parse(savedLocation);

                if (typeof parsedLocation.latitude === "number" && typeof parsedLocation.longitude === "number") {
                    setLocation(parsedLocation);
                    lastLocationRef.current = parsedLocation;
                }
            }

        } catch (error) {
            console.error("Error al cargar la ubicación:", error);
        } finally {
            setIsLoaded(true);
        }


        /**
         * 2. Verificar soporte del navegador
         */
        if (!navigator.geolocation) {
            setStatus("unavailable");
            setError({code: null, message: "La geolocalización no está disponible."});
            return;
        }


        /**
         * 3. Escuchar cambios de ubicación
         */
        const watchId = navigator.geolocation.watchPosition(

            /**
             * SUCCESS
             */
            (position) => {

                const newLocation = normalizePosition(position);

                const previousLocation = lastLocationRef.current;


                /**
                 * Primera ubicación disponible
                 */
                if (!previousLocation) {

                    saveLocation(newLocation);

                    return;
                }


                /**
                 * Calcular cuánto se movió
                 */
                const distance = calculateDistance(previousLocation, newLocation);


                /**
                 * Solo actualizar cuando realmente
                 * cambió la posición.
                 */
                if (distance < MIN_DISTANCE_METERS) {

                    setStatus("granted");

                    return;
                }


                saveLocation(newLocation);
            },


            /**
             * ERROR
             */
            (geolocationError) => {
                console.error("Error de geolocalización:", geolocationError);
                const status = geolocationError.code === 1 ? "denied" : "error";
                setStatus(status);
                setError({code: geolocationError.code, message: geolocationError.message});
            },


            /**
             * OPTIONS
             */
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 5000
            }
        );


        /**
         * 4. Limpiar listener
         */
        return () => {
            navigator.geolocation.clearWatch(watchId);
        };

    }, []);

    const saveLocation = async (newLocation) => {

        try {

            const address = await getAddressFromCoordinates(
                newLocation.latitude,
                newLocation.longitude
            );

            const completeLocation = {
                ...newLocation,
                address
            };

            lastLocationRef.current = completeLocation;

            setLocation(completeLocation);

            setStatus("granted");

            setError(null);

            localStorage.setItem(
                LOCATION_STORAGE_KEY,
                JSON.stringify(completeLocation)
            );

        } catch (error) {

            console.error(
                "Error obteniendo la dirección:",
                error
            );

            /**
            * Aunque falle la dirección,
            * conservamos las coordenadas.
            */
            const completeLocation = {
                ...newLocation,
                address: null
            };

            lastLocationRef.current = completeLocation;

            setLocation(completeLocation);

            setStatus("granted");

            localStorage.setItem(
                LOCATION_STORAGE_KEY,
                JSON.stringify(completeLocation)
            );
        }
    };

    const contextValue = {
        location,
        latitude: location.latitude,
        longitude: location.longitude,
        accuracy: location.accuracy,
        address: location.address ?? null,
        displayName: location.address?.displayName ?? null,
        city: location.address?.city ?? null,
        province: location.address?.province ?? null,
        country: location.address?.country ?? null,
        status,
        error,
        isLoaded,
        hasLocation: location.latitude !== null && location.longitude !== null
    }

    return (
        <LocationContext.Provider value={contextValue}>{children}</LocationContext.Provider>
    );
};


export const useLocation = () => {

    const context = useContext(LocationContext);

    if (!context) {
        throw new Error(
            "useLocation debe usarse dentro de LocationProvider"
        );
    }

    return context;
};