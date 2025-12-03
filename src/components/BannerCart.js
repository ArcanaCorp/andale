import { useCart } from '../context/CartContext'
import './styles/bannercart.css'
export default function BannerCart () {

    const { cart } = useCart();

    return (
        <a href='/cart' className={`--btn-float-cart ${cart.productos.length > 0 ? '--btn-float-cart--active' : ''} flex gap-xs bg-primary text-white rounded-full px-md py-xs transition`}>Ver carrito <span className='grid center bg-dark rounded-full text-xs'>{cart.productos.length}</span></a>
    )
}   