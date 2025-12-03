import { IconMinus, IconPlus, IconTrash } from "@tabler/icons-react";
import './styles/productcart.css'
import { useCart } from "@/context/CartContext";

export default function ProductCart ({ product }) {

    const { updateAmount, removeFromCart } = useCart();

    const handleChangeAmount = (operation) => {
        const amount = 
        operation === "sum" 
            ? product.amount + 1 
            : Math.max(1, product.amount - 1);

        updateAmount(product.id, amount);
    }

    return (
        <li className="--product-cart flex align-center justify-between">
            <div className="--product-cart-left flex gap-xs">
                <div className="--product-image"></div>
                <div>
                    <h4>{product.name}</h4>
                    <p className="text-xs text-gray"><sup>S/</sup>{(product.price).toFixed(2)}</p>
                </div>
            </div>
            <div className="--product-cart-right">
                <div className="--product-cart-update flex">
                    {product.amount > 1 ? (
                        <button className="--btn-update" onClick={() => handleChangeAmount("min")}><IconMinus/></button>
                    ) : (
                        <button className="--btn-update" onClick={() => removeFromCart(product.id)}><IconTrash/></button>
                    )}
                    <div className="--btn-update">{product.amount}</div>
                    <button className="--btn-update" onClick={() => handleChangeAmount("sum")}><IconPlus/></button>
                </div>
            </div>
        </li>
    )
}