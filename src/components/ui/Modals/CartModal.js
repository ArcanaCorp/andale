'use client'
import { IconMinus, IconPlus, IconTrash } from "@tabler/icons-react";
import Avatar from "../Avatars/Avatar";
import ButtonIcon from "../Buttons/ButtonIcon";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";

export default function CartModal ({ dish, selectedDish }) {

    const { cart, addToCart, removeToCart } = useCart();

    const [ item, setItem ] = useState({
        product: {},
        amount: 1,
        subtotal: 0
    })

    const handleChangeAmount = (type) => {
        setItem(prev => {
            const newAmount =
                type === 'increment'
                    ? Math.min(prev.amount + 1, 12)
                    : Math.max(prev.amount - 1, 1);

            return {
                ...prev,
                amount: newAmount,
                subtotal: prev.product.price * newAmount
            };
        });
    };

    const handleAddToCart = () => {
        addToCart(item);
        selectedDish('');
    };

    const handleRemove = (id) => {
        removeToCart(id)
        selectedDish('');
    }

    useEffect(() => {
        if (!dish) return;

        const itemInCart = cart.products.find(cartItem => cartItem.product.id === dish.id);

        if (itemInCart) {
            // Ya existe: cargar los datos guardados en el carrito
            setItem(itemInCart);
        } else {
            // No existe: cargar valores por defecto
            setItem({
                product: dish,
                amount: 1,
                subtotal: Number(dish.price)
            });
        }
    }, [dish, cart]);

    return (
        <div className="absolute inset w-screen h-screen bg-overlay flex flex-col justify-end zIndex-modal">
            <div className="w-full bg-white rounded-top-md p-md flex flex-col gap-lg">
                <div className="w-full flex gap-md">
                    <div className="relative w h rounded-md bg-surface" style={{"--w": "160px", "--mnw": "160px", "--h": "160px"}}>
                        <Avatar name={dish.name} rounded={'rounded-md'} size={160} />
                    </div>
                    <div className="w-full flex flex-col gap-md">
                        <h4 className="text-lg">{dish.name}</h4>
                        <p className="text-xs text-muted">{dish.description}</p>
                        <p className="text-xs text-muted">Subtotal: <span className="text-md text-dark text-medium">s/. {(item.subtotal).toFixed(2)}</span></p>
                        <div className="w-full flex items-center justify-between">
                            <div className="flex gap-sm">
                                <ButtonIcon bg={'bg-surface'} rounded={'rounded-full'} size={36} onClick={() => handleChangeAmount('decrement')}><IconMinus/></ButtonIcon>
                                <div className="grid-center w h rounded-full" style={{"--w": "36px", "--mnw": "36px", "--h": "36px"}}>{item.amount}</div>
                                <ButtonIcon bg={'bg-surface'} rounded={'rounded-full'} size={36} onClick={() => handleChangeAmount('increment')}><IconPlus/></ButtonIcon>
                            </div>
                            {item?.id === dish.id && (
                                <ButtonIcon rounded={'rounded-full'} size={36} bg={'bg-error-500'} color={'text-error'} onClick={() => handleRemove(dish.id)}><IconTrash/></ButtonIcon>
                            )}
                        </div>
                    </div>
                </div>
                <div className="w-full flex items-center gap-md justify-between">
                    <button className="w-full h rounded-full bg-neutral-200 text-sm" style={{"--h": "48px"}} onClick={() => selectedDish('')}>Cancelar</button>
                    <button className="w-full h rounded-full bg-primary text-white text-sm" style={{"--h": "48px"}} onClick={handleAddToCart}>Agregar al carrito</button>
                </div>
            </div>
        </div>
    )
}