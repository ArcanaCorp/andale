import { useUI } from '@/context/UIContext';
import './styles/foodscard.css'
export default function FoodsCard ({ id, name, photo, food }) {
    
    const { handleChangeModal } = useUI();
    const image = food?.image === '' ? photo : food?.image;

    return (

        <>
        
            <div className={`__foods_card`} onClick={() => handleChangeModal('food', id, food?.id)}>
                <div className='__foods_card_image' style={{backgroundImage: `url(${image})`}}>
                    <img src={image} alt={`Prueba este delicioso ${food?.name} un plato de ${name} | ÁndaleYa!`} loading="lazy" style={{display: `none`}} />
                </div>
                <div className={`__foods_card_text`}>
                    <h3>{food?.name}</h3>
                    <p>S/. {food?.price}</p>
                </div>
            </div>

        </>

    )

}