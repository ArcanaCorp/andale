import { useNavigate } from "react-router-dom";
import { IconChevronLeft } from "@tabler/icons-react";
import Empty from "../pages/Empty";

import './styles/page.css'

export default function Notifications () {

    const navigate = useNavigate()

    return (

        <>
        
            <header className="__header_notify">
                <button className="__btn" onClick={() => navigate(-1, { viewTransition: true })}><IconChevronLeft/></button>
                <h3>Notificaciones</h3>
            </header>

            <main className="__main_notify">
                <Empty scrn={'notify'} />
            </main>

        </>

    )

}