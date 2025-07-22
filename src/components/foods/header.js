import { useNavigate } from "react-router-dom";
import { IconChevronLeft, IconShare3 } from "@tabler/icons-react";

import './styles/header.css'

export default function HeaderFood ({ slug, info }) {

    const navigate = useNavigate();

    const handleBack = () => navigate('/restaurants', { viewTransition:true })

    return (

        <header className='__header_rest'>
            <div className="__ctx">
                <button className="__btn" onClick={handleBack}><IconChevronLeft/></button>
                <button className="__btn"><IconShare3/></button>
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