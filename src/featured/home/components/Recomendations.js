import { toast } from 'sonner';
import { getRecommendations } from '../services/recomend';
import CardRecommend from './CardRecommend';
import { usePermissions } from '@/context/PermissionsContext';
import { useQuery } from '@tanstack/react-query';
import './styles/recomendations.css';

export default function Recomendations() {

    const { locationRegion } = usePermissions();

    // Ejecutamos la query solo cuando hay datos válidos
    const { data: recomendations = [] } = useQuery({
        queryKey: ['recommendations', locationRegion?.province, locationRegion?.region],
        queryFn: async () => {
            if (!locationRegion?.province || !locationRegion?.region) return [];
            const data = await getRecommendations(locationRegion.province, locationRegion.region);
            if (!data.ok) {
                toast.warning(data.message);
                return [];
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

    if (recomendations.length === 0) {
        return <p className="text-center text-gray-500">No hay recomendaciones disponibles</p>;
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