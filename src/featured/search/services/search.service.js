import { REACT_APP_API_URL } from "@/config/config"

export const getSearchQuery = async (query) => {
    try {
        const response = await fetch(`${REACT_APP_API_URL}/search/?q=${query}`)
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || response.statusText);
            return data;
    } catch (error) {
        return { ok: false, message: `Error: ${error.message}`, error: error, code: 500 }
    }
}