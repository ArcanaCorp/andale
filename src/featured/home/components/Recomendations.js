import { useEffect } from 'react';
import './styles/recomendations.css';
import { toast } from 'sonner';
import { getRecommendations } from '../services/recomend';
import CardRecommend from './CardRecommend';
import { usePermissions } from '@/context/PermissionsContext';
import { useQuery } from '@tanstack/react-query';
import SkeletonRecommend from './SkeletonRecommend';

export default function Recomendations() {

    const { locationRegion } = usePermissions();

    // Ejecutamos la query solo cuando hay datos válidos
    const { data: recomendations = [], isError, error, isFetching } = useQuery({
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
        staleTime: 1000 * 60 * 5 // cachea por 5 minutos
    });

    useEffect(() => {
        if (isError) toast.error(error.message);
    }, [isError, error]);

    return (
        <>
            {isFetching && <SkeletonRecommend/>}

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

            {!isFetching && recomendations.length === 0 && (
                <p className="text-center text-gray-500">No hay recomendaciones disponibles</p>
            )}
        </>
    );
}