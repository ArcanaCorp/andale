import { useQuery } from "@tanstack/react-query";
import { getRecommendations } from "../services/recomendation.service";
import Section from "./Section";
import ServerError from "../../pages/ServerError";

export default function Recomendations () {

    const { data } = useQuery({
        queryKey: ["recommendations"],
        queryFn: getRecommendations,
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
            {recommendations.length > 0 ? (
                recommendations.map((item, i) => ( <Section key={i} title={item.title} items={item.items} /> ))
            ) : (
                <div>No hay datos</div>
            )}
        </>

    )

}