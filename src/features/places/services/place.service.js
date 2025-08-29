import { REACT_APP_API_URL } from "@/config/api"

export const getCategories = async () => {
    try {
        
        const response = await fetch(`${REACT_APP_API_URL}/places/categories`)
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || response.statusText);
            return data;

    } catch (error) {
        return { ok: false, message: error.message, error: error, code: 500 }
    }
}

export const getPlacesbyCategory = async (category) => {
    try {
        
        const response = await fetch(`${REACT_APP_API_URL}/places/category/${category}`)
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || response.statusText);
            return data;

    } catch (error) {
        return { ok: false, message: error.message, error: error, code: 500 }
    }
}