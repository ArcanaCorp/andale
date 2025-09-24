import { useState } from "react";
import { toast } from "sonner";
import Cookies from 'js-cookie'
import { IconChevronDown, IconChevronLeft, IconChevronUp, IconEdit, IconFilePlus } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./context/CartContext";
import { useAuth } from "../auth/context/AuthContext";
import { useOrders } from "../orders/context/OrdersContext";
import { serviceNewOrder } from "./services/order.service";
import { usePermissions } from "../permissions/hooks/usePermissions";

import Empty from "../pages/Empty";
import CartCard from "./components/Cart";
import Alert from "../components/Alert";
import BookingView from "./views/BookingView";

import './styles/page.css'
export default function Cart () {

    const navigate = useNavigate();
    const { locationAddress } = usePermissions();
    const { user } = useAuth();
    const { cart, clearCart } = useCart();
    const { addOrder } = useOrders();
    const [ delivery, setDelivery ] = useState(true)
    const [ deliveryAddr, setDeliveryAddr ] = useState(locationAddress || '')
    const [ notesView, setNotesView ] = useState(false);
    const [ notes, setNotes ] = useState('')
    const [ sending, setSending ] = useState(false);

    const [ booking, setBooking ] = useState(false);

    const subttl = (cart?.total).toFixed(2)
    const ttl = delivery ? (cart?.total + 2) : cart?.total; 

    const handleSendOrder = async () => {
        
        const guest_id = Cookies.get('guest_id')
        if (cart?.products.length < 0) return toast.warning('Alerta', { description: 'Ingresa a una cuenta antes de enviar el pedido.' })

        try {

            setSending(true)

            const detalles = {
                user: user?.sub || guest_id,
                company: cart?.company.sub,
                bussines: cart?.company,
                products: cart.products,
                notes: notes,
                delivery: delivery,
                deliveryAddr: delivery ? deliveryAddr : cart?.company.location,
                total: cart?.total,
                date: new Date()
            }

            const data = await serviceNewOrder(detalles);

            if (!data.ok) return toast.warning('Alerta', { description: data.message })

                addOrder(data.data)
                setBooking(true)
                toast.success('Éxito', { description: data.message })

        } catch (error) {
            toast.error('Ups', { description: 'Hubo un error al enviar la orden' })
        } finally {
            setSending(false)
            clearCart();
        }
    }

    if (booking) return <BookingView/>;

    return (

        <>
        
            <header className="__header_cart">
                <button className="__btn" onClick={() => navigate(-1)}><IconChevronLeft/></button>
                <h3>Carrito de compras</h3>
            </header>
            
            {cart?.products.length === 0 ? ( <Empty scrn={'cart'} /> ) : (
                <>
                    <main className="__main_cart">    
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
                        {delivery && (
                            <section className="__box_delivery">
                                <h3>Enviaremos tu pedido aquí</h3>
                                <div className="__bx_entry">
                                    <span className="__ico"><IconEdit/></span>
                                    <input type="text" name="deliveryAddr" id="deliveryAddr" value={deliveryAddr} placeholder="Ingresa tu dirección a enviar" onChange={(e) => setDeliveryAddr(e.target.value)} />
                                </div>
                            </section>
                        )}
                        <section className="__target">
                            <div className="__row">
                                <h2>Resumen</h2>
                                <ul className="__lst_prices">
                                    <li className="__lst_price">
                                        <p>Productos</p>
                                        <p>S/ {subttl}</p>
                                    </li>
                                    {delivery && (
                                        <li className="__lst_price">
                                            <p>Delivery</p>
                                            <p>S/ 2.00</p>
                                        </li>
                                    )}
                                    <li className="__lst_price">
                                        <p>Total</p>
                                        <p>S/ {(ttl).toFixed(2)}</p>
                                    </li>
                                </ul>
                            </div>
                        </section>
                    </main>
                    <footer className="__footer_cart">
                        {
                            cart?.products.length > 0 && (
                                <button className="__btn __btn_primary" onClick={handleSendOrder}>{sending ? 'Enviando...' : 'Enviar pedido'}</button>
                            )
                        }
                    </footer>
                </>
            )}

        </>

    )

}