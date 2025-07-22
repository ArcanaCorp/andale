import FoodCard from "../cards/Foods/FoodCard";

export default function ListFoodCategories ({ buss, data }) {
    
    return (

        <section className="__section_restau">

            <div className="__tti">
                <h2>{data?.category}</h2>
            </div>

            <ul className="__list_dish">
                {data?.items.map((i) => ( <FoodCard key={i.id} buss={buss} food={i} /> ))}
            </ul>

        </section>

    )

}