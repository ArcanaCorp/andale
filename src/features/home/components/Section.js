import Card from './Card'
import './styles/section.css'
export default function Section ({title, items}) {

    return (

        <section className={`__section`}>
            <div className='__ttl'>
                <h3 className='__title'>{title}</h3>
                <a href='/' className='__link'>Ver más</a>
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