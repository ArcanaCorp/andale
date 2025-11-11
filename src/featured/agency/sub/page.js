import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SEO from "@/components/SEO";
import SplashScreen from "@/components/SplashScreen";
import { toast } from "sonner";
import { getBussinesBySub } from "@/services/bussines.service";
import HeaderSubAgency from "./layout/header";
import MainSubAgency from "./layout/main";
export default function AgencySubPage () {

    const { sub } = useParams();
    const [ details, setDetails ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    const getDetails = useCallback(async () => {

        if (!sub) {
            setDetails(null);
            setDetails(false);
            return;
        }

        try {
            const data = await getBussinesBySub(sub);
            if (!data.ok) {
                toast.warning(data.message || "No se encontraron detalles");
                setDetails(null);
                return;
            }
            setDetails(data.data);
        } catch (error) {
            console.error(error);
            setDetails(null);
            toast.error('Error', { description: error.message || 'Error inesperado' })
        } finally {
            setLoading(false);
        }
        
    }, [sub])

    useEffect(() => {
        getDetails();
    }, [getDetails])

    if (loading) return <SplashScreen/>;

    if (!details) return <div>No se encontraron detalles para este lugar.</div>;

    const schemaData = {
        "@context": "https://schema.org",
        "@type": "Place",
        "name": details?.name,
        "image": details?.photo,
        "description": `Descubre ${details?.name} en Jauja con Ándale Ya!`,
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Jauja",
            "addressRegion": "Junín",
            "addressCountry": "PE",
        },
        "url": `https://andaleya.pe/agency/${details?.sub}`,
        "brand": {
            "@type": "Brand",
            "name": "Ándale Ya!",
        },
    };

    return (

        <>
        
            <SEO
                title={`Agencia ${details?.name}`}
                description={`Conoce con ${details?.name} lugares en Jauja. Fotos, ubicación, reseñas y más con Ándale Ya!`}
                keywords={`Agencia de viajes | Agencia de turismo | ${details?.name}, Jauja, turismo, delivery, hoteles, restaurantes`}
                image={details?.photo}
                url={`https://andaleya.pe/agency/${details?.sub}`}
                schema={schemaData}
            />

            <HeaderSubAgency details={details} />

            <MainSubAgency details={details} />

        </>

    )

}