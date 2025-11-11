import { REACT_APP_API_URL } from "@/config/config";

export const getRecommendations = async (province, region) => {
    try {
        
        const response = await fetch(`${REACT_APP_API_URL}/recommendations/?province=${encodeURIComponent(province)}&region=${encodeURIComponent(region)}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || response.statusText);
            return data;

    } catch (error) {
        return { ok: false, message: `Error: ${error.message}`, error: error, code: 500 }
    }
}