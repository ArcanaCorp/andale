import Avatar from "../Avatars/Avatar";

export default function CardDish ({ dish }) {
    return (
        <article className="w-full flex gap-md">
            <Avatar name={dish.name} rounded={'rounded-md'} size={80}/>
            <div className="w-full flex flex-col">
                <h4>{dish.name}</h4>
                <p className="text-xs text-muted mb-sm">{dish.description}</p>
                <p className="text-medium">s/. {(dish.price).toFixed(2)}</p>
            </div>
        </article>
    )
}