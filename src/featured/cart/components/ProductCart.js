import { IconMinus, IconPlus, IconTrash } from "@tabler/icons-react";
import './styles/productcart.css'
import { useCart } from "@/context/CartContext";
import Images from "@/components/Images";
import { REACT_APP_API } from '@/config'

export default function ProductCart ({ product, sub }) {

    const { updateAmount, removeFromCart } = useCart();

    const handleChangeAmount = (operation) => {
        const amount = 
        operation === "sum" 
            ? product.amount + 1 
            : Math.max(1, product.amount - 1);

        updateAmount(product.id, amount);
    }

    const urlImage = product.image !== '' ? `${REACT_APP_API}/socio/${sub}/bussines/products/image/${product.image}` : null;

    return (
        <li className="--product-cart flex align-center justify-between">
            <div className="--product-cart-left flex gap-xs">
                <div className="--product-image">
                    <Images img={urlImage} alt={`${product.name}`} />
                </div>
                <div>
                    <h4>{product.name}</h4>
                    <p className="text-xs text-gray"><sup>S/</sup>{(product.box ? product.priced : product.price).toFixed(2)}</p>
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