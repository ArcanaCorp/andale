import { REACT_APP_API_URL } from "@/config/api"
import Cookies from "js-cookie"
import moment from "moment";

export const toogleLiked = async (sub) => {

    try {

        const user = Cookies.get('guest_id');
        const date = moment().format('DD-MM-YYYY HH:mm:ss');
        const response = await fetch(`${REACT_APP_API_URL}/places/liked`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({sub, user, date})
        })
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || response.statusText);
            return data;
        
    } catch (error) {
        return { ok: false, message: `Error: ${error.message}`, error: error, code: 500 }
    }

}