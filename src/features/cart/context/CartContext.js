import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [cart, setCart] = useState(() => {
        const savedCart = sessionStorage.getItem("cart");
        return savedCart
            ? JSON.parse(savedCart)
            : { company: null, products: [], total: 0 };
    });

    // Guardar en sessionStorage cada vez que cambie el carrito
    useEffect(() => {
        sessionStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (data, amount) => {
        const { company, product } = data;

        setCart((prev) => {
            // Si es el primer producto
            if (!prev.company) {
                const price = product.priceu !== '0.00'
                    ? parseFloat(product.priceu)
                    : parseFloat(product.priced);

                return {
                    company,
                    products: [
                        {
                            ...product,
                            amount,
                            subtotal: price * amount,
                            price
                        }
                    ],
                    total: price * amount
                };
            }

            // Buscar si ya existe
            const productIndex = prev.products.findIndex(p => p.id === product.id);
            let updatedProducts;

            if (productIndex !== -1) {
                updatedProducts = prev.products.map((p, i) =>
                    i === productIndex
                        ? {
                            ...p,
                            amount: p.amount + amount,
                            subtotal: (p.amount + amount) * p.price
                        }
                        : p
                );
            } else {
                const price = product.priceu !== '0.00'
                    ? parseFloat(product.priceu)
                    : parseFloat(product.priced);

                updatedProducts = [
                    ...prev.products,
                    {
                        ...product,
                        amount,
                        subtotal: price * amount,
                        price
                    }
                ];
            }

            // Calcular total
            const newTotal = updatedProducts.reduce((acc, item) => acc + item.subtotal, 0);

            return {
                ...prev,
                products: updatedProducts,
                total: newTotal
            };
        });
    };

    const increaseQuantity = (productId) => {
        setCart((prev) => {
            const updatedProducts = prev.products.map((p) =>
                p.id === productId
                    ? { ...p, amount: p.amount + 1, subtotal: (p.amount + 1) * p.price }
                    : p
            );

            return {
                ...prev,
                products: updatedProducts,
                total: updatedProducts.reduce((acc, item) => acc + item.subtotal, 0)
            };
        });
    };

    const decreaseQuantity = (productId) => {
        setCart((prev) => {
            const updatedProducts = prev.products
                .map((p) =>
                    p.id === productId
                        ? { ...p, amount: p.amount - 1, subtotal: (p.amount - 1) * p.price }
                        : p
                )
                .filter((p) => p.amount > 0);

            if (updatedProducts.length === 0) {
                sessionStorage.removeItem("cart");
                return { company: null, products: [], total: 0 };
            }

            return {
                ...prev,
                products: updatedProducts,
                total: updatedProducts.reduce((acc, item) => acc + item.subtotal, 0)
            };
        });
    };

    const removeFromCart = (productId) => {
        setCart((prev) => {
            const updatedProducts = prev.products.filter(p => p.id !== productId);

            if (updatedProducts.length === 0) {
                sessionStorage.removeItem("cart");
                return { company: null, products: [], total: 0 };
            }

            return {
                ...prev,
                products: updatedProducts,
                total: updatedProducts.reduce((acc, item) => acc + item.subtotal, 0)
            };
        });
    };

    const clearCart = () => {
        const emptyCart = { company: null, products: [], total: 0 };
        setCart(emptyCart);
        sessionStorage.setItem("cart", JSON.stringify(emptyCart));
    };   

    const contextValue = {
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart
    };

    return (
        <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);