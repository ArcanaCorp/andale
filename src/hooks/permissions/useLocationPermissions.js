import { useState, useEffect } from "react";
import { reverseGeocodeCached } from "@/libs/geolocation";

export const useLocationPermissions = () => {

    const [location, setLocation] = useState(null);
    const [locationAddress, setLocationAddress] = useState(null);
    const [locationRegion, setLocationRegion] = useState({
        district: "",
        province: "",
        region: "",
        country: ""
    });
    const [locationPermission, setLocationPermission] = useState(null);
    const [loadingLocation, setLoadingLocation] = useState(false);

    const hydrateFromCache = () => {
        try {
            const last = JSON.parse(localStorage.getItem("revgeo:lastCoord"));
            if (!last?.address) return;

            setLocation({ lat: last.lat, lng: last.lng });
            setLocationAddress(last.address.street);

            setLocationRegion({
                district: last.address.district,
                province: last.address.province,
                region: last.address.department,
                country: last.address.country
            });

        } catch (err) {
            console.error("Error en cache de ubicación:", err);
        }
    };

    const requestLocationPermission = async () => {
        if (!navigator.geolocation) {
            setLocationPermission("unsupported");
            return;
        }

        try {
            setLoadingLocation(true);

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

                    const address = await reverseGeocodeCached(coords.lat, coords.lng);
                    if (address) {
                        setLocationAddress(address.street);
                        setLocationRegion({
                            district: address.district,
                            province: address.province,
                            region: address.department,
                            country: address.country
                        });
                    }
                },
                (err) => {
                    if (err.code === err.PERMISSION_DENIED)
                        setLocationPermission("denied");
                }
            );

        } finally {
            setLoadingLocation(false);
        }
    };

    useEffect(() => {
        hydrateFromCache();
        requestLocationPermission();
    }, []);

    return {
        location,
        locationAddress,
        locationRegion,
        locationPermission,
        loadingLocation,
        requestLocationPermission
    };
};