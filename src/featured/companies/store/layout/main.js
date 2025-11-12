import { useCallback, useEffect, useState } from "react";
import { getBussinesByCategory } from "@/services/bussines.service";
import RetryStatus from '@/components/RetryStatus';
import CardList from '@/components/CardList';
import './styles/layout.css'
export default function MainStore () {

    const [ stores, setStores ] = useState([])
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState('')
    const [ retryCount, setRetryCount ] = useState(0)
    
    const getCategoryBussines = useCallback(async () => {
        try {
            setLoading(true)
            setError('')
            const data = await getBussinesByCategory('ecommerce')
            if (!data.ok) throw new Error(data.message || "No se pudo obtener los foodies");
                setStores(data.data || [])
        } catch (error) {
            console.error(`[Error getCategoryBussines]: ${error}`);
            setError(error.message || 'Ocurrió un error desconocido.')
            setStores([])
        } finally {
            setLoading(false)
        }
    }, [])
    
    useEffect(() => {
        if (retryCount < 3 && !stores.length && !loading && !error) {
            getCategoryBussines();
        }
    }, [retryCount, stores, error, loading, getCategoryBussines])
        
    const handleRetry = () => {
        setRetryCount((prev) => prev + 1)
        getCategoryBussines();
    }

    return (

        <main className="__main_store">

            <RetryStatus
                loading={loading}
                error={error}
                onRetry={handleRetry}
                retryCount={retryCount}
                empty={!loading && !error && stores.length === 0}
                emptyText='No hay comercios registrados aún.'
            />

            {!loading && !error && stores.length > 0 && (
                <>

                    {stores.length > 0 ? (
                        <ul className="__list_stores">
                            {stores.map((store) => (
                                <CardList key={store.id} info={store} />
                            ))}
                        </ul>
                    ) : (
                        <p>No hay comercios disponibles</p>
                    )}

                </>
            )}

        </main>

    )

}