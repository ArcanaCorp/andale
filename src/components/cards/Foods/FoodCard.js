import { useUI } from '@/context/UIContext'
import placeholder from '@/assets/img/placeholder.png'

import './styles/food.css'

export default function FoodCard ({ buss, food }) {

    const { handleChangeModal } = useUI();

    const image = food.image === '' ? placeholder : food.image

    return (

        <div className="__card __card_food"  style={{backgroundImage: `url(${image})`}} onClick={() => handleChangeModal('food', food?.id)}>
            <img src={image} alt={`Pide ${food?.name} - ${food?.category} esta delicia de ${buss} solo por Ándale Ya!`} loading="lazy" />
            <div className="__cpx">
                <h3 className="__title">{food.name}</h3>
                <p className="__location">{food.category} | S/.{food.price}</p>
            </div>
        </div>

    )

}