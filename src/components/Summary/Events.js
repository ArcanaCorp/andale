import { useEffect, useState } from "react"
import { getEvents } from "../../services/entity.service";
import CardEvent from "../Card/CardEvent";

export default function Events () {

    const [ events, setEvents ] = useState([]);

    useEffect(() => {
        getEvents().then(setEvents)
    }, [])

    return (
        <>
            <div className="w-full mb-md">
                <div className="flex mb-md px-md align-center justify-between">
                    <h2 className="text-md">Eventos próximos</h2>
                </div>
                <ul className="flex gap-xs overflow-x scroll-hidden pl pr" style={{"--pl": "var(--spacing-md)", "--pr": "var(--spacing-md)"}}>
                    {events.map((venue) => (
                        <CardEvent key={venue.id} data={venue} />
                    ))}
                </ul>
            </div>
        </>
    )
}