import { IconHeart, IconPlus } from '@tabler/icons-react'
import { useCart } from '../../cart/context/CartContext'
import { useDetail } from '../context/DetailContext'

import placeholder from '@/shared/images/placeholder.png'

import './styles/card.css'
export default function Card ({ type, company, data, hidden }) {

    const visibility = hidden === 'all' || hidden === data?.category;

    const { cart } = useCart();
    const { toogleModalDetail } = useDetail();

    const itms = cart?.products.find((c) => c.id === data?.id)

    const itm = {company, product: data}

    return (

        <>

            <li className={`__card_product __card_${type} ${visibility ? '' : '__card--hidden'}`} onClick={() => toogleModalDetail(itm)}>
                <div className='__card_data'>
                    <h3 className='__tit'>{data?.name}</h3>
                    <p className='__text'>{data?.text}</p>
                    <p className='__price'>S/ {data?.priceu === '0.00' ? data?.priced : data?.priceu} <span>{data?.priceu === '0.00' ? 'x12' : ''}</span></p>
                </div>
                <div className='__card_photo'>
                    <img src={data?.image !== '' ? data?.image : placeholder} alt={`Foto del producto ${data?.name} - ${company.name}`} loading='lazy' />
                    <button className='__btn __btn_heart'><IconHeart/></button>
                    <button className={`__btn __btn_add ${itms?.amount > 0 ? '__btn_add_active' : ''}`}>{itms?.amount > 0 ? itms?.amount : <IconPlus/>}</button>
                </div>
            </li>

        </>

    )

}