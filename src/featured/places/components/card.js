import { REACT_APP_API_URL } from '@/config/config'
import placeholder from '@/shared/img/placeholder.png'
import './styles/card.css'
import Images from '../../../components/Images'
export default function PlaceCard ({ info }) {

    const imgSrc = info?.images ? `${REACT_APP_API_URL}/places/${info?.sub}/image/${info?.images[0]}` : placeholder;

    return (

        <li className='__card_li'>
            <a href={`/places/${info?.sub}`} className='__card_link'>
                <div className='__card_link_image'>
                    <Images img={imgSrc} alt={`Conoce ${info?.name} ubicado en ${info?.locationName}`} />
                </div>
                <div className='__card_link_text'>
                    <h4>{info?.name}</h4>
                    <p>{info?.locationName} | {info?.category}</p>
                </div>
            </a>
        </li>

    )

}