'use client';

import Avatar from "@/components/ui/Avatars/Avatar";
import ButtonIcon from "@/components/ui/Buttons/ButtonIcon";
import OrderItem from "@/components/ui/Card/OrderItem";
import EmptyPage from "@/components/ui/Empty/Empty";
import { useAuth } from "@/context/AuthContext";
import { formatMoney } from "@/helpers/formatted.helper";
import { useOrder } from "@/hooks/useOrder";
import { IconChevronDown, IconShoppingBag, IconAdjustmentsHorizontal } from "@tabler/icons-react";
import Link from "next/link";
import { useEffect } from "react";

export default function Page () {

    const { user } = useAuth();

    const { orders, loadingOrders, getOrdersList } = useOrder();

    useEffect(() => {
        if (!user?.id) return;

        getOrdersList({
            userId: user.id,
        });
    }, [user?.id, getOrdersList]);

    return (
        <div className="w-full h" style={{"--h": "calc(100dvh - 60px)"}}>
            <div className="w-full h px-md flex items-center justify-between" style={{"--h": "45px"}}>
                <div></div>
                <h2 className="text-sm text-semibold">Mis pedidos</h2>
                <ButtonIcon size={24}><IconShoppingBag size={20}/></ButtonIcon>
            </div>
            <div className="w-full h py-md scroll-y" style={{"--h": "calc(100% - 45px)"}}>
                <ul className="w-full flex items-center gap-xs scroll-x px-md">
                    <li className="badge badge-without-bg"><IconAdjustmentsHorizontal size={16} style={{"minWidth": "16px"}}/> Filtros</li>
                    <li className="badge">Entregados</li>
                    <li className="badge">Cancelados</li>
                    <li className="badge">Periodo <IconChevronDown size={16} style={{"minWidth": "16px"}}/></li>
                </ul>
                {loadingOrders ? (
                    <div>Cargando órdenes...</div>
                ) : (
                    orders.length > 0 ? (
                        <ul className="w-full flex flex-col gap-md pt-md px-md">
                            {orders.map((order) => (
                                <OrderItem key={order.id} order={order} />
                            ))}
                        </ul>
                    ) : (
                        <EmptyPage page={'orders'} />
                    )
                )}
            </div>
        </div>
    )
}