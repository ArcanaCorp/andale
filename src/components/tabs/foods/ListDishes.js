import { useCallback, useEffect, useState } from "react"
import { getDishes } from "@/services/foods.services";

import './styles/listdishes.css'
import FoodCard from "../../cards/Foods/FoodCard";

export default function ListDishes () {

    const [ dishes, setDishes ] = useState([])

    const getDishesList = useCallback(async () => {
        try {
            
            const data = await getDishes();
            if (!data.ok) {
                console.warn(data.message);
                return;
            }
            setDishes(data.data)

        } catch (error) {
            console.error(error);
        }
    }, [])

    useEffect(() => {
        if (dishes.length === 0) {
            getDishesList();
        }
    }, [dishes, getDishesList])

    return (

        <>

            {dishes.map((d) => (
                <section key={d?.id} className={`__section __section_dishes`}>
                    <div className="__section_tti">
                        <h2>{d?.title}</h2>
                    </div>
                    <ul className="__section_scroll">
                        {d.dishes.map((dd) => (
                            <FoodCard key={dd.id} buss={d.name} food={dd} />
                        ))}
                    </ul>
                </section>
            ))}

        </>

    )

}