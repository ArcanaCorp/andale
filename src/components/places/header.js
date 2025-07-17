import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom'
import { IconChevronLeft, IconHeart, IconShare3 } from '@tabler/icons-react'
import placeholder from '../../assets/img/placeholder.png'

import './styles/header.css'

export default function HeaderPlace ({ info }) {

    const navigate = useNavigate();
    const image = info?.images.length === 0 ? placeholder : info?.images[0].image_iplaces
    
    const handleShared = () => {
        const title = 'Mira este grandioso lugar\n\n'
        const text = `Hay que visitar *${info?.name}* ubicado en _${info?.location}_\n\n`;
        const url = `https://kuyaay.com/p/${info?.sub}`

        if (navigator.share) {
            navigator.share({
                title,
                text,
                url
            })
            .then(() => toast.success('Compartido con éxito'))
            .catch((err) => toast.error('Error al compartir'));
        } else {
            const message = `${title}${text}${url}`
            const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        }
    }

    return (

        <header className='__header_place' style={{backgroundImage: `url(${image})`}}>
            <div className='__header_flex'>
                <button className='__btn_opc' onClick={() => navigate('/', { viewTransition: true })}><IconChevronLeft/></button>
                <div style={{display: 'flex', gap: '1rem'}}>
                    <button className='__btn_opc' style={{display: 'none'}}><IconHeart/></button>
                    <button className='__btn_opc' onClick={handleShared}><IconShare3/></button>
                </div>
            </div>
        </header>

    )

}