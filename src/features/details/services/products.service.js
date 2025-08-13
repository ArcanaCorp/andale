// services/products.service.js
import { REACT_APP_API_URL } from "@/config/api";

export const getProducts = async ({ sub, category = 'all', limit = 10, page = 1 }) => {
    try {

        const response = await fetch(`${REACT_APP_API_URL}/bussines/${sub}/products?category=${category}&limit=${limit}&page=${page}`);

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || response.statusText);

            return data;

    } catch (error) {
        return { ok: false, message: `Error: ${error.message}`, data: null, error, code: 500 };
    }
};