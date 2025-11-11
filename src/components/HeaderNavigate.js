import { IconChevronLeft, IconShoppingBag } from "@tabler/icons-react";
import SearchBarLink from "./SearchBarLink";

import './styles/headernavigate.css'

export default function HeaderNavigate ({ back=true, search=true, cart=true }) {

    return (

        <>
        
            <div className='__header_navigate'>
                {back && (<a href='/' className='__a __a_btn'><IconChevronLeft/></a>)}
                {search && (<SearchBarLink type={'secondary'} />)}
                {cart && (<a href='/cart' className='__a __a_btn'><IconShoppingBag/></a>)}
            </div>

        </>

    )

}