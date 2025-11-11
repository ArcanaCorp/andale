import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import SplashScreen from "@/components/SplashScreen";
import { toast } from "sonner";
import { getPlaceDetails } from "../services/place.service";
import HeaderPlace from "./layout/header";
import MainPlace from "./layout/main";
import ModalImage from "./components/ModalImage";
import SEO from "@/components/SEO";

export default function PlaceSubPage () {

    const { sub } = useParams();
    const [ details, setDetails ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    const [ modalImage, setModalImage ] = useState({
        view: false,
        image: '',
        sub: ''
    })

    const handleOpenModalImage = (img, sub) => setModalImage({view: true, image: img, sub: sub})
    const handleCloseModalImage = () => setModalImage({view: false, image: ''})

    const getDetails = useCallback(async () => {
        if (!sub) {
            setDetails(null);
            setLoading(false);
            return;
        }

        try {
            const data = await getPlaceDetails(sub);
            if (!data.ok) {
                toast.warning(data.message || "No se encontraron detalles");
                setDetails(null);
                return;
            }
            setDetails(data.data);
        } catch (error) {
            console.error(error);
            setDetails(null);
            toast.error('Error', { description: error.message || 'Error inesperado' });
        } finally {
            setLoading(false);
        }
    }, [sub]);

    useEffect(() => {
        getDetails();
    }, [getDetails]);


    if (loading) return <SplashScreen/>;

    if (!details) {
        return <div>No se encontraron detalles para este lugar.</div>;
    }

    const schemaData = {
        "@context": "https://schema.org",
        "@type": "Place",
        "name": details?.name,
        "image": details?.image,
        "description": `Descubre ${details?.name} en Jauja con Ándale Ya!`,
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Jauja",
            "addressRegion": "Junín",
            "addressCountry": "PE",
        },
        "url": `https://andaleya.pe/places/${details?.sub}`,
        "brand": {
            "@type": "Brand",
            "name": "Ándale Ya!",
        },
    };

    return (

        <>
            <SEO
                title={`Visita el ${details?.name}`}
                description={`Conoce ${details?.name} en Jauja. Fotos, ubicación, reseñas y más con Ándale Ya!`}
                keywords={`${details?.name}, Jauja, turismo, delivery, hoteles, restaurantes`}
                image={details?.image}
                url={`https://andaleya.pe/places/${details?.sub}`}
                schema={schemaData}
            />

            <HeaderPlace details={details} />
            <MainPlace details={details} openModalImage={handleOpenModalImage} />
            {modalImage.view && (
                <ModalImage image={modalImage.image} sub={modalImage.sub} onCloseModalImage={handleCloseModalImage}/>
            )}
        </>

    )

}