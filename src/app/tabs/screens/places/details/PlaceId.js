import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Loading from "@/components/screens/Loading";
import { getPlaceSlug } from "@/services/places.service";
import NotFound from "@/components/screens/NotFound";
import HeaderPlace from "../../../../../components/places/header";

import '../styles/placeid.css'
import { IconBuildingStore, IconCar, IconCheck, IconClipboardHeart, IconCreditCard, IconLock, IconWifi } from "@tabler/icons-react";
import Maps from "../../../../../components/places/Maps";

export default function PlaceId () {

    const { slug } = useParams();
    const [ info, setInfo ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        const getPlaceId = async () => {
            try {
                const data = await getPlaceSlug(slug);
                if (!data.ok) return;
                    setInfo(data.place)
            } catch (error) {
                console.error(error);
                setInfo(null);
            } finally {
                setLoading(false)
            }
        }
        getPlaceId()
    }, [slug])

    if (loading) return <Loading/>;

    if (!info) return <NotFound/>

    return (

        <>

            <HeaderPlace info={info} />

            <main className="__main_place">
                
                <section className="__sec">
                    <p className="__txt_location">{info?.location}</p>
                    <h1 className="__txt_name">{info?.name}</h1>
                </section>

                <section className="__sec">
                    <h2 className="__txt_subtit">Servicios</h2>
                    <ul className="__itms">
                        <li className="__itm"><IconWifi/> Wifi</li>
                        <li className="__itm"><IconCreditCard/> Bancos</li>
                        <li className="__itm"><IconLock/> Seguridad</li>
                        <li className="__itm"><IconCheck/> Cajero automático</li>
                        <li className="__itm"><IconBuildingStore/> Bodegas o minimarkets</li>
                        <li className="__itm"><IconClipboardHeart/> Centro de salud</li>
                        <li className="__itm"><IconCar/> Servicios de taxis</li>
                    </ul>
                </section>

                <section className="__sec">
                    <h2 className="__txt_subtit">Descripción</h2>
                    <p className="__txt_text">{info?.text}</p>
                </section>

                <section className="__sec">
                    <h2 className="__txt_subtit">Fotos</h2>
                    <ul className="__photos">
                        {info?.images.map((img, i) => (
                            <li key={i} className="__photo" style={{backgroundImage: `url(${img.image_iplaces})`}}>
                                <img src={img.image_iplaces} alt={`Visita ${info?.name} - ${info?.text} - Ándale Ya!`} />
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="__sec">
                    <h2 className="__txt_subtit">Cómo llegar</h2>
                    <Maps place={info?.name} location={info?.location} />
                </section>

            </main>

        </>

    )

}