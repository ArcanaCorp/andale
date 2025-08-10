import { IconHeart, IconPlus } from '@tabler/icons-react'

import placeholder from '@/shared/images/placeholder.png'
import './styles/card.css'
export default function Card ({ type, data }) {

    return (

        <>
        
            {type === 'ecommerce' && (
                <li className={`__card __card_${type}`}>
                    <div className='__card_data'>
                        <h3 className='__tit'>{data?.name}</h3>
                        <p className='__text'>{data?.description}</p>
                        <p className='__price'>S/ {data?.price_doce}</p>
                    </div>
                    <div className='__card_photo'>
                        <img src={data?.image !== '' ? data?.image : placeholder} alt={`Foto del producto ${data?.name}`} loading='lazy' />
                        <button className='__btn __btn_heart'><IconHeart/></button>
                        <button className='__btn __btn_add'><IconPlus/></button>
                    </div>
                </li>
            )}

        </>

    )

}