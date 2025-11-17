import { useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { usePermissions } from '@/context/PermissionsContext'
import { IconBell, IconChevronDown, IconShoppingBag } from '@tabler/icons-react'

import SearchBarLink from '@/components/SearchBarLink';

import './styles/header.css'
export default function Header () {

    const location = useLocation();
    const { user } = useAuth();
    const { locationAddress, locationPermission, requestLocationPermission, loadingLocation } = usePermissions();
    
    return (

        <div className='__header_content'>
            <header className={`__header_mobile ${location.pathname === '/account' ? '__header_mobile_me' : ''}`}>
                {location.pathname !== '/account' ? (
                    <>
                        <div className='__row __row_A'>
                            <button className='__btn __btn_location' onClick={requestLocationPermission}>
                                {loadingLocation ? (
                                    <>Cargando...</>
                                ) : (
                                    locationPermission === 'denied' ? (
                                        <>
                                            {'Permiso denegado'} <IconChevronDown/>
                                        </>
                                    ) : (
                                        <>
                                            {locationAddress || 'Ubicación no disponible'} <IconChevronDown/>
                                        </>
                                    )
                                )}
                            </button>
                            <div className='__flx'>
                                <a href='/notifications' className='__a __a_btn __a_btn_ico'><IconBell/></a>
                                <a href='/cart' className='__a __a_btn __a_btn_ico'><IconShoppingBag/></a>
                            </div>
                        </div>
                        <div className='__row __row_B'>
                            <SearchBarLink type={'primary'} />
                        </div>
                    </>
                ) : (
                    <div className='__row __row_C'>
                        {user !== null ? (
                            <h3>¡Hola, {user?.name}!</h3>
                        ) : (
                            <h3>Inicia sesión</h3>
                        )}
                    </div>
                )}
            </header>
            <header className='__header_desktop'></header>
        </div>

    )

}