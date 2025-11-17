import { REACT_APP_API_URL } from "@/config/config"

export const getUserAccount = async (sub) => {
    try {
        
        const response = await fetch(`${REACT_APP_API_URL}/user/${sub}/profile`)
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || response.statusText);
            return data;

    } catch (error) {
        return {ok: false, message: `Error: ${error.message}`, error: error, code: 500}
    }
}

export const updateUserAccount = async (sub, field, value) => {
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