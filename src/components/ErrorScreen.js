import { Link, useLocation } from 'react-router-dom'

export default function ErrorScreen () {

    const location = useLocation();

    return (

        <div className='w-screen h-screen grid center'>
            <div className='w m-auto text-center' style={{"--w": "90%"}}>
                <div></div>
                <h2 className='text-lg'>Página no encontrada</h2>
                <p className='text-sm text-gray mb-md'>No se encontró la página <b>{location.pathname}</b></p>
                <Link to={'/'}>Volver</Link>
            </div>
        </div>

    )

}