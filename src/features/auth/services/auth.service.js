import { REACT_APP_API_URL } from "@/config/api"
import Cookies from 'js-cookie'

export const serviceLogin = async (phone) => {

    try {

        const sub = Cookies.get('guest_id');
        
        const response = await fetch(`${REACT_APP_API_URL}/user/account/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({sub, phone})
        })

        const data = await response.json();

        if (!response.ok) throw new Error(data.message || response.statusText);

            return data;

    } catch (error) {
        return { ok: false, message: `Error: ${error.message}`, data: null, error: error, code: 500 }
    }

}

export const serviceVerify = async (code) => {

    try {
        
        const token = Cookies.get('o_auth');

        const response = await fetch(`${REACT_APP_API_URL}/user/account/auth/verify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({code})
        })

        const data = await response.json();

        if (!response.ok) throw new Error(data.message || response.statusText);

            return data;

    } catch (error) {
        return { ok: false, message: `Error: ${error.message}`, data: null, error: error, code: 500 }
    }

}

export const serviceComplete = async (name) => {

    try {
        
        const token = Cookies.get('o_auth');

        const response = await fetch(`${REACT_APP_API_URL}/user/account/auth/complete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({name})
        })

        const data = await response.json();

        if (!response.ok) throw new Error(data.message || response.statusText);

            return data;

    } catch (error) {
        return { ok: false, message: `Error: ${error.message}`, data: null, error: error, code: 500 }
    }

}

export const serviceAccount = async () => {
    try {

        const token = Cookies.get('o_auth');

        const response = await fetch(`${REACT_APP_API_URL}/user/account`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        const data = await response.json();

        if (!response.ok) throw new Error(data.message || response.statusText);

            return data;

    } catch (error) {
        return { ok: false, message: `Error: ${error.message}`, data: null, error: error, code: 500 }
    }
}