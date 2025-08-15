import { Outlet } from 'react-router-dom'
import { Toaster } from "sonner";
import logo from '@/shared/images/LOGO-WHITE.svg'
import './styles/layout.css'
export default function AuthLayout () {

    return (

        <div className="__auth_lyt">

            <div className='__auth_lyt_banner'>
                <img src={logo} height={80} alt='Logo de ÁndaleYa' loading='lazy' fetchPriority='high' />
            </div>

            <div className='__auth_lyt_content'>
                <h1 className='__tit'>Te damos la bienvenida</h1>
                <div className='__form'>
                    <Outlet/>
                </div>
            </div>

            <Toaster position='top-center' duration={3000} richColors />

        </div>

    )

}