import { useQuery } from '@tanstack/react-query';
import { getPlacesAll } from "../services/place.service";
import { usePermissions } from "@/context/PermissionsContext";
import { useFilter } from '@/context/FilterContext';
import PlaceCard from "../components/card";

import './styles/layout.css'

export default function MainPlaces () {

    const { locationRegion } = usePermissions();
    const { filter } = useFilter();

    const { data: places, isLoading, isError, error, refetch } = useQuery({
        queryKey: ["places", filter, locationRegion?.province, locationRegion?.region],
        queryFn: async () => {
        const response = await getPlacesAll(filter, locationRegion?.province, locationRegion?.region);
        if (!response.ok) throw new Error(response.message || "Error al obtener lugares");
            return response.data;
        },
        enabled: !!locationRegion?.province && !!locationRegion?.region, // solo ejecuta cuando haya datos válidos
        staleTime: 1000 * 60 * 5, // cachea por 5 minutos
        retry: 2, // reintenta 2 veces si falla
    });

    // Renderizado
    if (isLoading) return <div className="__main_places">Cargando...</div>;
    if (isError){
        return (
            <div className="__main_places">
                <p>Error: {error.message}</p>
                <button onClick={() => refetch()}>Reintentar</button>
            </div>
        );
    }

    return (

        <main className="__main_places">
            {places?.length > 0 ? (
                <ul className="__list_places">
                    {places.map((p) => (
                        <PlaceCard key={p.id} info={p} />
                    ))}
                </ul>
            ) : (
                <p>No hay lugares disponibles en esta región.</p>
            )}
        </main>

    )

}