'use client';

import {
    getOrderByCode,
    getOrderById
} from "@/services/orders.service";

import { db } from "@/libs/supabase";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const STATUS_MESSAGES = {
    pending: "Tu pedido está pendiente de confirmación.",
    accepted: "Tu pedido fue aceptado por el negocio.",
    preparing: "Tu pedido está en preparación.",
    ready: "Tu pedido está listo.",
    on_the_way: "Tu pedido está en camino.",
    completed: "Tu pedido fue completado.",
    cancelled: "Tu pedido fue cancelado.",
    rejected: "Tu pedido fue rechazado por el negocio."
};

export function useOrderDetail({
    orderCode,
    userId
}) {
    const [order, setOrder] = useState(null);
    const [loadingOrder, setLoadingOrder] = useState(false);
    const [errorOrder, setErrorOrder] = useState("");

    const loadOrder = async () => {
        try {
            if (!orderCode || !userId) return;

            setLoadingOrder(true);
            setErrorOrder("");

            const data = await getOrderByCode({
                orderCode,
                userId
            });

            setOrder(data);

            if (!data) {
                setErrorOrder("No se encontró el pedido.");
            }

        } catch (error) {
            console.error("Error cargando pedido:", error);

            setErrorOrder(
                error.message || "No se pudo cargar el pedido."
            );

        } finally {
            setLoadingOrder(false);
        }
    };

    const refreshRealtimeOrder = async (orderId) => {
        try {
            if (!orderId || !userId) return;

            const fullOrder = await getOrderById({
                orderId,
                userId
            });

            if (!fullOrder) return;

            setOrder(fullOrder);

            toast.info("Pedido actualizado", {
                description:
                    STATUS_MESSAGES[fullOrder.status] ||
                    `Estado: ${fullOrder.status}`
            });

        } catch (error) {
            console.error(
                "Error actualizando pedido en tiempo real:",
                error
            );
        }
    };

    useEffect(() => {
        if (!orderCode || !userId) return;

        loadOrder();
    }, [
        orderCode,
        userId
    ]);

    useEffect(() => {
        if (!order?.id || !userId) return;

        const channel = db
            .channel(`customer-order-${order.id}`)
            .on(
                "postgres_changes",
                {
                    event: "UPDATE",
                    schema: "public",
                    table: "foodie_orders",
                    filter: `id=eq.${order.id}`
                },
                async (payload) => {
                    const orderId = payload?.new?.id;

                    if (!orderId) return;

                    await refreshRealtimeOrder(orderId);
                }
            )
            .subscribe((status) => {
                if (status === "SUBSCRIBED") {
                    console.log(
                        "Realtime conectado al pedido:",
                        order.id
                    );
                }

                if (status === "CHANNEL_ERROR") {
                    console.error(
                        "Error realtime en detalle de pedido"
                    );
                }
            });

        return () => {
            db.removeChannel(channel);
        };

    }, [
        order?.id,
        userId
    ]);

    return {
        order,
        loadingOrder,
        errorOrder,
        loadOrder
    };
}