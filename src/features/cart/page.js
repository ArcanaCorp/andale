import { IconChevronLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./context/CartContext";
import Empty from "../pages/Empty";

import './styles/page.css'
import CartCard from "./components/Cart";

export default function Cart () {

    const navigate = useNavigate();
    const { cart } = useCart();

    return (

        <>
        
            <header className="__header_cart">
                <button className="__btn" onClick={() => navigate(-1, { viewTransition: true })}><IconChevronLeft/></button>
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
                <section className="__product_lst">
                    <ul className="__lst">
                        {cart.products.map((p) => (
                            <CartCard key={p.id} product={p} />
                        ))}
                    </ul>
                </section>
            </main>

        </>

    )

}