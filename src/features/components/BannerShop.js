import { useCart } from '../cart/context/CartContext'
import './styles/bannershop.css'
export default function BannerShop () {

    const { cart } = useCart();
    const { products } = cart;
    
    return (

        <div className={`__banner_shop`}>
            <div className='__col'>
                <p className='__num_product'>{products?.length} producto</p>
                <p className='__prc_product'>S/ {cart?.total}</p>
            </div>
            <a href="/cart" className='__btn_cart'>Ver carrito</a>
        </div>

    )

}