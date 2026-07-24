'use client';

import { useEffect, useState } from "react";

const CART_STORAGE_KEY = "cart-andaleya";

const INITIAL_CART = {
    company_id: null,
    products: [],
    subtotal: 0
};

const calculateSubtotal = (products) => {
    return products.reduce((total, product) => total + Number(product.subtotal || 0), 0);
};

export const useCartHook = () => {

    const [cart, setCart] = useState(INITIAL_CART);
    const [isLoaded, setIsLoaded] = useState(false);

    // Cargar carrito desde localStorage
    useEffect(() => {
        try {
            const savedCart = localStorage.getItem(CART_STORAGE_KEY);

            if (savedCart) {
                const parsedCart = JSON.parse(savedCart);
                const products = Array.isArray(parsedCart.products) ? parsedCart.products : [];
                setCart({
                    company_id: parsedCart.company_id ?? null,
                    products,
                    subtotal: calculateSubtotal(products)
                });
            }
        } catch (error) {
            console.error("Error al cargar el carrito:", error);
            setCart(INITIAL_CART);
        } finally {
            setIsLoaded(true);
        }
    }, []);

    // Guardar carrito automáticamente cuando cambie
    useEffect(() => {
        if (!isLoaded) return;

        try {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
        } catch (error) {
            console.error("Error al guardar el carrito:", error);
        }
    }, [cart, isLoaded]);

    const addItemToCart = (item) => {

        const newItem = {
            ...item,
            id: item.product.id,
            subtotal: Number(item.subtotal)
        };

        setCart(prev => {

            const existingItem = prev.products.find(product => product.id === newItem.id);

            const products = existingItem
                ? prev.products.map(product =>
                    product.id === newItem.id
                        ? {
                            ...product,
                            ...newItem
                        }
                        : product
                )
                : [
                    ...prev.products,
                    newItem
                ];

            return {
                company_id: item.product.foodie_id,
                products,
                subtotal: calculateSubtotal(products)
            };
        });

        return newItem;
    };

    const removeItemFromCart = (id) => {

        setCart(prev => {

            const products = prev.products.filter(
                product => product.id !== id
            );

            return {
                company_id: products.length > 0
                    ? prev.company_id
                    : null,
                products,
                subtotal: calculateSubtotal(products)
            };
        });
    };

    const clearCart = () => setCart(INITIAL_CART);

    const updateItemAmount = (id, change) => {
        setCart(prev => {
            const products = prev.products
                .map(item => {
                    if (item.id !== id) return item;

                    const currentAmount = Number(item.amount || 0);
                    const newAmount = currentAmount + change;

                    if (newAmount <= 0) {
                        return null;
                    }

                    const unitPrice = Number(
                        item.product?.price ?? item.price ?? 0
                    );

                    return {
                        ...item,
                        amount: newAmount,
                        subtotal: unitPrice * newAmount
                    };
                })
                .filter(Boolean);

            return {
                company_id: products.length > 0
                    ? prev.company_id
                    : null,
                products,
                subtotal: calculateSubtotal(products)
            };
        });
    };

    const increaseItemAmount = (id) => {
        updateItemAmount(id, 1);
    };

    const decreaseItemAmount = (id) => {
        updateItemAmount(id, -1);
    };

    return {
        cart,
        isLoaded,
        addItemToCart,
        removeItemFromCart,
        increaseItemAmount,
        decreaseItemAmount,
        clearCart
    };
};