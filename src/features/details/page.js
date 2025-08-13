import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

import Header from "./layout/header";

import { getDetailSlug } from "./services/details.service";
import { useDetail } from "./context/DetailContext";

import PlaceView from "./views/PlaceView";
import BussinesView from "./views/BussinesView";
import Modal from "./components/Modal";

import './styles/detail.css'
import SplashScreen from "../pages/SplashScreen";

export default function Details () {

    const { slug } = useParams();
    const { modalD } = useDetail();
    const [ detail, setDetails ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    const getDetail = async (short) => {
        try {
            
            const data = await getDetailSlug(short);
            if (!data.ok) return console.warn(data.message);
                setDetails(data.data)

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getDetail(slug);
    }, [slug])

    if (loading) return <SplashScreen/>;

    return (

        <>
            <Header type={detail?.type} data={detail} />
            <main className={`__main_details`}>
                {detail?.type === 'place' && ( <PlaceView data={detail} /> )}
                {detail?.type === 'bussines' && ( <BussinesView data={detail} /> )}
            </main>

            {modalD.view && (<Modal/>)}

        </>

    )

}