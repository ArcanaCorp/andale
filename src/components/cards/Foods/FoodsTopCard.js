import { Link } from "react-router-dom";
import placeholder from "@/assets/img/placeholder.png";
import './styles/foodstop.css'

export default function FoodsTopCard ({ food }) {

    const image = food.photo === '' ? placeholder : food.photo;
    const link = food.short === '' ? food.sub : food.short;

    return (

        <Link to={`/r/${link}`} className="__card_top_food" viewTransition>
            <div className="__image">
                <img src={image} alt={`Restaurante ${food.name}`} loading="lazy" />
            </div>
            <p className="__name">{food.name}</p>
        </Link>

    )

}