import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [cart, setCart] = useState({
        negocio: {},
        productos: [],
        total: 0,
        subtotal: 0,
        delivery: false
    });
    
    // ====== Cargar carrito desde localStorage ======
    useEffect(() => {
        const saved = localStorage.getItem("cart");
        if (saved) {
            setCart(JSON.parse(saved));
        }
    }, []);

    // ====== Guardar carrito en localStorage ======
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    // ===== Función para recalcular el total =====
    const calculateTotal = (productos) => {
        return productos.reduce((acc, p) => acc + p.subtotal, 0);
    };

    const getProductPrice = (product) => {
        if (product.box) {
            return Number(product.priced) || 0;
        }
        return Number(product.price) || 0;
    };

    // ===== Agregar producto =====
    const addToCart = (producto, negocioData) => {
        const price = getProductPrice(producto);
        setCart((prev) => {
            // Si el carrito ya tenía otro negocio → limpiarlo
            if (prev.negocio && prev.negocio.id !== negocioData.id) {
                prev = { negocio: negocioData, productos: [], total: 0 };
            }

            const existing = prev.productos.find((p) => p.id === producto.id);

            let newProductos;
            if (existing) {
                // Actualizar cantidad
                newProductos = prev.productos.map((p) =>
                    p.id === producto.id
                        ? {
                              ...p,
                              amount: p.amount + 1,
                              subtotal: (p.amount + 1) * price,
                          }
                        : p
                );
            } else {
                // Agregar por primera vez
                newProductos = [
                    ...prev.productos,
                    {
                        ...producto,
                        amount: 1,
                        subtotal: price,
                    },
                ];
            }

            return {
                negocio: negocioData,
                productos: newProductos,
                subtotal: calculateTotal(newProductos),
                total: calculateTotal(newProductos),
                delivery: false
            };
        });
    };

    // ===== Activar el delivery =====
    const toogleDelivery = (cost) => {
        setCart((prev) => {
            const totalDelivery = !prev.delivery ? prev.total + cost : prev.total - cost;
            return {
                ...prev,
                delivery: !prev.delivery,
                total: totalDelivery
            }
        })
    }

    // ===== Actualizar cantidad =====
    const updateAmount = (id, amount) => {
        if (amount <= 0) return removeFromCart(id);

        setCart((prev) => {
            const newProductos = prev.productos.map((p) =>
                p.id === id ? { ...p, amount, subtotal: amount * (p.box ? p.priced : p.price) } : p
            );

            return {
                ...prev,
                productos: newProductos,
                subtotal: calculateTotal(newProductos),
                total: calculateTotal(newProductos),
            };
        });
    };

    // ===== Eliminar producto =====
    const removeFromCart = (id) => {
        setCart((prev) => {
            const newProductos = prev.productos.filter((p) => p.id !== id);
            return {
                ...prev,
                productos: newProductos,
                total: calculateTotal(newProductos),
            };
        });
    };

    // ===== Vaciar carrito =====
    const clearCart = () => {
        setCart({
            negocio: null,
            productos: [],
            total: 0,
        });
    };

    const contextValue = {
        cart,
        addToCart,
        removeFromCart,
        updateAmount,
        clearCart,
        toogleDelivery
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);