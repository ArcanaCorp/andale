import logo from '../../shared/images/LOGO-WHITE.svg'
import './styles/splash.css'

export default function SplashScreen () {

    return (

        <div className='__wdn_splash'>
            <img src={logo} className='__img_logo' alt={`Logo de Ándale Ya! | Lugares, Delivery, Hotel, Transporte, gas y compras en Jauja`} loading='lazy' />
        </div>

    )

}