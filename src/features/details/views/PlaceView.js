import { IconClock, IconHistoryToggle, IconStarFilled, IconTicket } from "@tabler/icons-react";

import Card from "../../home/components/Card";
import Map from "../components/Map";

import './styles/placeview.css'

export default function PlaceView ({ data }) {

    return (

        <>
        
            <section className={`__section_detail`}>
                <div className="__row __row_A">
                    <h1>{data?.name}</h1>
                    <p className="__count_star">{data?.metrics.liked} <IconStarFilled/></p>
                </div>
                <div className="__row __row_B">
                    <p className="__loc">{data?.locationName}</p>
                    <p className="__rev">{data?.metrics.comments} reviews</p>
                </div>
            </section>

            <section className={`__section_detail`}>
                <h2 className="__tti_summary">¿Sabias qué?</h2>
                <p className="__ttx_summary">{data?.text}</p>
            </section>

            <section className={`__section_detail`}>
                <h2 className="__tti_summary">Información adicional</h2>
                <div className="__box_details">
                    <div className="__box">
                        <p><IconClock/></p>
                        <p>{data?.shedule ? data?.shedule : 'No disponible'}</p>
                    </div>
                    <div className="__box">
                        <p><IconTicket/></p>
                        <p>{data?.price ? data?.price : 'No disponible'}</p>
                    </div>
                    <div className="__box">
                        <p><IconHistoryToggle/></p>
                        <p>{data?.recommended_time ? data?.recommended_time : 'No disponible'}</p>
                    </div>
                </div>
            </section>

            <section className={`__section_detail`}>
                <h2 className="__tti_summary">Como llegar</h2>
                <div className="__map_view">
                    <Map name={data?.name} location={data?.location} />
                </div>
            </section>

            <section className={`__section_detail`}>
                <h2 className="__tti_recommend">Lugares recomendados</h2>
                <ul className="__list_recommend">
                    {data?.recommend.map((r) => ( <Card key={r.id} data={r} /> ))}
                </ul>
            </section>

        </>

    )

}