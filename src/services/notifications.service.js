import { REACT_APP_API_URL } from "../config/config";

export const getServiceNotifications = async () => {
    try {
        const uuid = localStorage.getItem('anon_user_id')
        const response = await fetch(`${REACT_APP_API_URL}/notifications/?uuid=${uuid}`)
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || response.statusText);
            return data;
    } catch (error) {
        console.error(error);
        return { ok: false, message: `Error: ${error.message}`, error: error, code: 500 }
    }
}