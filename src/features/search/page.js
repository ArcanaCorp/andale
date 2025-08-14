import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { IconChevronLeft, IconSearch } from '@tabler/icons-react';

import { getSearching } from './services/search.service';
import Skeleton from './components/Skeleton';

import './styles/page.css'
import SearchItem from './components/SearchItem';
export default function Search () {

    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(query.trim());
        }, 500);
        return () => clearTimeout(handler);
    }, [query])

    useEffect(() => {
        if (debouncedQuery.length === 0) {
            setResults(null);
            return;
        }
        fetchResults(debouncedQuery);
    }, [debouncedQuery]);

    const fetchResults = async (searching) => {
        try {
            setLoading(true)
            const data = await getSearching(searching)
            if (!data.ok) return setError(data.message)
                setResults(data.data)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleManualSearch();
        }
    }

    const handleManualSearch = () => {
        if (query.trim().length > 0) {
            setDebouncedQuery(query.trim()); // Fuerza la búsqueda al hacer clic
        }
    };

    return (

        <>
        
            <header className='__header_search'>
                <button className='__btn __btn_back' onClick={() => navigate(-1)}><IconChevronLeft/></button>
                <div className='__search_box'>
                    <input className='__entry' name='search' id='search' inputMode='search' value={query} placeholder='Lugares, restaurantes, hoteles, market y mucho más' onKeyDown={(e) => handleKeyPress(e)} onChange={e => setQuery(e.target.value)} />
                    <div className='__ico' onClick={handleManualSearch}><IconSearch/></div>
                </div>
            </header>

            <main className='__main_search'>
                
                {loading ? (
                    <Skeleton/>
                ) : (
                    error ? (
                        <p style={{ color: 'red' }}>{error}</p>
                    ) : (
                        results === null || query === '' ? (
                            <p>Busca tu lugar favorito</p>
                        ) : (
                            results?.length === 0 ? (
                                <div>No se encontraron resultados para "{query}"</div>
                            ) : (
                                <ul className='__results'>
                                    {results?.map((r) => ( <SearchItem key={r.id} data={r} /> ))}
                                </ul>
                            )
                        )
                    )
                )}
            </main>

        </>

    )

}