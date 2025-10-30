import { useQuery } from "@tanstack/react-query";
import { getRecommendations } from "../services/recomendation.service";
import Section from "./Section";
import ServerError from "../../pages/ServerError";
import { usePermissions } from "../../permissions/hooks/usePermissions";

export default function Recomendations () {

    const { locationRegion } = usePermissions();
    
    const hasRegionData = Boolean(locationRegion?.province) && Boolean(locationRegion?.region);

    const { data } = useQuery({
        queryKey: ["recommendations", locationRegion?.province, locationRegion?.region],
        queryFn: () => getRecommendations({
            province: locationRegion?.province,
            region: locationRegion?.region
        }),
        enabled: hasRegionData,
        suspense: true, // Esto hace que Suspense maneje el loading
        staleTime: Infinity,             // Nunca se vuelve "stale"
        cacheTime: Infinity,             // Mantiene el cache por toda la sesión
        refetchOnWindowFocus: false,     // No vuelve a hacer fetch al enfocar ventana
        refetchOnMount: false,           // No vuelve a hacer fetch al montar componente
        refetchOnReconnect: false        // No vuelve a hacer fetch al reconectar
    });

    if (data?.error) return <ServerError/>;

    const recommendations = data?.data || [];

    return (

        <>
            {hasRegionData ? (
                recommendations.length > 0 ? (
                    recommendations.map((item, i) => ( <Section key={i} title={item.title} items={item.items} /> ))
                ) : (
                    <div>No hay datos</div>
                )
            ) : (
                <div>Cargando...</div>
            )}
        </>

    )

}