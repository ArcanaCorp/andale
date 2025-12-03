import { getRecommendations } from '../services/recomend';
import CardRecommend from './CardRecommend';
import { usePermissions } from '@/context/PermissionsContext';
import { useQuery } from '@tanstack/react-query';
import './styles/recomendations.css';

export default function Recomendations() {

    const { locationRegion } = usePermissions();

    // Ejecutamos la query solo cuando hay datos válidos
    const { data: recomendations = [], error, isFetched, refetch } = useQuery({
        queryKey: ['recommendations', locationRegion?.province, locationRegion?.region],
        queryFn: async () => {
            if (!locationRegion?.province || !locationRegion?.region) return [];
            const data = await getRecommendations(locationRegion.province, locationRegion.region);
            if (!data.ok) {
                const err = new Error(data.message)
                err.status = data.status || 500;
                throw err;
            }
            return data.data;
        },
        enabled: !!locationRegion?.province && !!locationRegion?.region, // evita requests innecesarios
        staleTime: Infinity,            // Nunca se considera "viejo"
        cacheTime: Infinity,            // Mantiene el cache indefinidamente mientras viva la app
        refetchOnWindowFocus: false,    // No vuelve a pedir al cambiar de pestaña o foco
        refetchOnMount: false,          // 👈 Evita que recargue al volver al componente
        suspence: true
    });

    if (error || recomendations.length === 0) {
        return <NoRecommendations error={error} loading={isFetched} onRetry={() => refetch()} />
    }

    return (
        <>
            {recomendations.map((r, idx) => (
                <section key={idx} className="__section_recommendation">
                    <div className="__title">
                        <h3>{r.title}</h3>
                    </div>
                    <ul className="__items">
                        {r.list.map((ri) => (
                            <CardRecommend key={ri.id} info={ri} link={r.link} />
                        ))}
                    </ul>
                </section>
            ))}
        </>
    );
}

function NoRecommendations({ error, onRetry, loading }) {

    const status = error?.status;

    return (
        <div style={{width: '90%', margin: 'auto'}} className="flex flex-col items-center justify-center text-center">

            {status ? (
                <>
                    <h3 className="text-lg font-semibold text-red-600 mb-2">
                        Error {status}
                    </h3>
                    <p className="mb-4">
                        Hubo un problema al obtener las recomendaciones.
                    </p>
                </>
            ) : (
                <>
                    <h3 className="text-lg font-semibold mb-md">
                        No hay recomendaciones disponibles
                    </h3>
                </>
            )}

            <button className="px-lg py-md text-white rounded-md bg-primary" disabled={loading} onClick={onRetry} >
                {loading ? "Cargando..." : "Reintentar"}
            </button>

        </div>
    );
}