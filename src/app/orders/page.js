'use client';

import ButtonIcon from "@/components/ui/Buttons/ButtonIcon";
import OrderItem from "@/components/ui/Card/OrderItem";
import EmptyPage from "@/components/ui/Empty/Empty";
import Loading from "@/components/views/Loading";

import { useAuth } from "@/context/AuthContext";
import { useOrder } from "@/hooks/useOrder";

import { IconShoppingBag, IconAdjustmentsHorizontal } from "@tabler/icons-react";

import { useEffect, useMemo, useState } from "react";

const ORDER_STATUS_FILTERS = [
    {
        label: "Todos",
        value: "all"
    },
    {
        label: "Pendiente",
        value: "pending"
    },
    {
        label: "Aceptado",
        value: "accepted"
    },
    {
        label: "Preparando",
        value: "preparing"
    },
    {
        label: "Listo",
        value: "ready"
    },
    {
        label: "En camino",
        value: "on_the_way"
    },
    {
        label: "Entregado",
        value: "completed"
    },
    {
        label: "Rechazado",
        value: "rejected"
    },
    {
        label: "Cancelado",
        value: "cancelled"
    },
    {
        label: "Expirado",
        value: "expired"
    }
];

export default function Page() {
    const { user, loadAuth } = useAuth();

    const [activeStatus, setActiveStatus] = useState("all");

    const { orders, loadingOrders, getOrdersList } = useOrder();

    const filteredOrders = useMemo(() => {
        if (activeStatus === "all") {
            return orders;
        }

        if (activeStatus === "cancelled") {
            return orders.filter((order) =>
                [
                    "cancelled",
                    "cancelled_by_customer",
                    "cancelled_by_restaurant"
                ].includes(order?.status)
            );
        }

        if (activeStatus === "on_the_way") {
            return orders.filter((order) =>
                [
                    "on_the_way",
                    "on_delivery"
                ].includes(order?.status)
            );
        }

        return orders.filter((order) =>
            order?.status === activeStatus
        );
    }, [
        orders,
        activeStatus
    ]);

    useEffect(() => {
        if (loadAuth || !user?.id) return;

        getOrdersList({
            userId: user.id,
            forceRefresh: false
        });
    }, [
        loadAuth,
        user?.id,
        getOrdersList
    ]);

    if (loadAuth) {
        return <Loading />;
    }

    return (
        <div
            className="w-full h"
            style={{
                "--h": "calc(100dvh - 60px)"
            }}
        >
            <div
                className="w-full h px-md flex items-center justify-between"
                style={{
                    "--h": "45px"
                }}
            >
                <div />

                <h2 className="text-sm text-semibold">
                    Mis pedidos
                </h2>

                <ButtonIcon size={24}>
                    <IconShoppingBag size={20} />
                </ButtonIcon>
            </div>

            <div
                className="w-full h py-md scroll-y"
                style={{
                    "--h": "calc(100% - 45px)"
                }}
            >
                <ul className="w-full flex items-center gap-xs scroll-x px-md">
                    <li className="badge badge-without-bg">
                        <IconAdjustmentsHorizontal
                            size={16}
                            style={{
                                minWidth: "16px"
                            }}
                        />
                        Filtros
                    </li>

                    {ORDER_STATUS_FILTERS.map((item) => (
                        <li key={item.value}>
                            <button
                                type="button"
                                className={`badge ${activeStatus === item.value ? "is-active" : ""}`}
                                onClick={() => setActiveStatus(item.value)}
                            >
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>

                {loadingOrders ? (
                    <div className="w-full py-lg center">
                        <p className="text-sm text-muted">
                            Cargando órdenes...
                        </p>
                    </div>
                ) : filteredOrders.length > 0 ? (
                    <ul className="w-full flex flex-col gap-md pt-md px-md">
                        {filteredOrders.map((order) => (
                            <OrderItem
                                key={order.id}
                                order={order}
                            />
                        ))}
                    </ul>
                ) : (
                    <EmptyPage page="orders" />
                )}
            </div>
        </div>
    );
}