import { Link, useLocation } from 'react-router-dom';
import { tabsItems } from '../../config/tabs';
import './styles/header.css'
export default function Header () {

    const location = useLocation();

    return (

        <header className="__header_tab">
            <div className="__content_header_tab">
                <div className="__row __row_A">
                    <p className='__parraph'>Bienvenido,</p>
                    <h1 className='__welcome'>Que gusto tenerte</h1>
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