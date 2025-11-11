import { REACT_APP_API_URL } from "@/config/config"

export const getPlacesAll = async (category = 'all', province, region) => {
    try {
        
        const response = await fetch(`${REACT_APP_API_URL}/places/category/${category}?province=${province}&region=${region}`)
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
            body: JSON.stringify(user)
        })
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || response.statusText);
            return data;
    } catch (error) {
        return { ok: false, message: `Error: ${error.message}`, error: error, code: 500 }
    }
}