import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

import Header from "./layout/header";

import { getDetailSlug } from "./services/details.service";

import './styles/detail.css'
import PlaceView from "./views/PlaceView";

export default function Details () {

    const { slug } = useParams();
    const [ detail, setDetails ] = useState(null);

    const getDetail = async (short) => {
        try {
            
            const data = await getDetailSlug(short);
            if (!data.ok) return console.warn(data.message);
                setDetails(data.data)

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getDetail(slug);
    }, [slug])

    return (

        <>
            <Header type={detail?.type} data={detail} />
            <main className={`__main_details`}>
                {detail?.type === 'place' && ( <PlaceView data={detail} /> )}
            </main>
        </>

    )

}