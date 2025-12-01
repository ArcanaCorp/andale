import { REACT_APP_API_URL } from "@/config/config"

export const getPlacesAll = async (category = 'all', location = 'all', province, region) => {
    try {
        
        const response = await fetch(`${REACT_APP_API_URL}/places/category/${category}?district=${location}&province=${province}&region=${region}`)
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || response.statusText);
            return data;

    } catch (error) {
        return { ok: false, message: `Error: ${error.message}`, error: error, code: 500 }
    }
}

export const getPlaceDetails = async (sub) => {
    try {
        
        const response = await fetch(`${REACT_APP_API_URL}/places/${sub}`)
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || response.statusText);
            return data;

    } catch (error) {
        return { ok: false, message: `Error: ${error.message}`, error: error, code: 500 }
    }
}

export const toogleLiked = async (user, sub) => {
    try {
        const response = await fetch(`${REACT_APP_API_URL}/places/${sub}/like`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({sub_user: user})
        })
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || response.statusText);
            return data;
    } catch (error) {
        return { ok: false, message: `Error: ${error.message}`, error: error, code: 500 }
    }
}

export const sharedPlace = async (payload, slug) => {
    try {
        const response = await fetch(`${REACT_APP_API_URL}/places/${slug}/share`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({payload})
        })
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || response.statusText);
            return data;
    } catch (error) {
        return { ok: false, message: `Error: ${error.message}`, error: error, code: 500 }
    }
}

export const getRecommendations = async (slug) => {
    try {
        const response = await fetch(`${REACT_APP_API_URL}/places/${slug}/recommendations`)
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || response.statusText);
            return data;
    } catch (error) {
        return { ok: false, message: `Error: ${error.message}`, error: error, code: 500 }
    }
}