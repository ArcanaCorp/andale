import { REACT_APP_API_URL } from "@/config/api"

export const serviceNewOrder = async (detalles) => {

    try {
        
        const response = await fetch(`${REACT_APP_API_URL}/orders/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({detalles})
        })

        const data = await response.json();

        if (!response.ok) throw new Error(data.message || response.statusText);

            return data;

    } catch (error) {
        return { ok: false, message: `Error: ${error.message}`, data: null, error: error, code: 500 }
    }

}