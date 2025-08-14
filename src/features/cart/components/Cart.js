import { IconMinus, IconPlus, IconTrash } from "@tabler/icons-react";
import { useCart } from "../context/CartContext";

import placeholder from '@/shared/images/placeholder.png'
import './styles/cart.css'

export default function CartCard ({ product }) {

    const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

    const handleMinusCart = () => {
        if (product.amount === 1) {
            removeFromCart(product.id)
        } else {
            decreaseQuantity(product.id)
        }
    }

    return (

        <li className="__cart">
            <div className="__cart_avatar">
                <img src={product?.image ? product?.image : placeholder} alt={`Foto del producto ${product?.name}`} loading="eager" fetchPriority="high" />
            </div>
            <div className="__cart_text">
                <h4>{product.name}</h4>
                <p>S/ {product.price}</p>
            </div>
            <div className="__cart_btts">
                <button className="__btts __btts_delete" onClick={handleMinusCart}>{product.amount > 1 ? <IconMinus/> : <IconTrash/>}</button>
                <div className="__btts __btts_amount">{product.amount}</div>
                <button className="__btts __btts_add" onClick={() => increaseQuantity(product?.id)}><IconPlus/></button>
            </div>
        </li>

    )

}