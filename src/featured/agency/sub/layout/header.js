import { IconChevronLeft } from '@tabler/icons-react';
import Images from '@/components/Images';
import ButtonsAction from '@/components/ButtonsAction';
import './styles/header.css'
export default function HeaderSubAgency ({ details }) {
    
    console.log(details);
    
    return (

        <header className='__header_sub_agency'>
            <div className='__row'>
                <a href='/' className='__btn_back'><IconChevronLeft/></a>
                <ul className='__btns_actions'>
                    <ButtonsAction/>
                </ul>
            </div>
            <Images img={details?.photo} alt={`Agencia de viajes ${details?.name} ubicado en ${details?.address.direction}`} />
        </header>

    )
}