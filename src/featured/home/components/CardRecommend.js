import Images from '@/components/Images'
import './styles/cardrecommend.css'
export default function CardRecommend ({ info, link }) {

    return (

        <li className='__card_recommend'>
            <a href={`${link}/${info.sub}`} className='__a_card_recommend'>
                <div className='__card_recommend_img'>
                    <Images img={info.image} alt={`Descubre lugares impresionantes como ${info.name} en Ándale Ya`} />
                </div>
                <div className='__card_recommend_txt'>
                    <h4>{info.name}</h4>
                    <p>{info.text}</p>
                </div>
            </a>
        </li>

    )

}