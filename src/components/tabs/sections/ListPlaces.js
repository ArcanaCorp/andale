import { useEffect, useState } from "react"
import { serviceListSections } from "../../../services/sections.service";

import Place from "./cards/Place";

import './styles/listplaces.css'

export default function ListPlaces () {

    const [ sections, setSections ] = useState([]);

    useEffect(() => {
        const getSectionsList = async () => {
            try {
                const data = await serviceListSections();
                if (!data.ok) {
                    console.warn(data.message);
                    return;
                }
                setSections(data.data)
            } catch (error) {
                console.error(error);
            }
        }
        getSectionsList();
    }, [])

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