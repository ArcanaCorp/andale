import './styles/filtersbussines.css'
export default function FilterBussines ({filters, filter, onChangeFilter}) {

    return (
        <nav className='__nav_bssn'>
            <ul className='__nav_lst'>
                <li className={`__nav_itm ${filter === 'all' ? '__nav_itm--active' :''}`} onClick={() => onChangeFilter('all')}>Todo</li>
                {filters.map((ctg) => (
                    <li key={ctg.id} className={`__nav_itm ${filter === ctg.name ? '__nav_itm--active' :''}`} onClick={() => onChangeFilter(ctg.name)}>{ctg.name}</li>
                ))}
            </ul>
        </nav>
    )
}