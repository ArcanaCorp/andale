import { URL_SOCIO_API } from "../config/api"

export const getFoods = async () => {

    try {
        
        const response = await fetch(`${URL_SOCIO_API}/partners/restaurant`)
        const data = await response.json()
        if (!response.ok) throw new Error(data.message);
            return data;

    } catch (error) {
        return { ok: false, message: `Error: ${error.message}`, error: error, code: 500 }
    }

}

export const getDishes = async () => {

    try {
        
        const response = await fetch(`https://socio.ttutis.com/api/v1/partners/foods/dishes`)
        const data = await response.json()
        if (!response.ok) throw new Error(data.message);
            return data

    } catch (error) {
        return { ok: false, message: `Error: ${error.message}`, error: error, code: 500 }
    }

}

export const getInfoBussines = async (short) => {

    try {
        
        const response = await fetch(`${URL_SOCIO_API}/partners/foods/company/${short}`)
        const data = await response.json();
        if (!data.ok) throw new Error(data.message);
            const info = { ok: data.ok, bussines: data.data.bussines, dishes: data.data.dishes}
            return info;

    } catch (error) {
        return { ok: false, message: `Error: ${error.message}`, error: error, code: 500 }
    }

}

export const getInfoDish = async (sub, productId) => {
    try {
        
        const response = await fetch(`${URL_SOCIO_API}/partners/foods/${sub}/dish/${productId}`)
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
            return data;

    } catch (error) {
        return { ok: false, message: error, error, code: 500 }
    }
}