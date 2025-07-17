import { useEffect } from "react"
import { useDB } from "@/context/DBContext";
import { serviceListSections } from "@/services/sections.service";

import Place from "./cards/Place";

import './styles/listplaces.css'

export default function ListPlaces () {

    const { sections, savedSections} = useDB();

    useEffect(() => {
        const getSectionsList = async () => {
            if (sections.length === 0) {
                try {
                    const data = await serviceListSections();
                    if (!data.ok) {
                        console.warn(data.message);
                        return;
                    }
                    savedSections(data.data)
                } catch (error) {
                    console.error(error);
                }
            }
        }
        getSectionsList();
    }, [sections, savedSections])

    return (

        <>
        
            {sections.map((s) => (
                <section key={s.id} className={`__section __section_places`}>
                    <div className={`__section_tti`}>
                        <h2>{s.theme}</h2>
                    </div>
                    <ul className="__section_scroll">
                        {s.places.map((sp) => (
                            <Place key={sp.slug} place={sp} />
                        ))}
                    </ul>
                </section>
            ))}

        </>

    )

}