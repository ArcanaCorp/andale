'use client'
import { useCartHook } from "@/hooks/useCart";
import { createContext, useContext } from "react"

const CartContext = createContext();
export const CartProvider = ({ children }) => {

    const cart = useCartHook();

    const contextValue = {
        cart: cart.cart,
        addToCart: cart.addItemToCart,
        removeToCart: cart.removeItemFromCart,
        incrementItem: cart.increaseItemAmount,
        decreaseItem: cart.decreaseItemAmount,
        clearCart: cart.clearCart
    }

    return (
        <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
    )

}

export const useCart = () => useContext(CartContext);