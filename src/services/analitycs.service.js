import { REACT_APP_API_URL, TOKEN_KEY_ACCOUNT } from "../config/config"
import Cookies from 'js-cookie'
import { supabase } from "../libs/supabase";

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
        const { error } = await supabase
        .from('visits')
        .insert([
            {
                ...payload,
                metadata: JSON.stringify(payload.metadata),
                visit_date: new Date().toISOString().split("T")[0],
                visit_time: new Date().toTimeString().slice(0, 8)
            }
        ])
        if (error) throw error;

        return { ok: true };
    } catch (error) {
        return { ok: false, message: `Error: ${error.message}`, error: error, code: 500 }
    }
}