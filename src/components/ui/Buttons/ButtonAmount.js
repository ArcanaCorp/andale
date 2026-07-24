'use client';

import { useCart } from "@/context/CartContext";
import { IconMinus, IconPlus, IconTrash } from "@tabler/icons-react";

export default function ButtonAmount ({ idProduct, size, amount }) {

    const { incrementItem, decreaseItem, removeToCart } = useCart();

    return (
        <div className="flex items-center bg-surface rounded-full">
            {amount > 1 ? (
                <button className="w h center" style={{"--w": `${size}px`, "--mnw": `${size}px`, "--h": `${size}px`}} onClick={() => decreaseItem(idProduct)}><IconMinus size={18} /></button>
            ) : (
                <button className="w h center" style={{"--w": `${size}px`, "--mnw": `${size}px`, "--h": `${size}px`}} onClick={() => removeToCart(idProduct)}><IconTrash size={18} /></button>
            )}
            <div className="w h center text-xs" style={{"--w": `${size}px`, "--mnw": `${size}px`, "--h": `${size}px`}}>{amount}</div>
            <button className="w h center" style={{"--w": `${size}px`, "--mnw": `${size}px`, "--h": `${size}px`}} onClick={() => incrementItem(idProduct)}><IconPlus size={18} /></button>
        </div>
    )
}