import { REACT_APP_API_URL } from "@/config/api"

export const addVisitUser = async (tracking) => {

    try {
        const response = await fetch(`${REACT_APP_API_URL}/analytics/add`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({tracking})
        })
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || response.statusText);
            return data;
    } catch (error) {
        return { ok: false, message: `Error: ${error.message}`, error: error, code: 500 }
    }

}