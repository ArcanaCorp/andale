import { useEffect, useState } from 'react'
import { IconChevronLeft, IconSearch } from '@tabler/icons-react'
import { getSearchQuery } from './services/search.service'
import SearchCard from './components/card'
import './styles/page.css'
export default function SearchPage () {

    const [ query, setQuery ] = useState('')
    const [ results, setResults ] = useState([])
    const [ loading, setLoading ] = useState(false)
    const [error, setError] = useState(null)

    // Efecto para ejecutar la búsqueda con debounce
    useEffect(() => {
        if (!query.trim()) {
            setResults([])
            setError(null)
            return
        }

        const delayDebounce = setTimeout(async () => {
            setLoading(true)
            setError(null)

            const res = await getSearchQuery(query)
            if (res.ok && Array.isArray(res.data)) {
                const ordered = [...res.data].sort((a, b) => b.relevance - a.relevance)
                setResults(ordered)
            } else {
                setResults([])
                setError(res.message)
            }

            setLoading(false)
        }, 400) // 400ms debounce

        // Cleanup: si el usuario sigue escribiendo, se cancela la búsqueda anterior
        return () => clearTimeout(delayDebounce)
    }, [query])

    return (

        <>
        
            <header className='__header_search'>
                <a href='/' className='__btn_back'><IconChevronLeft/></a>
                <div className='__search_bar'>
                    <input type='text' className='__entry_search' name='search' id='search' placeholder='Buscar...' value={query} onChange={(e) => setQuery(e.target.value)} />
                    <span className='__span_ico'><IconSearch/></span>
                </div>
            </header>

            <main className='__main_search'>
                {query === '' ? (
                    <div className='__full_main_search'>
                        <p>Busca lo que más prefieras.</p>
                    </div>
                ) : loading ? (
                    <div className='__full_main_search'>
                        <p>Buscando...</p>
                    </div>
                ) : error ? (
                    <div className='__full_main_search'>
                        <p>Error: {error}</p>
                    </div>
                ) : results.length > 0 ? (
                    <ul className='__list_search_items'>
                        {results.map((rpta) => (
                            <SearchCard key={rpta.id} item={rpta} />
                        ))}
                    </ul>
                ) : (
                    <div className='__full_main_search'>
                        <p>No se encontraron resultados para <b>"{query}"</b></p>
                    </div>
                )}
            </main>

        </>

    )

}