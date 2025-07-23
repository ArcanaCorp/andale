import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { IconChevronLeft, IconShare3 } from "@tabler/icons-react";

import './styles/header.css'

export default function HeaderFood ({ slug, info }) {

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

        <header className='__header_rest'>
            <div className="__ctx">
                <button className="__btn" onClick={handleBack}><IconChevronLeft/></button>
                <button className="__btn" onClick={handleShared}><IconShare3/></button>
            </div>
            <div className="__hcd">
                <div className="__avatar"></div>
                <div>
                    <h1>{info?.name}</h1>
                    <p>{info?.text}</p>
                </div>
            </div>
        </header>

    )

}