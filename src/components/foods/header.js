import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { IconBrandWhatsapp, IconChevronLeft, IconMapPin, IconPhone, IconShare3 } from "@tabler/icons-react";

import placeholder from '@/assets/img/placeholder.png'
import './styles/header.css'

export default function HeaderFood ({ slug, info, filter, categories, onFilter }) {

    const navigate = useNavigate();

    const handleBack = () => navigate(-1, { viewTransition:true })

    const handleShared = () => {
        toast.success('Se compartio con éxito')
        const message = 
            `📍 ¡Mira este lugar recomendado!\n\n` +
            `🍽️ *${info?.name}*\n` +
            `📌 Ubicación: ${info?.location}\n` +
            `📞 Teléfono: ${info?.phone}\n\n` +
            `👀 Mira más aquí 👉 https://kuyaay.com/r/${slug}?utm_source=whatsapp&utm_medium=share&utm_campaign=restaurant_share`;

        const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    const msgMap = {
        'restaurant': 'Me gustaría hacer un pedido.',
        'agency': 'Me gustaría reservar un paquete de viaje.'
    }

    const message = `Hola *${info?.name}*\n\n${msgMap[info?.category]}`

    const contactsMap = {
        'phone': `tel:${info?.phone}`,
        'location': `https://www.google.com/maps?q=${encodeURIComponent(info?.location)}`,
        'whatsapp': `https://wa.me/51${info?.phone}?text=${encodeURIComponent(message)}`
    }

    const handleNavigationContacts = (contact) => window.open(contactsMap[contact], '_blank')

    return (

        <header className='__header_rtrt'>
            <div className={`__portada`} style={{backgroundImage: `url(${info?.portada === '' ? placeholder : info?.portada})`}}>
                <img src={info?.portada === '' ? placeholder : info?.portada} alt={`Foto de portada de ${info?.name} - ${info.category} - Ándale Ya!`} loading="lazy" />
                <div className="__actions">
                    <button className="__action_btn" onClick={handleBack}><IconChevronLeft/></button>
                    <button className="__action_btn" onClick={handleShared}><IconShare3/></button>
                </div>
                <div className="__avatar" style={{backgroundImage: `url(${info?.photo})`}}>
                    <img src={info?.photo} alt={`Foto de perfil de ${info?.name} - ${info.category} - Ándale Ya!`} loading="lazy" />
                </div>
            </div>
            <div className="__info">
                <h1 className="__name">{info?.name}</h1>
                <p className="__text">{info?.text}</p>
                <ul className="__contacts">
                    <li className="__contact" onClick={() => handleNavigationContacts('phone')}>
                        <IconPhone size={18} />
                        <p>Llámanos</p>
                    </li>
                    <li className="__contact" onClick={() => handleNavigationContacts('location')}>
                        <IconMapPin size={18} />
                        <p>Ubícanos</p>
                    </li>
                    <li className="__contact" onClick={() => handleNavigationContacts('whatsapp')}>
                        <IconBrandWhatsapp size={18} />
                        <p>Escríbenos</p>
                    </li>
                </ul>
            </div>
            <ul className="__categories">
                <li className={`__category ${filter === 'all' ? '__category--active' :''}`} onClick={() => onFilter('all')}>
                    <span>Todo</span>
                </li>
                {categories.map((c, i) => (
                    <li key={i} className={`__category ${filter === c ? '__category--active' :''}`} onClick={() => onFilter(c)}>
                        <span>{c}</span>
                    </li>
                ))}
            </ul>
        </header>

    )

}