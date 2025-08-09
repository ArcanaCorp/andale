import { REACT_APP_API_URL } from "../../../config/api"

export const getRecommendations = async () => {
    try {
        const response = await fetch(`${REACT_APP_API_URL}/recommendations`)
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || response.statusText);
            return data;
    } catch (error) {
        return { ok: false, message: `Error: ${error.message}`, error: error, code: 500 }
    }
}