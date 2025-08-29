import Card from './Card'
import './styles/section.css'
export default function Section ({title, items}) {

    const links = {
        'Los mejores lugares por conocer' : '/places',
        'Lo mejor de nuestro sabor': '/foodies',
        'Descansa en el paraíso': '/hotels',
        'Llévate los mejor de Jauja': 'commerces'
    }

    const link = links[title] || '/'

    return (

        <section className={`__section`}>
            <div className='__ttl'>
                <h3 className='__title'>{title}</h3>
                {items.length === 5 && (
                    <a href={link} className='__link'>Ver más</a>
                )}
            </div>
            <ul className='__list'>
                {items.length > 0 ? (
                    items.map((data, i) => ( <Card key={i} data={data} /> ))
                ) : (
                    <div className='__empty_card'></div>
                )}
            </ul>
        </section>

    )

}