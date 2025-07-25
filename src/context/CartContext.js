import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [cart, setCart] = useState(() => {
        const stored = sessionStorage.getItem("cart");
        return stored ? JSON.parse(stored) : { products: [], bussines: {}, total: 0 };
    });

    useEffect(() => {
        sessionStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const calculateTotal = (products) => {
        return products.reduce((sum, item) => sum + item.price * item.amount, 0);
    };

    const addToCartItem = (item, amount, bussines) => {
        setCart(prevCart => {

            const existingItemIndex = prevCart.products.findIndex(i => i.id === item.id);
            let updatedProducts;

            if (existingItemIndex !== -1) {
                updatedProducts = [...prevCart.products];
                updatedProducts[existingItemIndex].amount = amount;
            } else {
                updatedProducts = [...prevCart.products, { ...item, amount: amount }];
            }

            const newTotal = calculateTotal(updatedProducts);
            return { products: updatedProducts, bussines: bussines, total: newTotal };
        });
    };

    const removeFromCartItem = (id) => {
        setCart(prevCart => {
            const updatedProducts = prevCart.products.filter(item => item.id !== id);
            const newTotal = calculateTotal(updatedProducts);
            return { products: updatedProducts, total: newTotal };
        });
    };

    const updateCartItemAmount = (id, increment = true) => {
        setCart(prevCart => {
            const updatedProducts = prevCart.products.reduce((acc, item) => {
                if (item.id === id) {
                    const newAmount = increment ? item.amount + 1 : item.amount - 1;
                    if (newAmount > 0) {
                        acc.push({ ...item, amount: newAmount });
                    }
                    // Si amount es 0, no lo agregamos (se elimina)
                } else {
                    acc.push(item);
                }
                return acc;
            }, []);

            const newTotal = calculateTotal(updatedProducts);
            return { ...prevCart, products: updatedProducts, total: newTotal };
        });
    };

    const contextValue = {
        cart,
        addToCartItem,
        removeFromCartItem,
        updateCartItemAmount
    };

    return (
        <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);