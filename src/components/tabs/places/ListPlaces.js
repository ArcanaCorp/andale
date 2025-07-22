import { useEffect } from "react"
import { useDB } from "@/context/DBContext";
import { serviceListSections } from "@/services/sections.service";

import PlaceCard from "@/components/cards/Places/PlaceCard";

import './styles/listplaces.css'

export default function ListPlaces () {

    const { placesList, savedPlacesList } = useDB();

    useEffect(() => {
        const getSectionsList = async () => {
            if (placesList.length === 0) {
                try {
                    const data = await serviceListSections();
                    if (!data.ok) {
                        console.warn(data.message);
                        return;
                    }
                    savedPlacesList(data.data)
                } catch (error) {
                    console.error(error);
                }
            }
        }
        getSectionsList();
    }, [placesList, savedPlacesList])

    return (

        <>
        
            {placesList.map((s) => (
                <section key={s.id} className={`__section __section_places`}>
                    <div className={`__section_tti`}>
                        <h2>{s.theme}</h2>
                    </div>
                    <ul className="__section_scroll">
                        {s.places.map((sp) => (
                            <PlaceCard key={sp.slug} place={sp} />
                        ))}
                    </ul>
                </section>
            ))}

        </>

    )

}