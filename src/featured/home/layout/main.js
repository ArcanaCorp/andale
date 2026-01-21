import Cookies from "js-cookie";
import { Outlet, useLocation } from "react-router-dom";
import { usePermissions } from "@/context/PermissionsContext";
import './styles/main.css'

export default function Main () {

    const location = useLocation();
    const anon = localStorage.getItem('anon_user_id');
    const user = Cookies.get('c_user')
    const token = sessionStorage.getItem('c_token')
    const { locationPermission, checkLocationPermission } = usePermissions();

    return (

        <main className={`__main_app ${location.pathname === '/account' ? '__main_app_me' : ''}`}>
            <p>Usuario: {anon} | {user} | {token}</p>
            {locationPermission === 'denied' ? (
                <div className="__box_denied">
                    <div className="__content_denied">
                        <h3>Has bloqueado el acceso a tu ubicación</h3>
                        <p>Para volver a activarlo, ve a la barra de direcciones → ícono del candado → "Permisos" → habilita la ubicación.</p>
                        <button onClick={checkLocationPermission}>Ya lo habilite</button>
                    </div>
                </div>
            ) : (
                <Outlet/>
            )}
        </main>

    )

}