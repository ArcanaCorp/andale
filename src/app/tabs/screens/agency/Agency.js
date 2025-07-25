import { Toaster } from "sonner";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getProfileAgency } from "@/services/agency.service";

import { useProfile } from '@/context/BussinesProfileContext';

import Loading from '@/components/screens/Loading';
import NotFound from '@/components/screens/NotFound';
import HeaderFood from "@/components/foods/header";
import AgencyCard from "@/components/cards/Agency/AgencyCard";

import './style/agency.css'

export default function Agency () {

    const { slug } = useParams();
    const { profile, categories, products, filter, savedInfoProfile, handleChangeFilter } = useProfile();
    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
        const getProfile = async () => {
            try {
                const data = await getProfileAgency(slug);
                if (!data.ok) return console.warn(data.message);
                    savedInfoProfile(data?.bussines, data?.categories, data?.packages)
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false)
            }
        }
        getProfile();
    }, [slug, savedInfoProfile])
    
    if (loading) return <Loading/>;

    if (!profile) return <NotFound/>;

    return (

        <>

            <HeaderFood slug={slug} info={profile} filter={filter} categories={categories} onFilter={handleChangeFilter} />
        
            <main className='__main_agency'>
                {products.length === 0 ? (
                    <></>
                ) : (
                    products.map((p) => ( <AgencyCard key={p.id} agency={profile} packs={p} filter={filter} /> ))
                )}
            </main>

            <Toaster position="top-center" richColors duration={1000} />

        </>

    )

}