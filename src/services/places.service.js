import { URL_API } from "../config/api"

export const getPlaceSlug = async (slug) => {
    try {
        
        const response = await fetch(`${URL_API}/places/${slug}`)
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
            return data;

    } catch (error) {
        return {ok: false, message: `Error: ${error.message}`, error: error, code: 500}
    }
}