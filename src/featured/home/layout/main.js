import { Outlet, useLocation } from "react-router-dom";
import './styles/main.css'

export default function Main () {

    const location = useLocation();

    return (

        <main className={`__main_app ${location.pathname === '/profile' ? '__main_app_me' : ''}`}>
            <Outlet/>
        </main>

    )

}