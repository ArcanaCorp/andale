'use client';

import { useLocation } from "@/context/LocationContext";
import { IconChevronDown } from "@tabler/icons-react";

export default function LocationChip () {

    const { address, status, isLoaded, hasLocation } = useLocation();

    if (!isLoaded) return <p className="text-white text-sm text-semibold">Cargando...</p>

    if (status === "denied") return <p className="text-white text-sm text-semibold">Debes permitir acceso...</p>

    if (!hasLocation) return <p className="text-white text-sm text-semibold">Obteniendo acceso...</p>

    return (
        <p className="flex items-center gap-2xs text-white text-xs text-semibold pointer">{address?.road} {address?.houseNumber} <IconChevronDown size={18}/></p>
    )
}