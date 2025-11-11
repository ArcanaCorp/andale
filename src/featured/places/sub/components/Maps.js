import { useEffect, useRef } from "react";
import { importLibrary } from "@googlemaps/js-api-loader";
import { usePermissions } from "@/context/PermissionsContext";

export default function Maps({ locationMap }) {
    
    const { location } = usePermissions();
    const mapRef = useRef(null);

    useEffect(() => {
        
        if (!location?.lat || !locationMap?.x) return;

        const initMap = async () => {
            try {
                // ✅ Importamos librerías necesarias de forma modular
                const { Map } = await importLibrary("maps");
                const { Marker } = await importLibrary("marker");
                const { DirectionsService, DirectionsRenderer, TravelMode, DirectionsStatus } = await importLibrary("routes");

                // 📍 Convertimos {x, y} → {lat, lng}
                const destination = { lat: locationMap.y, lng: locationMap.x };

                // 🗺️ Crear el mapa centrado entre origen y destino
                const map = new Map(mapRef.current, {
                    center: {
                        lat: (location.lat + destination.lat) / 2,
                        lng: (location.lng + destination.lng) / 2,
                    },
                    zoom: 10,
                    disableDefaultUI: true,
                    gestureHandling: "greedy",
                });

                // 📍 Marcadores
                new Marker({
                    map,
                    position: location,
                    title: "Tu ubicación actual",
                });

                new Marker({
                    map,
                    position: destination,
                    title: "Destino",
                });

                // 🚗 Servicio de direcciones
                const directionsService = new DirectionsService();
                const directionsRenderer = new DirectionsRenderer({
                    suppressMarkers: true, // usamos los nuestros
                    polylineOptions: {
                        strokeColor: "#0078ff",
                        strokeOpacity: 0.9,
                        strokeWeight: 5,
                    },
                });

                directionsRenderer.setMap(map);

                // 🧭 Calcular y mostrar ruta
                directionsService.route(
                    {
                        origin: location,
                        destination,
                        travelMode: TravelMode.DRIVING,
                    },
                    (result, status) => {
                        if (status === DirectionsStatus.OK) {
                            directionsRenderer.setDirections(result);
                        } else {
                            console.warn("Error al calcular ruta:", status);
                        }
                    }
                );
                
            } catch (error) {
                console.error("Error al inicializar Google Maps:", error);
            }
        };

        initMap();
    }, [location, locationMap]);

    return (
        <div
            ref={mapRef}
            style={{
                width: "90%",
                margin: 'auto',
                height: "300px",
                borderRadius: "10px"
            }}
        />
    );
}
