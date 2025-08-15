import { useEffect, useState } from "react";
import { toast } from "sonner";
import { IconMinus, IconPlus, IconX } from "@tabler/icons-react";
import { useDetail } from "../context/DetailContext";
import { useCart } from "../../cart/context/CartContext";

import './styles/modal.css'
import ImageView from "../../components/ImageView";

export default function Modal () {

    const { cart, addToCart, clearCart } = useCart();
    const { toogleModalDetail, modalD } = useDetail();
    const { data } = modalD;
    console.log(data);

    const product = modalD?.data.product;

    const amountCart = cart?.products.find((c) => c.id === modalD?.product?.id);
    const [ amount, setAmount ] = useState(1);

    useEffect(() => {
        if (amountCart) {
            setAmount(amountCart.amount);
        } else {
            setAmount(1);
        }
    }, [amountCart, modalD]);

    const handleChangeAmount = (inc) => setAmount(p => inc ? p + 1 : Math.max(1, p - 1));

    const handleAddToCart = () => {
        if (!cart.company) {
            addToCart(modalD?.data, amount);
            navigator.vibrate(200);
            toast.success('Se añadió al carrito');
            toogleModalDetail();
            return;
        }
        if (cart?.company.sub !== data?.company.sub) {
            toast('¿Deseas cambiar tu carrito de compras?', {
                cancel: {
                    label: 'Cancelar'
                },
                action: {
                    label: 'Sí, cambiar',
                    onClick: () => {
                        clearCart();
                        addToCart(modalD?.data, amount);
                        navigator.vibrate(200)
                        toast.success('Se añadió al carrito')
                        toogleModalDetail();
                    }
                },
                duration: 5000
            })
            return;
        }
        addToCart(modalD?.data, amount)
        navigator.vibrate(200)
        toast.success('Se añadió al carrito')
        toogleModalDetail();
    }

    return (

        <div className={`__overlay`}>
            <div className={`__modal`}>
                <div className={`__modal_head`}>
                    <button className='__btn __btn_close' onClick={toogleModalDetail}><IconX/></button>
                </div>
                <div className='__modal_body'>
                    <div className="__ifo">
                        <h2>{product?.name}</h2>
                        <p>{product?.text}</p>
                        <p className="__prc">S/ {((product?.priceu !== '0.00' ? product?.priceu : product?.priced) * amount)}</p>
                    </div>
                    <div className="__avatar">
                        <ImageView url={product?.image} alt="Foto del plato" width={'100%'} height={'100%'} lazy />
                    </div>
                </div>
                <div className="__modal_footer">
                    <div className="__count">
                        <button className={`__btn __btn_count ${amount === 1 ? '__btn_disabled' : ''}`} onClick={() => handleChangeAmount(false)}><IconMinus/></button>
                        <div className="__numb">{amount}</div>
                        <button className={`__btn __btn_count`} onClick={() => handleChangeAmount(true)}><IconPlus/></button>
                    </div>
                    <button className="__btn __btn_add" onClick={handleAddToCart}>Agregar</button>
                </div>
            </div>
        </div>

    )

}