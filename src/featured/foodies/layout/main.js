import PromotionBanner from "@/components/PromotionBanner";
import { getBussinesByCategory } from '@/services/bussines.service';
import './styles/main.css'
import CardList from '@/components/CardList';
import { useCallback, useEffect, useState } from 'react';
import RetryStatus from '@/components/RetryStatus';
export default function MainFoodies () {

    const [ foodies, setFoodies ] = useState([])
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState('')
    const [ retryCount, setRetryCount ] = useState(0)

    const getCategoryBussines = useCallback(async () => {
        try {
            setLoading(true)
            setError('')
            const data = await getBussinesByCategory('restaurant')
            if (!data.ok) throw new Error(data.message || "No se pudo obtener los foodies");
                setFoodies(data.data || [])
        } catch (error) {
            console.error(`[Error getCategoryBussines]: ${error}`);
            setError(error.message || 'Ocurrió un error desconocido.')
            setFoodies([])
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        if (retryCount < 3 && !foodies.length && !loading && !error) {
            getCategoryBussines();
        }
    }, [retryCount, foodies, error, loading, getCategoryBussines])
    
    const handleRetry = () => {
        setRetryCount((prev) => prev + 1)
        getCategoryBussines();
    }

    return (

        <main className="__main_foodies">
            <RetryStatus
                loading={loading}
                error={error}
                onRetry={handleRetry}
                retryCount={retryCount}
                empty={!loading && !error && foodies.length === 0}
                emptyText='No hay foodies registrados aún.'
            />
            {!loading && !error && foodies.length > 0 && (
                <>
                    <PromotionBanner/>
                    {foodies?.length > 0 ? (
                        <ul className='__list_foodies'>
                            {foodies.map((food) => (
                                <CardList key={food?.id} info={food} />
                            ))}
                        </ul>
                    ) : (
                        <p>No hay restaurantes disponibles</p>
                    )}
                </>
            )}
        </main>

    )

}