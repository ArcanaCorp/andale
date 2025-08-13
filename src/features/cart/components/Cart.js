import { IconPlus, IconTrash } from "@tabler/icons-react";
import placeholder from '@/shared/images/placeholder.png'
import './styles/cart.css'

export default function CartCard ({ product }) {

    console.log(product);
    

    return (

        <li className="__cart">
            <div className="__cart_avatar">
                <img src={product?.image ? product?.image : placeholder} alt={`Foto del producto ${product?.name}`} />
            </div>
            <div className="__cart_text">
                <h4>{product.name}</h4>
                <p>S/ {product.price}</p>
            </div>
            <div className="__cart_btts">
                <button className="__btts __btts_delete"><IconTrash/></button>
                <div className="__btts __btts_amount">{product.amount}</div>
                <button className="__btts __btts_add"><IconPlus/></button>
            </div>
        </li>

    )

}