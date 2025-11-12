import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { toast } from "sonner";

import SEO from "@/components/SEO";
import SplashScreen from "@/components/SplashScreen";
import HeaderCompany from "@/featured/companies/components/header";
import BannerInfo from "@/components/BannerInfo";
import Reviews from "@/components/Reviews";

import { getBussinesBySub } from "@/services/bussines.service";

import '@/featured/companies/styles/page.css'

export default function FoodieSubPage () {

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
        "url": `https://andaleya.pe/foodies/${details?.sub}`,
        "brand": {
            "@type": "Brand",
            "name": "Ándale Ya!",
        },
    };

    return (

        <>
        
            <SEO
                title={`Restaurante ${details?.name}`}
                description={`Disfruta de las delicias de ${details?.name} en Jauja. Fotos, ubicación, reseñas y más con Ándale Ya!`}
                keywords={`Restaurantes | Cafeterias | ${details?.name}, Jauja, turismo, delivery, hoteles, restaurantes`}
                image={details?.photo}
                url={`https://andaleya.pe/foodies/${details?.sub}`}
                schema={schemaData}
            />

            <HeaderCompany details={details} />

            <main className="__main_company">

                <BannerInfo banner={'top'} details={details} />

                <section className={`__section_company __section_company_lst`}>
                    <ul className="__lst">
                        {details?.dishes.map((pdt) => (
                            <li key={pdt.id}>{pdt.name}</li>
                        ))}
                    </ul>
                </section>

                <section className={`__section_company __section_company_rvw`}>
                    <h3>Reviews</h3>
                    <Reviews/>
                </section>

                <BannerInfo banner={'bottom'} details={details} />

            </main>

        </>

    )

}