import { REACT_APP_API_URL, TOKEN_KEY_ACCOUNT } from "@/config/config"
import Cookies from "js-cookie";

export const getUserAccount = async () => {
    const sub = Cookies.get(TOKEN_KEY_ACCOUNT)
    
    if (!sub || sub === undefined) return;
    try {
        const response = await fetch(`${REACT_APP_API_URL}/user/profile`, {
            headers: {
                'Authorization': `Bearer ${sub}`
            }
        })
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || response.statusText);
            return data;

    } catch (error) {
        return {ok: false, message: `Error: ${error.message}`, error: error, code: 500}
    }
}

export const updateUserAccount = async (sub, field, value) => {
    if (!sub || sub === undefined) return;
    try {
        const response = await fetch(`${REACT_APP_API_URL}/user/${sub}/profile`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({field, value})
        })
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || response.statusText);
            return data;
    } catch (error) {
        return {ok: false, message: `Error: ${error.message}`, error: error, code: 500}
    }
}