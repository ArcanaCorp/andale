import { importLibrary } from "@googlemaps/js-api-loader";
import { usePermissions } from "@/context/PermissionsContext";
import { useEffect, useRef } from "react";
export default function MapsGo ({ name, arrival }) {

    const { location } = usePermissions();
    const mapRef = useRef(null);
    
    useEffect(() => {
        if (!location?.lat || !arrival?.x) return;
        const newArrival = { lat: arrival.x, lng: arrival.y }

        const initMap = async () => {
            try {
                // ✅ Importamos librerías necesarias de Google Maps
                const { Map } = await importLibrary("maps");
                const { Marker } = await importLibrary("marker");
                const { DirectionsService, DirectionsRenderer, TravelMode, DirectionsStatus } = await importLibrary("routes");

                // 🗺️ Crear mapa centrado entre ambos puntos
                const center = {
                    lat: (location.lat + arrival.x) / 2,
                    lng: (location.lng + arrival.y) / 2,
                };

                const map = new Map(mapRef.current, {
                    center,
                    zoom: 14,
                    disableDefaultUI: true,
                    gestureHandling: "greedy",
                });

                // 📍 Marcador tu ubicación
                new Marker({
                    map,
                    position: location,
                    title: "Tú estás aquí",
                    icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                });

                // 📍 Marcador tienda
                new Marker({
                    map,
                    position: newArrival,
                    title: name,
                    icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
                });

                // 🚗 Direcciones y línea animada
                const directionsService = new DirectionsService();
                const directionsRenderer = new DirectionsRenderer({
                    suppressMarkers: true, // usamos nuestros marcadores
                    polylineOptions: {
                        strokeColor: "#FF0000",
                        strokeOpacity: 0.9,
                        strokeWeight: 5,
                    },
                });

                directionsRenderer.setMap(map);

                directionsService.route(
                    {
                        origin: location,
                        destination: arrival,
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
    }, [location, arrival, name]);

    return (
        <>
        
            <section className="__section __section_company __section_company_rvw">
                <h3>Cómo llegar a {name}</h3>
                <div ref={mapRef} style={{width: '90%', height: '400px', margin: 'auto', borderRadius: '10px'}}></div>
            </section>

        </>
    )
}