import { IconChevronLeft } from '@tabler/icons-react'
import { useCart } from '@/context/CartContext'

import './styles/page.css'

export default function CartPage () {

    const { cart } = useCart();

    return (

        <>
        
            <header className='__header_cart'>
                <a href='/' className='__btn_back'><IconChevronLeft/></a>
                <h3>Carrito de compras</h3>
            </header>

            <main className={`__main_cart ${cart.length === 0 ? '__main_cart_full' : '__main_cart_pay'}`}>
                {cart.length === 0 && (
                    <div className='__content_box'>
                        <h2>Carrito vacio</h2>
                        <p>No tienes productos en tu carrito.</p>
                        <a href='/' className='__btn_back_primary'>Volver al inicio</a>
                    </div>
                )}
            </main>

            {cart.length > 0 && (
                <footer className={`__footer_cart`}>
                    <button className='__btn_pay'>Pagar</button>
                </footer>
            )}

        </>

    )

}