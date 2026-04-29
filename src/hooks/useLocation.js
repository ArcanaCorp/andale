'use client';

import { reverseGeocodeCached } from "@/libs/geolocation";
import { useEffect, useState } from "react";

export const useLocation = () => {

    const [ location, setLocation ] = useState(null);
    const [ address, setAddress ] = useState(null);
    const [ region, setRegion ] = useState({
        district: "",
        province: "",
        region: "",
        country: ""
    });
    const [ locationPermission, setLocationPermission ] = useState(null);
    const [ loadingLocation, setLoadingLocation ] = useState(true);

    const hydrateFromCache = () => {
        try {
            const last = JSON.parse(localStorage.getItem("revgeo:lastCoord"));
            if (!last?.address) return;
            setLocation({lat: last.lat, lng: last.lng});
            setAddress(last.address.street);
            setRegion({
                district: last.address.district,
                province: last.address.province,
                region: last.address.department,
                country: last.address.country
            })
        } catch (error) {
            console.error(`Error en caché de ubicación: ${error}`);
        }
    }

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
                        setAddress(address.street);
                        setRegion({
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
        address,
        region,
        locationPermission,
        loadingLocation,
        requestLocationPermission
    }

}