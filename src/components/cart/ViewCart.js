import { useNavigate } from 'react-router-dom'
import './styles/viewcart.css'
export default function ViewCart ({ cart }) {

    const navigate = useNavigate();
    const text = cart?.products.length > 1 ? 'productos' : 'producto'

    return (

        <div className='__footer_view_cart'>
            <div className='__col_view_cart'>
                <p>{cart?.products.length} {text}</p>
                <h3>S/. {(cart?.total).toFixed(2)}</h3>
            </div>
            <button className='__btn_view_cart' onClick={() => navigate('/cart', { viewTransition: true })}>Ver carrito</button>
        </div>

    )

}