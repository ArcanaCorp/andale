import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'

import { useUI } from '@/context/UIContext';

import { getInfoBussines } from '@/services/foods.services';

import Loading from '@/components/screens/Loading';
import NotFound from '@/components/screens/NotFound';
import HeaderFood from '@/components/foods/header';
import FoodCard from '@/components/cards/Foods/FoodCard';
import DishDetails from './details/dish';

import './styles/restaurant.css'

export default function Restaurant () {

    const { modal } = useUI();

    const { slug } = useParams();
    const [ info, setInfo ] = useState(null)
    const [ dishes, setDishes ] = useState([])
    const [ categories, setCategories ] = useState([])
    const [ filter, setFilter ] = useState('all')
    const [ loading, setLoading ] = useState(true)

    const handleChooseFilter = (f) => setFilter(f);

    useEffect(() => {
        const getInfo = async () => {
            try {
                const data = await getInfoBussines(slug)
                if (!data.ok) {
                    console.warn(data.message);
                    return;
                }
                setInfo(data?.bussines)
                setCategories(data?.categories)
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
        
            <HeaderFood slug={slug} info={info} filter={filter} categories={categories} onFilter={handleChooseFilter} />

            <main className='__main_restau'>
                {dishes.length === 0 ? (
                    <></>
                ) : (
                    dishes.map((d) => (
                        <FoodCard key={d.id} buss={info} food={d} filter={filter} />
                    ))
                )}
            </main>

            {modal.view && (
                modal.type === 'food' && ( <DishDetails id={modal?.id} /> )
            )}

        </>

    )

}