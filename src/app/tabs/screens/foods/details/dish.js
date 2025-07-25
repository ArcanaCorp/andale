import { useState } from "react";
import { toast } from "sonner";
import { IconMinus, IconPlus, IconTrash } from "@tabler/icons-react";

import { useUI } from "@/context/UIContext";
import { useCart } from "@/context/CartContext";
import { useProfile } from "@/context/BussinesProfileContext";

import './styles/dish.css'

export default function DishDetails ({ info }) {

    const { modal, handleChangeModal } = useUI()
    const { profile } = useProfile()
    const { cart, addToCartItem, removeFromCartItem } = useCart();
    const productCart = cart?.products.find((pc) => pc.id === info?.id);
    const [ amount, setAmount ] = useState(!productCart ? 1 : productCart?.amount)

    const isInCart = cart.products?.some(item => item.id === modal?.id);
    const image = info?.image === '' ? profile?.photo : info?.image

    const removeFromCart = (id) => {
        removeFromCartItem(id)
        handleChangeModal('', '', '')
        toast.error('Se eliminó del carrito')
    }

    const handleChangeAmount = (state) => setAmount(state ? amount + 1 : amount - 1)

    const handleAddToCart = (itm, amount, profile) => {
        addToCartItem(itm, amount, profile)
        if (isInCart) return toast.success('Se actualizó el carrito')
            toast.success('Se agregó al carrito')
    }

    return (

        <>
        
            <div className="__modal_body">
                <div className="__food_edit">
                    <div className="__col_A">
                        <div className="__avatar" style={{backgroundImage: `url(${image})`}}>
                            <img src={info?.image} alt={`Prueba este delicioso plato ${info?.name} y pídelo solo por ÁndaleYa!`} loading="lazy" style={{display: 'none'}} />
                        </div>
                        <div>
                            <h3>{info?.name}</h3>
                            <p>S/. {(info?.price *  amount).toFixed(2)}</p>
                        </div>
                    </div>
                    <div className="__col_B">
                        <div className="__controls">
                            {amount === 1 ? (
                                <button className="__control" onClick={() => removeFromCart(info?.id)}>{<IconTrash/>}</button>
                            ) : (
                                <button className="__control" onClick={() => handleChangeAmount(false)}>{<IconMinus/>}</button>
                            )}
                            <div className="__control">{amount}</div>
                            <button className="__control" onClick={() => handleChangeAmount(true)}><IconPlus/></button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="__modal_footer">
                <button className="__btn_add" onClick={() => handleAddToCart(info, amount, profile)}>{isInCart ? 'Actualizar carrito' : 'Agregar al carrito'}</button>
            </div>

        </>

    )

}