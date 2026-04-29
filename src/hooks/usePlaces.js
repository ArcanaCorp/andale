'use client';

import { getNearbyPlaces, getPlaces } from "@/services/places.service";
import { useCallback, useEffect, useState } from "react";

export const usePlaces = () => {

    const [ places, setPlaces ] = useState([]);
    const [ nearbyPlaces, setNearbyPlaces ] = useState([])
    const [ loadingPlace, setLoadingPlace ] = useState(true);

    const fetchPlaces = useCallback(async () => {
        try {
            const data = await getPlaces();
            setPlaces(data || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingPlace(false);
        }
    }, []);

    const fetchNearby = useCallback(async (coords) => {
        console.log(coords);
        
        try {
            const data = await getNearbyPlaces({
                lat: coords.lat,
                lng: coords.lng,
                radius: 5000,
            });
            setNearbyPlaces(data);
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        if (places.length > 0) return;
        fetchPlaces();
    }, [fetchPlaces]);

    return {
        places,
        nearbyPlaces,
        loadingPlace,
        fetchPlaces,
        fetchNearby
    }

}