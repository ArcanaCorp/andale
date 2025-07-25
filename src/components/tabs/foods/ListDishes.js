import { useCallback, useEffect, useState } from "react"
import { getDishes } from "@/services/foods.services";

import FoodsCard from "../../cards/Foods/FoodsCard";

import './styles/listdishes.css'

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
                            <FoodsCard key={dd.id} id={dd.bussines} name={d.name} photo={d.photo}  food={dd} />
                        ))}
                    </ul>
                </section>
            ))}

        </>

    )

}