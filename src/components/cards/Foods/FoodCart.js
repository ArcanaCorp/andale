import { IconMinus, IconPlus, IconX } from '@tabler/icons-react'
import { toast } from 'sonner';
import { useCart } from '@/context/CartContext'

import './styles/foodcart.css'

export default function FoodCart ({ item }) {

    const { removeFromCartItem, updateCartItemAmount } = useCart();

    const handleRemoveItem = (id) => {
        removeFromCartItem(id)
        toast.success('Se eliminó del carrito')
    }

    return (

        <div className='__food_cart'>
            <div className='__image'></div>
            <div className='__info'>
                <div className='__rowA'>
                    <h3>{item?.name}</h3>
                    <button className='__btn_delete' onClick={() => handleRemoveItem(item?.id)}><IconX/></button>
                </div>
                <div className='__rowB'>
                    <p>S/. {item?.price}</p>
                    <div className='__controls'>
                        <button className='__btn_controls' onClick={() => updateCartItemAmount(item?.id, false)}><IconMinus/></button>
                        <div className='__btn_amount'>{item?.amount}</div>
                        <button className='__btn_controls' onClick={() => updateCartItemAmount(item?.id, true)}><IconPlus/></button>
                    </div>
                </div>
            </div>
        </div>

    )

}