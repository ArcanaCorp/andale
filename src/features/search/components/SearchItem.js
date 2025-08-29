import './styles/searchitem.css'
export default function SearchItem ({ data }) {

    return (
        <li className='__search_item'>
            <a href={`/${data?.sub}`} className='__search_item_link'>
                <div className='__search_item_avatar'>
                    <img src={data?.image} alt={`Búsqueda de ${data?.name} - ${data?.text} - Ándale Ya!`} loading='lazy' />
                </div>
                <div className='__search_item_text'>
                    <h3 className='__search_item_text_h3'>{data.name}</h3>
                    <p className='__search_item_text_p'>{data.text}</p>
                </div>
            </a>
        </li>
    )

}