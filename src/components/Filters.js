import { useFilter } from '@/context/FilterContext'
import './styles/filters.css'
export default function Filters ({ defecto, filtros }) {

    const { filter, handleChangeFilter } = useFilter();
    
    return (

        <ul className="__filters_navigate">
            <li className={`__filter ${filter === 'all' ? '__filter--active' : ''}`} onClick={() => handleChangeFilter('all')}>{defecto}</li>
            {filtros.map((filtro, idx) => (
                <li className={`__filter ${filter === filtro?.category ? '__filter--active' : ''}`} onClick={() => handleChangeFilter(filtro?.category)} key={idx}>{filtro?.category}</li>
            ))}
        </ul>

    )

}