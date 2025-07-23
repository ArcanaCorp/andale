import { useEffect, useState } from "react";
import { IconX } from "@tabler/icons-react";
import { useUI } from "@/context/UIContext";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

import { getInfoDish } from "@/services/foods.services";

export default function DishDetails () {

    const { modal, handleChangeModal } = useUI();
    const { cart, addToCartItem } = useCart();

    const [ info, setInfo ] = useState(null)
    const [ loading, setLoading ] = useState(true)

    // Verifica si el producto ya está en el carrito
    const isInCart = cart.products?.some(item => item.id === modal?.id);

    const handleAddToCart = (itm) => {
        addToCartItem(itm)
        if (isInCart) return toast.success('Se actualizó el carrito')
            toast.success('Se agregó al carrito')
    }

    useEffect(() => {
        const getDishInfo = async () => {
            try {
                const data = await getInfoDish(modal?.bussines, modal?.id);
                if (!data.ok) return console.warn(data.message);
                    setInfo(data?.dish)
            } catch (error) {
                console.error(error);
                setInfo(null)
            } finally {
                setLoading(false)
            }
        }
        getDishInfo();
    }, [modal])

    return (

        <>
        
            <div className="__overlay">
                <div className="__modal __modal_dish">
                    <div className="__modal_head">
                        <button className="__btn_close" onClick={() => handleChangeModal('', '', '')}><IconX/></button>
                    </div>
                    {loading ? (
                        <div className="__modal_load">
                            <span className="__loader"></span>
                        </div>
                    ) : (
                        <>
                        
                            <div className="__modal_body">
                                <div className="__head_img"></div>
                                <div className="__head_info">
                                    <div>
                                        <p>{info?.category}</p>
                                        <h1>{info?.name}</h1>
                                        <p>{info?.text}</p>
                                    </div>
                                    <p className="__price">S/ {info?.price}</p>
                                </div>
                            </div>

                            <div className="__modal_footer">
                                <button className="__btn_add" onClick={() => handleAddToCart(info)}>{isInCart ? 'Se agregó al carrito' : 'Agregar al carrito'}</button>
                            </div>

                        </>
                    )}
                </div>
            </div>

        </>

    )

}