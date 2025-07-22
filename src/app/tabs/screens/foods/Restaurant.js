import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'

import { useUI } from '@/context/UIContext';

import { getInfoBussines } from '@/services/foods.services';

import Loading from '@/components/screens/Loading';
import NotFound from '@/components/screens/NotFound';
import HeaderFood from '@/components/foods/header';
import ListFoodCategories from '@/components/foods/ListFoodCategories';
import DishDetails from './details/dish';

import './styles/restaurant.css'

export default function Restaurant () {

    const { modal } = useUI();

    const { slug } = useParams();
    const [ info, setInfo ] = useState(null)
    const [ dishes, setDishes ] = useState([])
    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
        const getInfo = async () => {
            try {
                const data = await getInfoBussines(slug)
                if (!data.ok) {
                    console.warn(data.message);
                    return;
                }
                setInfo(data?.bussines)
                setDishes(data?.dishes)
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false)
            }
        }
        getInfo();
    }, [slug])


    if (loading) return <Loading/>;

    if (!info) return <NotFound/>;
    
    return (

        <>
        
            <HeaderFood slug={slug} info={info} />

            <main className='__main_restau'>
                {dishes.length < 0 ? (
                    <div><h1>No hay platos</h1></div>
                ) : (
                    dishes.map((d, i) => ( <ListFoodCategories key={i} buss={info} data={d} /> ))
                )}
            </main>

            {modal.view && (
                modal.type === 'food' && ( <DishDetails id={modal?.id} /> )
            )}

        </>

    )

}