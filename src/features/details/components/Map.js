import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { API_KEY_MAPS } from '@/config/map';

const containerStyle = {
    width: '100%',
    height: '200px',
    borderRadius: '12px'
};

const mapOptions = {
    disableDefaultUI: true, // 🔴 Desactiva todos los controles por defecto
    zoomControl: false,      // ✅ Activa solo el control de zoom (si quieres)
    streetViewControl: false,
    fullscreenControl: true,
    mapTypeControl: false,
};

export default function Map({ name, location }) {
    
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: API_KEY_MAPS, // Usa .env para mantenerlo seguro
    });

    const center = {
        lat: location?.y ?? -11.7858,
        lng: location?.x ?? -75.2522
    };

    if (!isLoaded) return <p>Cargando mapa...</p>;

    return (
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14} options={mapOptions} >
            <Marker position={center} title={name} />
        </GoogleMap>
    );
}