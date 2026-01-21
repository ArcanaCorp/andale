import { IconChevronLeft } from "@tabler/icons-react";
import Images from '@/components/Images';
import ButtonsAction from '@/components/ButtonsAction';

import './styles/header.css'

export default function HeaderCompany ({ details }) {

    return (

        <header className="__header_company_sub">
            <div className="__row">
                <a href="/" className="__btn_back"><IconChevronLeft/></a>
                <ul className='__actions'>
                    <ButtonsAction liked={false} />
                </ul>
            </div>
            <Images img={details?.photo} alt={`${details.name}`} />
        </header>

    )

}