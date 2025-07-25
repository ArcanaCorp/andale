import { IconPlus } from '@tabler/icons-react';
import { useUI } from '@/context/UIContext'
import { useCart } from '@/context/CartContext';

import './styles/food.css'

export default function FoodCard ({ buss, food, filter }) {

    const { handleChangeModal } = useUI();
    const { cart } = useCart()
    
    const image = food?.image === '' || buss?.portada === '' ? buss?.photo : food?.image
    const findCart = cart?.products.find((pc) => pc.id === food.id);

    return (

        <div className={`__card __card_food ${filter !== 'all' && filter !== food?.category ? '__card_food--hidden' : ''}`} onClick={() => handleChangeModal('food', buss?.id, food?.id)}>
            <div className="__text">
                <h3 className="__title">{food.name}</h3>
                <p className="__txtd">{food.text}</p>
                <p className='__price'>S/.{food.price}</p>
            </div>
            <div className='__avatar' style={{backgroundImage: `url(${image})`}}>
                <img src={image} alt={`Pide ${food?.name} - ${food?.category} esta delicia de ${buss?.name} solo por Ándale Ya!`} loading="lazy" />
                <button className={`__btn_add_cart ${findCart ? '__btn_add_cart--active' : ''}`}>{findCart ? findCart.amount : <IconPlus size={18}/>}</button>
            </div>
        </div>

    )

}