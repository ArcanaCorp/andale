import logo from '@/shared/img/LOGO-WHITE.svg'
import './styles/splash.css'
export default function SplashScreen () {

    return (

        <div className='__splash_app'>
            <div className='__image_app'>
                <img src={logo} alt='Logo de Ándale Ya' />
            </div>
        </div>

    )

}