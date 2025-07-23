import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IconShoppingBag } from '@tabler/icons-react';
import { useCart } from '@/context/CartContext';
import { tabsItems } from '@/config/tabs';
import './styles/header.css'

export default function Header () {

    const location = useLocation();
    const navigate = useNavigate();
    const { cart } = useCart();

    const handleGoToCart = () => navigate('/cart', { viewTransition: true })

    return (

        <header className="__header_tab">
            <div className="__content_header_tab">
                <div className="__row __row_A">
                    <div>
                        <p className='__parraph'>Bienvenido,</p>
                        <h1 className='__welcome'>Que gusto tenerte</h1>
                    </div>
                    <button className='__btn_shopping' onClick={handleGoToCart}>
                        <IconShoppingBag/>
                        {cart.products.length > 0 && (
                            <span className='__span_badge'>{cart.products.length}</span>
                        )}
                    </button>
                </div>
                <div className="__row __row_B">
                    <a href="/search" className='__search'>Busca lugares, restaurantes, hoteles y más</a>
                </div>
                <nav className="__row __row_C">
                    <ul className='__tabs'>
                        {tabsItems.map((t) => (
                            <li key={t.key} className={`__tab ${location.pathname === t.path ? '__tab--active' : ''}`}>
                                <Link to={`${t.path}`} viewTransition>{t.ico} {t.tab}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>

    )

}