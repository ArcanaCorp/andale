import { useState } from "react";
import { toast } from "sonner";
import { IconChevronDown, IconChevronLeft, IconChevronUp, IconFilePlus } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./context/CartContext";
import Empty from "../pages/Empty";
import CartCard from "./components/Cart";
import Alert from "../components/Alert";

import './styles/page.css'
export default function Cart () {

    const navigate = useNavigate();
    const { cart } = useCart();
    const [ delivery, setDelivery ] = useState(true)
    const [ notesView, setNotesView ] = useState(false);
    const [ notes, setNotes ] = useState('')
    const [ sending, setSending ] = useState(false);

    const handleSendOrder = async () => {
        try {
            setSending(true)
        } catch (error) {
            toast.error('Ups', { description: 'Hubo un error al enviar la orden' })
        } finally {
            setSending(false)
        }
    }

    return (

        <>
        
            <header className="__header_cart">
                <button className="__btn" onClick={() => navigate(-1)}><IconChevronLeft/></button>
                <h3>Carrito de compras</h3>
            </header>

            <main className="__main_cart">
                {cart?.products.length === 0 && ( <Empty scrn={'cart'} /> )}
                <section className="__company">
                    <div className="__row">
                        <div className="__avatar">
                            <img src={cart?.company?.photo} alt={`Foto de ${cart?.company?.name}`} loading="lazy"  />
                        </div>
                        <div className="__info">
                            <h3>{cart?.company?.name}</h3>
                            <p>{cart?.company?.location}</p>
                        </div>
                    </div>
                    <a href={`/${cart?.company?.short}`} className="__link __link_primary">Ir al local</a>
                </section>
                <section className="__send">
                    <div className="__box_send">
                        <button className={`__btn ${delivery ? '__btn--active' : ''}`} onClick={() => setDelivery(true)}>Delivery</button>
                        <button className={`__btn ${!delivery ? '__btn--active' : ''}`} onClick={() => setDelivery(false)}>Retiro en local</button>
                    </div>
                </section>
                {!delivery && (
                    <section className="__box_alert">
                        <Alert title={'Pedido para llevar'} text={'Acércate al local a buscar tu pedido'} type={'info'} />
                    </section>
                )}
                <section className="__product_lst">
                    <ul className="__lst">
                        {cart.products.map((p) => (
                            <CartCard key={p.id} product={p} />
                        ))}
                    </ul>
                </section>
                <section className="__notes_company">
                    <div className="__rowA" onClick={() => setNotesView(!notesView)}>
                        <div className="__tlt"><IconFilePlus/> <h3>Notas para el local</h3></div>
                        {!notesView ? <IconChevronDown/> : <IconChevronUp/>}
                    </div>
                    {notesView && (
                        <div className="__rowB">
                            <textarea className="__textbox" name="notes" id="notes" placeholder="Ej. quiero más kepchup" value={notes} onChange={(e) => setNotes(e.target.value)}/>
                        </div>
                    )}
                </section>
                <section className="__target">
                    <div className="__row">
                        <h2>Resumen</h2>
                        <ul className="__lst_prices">
                            <li className="__lst_price">
                                <p>Productos</p>
                                <p>S/ {(cart?.total).toFixed(2)}</p>
                            </li>
                            <li className="__lst_price">
                                <p>Delivery</p>
                                <p>S/ 2.00</p>
                            </li>
                            <li className="__lst_price">
                                <p>Total</p>
                                <p>S/ {(cart?.total + 2).toFixed(2)}</p>
                            </li>
                        </ul>
                    </div>
                </section>
            </main>

            <footer className="__footer_cart">
                {cart?.products.length > 0 && (
                    <button className="__btn __btn_primary" onClick={handleSendOrder}>{sending ? 'Enviando...' : 'Realizar pedido'}</button>
                )}
            </footer>

        </>

    )

}