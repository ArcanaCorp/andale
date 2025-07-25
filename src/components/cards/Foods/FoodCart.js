import { IconMinus, IconPlus, IconTrash } from '@tabler/icons-react'
import { useCart } from '@/context/CartContext'
import { useProfile } from '@/context/BussinesProfileContext';

import './styles/foodcart.css'

export default function FoodCart ({ item }) {

    const { profile } = useProfile();
    const { removeFromCartItem, updateCartItemAmount } = useCart();

    const image = item?.image === '' ? profile?.photo : item?.image;

    return (

        <div className='__food_cart'>
            <div className='__rowA'>
                <div className='__image' style={{backgroundImage: `url(${image})`}}>
                    <img src={image} alt={`Foto del delicioso plato de ${item.name} solo por Ándale Ya!`} loading='lazy' style={{display: 'none'}} />
                </div>
                <div className='__info'>
                    <h3>{item?.name}</h3>
                    <p>S/. {(item?.price * item?.amount).toFixed(2)}</p>
                </div>
            </div>
            <div className='__rowB'>
                <div className='__controls'>
                    {item.amount > 1 ? (
                        <button className='__btn_controls' onClick={() => updateCartItemAmount(item?.id, false)}><IconMinus/></button>
                    ) : (
                        <button className='__btn_controls' onClick={() => removeFromCartItem(item?.id)}><IconTrash/></button>
                    )}
                    <div className='__btn_controls'>{item?.amount}</div>
                    <button className='__btn_controls' onClick={() => updateCartItemAmount(item?.id, true)}><IconPlus/></button>
                </div>
            </div>
        </div>

    )

}