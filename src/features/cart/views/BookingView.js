import { useNavigate } from 'react-router-dom'
import { IconChevronLeft } from '@tabler/icons-react'

import deliveryMan from '@/shared/images/delivery_man.png'
import '../styles/booking.css'

export default function BookingView () {

    const navigate = useNavigate();

    return (

        <>
        
            <header className='__header_book'>
                <button className="__btn" onClick={() => navigate(-1)}><IconChevronLeft/></button>
                <h3>Confirmación de orden</h3>
            </header>

            <main className='__main_book'>
                <div className='__book_card'>
                    <div className='__book_img'>
                        <img src={deliveryMan} alt='' />
                    </div>
                    <h2 className='__book_tit'>Felicitaciones</h2>
                    <p className='__book_txt'>Tu orden fue procesada correctamente y para mayor información sobre el estado de tu pedido ve a la pestaña <b>Ordenes</b></p>
                </div>
            </main>

            <footer className='__footer_book'>
                <button className='__btn_primary' onClick={() => navigate('/')}>Volver al Inicio</button>
            </footer>

        </>

    )

}