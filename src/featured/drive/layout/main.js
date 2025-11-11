import { useEffect, useRef } from "react";
import { importLibrary } from "@googlemaps/js-api-loader";
import { usePermissions } from "@/context/PermissionsContext";
import './styles/main.css'
import HeaderDrive from "./header";
import NavDrive from "./nav";
export default function MainDrive () {

    const mapRef = useRef(null);
    const { location } = usePermissions(); // { lat, lng }

    useEffect(() => {
        if (!location?.lat || !location?.lng) return;

        const initMap = async () => {
        try {
            // 🔹 Importar librerías necesarias
            const { Map } = await importLibrary("maps");
            const { Marker } = await importLibrary("marker");

            // 🗺️ Crear mapa centrado en la ubicación del usuario
            const map = new Map(mapRef.current, {
            center: location,
            zoom: 16,
            disableDefaultUI: true,
            gestureHandling: "greedy",
            mapId: "MAIN_DRIVE_MAP", // puedes registrar un Map ID en Google Cloud si quieres personalización
            });

            // 📍 Agregar marcador
            new Marker({
            map,
            position: location,
            title: "Tu ubicación actual",
            });
        } catch (error) {
            console.error("Error al inicializar Google Maps:", error);
        }
        };

        initMap();
    }, [location]);

    return (

        <main className="__main_drive">
            <HeaderDrive/>
            <div className="__map_drive" ref={mapRef}></div>
            <NavDrive/>
        </main>

    )

}