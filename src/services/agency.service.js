import { URL_SOCIO_API } from "../config/api"

export const getTopAgency = async () => {
    try {
        
        const response = await fetch(`${URL_SOCIO_API}/partners/agency`)
        const data = await response.json()
        if (!response.ok) throw new Error(data.message);
            return data;

    } catch (error) {
        return { ok: false, message: `Error: ${error.message}`, error: error, code: 500 }
    }
}

export const getProfileAgency = async (slug) => {
    try {
        
        const response = await fetch(`${URL_SOCIO_API}/partners/agencies/company/${slug}`)
        const data = await response.json()
        if (!response.ok) throw new Error(data.message);
            return { ok: true, bussines: data?.data.bussines, categories: data?.data.categories, packages: data?.data.packages };

    } catch (error) {
        return { ok: false, message: `Error: ${error.message}`, error: error, code: 500 }
    }
}