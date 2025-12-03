import Images from '@/components/Images'
import './styles/card.css'
import { IconPlus } from '@tabler/icons-react'
import { useCart } from '@/context/CartContext'
import { toast } from 'sonner';
export default function FoodieCard ({ foodie, company }) {
    
    const { addToCart } = useCart();

    const handleAdd = () => {
        addToCart(foodie, company);
        toast.success('Se agrego el producto')
    }

    return (

        <li className={`__card_food`}>
            <div className='__card_info'>
                <h3>{foodie.name}</h3>
                <p>{foodie.description}</p>
                <p>S/. {(foodie.price).toFixed(2)}</p>
            </div>
            <div className='__card_image'>
                <button className='__btn_add' onClick={() => handleAdd(foodie)}><IconPlus/></button>
                <Images img={foodie?.image} alt={`${foodie?.name}`} />
            </div>
        </li>

    )

}