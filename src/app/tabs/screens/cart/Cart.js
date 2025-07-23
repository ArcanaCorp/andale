import { useNavigate } from "react-router-dom";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useCart } from "@/context/CartContext";
import FoodCart from "@/components/cards/Foods/FoodCart";

import emptyCart from '@/assets/img/empty_cart.png'
import './styles/cart.css'

export default function Cart () {

    const navigate = useNavigate();
    const { cart } = useCart();

    const handleOrder = () => {
        if (!cart.products.length) {
            alert("El carrito está vacío");
            return;
        }

        let message = `Hola, quisiera hacer el siguiente pedido:\n\n`;

        cart.products.forEach(item => {
            message += `• ${item.amount}x ${item.name} - S/ ${item.price}\n`;
        });

        message += `\nTotal: S/ ${cart.total.toFixed(2)}`;

        const phone = "51995984231";
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };
    
    return (

        <>
            <header className="__header_cart">
                <button className="__btn_back" onClick={() => navigate('/restaurants', { viewTransition: true })}><IconChevronLeft/></button>
                <h1 className="__tit">Carrito</h1>
            </header>
            {cart?.products.length === 0 ? (
                <main className="__main_empty">
                    <div className="__box">
                        <img src={emptyCart} className="__image" alt={`Tienes tu carrito vacío`} loading="lazy" />
                        <h2>El carrito está vacio</h2>
                        <button onClick={() => navigate('/restaurants', { viewTransition: true })}>Ir a buscar delicias</button>
                    </div>
                </main>
            ) : (
                <>
                    <main className="__main_cart">
                        {cart?.products.map((c) => (
                            <FoodCart key={c.id} item={c} />
                        ))}
                        <div className="__orders">
                            <div className="__row_order_head">
                                <p>Productos</p>
                                <p>Total</p>
                            </div>
                            {cart?.products.map((c) => (
                                <div key={c.id} className="__row_order">
                                    <p>{c.name}</p>
                                    <p>S/. {(c.price * c.amount).toFixed(2)}</p>
                                </div>
                            ))}
                            <div className="__row_order">
                                <p>Subtotal</p>
                                <p>S/. {(cart?.total).toFixed(2)}</p>
                            </div>
                            <div className="__row_order">
                                <p>Total</p>
                                <p>S/. {(cart?.total).toFixed(2)}</p>
                            </div>
                        </div>
                    </main>
                    <footer className="__footer_cart">
                        <button className="__btn_order" onClick={handleOrder}>
                            <p className="__txt_total">S/. {(cart?.total).toFixed(2)}</p>
                            <p className="__txt_order">Hacer Pedido <IconChevronRight/></p>
                        </button>
                    </footer>
                </>
            )}
        </>

    )

}