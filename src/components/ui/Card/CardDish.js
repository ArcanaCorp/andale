'use client'
import { useCart } from "@/context/CartContext";
import Avatar from "../Avatars/Avatar";

export default function CardDish ({ dish, onSeleted }) {

    const { cart } = useCart();

    const cartItem = cart.products.find(item => item.id === dish.id);

    return (
        <>
            <article className="w-full flex gap-md pointer" onClick={() => onSeleted(dish)}>
                <div className="w-full flex flex-col">
                    <h4>{dish.name}</h4>
                    <p className="text-xs text-muted mb-sm">{dish.description}</p>
                    <p className="text-medium">s/. {(dish.price).toFixed(2)}</p>
                </div>
                <div className="relative w h rounded-md bg-surface" style={{"--w": "120px", "--mnw": "120px", "--h": "120px"}}>
                    {cartItem && (
                        <span className="absolute w h grid-center bg-dark text-white rounded-full text-sm" style={{"--w": "20px", "--mnw": "20px", "--h": "20px", top: "10px", right: "10px"}}>{cartItem.amount}</span>
                    )}
                    <Avatar name={dish.name} rounded={'rounded-md'} size={120}/>
                </div>
            </article>
        </>
    )
}