import { useLocation } from 'react-router-dom'
import './styles/error.css'

export default function ErrorScreen () {

    const location = useLocation();

    return (

        <div className='__error_app'>
            <div className='__box_error_app'>
                <div></div>
                <h2>Página no encontrada</h2>
                <p>No se encontró la página <b>{location.pathname}</b></p>
                <a href='/'>Volver al inicio</a>
            </div>
        </div>

    )

}