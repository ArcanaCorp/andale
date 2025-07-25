import { Link } from "react-router-dom";
import placeholder from "@/assets/img/placeholder.png";
import './styles/foodstop.css'
import Avatars from "../../ui/avatars";

export default function FoodsTopCard ({ food }) {

    const image = food.photo === '' ? placeholder : food?.photo;
    const link = food.short === '' ? food.sub : food.short;

    return (

        <Link to={`/r/${link}`} className="__card_top_food" viewTransition>
            <Avatars image={image} size={80} name={food?.name} radius={'pill'} />
            <p className="__name">{food.name}</p>
        </Link>

    )

}