import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { IconBrandWhatsapp, IconChevronLeft, IconMapPin, IconPhone, IconShare3 } from "@tabler/icons-react";

import './styles/header.css'

export default function HeaderFood ({ slug, info, filter, categories, onFilter }) {

    const navigate = useNavigate();

    const handleBack = () => navigate('/restaurants', { viewTransition:true })

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

    return (

        <header className='__header_rtrt'>
            <div className="__portada">
                <div className="__actions">
                    <button className="__action_btn" onClick={handleBack}><IconChevronLeft/></button>
                    <button className="__action_btn" onClick={handleShared}><IconShare3/></button>
                </div>
                <div className="__avatar"></div>
            </div>
            <div className="__info">
                <h1 className="__name">{info?.name}</h1>
                <p className="__text">{info?.text}</p>
                <ul className="__contacts">
                    <li className="__contact">
                        <IconPhone size={18} />
                        <p>Llámanos</p>
                    </li>
                    <li className="__contact">
                        <IconMapPin size={18} />
                        <p>Ubícanos</p>
                    </li>
                    <li className="__contact">
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