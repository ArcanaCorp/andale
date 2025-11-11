import { useState } from 'react'
import './styles/main.css'
export default function MainSubAgency ({ details }) {

    const [ filter, setFilter ] = useState('all')

    return (

        <main className="__main_sub_agency">

            <section className={`__section_main_agency __section_main_agency_present`}>
                <span>Agencia de viajes</span>
                <h1>{details?.name}</h1>
                <p>{details?.text}</p>
            </section>

            <nav className='__nav'>
                <ul className='__nav_lst'>
                    <li className={`__nav_itm ${filter === 'all' && '__nav_itm--active'}`} onClick={() => setFilter('all')}>Categoria 0</li>
                    <li className={`__nav_itm ${filter === '1' && '__nav_itm--active'}`} onClick={() => setFilter('1')}>Categoria 1</li>
                    <li className={`__nav_itm ${filter === '2' && '__nav_itm--active'}`} onClick={() => setFilter('2')}>Categoria 2</li>
                    <li className={`__nav_itm ${filter === '3' && '__nav_itm--active'}`} onClick={() => setFilter('3')}>Categoria 3</li>
                </ul>
            </nav>

            <section className={`__section_main_agency`}></section>
            <section className={`__section_main_agency`}></section>
            <section className={`__section_main_agency`}></section>

        </main>

    )

}