'use client';

import { useLocation } from "@/context/LocationContext";

export default function LocationChip () {

    const { address, status, isLoaded, hasLocation } = useLocation();

    if (!isLoaded) return <p className="text-white text-sm text-semibold">Cargando...</p>

    if (status === "denied") return <p className="text-white text-sm text-semibold">Debes permitir acceso...</p>

    if (!hasLocation) return <p className="text-white text-sm text-semibold">Obteniendo acceso...</p>

    return (
        <p className="text-white text-sm text-semibold">{address?.road} {address?.houseNumber}</p>
    )
}