import logo from '@/shared/img/LOGO-WHITE.svg'
import Images from './Images/Image'
export default function SplashScreen () {

    return (

        <div className='w-screen h-screen grid center bg-primary'>
            <div className='w m-auto text-center' style={{"--w": "90%"}}>
                <Images img={logo} alt='Logo de Ándale Ya!' className='w m-auto' style={{"--w": "60%"}} />
            </div>
        </div>

    )

}