import { useCallback, useEffect } from "react"
import { getFoods } from "@/services/foods.services"

import { useDB } from "@/context/DBContext"

import FoodsTopCard from "@/components/cards/Foods/FoodsTopCard"

import './styles/listtop.css'

export default function ListTop () {

    const { foodsList, savedFoodsList } = useDB();

    const getFoodsTop = useCallback(async () => {
        try {
            
            const data = await getFoods();
            if (!data.ok) {
                console.warn(data.message);
                return;
            }

            savedFoodsList(data.data)

        } catch (error) {
            savedFoodsList([])
            console.error(error);
        }
    }, [savedFoodsList])

    useEffect(() => {
        if (foodsList.length === 0) {
            getFoodsTop();
        }
    }, [foodsList, getFoodsTop])

    return (

        <>
        
            <section className={`__section __section_top`}>
                <ul>
                    {foodsList.map((t) => (
                        <li key={t.id}>
                            <FoodsTopCard food={t} />
                        </li>
                    ))}
                </ul>
            </section>

        </>

    )

}