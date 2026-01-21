import Images from '@/components/Images'
import './styles/card.css'
export default function FoodieCard ({ foodie }) {

    return (

        <li className={`__card_food`}>
            <div className='__card_info'>
                <h3>{foodie.name}</h3>
                <p>{foodie.description}</p>
                <p>S/. {(foodie.price).toFixed(2)}</p>
            </div>
            <div className='__card_image'>
                <Images img={foodie?.image} alt={`${foodie?.name}`} />
            </div>
        </li>

    )

}