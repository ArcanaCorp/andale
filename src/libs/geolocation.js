import { API_KEY_MAPS } from "@/config/config";

const URL_STREET_MAP = 'https://maps.googleapis.com/maps/api/geocode/json';

// Configurable
const DEFAULT_TTL = 24 * 60 * 60 * 1000; // 24h
const DEFAULT_PRECISION = 4; // 4 decimales ≈ ~11 m (ajusta según necesidad)
const DEFAULT_DISTANCE_THRESHOLD_METERS = 30; // no hacer request si se mueve menos de 30m

// Helpers
function roundCoord(coord, precision = DEFAULT_PRECISION) {
    const factor = Math.pow(10, precision);
    return Math.round(coord * factor) / factor;
}

function storageKey(lat, lng) {
    // Key basada en coordenadas redondeadas
    return `revgeo:${lat}:${lng}`;
}

function now() {
    return Date.now();
}

function saveToStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) { /* fallbacks silenciados */ }
}

function readFromStorage(key) {
    try {
        const raw = localStorage.getItem(key);
        if (!raw) return null;
        return JSON.parse(raw);
    } catch (e) {
        return null;
    }
}

// Haversine para medir distancia entre 2 coords (metros)
function distanceMeters(lat1, lon1, lat2, lon2) {
    const toRad = v => (v * Math.PI) / 180;
    const R = 6371000; // metros
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
                Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

// Función principal: intenta cache, respeta TTL y threshold de movimiento
export async function reverseGeocodeCached(lat, lng, opts = {}) {
    const {
        ttl = DEFAULT_TTL,
        precision = DEFAULT_PRECISION,
        distanceThresholdMeters = DEFAULT_DISTANCE_THRESHOLD_METERS,
        force = false // si true ignora caché y fuerza fetch
    } = opts;

    // Redondeo para agrupar coordenadas cercanas
    const rLat = roundCoord(lat, precision);
    const rLng = roundCoord(lng, precision);
    const key = storageKey(rLat, rLng);

    // 1) Si existe en storage y no expiró, devolverlo rápido
    if (!force) {
        const cached = readFromStorage(key);
        if (cached && cached.ts && (now() - cached.ts) < ttl && cached.address) {
            return cached.address;
        }
    }

    // 2) Opcional: buscar una cache global de "última coordenada usada" para aplicar threshold
    const lastRaw = readFromStorage('revgeo:lastCoord');
    if (!force && lastRaw && lastRaw.lat != null && lastRaw.lng != null) {
        const dist = distanceMeters(lat, lng, lastRaw.lat, lastRaw.lng);
        // Si no se movió lo suficiente y ya tenemos dirección para lastCoord -> devolverla
        if (dist < distanceThresholdMeters && lastRaw.address && (now() - lastRaw.ts) < ttl) {
            return lastRaw.address;
        }
    }

    // 3) Si llegamos aquí: hacemos la petición (network)
    try {
        const url = `${URL_STREET_MAP}?latlng=${lat},${lng}&key=${API_KEY_MAPS}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === "OK" && data.results.length > 0) {
            const components = data.results[0].address_components;

            const find = (type) => {
                const comp = components.find(c => c.types.includes(type));
                return comp ? comp.long_name : null;
            };

            const addressData = {
                street: find("route"),
                number: find("street_number"),
                district: find("sublocality") || find("locality"),
                province: find("administrative_area_level_2"), // Provincia
                department: find("administrative_area_level_1"), // Departamento / Región
                country: find("country"),
                formatted: data.results[0].formatted_address,
            };

            const payload = {
                ts: now(),
                lat: rLat, // guardamos redondeadas para la key y para "lastCoord"
                lng: rLng,
                address: addressData,
            };

            // Guardar en cache por la key de coords redondeadas
            saveToStorage(key, payload);
            // Guardar como lastCoord (útil para threshold)
            saveToStorage('revgeo:lastCoord', { ...payload, lat: lat, lng: lng });

            return addressData;
        } else {
            // No encontrado
            console.error('No se encontró dirección:', data.status);
            return null;
        }
    } catch (error) {
        console.error('Error al obtener dirección:', error);
        return null;
    }
}