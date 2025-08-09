import { API_KEY_MAPS } from "../config/map";

const URL_STREET_MAP = 'https://maps.googleapis.com/maps/api/geocode/json';

export const reverseGeocode = async (lat, lng) => {
    try {
        const response = await fetch(`${URL_STREET_MAP}?latlng=${lat},${lng}&key=${API_KEY_MAPS}`);
        const data = await response.json();

        if (data.status === "OK" && data.results.length > 0) {
            const components = data.results[0].address_components;

            let street = '';
            let number = '';

            for (const component of components) {
                if (component.types.includes("route")) {
                    street = component.long_name;
                }
                if (component.types.includes("street_number")) {
                    number = component.long_name;
                }
            }

            // Validación básica
            if (street && number) {
                return `${street} ${number}`;  // Ej: "Jr. Acolla 854"
            }

            // Si no encuentra ambos, retorna la dirección completa por defecto
            return data.results[0].formatted_address;
        } else {
            console.error('No se encontró dirección:', data.status);
            return null;
        }
    } catch (error) {
        console.error('Error al obtener dirección:', error);
        return null;
    }
};