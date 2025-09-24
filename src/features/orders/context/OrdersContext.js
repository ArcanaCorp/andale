import { createContext, useContext, useEffect, useState } from "react";

const OrdersContext = createContext();

export const OrdersProvider = ({ children }) => {

    const [ orders, setOrders ] = useState(() => {
        const savedOrders = localStorage.getItem('orders')
        return savedOrders ? JSON.parse(savedOrders) : []
    })

    useEffect(() => {
        localStorage.setItem('orders', JSON.stringify(orders))
    }, [orders])

    const addOrder = async (newOrder) => {
        setOrders((prev) => [...prev, newOrder]);
    }

    const contextValue = {
        orders,
        addOrder
    }

    return (
        <OrdersContext.Provider value={contextValue}>{children}</OrdersContext.Provider>
    )

}

export const useOrders = () => useContext(OrdersContext);