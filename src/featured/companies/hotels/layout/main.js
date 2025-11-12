import { useCallback, useEffect, useState } from "react";
import { getBussinesByCategory } from "@/services/bussines.service";
import RetryStatus from '@/components/RetryStatus';
import CardList from '@/components/CardList';
import './styles/layout.css'

export default function MainHotel () {

    const [ hotels, setHotels ] = useState([])
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState('')
    const [ retryCount, setRetryCount ] = useState(0)

    const getCategoryBussines = useCallback(async () => {
        try {
            setLoading(true)
            setError('')
            const data = await getBussinesByCategory('hotel')
            if (!data.ok) throw new Error(data.message || "No se pudo obtener los foodies");
                setHotels(data.data || [])
        } catch (error) {
            console.error(`[Error getCategoryBussines]: ${error}`);
            setError(error.message || 'Ocurrió un error desconocido.')
            setHotels([])
        } finally {
            setLoading(false)
        }
    }, [])
    
    useEffect(() => {
        if (retryCount < 3 && !hotels.length && !loading && !error) {
            getCategoryBussines();
        }
    }, [retryCount, hotels, error, loading, getCategoryBussines])
        
    const handleRetry = () => {
        setRetryCount((prev) => prev + 1)
        getCategoryBussines();
    }

    return (

        <main className="__main_hotels">
        
            <RetryStatus
                loading={loading}
                error={error}
                onRetry={handleRetry}
                retryCount={retryCount}
                empty={!loading && !error && hotels.length === 0}
                emptyText='No hay hoteles registrados aún.'
            />

            {!loading && !error && hotels.length > 0 && (
                <>

                    {hotels.length > 0 ? (
                        <ul className="__list_hotels">
                            {hotels.map((htl) => (
                                <CardList key={htl.id} info={htl} />
                            ))}
                        </ul>
                    ) : (
                        <p>No hay hoteles disponibles</p>
                    )}

                </>
            )}

        </main>

    )

}