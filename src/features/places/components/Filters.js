import { useEffect, useState } from "react"
import { getCategories } from "../services/place.service";
import { territory } from "../../../config/db";

export default function Filters ({ filter, change }) {

    const [ filters, setFilters ] = useState([]);
    const [ loading, setLoading ] = useState(true);    

    const getFilters = async () => {
        try {
            const data = await getCategories();
            if (!data.ok) throw new Error(data.message);
                setFilters(data.data)
        } catch (error) {
            console.error(error.message);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (filters.length === 0) 
            getFilters();
    }, [filters])

    return (

        <ul className="__filters">
            {!loading ? (
                <>
                    <li className={`__filter ${filter === 'all' ? '__filter--active' : ''}`} onClick={() => change('all')}>Todo</li>
                    <select className="__filter" onChange={(e) => change(e.target.value)}>
                        <option>Distritos</option>
                        {territory.distritos.map((dtt, idx) => (
                            <option key={idx} value={dtt}>{dtt}</option>
                        ))}
                    </select>
                    {filters.map((f, index) => (
                        <li key={index} className={`__filter ${filter === f ? '__filter--active' : ''}`} onClick={() => change(f)}>{f}</li>
                    ))}
                </>
            ) : (
                <>
                    <li className="__filter_load skeleton"></li>
                    <li className="__filter_load skeleton"></li>
                    <li className="__filter_load skeleton"></li>
                    <li className="__filter_load skeleton"></li>
                    <li className="__filter_load skeleton"></li>
                </>
            )}
        </ul>

    )

}