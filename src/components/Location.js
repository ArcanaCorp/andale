'use client';

import { usePermission } from "@/context/PermissionContext";
import { AppIcon } from "@/helpers/icons";

export default function Location () {

    const { address, loadingLocation, requestLocation } = usePermission();

    return (
        <button className="flex items-center gap-xs text-muted text-xs" onClick={() => requestLocation()}>
            <AppIcon name={'map'} size={18}/> {loadingLocation ? 'Cargando...' : address || 'Sin ubicación'}
        </button>
    )
}