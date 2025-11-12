import Images from '@/components/Images'
import './styles/card.css'
export default function SearchCard ({ item }) {

    return (

        <li className='__card_search_item'>
            <a href={`${item.link}/${item.sub}`} className='__card_search_item_link'>
                <div className='__image'>
                    <Images img={item.image} alt={`Búsqueda de ${item.name}`} />
                </div>
                <div className='__text'>
                    <h4>{item.name}</h4>
                    <p>{item.text}</p>
                </div>
            </a>
        </li>

    )

}