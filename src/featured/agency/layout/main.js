import { useEffect, useState, useCallback } from 'react'
import { getBussinesByCategory } from '@/services/bussines.service'
import CardList from '@/components/CardList'
import RetryStatus from '@/components/RetryStatus'
import './styles/layout.css'

export default function MainAgency() {

    const [bussines, setBussines] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [retryCount, setRetryCount] = useState(0)

    // --- Función para obtener negocios ---
    const getCategoryBussines = useCallback(async () => {
        try {
            setLoading(true)
            setError('')
            const data = await getBussinesByCategory('agency')
            if (!data.ok) throw new Error(data.message || 'No se pudo obtener los negocios.')
                setBussines(data.data || [])
        } catch (err) {
            console.error('[Error getCategoryBussines]:', err)
            setError(err.message || 'Ocurrió un error desconocido.')
            setBussines([])
        } finally {
            setLoading(false)
        }
    }, [])

    // --- Auto reintento (hasta 3 veces) ---
    useEffect(() => {
        if (retryCount < 3 && !bussines.length && !loading && !error) {
            getCategoryBussines()
        }
    }, [retryCount, bussines, error, loading, getCategoryBussines])

    // --- Manejo manual del reintento ---
    const handleRetry = () => {
        setRetryCount((prev) => prev + 1)
        getCategoryBussines()
    }

    return (
        <main className='__main_agency'>
            <RetryStatus 
                loading={loading}
                error={error}
                onRetry={handleRetry}
                retryCount={retryCount}
                empty={!loading && !error && bussines.length === 0}
                emptyText='No hay agencias registradas aún.'
            />

            {!loading && !error && bussines.length > 0 && (
                <ul className='__lst_agency'>
                    {bussines.map((bss) => (
                        <CardList key={bss.id} info={bss} />
                    ))}
                </ul>
            )}
        </main>
    )
}