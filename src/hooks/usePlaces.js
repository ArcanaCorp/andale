'use client';

import { fetchListFeed, fetchPlaceBySlug } from "@/services/places.service";
import { useState } from "react"

export const usePlaces = () => {

    const [ feed, setFeed ] = useState({
        load: true,
        list: [],
        error: ''
    });

    const [ details, setDetails ] = useState({
        load: true,
        info: null,
        error: ''
    })

    const getListFeed = async () => {
        try {
            const data = await fetchListFeed();
            if (!data.ok) throw new Error(data.message);
                setFeed(prev => ({...prev, list: data.data}))
        } catch (error) {
            console.error(error);
            setFeed(prev => ({...prev, error: error.message}))
        } finally {
            setFeed(prev => ({...prev, load: false}))
        }
    }

    const getPlaceBySlug = async (slug) => {
        try {
            const data = await fetchPlaceBySlug(slug)
            if (!data.ok) throw new Error(data.message || "Hubo un error");
                setDetails(prev => ({...prev, info: data.data}))
        } catch (error) {
            console.error(error);
            setDetails(prev => ({...prev, error: error.message}))
        } finally {
            setDetails(prev => ({...prev, load: false}))
        }
    }

    return {
        feed,
        getListFeed,
        details,
        getPlaceBySlug
    }

}