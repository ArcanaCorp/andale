import { useLocation } from 'react-router-dom';
import { usePermissions } from '@/context/PermissionsContext'
import { IconBell, IconChevronDown, IconShoppingBag } from '@tabler/icons-react'

import SearchBarLink from '@/components/SearchBarLink';

import './styles/header.css'
export default function Header () {

    const location = useLocation();
    const { locationAddress } = usePermissions();

    return (

        <div className='__header_content'>
            <header className={`__header_mobile ${location.pathname === '/profile' ? '__header_mobile_me' : ''}`}>
                {location.pathname !== '/profile' ? (
                    <>
                        <div className='__row __row_A'>
                            <button className='__btn __btn_location'>{locationAddress || 'Ubicación no disponible'} <IconChevronDown/></button>
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
                        <h3>¡Hola, Franco Pérez Caro!</h3>
                    </div>
                )}
            </header>
            <header className='__header_desktop'></header>
        </div>

    )

}