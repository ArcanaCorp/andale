import { Toaster } from 'sonner';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'

import { useUI } from '@/context/UIContext';
import { useCart } from '@/context/CartContext';
import { useProfile } from '@/context/BussinesProfileContext';

import { getInfoBussines } from '@/services/foods.services';

import Loading from '@/components/screens/Loading';
import NotFound from '@/components/screens/NotFound';
import HeaderFood from '@/components/foods/header';
import FoodCard from '@/components/cards/Foods/FoodCard';
import ViewCart from '@/components/cart/ViewCart';
import ModalDish from '@/components/modals/ModalDish';

import './styles/restaurant.css'

export default function Restaurant () {

    const { modal } = useUI();
    const { profile, categories, products, filter, savedInfoProfile, handleChangeFilter } = useProfile();
    const { cart } = useCart();

    const { slug } = useParams();

    const [ loading, setLoading ] = useState(true)

    const handleChooseFilter = (f) => handleChangeFilter(f);

    useEffect(() => {
        const getInfo = async () => {
            try {
                const data = await getInfoBussines(slug)
                if (!data.ok) {
                    console.warn(data.message);
                    return;
                }
                savedInfoProfile(data?.bussines, data?.categories, data?.dishes)
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false)
            }
        }
        getInfo();
    }, [slug, savedInfoProfile])

    if (loading) return <Loading/>;

    if (!profile) return <NotFound/>;
    
    return (

        <>
        
            <HeaderFood slug={slug} info={profile} filter={filter} categories={categories} onFilter={handleChooseFilter} />

            <main className='__main_restau' style={{paddingBottom: `${cart?.products.length > 0 ? '70px' : '1rem'}`}}>
                {products.length === 0 ? (
                    <></>
                ) : (
                    products.map((d) => (
                        <FoodCard key={d.id} buss={profile} food={d} filter={filter} />
                    ))
                )}
            </main>

            {cart?.products.length > 0 && cart?.bussines.id === profile?.id && (
                <ViewCart cart={cart} />
            )}

            {modal.view && (
                modal.type === 'food' && ( <ModalDish id={modal?.id} /> )
            )}

            <Toaster position='top-center' richColors duration={1000} />

        </>

    )

}