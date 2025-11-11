import { REACT_APP_API_URL } from "@/config/config"

export const getBussinesByCategory = async (category) => {
    try {
        const response = await fetch(`${REACT_APP_API_URL}/socio/bussines/${category}`)
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || response.statusText);
            return data;
    } catch (error) {
        return { ok: false, message: `Error: ${error.message}`, error: error, code: 500 }
    }
}

export const getBussinesBySub = async (sub) => {
    try {
        const response = await fetch(`${REACT_APP_API_URL}/socio/${sub}/bussines`)
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || response.statusText);
            return data;
    } catch (error) {
        return { ok: false, message: `Error: ${error.message}`, error: error, code: 500 }
    }
}