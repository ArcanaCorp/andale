import CardDish from "../Card/CardDish";
import CardDishSkeleton from "../Card/CardDishSkeleton";

export default function ListDishes ({ list, load }) {

    if (load) return <div className="w-full flex flex-col gap-md px-md">{Array.from({length: 5}).map((_, i) => ( <CardDishSkeleton key={i} /> ))}</div>

    return (
        <ul className="w-full flex flex-col gap-md px-md">
            {list.map((item) => (
                <CardDish key={item.id} dish={item} />
            ))}
        </ul>
    )
}