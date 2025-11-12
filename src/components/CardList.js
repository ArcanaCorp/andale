import Images from './Images'
import './styles/cardlist.css'
export default function CardList ({ info }) {

    const mapLinks = {
        'restaurant': 'foodies',
        'agency': 'agency',
        'hotel': 'hotels',
        'ecommerce': 'store'
    }

    const category = mapLinks[info?.category] || ''

    return (

        <li className='__card_li'>
            <a href={`/${category}/${info?.sub}`} className='__card_link'>
                <div className='__card_link_image'>
                    <Images img={info?.image || info?.photo} alt={`Restaurante ${info?.name} ubicado en ${info?.text} y solo por Ándale Ya`} />
                </div>
                <div className='__card_link_text'>
                    <h4>{info?.name}</h4>
                    <p>{info?.text}</p>
                </div>
            </a>
        </li>

    )

}