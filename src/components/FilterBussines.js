import './styles/filtersbussines.css'
export default function FilterBussines ({filters}) {
    return (
        <nav className='__nav_bssn'>
            <ul className='__nav_lst'>
                <li className={`__nav_itm __nav_itm--active`}>Todo</li>
                {filters.map((ctg) => (
                    <li key={ctg.id} className={`__nav_itm`}>{ctg.name}</li>
                ))}
            </ul>
        </nav>
    )
}