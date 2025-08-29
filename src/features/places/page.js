import { useState } from 'react';
import { IconChevronLeft } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import Filters from './components/Filters';

import './styles/page.css'
import List from './components/List';

export default function PlacesPage () {

    const navigate = useNavigate();
    const [ filter, setFilter ] = useState('all');

    const handleChangeFilter = (nfil) => setFilter(nfil)

    return (

        <>

            <header className={`__header_p`}>
                <div className='__header_place'>
                    <button className='__btn_back' onClick={() => navigate(-1)}><IconChevronLeft/></button>
                    <h3>Conoce nuevos lugares</h3>
                </div>
                <Filters filter={filter} change={handleChangeFilter} />
            </header>

            <main className='__main_place'>
                <List filter={filter} />
            </main>

        </>

    )

}