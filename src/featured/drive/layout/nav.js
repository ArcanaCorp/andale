import { usePermissions } from '@/context/PermissionsContext'
import './styles/nav.css'
export default function NavDrive () {

    const { locationAddress } = usePermissions();

    return (

        <nav className='__nav_drive'>

            <div className='__nav_drive_top'>

                <div className='__drive_group'>
                    <div className='__drive_control'>
                        <span className='__pin __pin_me'></span>
                        <span>{locationAddress || 'Escoger en el mapa'}</span>
                    </div>
                </div>

                <div className='__drive_group'>
                    <div className='__drive_control'>
                        <span className='__pin __pin_dst'></span>
                        <span>¿A dónde ir?</span>
                    </div>
                </div>

                <div className='__drive_group_list'>
                    <h4 className='__subtitle'>Métodos de pago</h4>
                    <ul className='__list'>
                        <li className='__itm_method __itm_method--active'>Efectivo</li>
                        <li className='__itm_method'>Yape</li>
                    </ul>
                </div>

            </div>
            
            <div className='__nav_drive_bottom'>
                <button className='__btn __btn_pedir'>Pedir</button>
            </div>

        </nav>

    )

}