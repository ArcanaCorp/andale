import { REACT_APP_API_URL, TOKEN_KEY_ACCOUNT } from "../config/config"
import Cookies from 'js-cookie'

export const getServiceAnalitycs = async () => {
    try {
        const sub = Cookies.get(TOKEN_KEY_ACCOUNT)
        if (!sub) throw new Error("No se encontró al usuario");
        const response = await fetch(`${REACT_APP_API_URL}/user/analytics`, {
            headers: {
                'Authorization': `Bearer ${sub}`
            }
        })
        const data = await response.json();
        if (!response.ok) throw new Error(response.statusText || data.message);
            return data;

    } catch (error) {
        return { ok: false, message: `Error: ${error.message}`, error: error, code: 500 }
    }
}

export const trackingVisit = async (payload) => {
    try {
        const response = await fetch(`${REACT_APP_API_URL}/analytics/track`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        })
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || response.statusText);
            return data;
    } catch (error) {
        return { ok: false, message: `Error: ${error.message}`, error: error, code: 500 }
    }
}