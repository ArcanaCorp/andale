import { useNavigate } from 'react-router-dom';
import { IconBell, IconChevronDown, IconSearch, IconShoppingCart } from '@tabler/icons-react'
import { usePermissions } from '../permissions/hooks/usePermissions'
import { useCart } from '../cart/context/CartContext';

import './styles/header.css'
import { useTab } from './hooks/useTab';

export default function Header () {

    const navigate = useNavigate();
    const { tab } = useTab()
    const { requestLocationPermission, locationAddress, locationPermission, loadingLocation } = usePermissions();
    const { cart } = useCart();

    return (

        tab !== 'profile' && (
            <header className={`__header`}>

            <div className={`__header_row_A`}>
                <div className='__location' onClick={requestLocationPermission}>
                    {locationPermission === 'denied' ? (
                        <span className='__txt_location'>Permiso no coincidido</span>
                    ) : (
                        <span className='__txt_location'>{loadingLocation ? 'Cargando...' : locationAddress || 'Ubicación no disponible'}</span>
                    )}
                    <IconChevronDown/>
                </div>
                <div className='__navigate'>
                    <button className='__btn __btn_bell' onClick={() => navigate('/notify')}><IconBell/></button>
                    <button className='__btn __btn_cart' onClick={() => navigate('/cart')}><IconShoppingCart/> {cart?.products.length > 0 && ( <span className='__badge'>{cart?.products.length}</span> )} </button>
                </div>
            </div>

            <div className={`__header_row_B`}>
                <div className='__search_box' onClick={() => navigate('/search')}>
                    <div className='__ico'><IconSearch/></div>
                    <p className='__txt_placeholder'>Lugares, restaurantes, hoteles y más</p>
                </div>
            </div>
        
            </header>
        )

    )

}