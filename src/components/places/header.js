import { IconChevronLeft, IconHeart, IconShare3 } from '@tabler/icons-react'
import placeholder from '../../assets/img/placeholder.png'
import './styles/header.css'
import { useNavigate } from 'react-router-dom'

export default function HeaderPlace ({ info }) {

    const navigate = useNavigate();
    const image = info?.images.length === 0 ? placeholder : info?.images[0].image_iplaces
    
    return (

        <header className='__header_place' style={{backgroundImage: `url(${image})`}}>
            <div className='__header_flex'>
                <button className='__btn_opc' onClick={() => navigate('/', { viewTransition: true })}><IconChevronLeft/></button>
                <div style={{display: 'flex', gap: '1rem'}}>
                    <button className='__btn_opc'><IconHeart/></button>
                    <button className='__btn_opc'><IconShare3/></button>
                </div>
            </div>
        </header>

    )

}