import PropTypes from 'prop-types'
import './styles/retrystatus.css'

export default function RetryStatus({ 
    error, 
    onRetry, 
    retryCount = 0, 
    maxRetries = 3,
    loading = false,
    loadingText = 'Cargando...',
    empty = false,
    emptyText = 'No hay registros disponibles.'
}) {

    if (loading) {
        return (
            <div className='__status_loading'>
                <p>{loadingText}</p>
                <div className='spinner'></div>
            </div>
        )
    }

    if (error) {
        return (
            <div className='__status_error'>
                <p>{error}</p>
                {retryCount < maxRetries ? (
                    <button onClick={onRetry} className='__btn_retry'>Reintentar</button>
                ) : (
                    <p>Se alcanzó el límite de intentos. Verifica tu conexión.</p>
                )}
            </div>
        )
    }

    if (empty) {
        return (
            <div className='__status_empty'>
                <p>{emptyText}</p>
            </div>
        )
    }

    return null

}

RetryStatus.propTypes = {
    error: PropTypes.string,
    onRetry: PropTypes.func,
    retryCount: PropTypes.number,
    maxRetries: PropTypes.number,
    loading: PropTypes.bool,
    loadingText: PropTypes.string,
    empty: PropTypes.bool,
    emptyText: PropTypes.string,
}