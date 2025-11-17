import { REACT_APP_API_URL } from "@/config/config"

export const login = async (phone) => {
    try {
        const response = await fetch(`${REACT_APP_API_URL}/user/login`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({phone})
        })
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || response.statusText);
            return data;
    } catch (error) {
        return {ok: false, message: `Error: ${error.message}`, error: error, code: 500}
    }
}

export const validar = async (phone, code) => {
    try {
        const response = await fetch(`${REACT_APP_API_URL}/user/verify-otp`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({phone, code})
        })
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || response.statusText);
            return data;
    } catch (error) {
        return {ok: false, message: `Error: ${error.message}`, error: error, code: 500}
    }
}