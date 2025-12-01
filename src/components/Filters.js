import { useFilter } from '@/context/FilterContext'
import { TERRITORY_LIST } from '../config/config';
import './styles/filters.css'
export default function Filters ({ defecto, filtros }) {

    const { filter, handleChangeFilter, handleChangeFilterLocation } = useFilter();
    
    return (

        <ul className="__filters_navigate">
            <li className={`__filter ${filter === 'all' ? '__filter--active' : ''}`} onClick={() => handleChangeFilter('all')}>{defecto}</li>
            <select className='__filter' onChange={(e) => handleChangeFilterLocation(e.target.value)}>
                <option value={''} hidden selected>Distritos</option>
                {TERRITORY_LIST.distritos.map((d, i) => (
                    <option key={i} value={d}>{d}</option>
                ))}
            </select>
            {filtros.map((filtro, idx) => (
                <li className={`__filter ${filter === filtro?.category ? '__filter--active' : ''}`} onClick={() => handleChangeFilter(filtro?.category)} key={idx}>{filtro?.category}</li>
            ))}
        </ul>

    )

}