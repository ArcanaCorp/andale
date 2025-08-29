import { useEffect, useState } from "react"
import { getPlacesbyCategory } from "../services/place.service";
import Place from "./Place";

export default function List ({ filter }) {

    const [ places, setPlaces ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    const getPlaces = async (flt) => {
        try {
            
            const data = await getPlacesbyCategory(flt);
            if (!data.ok) throw new Error(data.message);
                setPlaces(data.data)

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getPlaces(filter);
    }, [filter])

    return (

        <>
        
            <ul className={`__list_places`}>

                {!loading ? (
                    places.length > 0 ? (
                        places.map((p) => ( <Place key={p.id} place={p} /> ))
                    ) : (
                        <li>No hay lugares</li>
                    )
                ) : (
                    <li>Cargando...</li>
                )}

            </ul>

        </>

    )

}