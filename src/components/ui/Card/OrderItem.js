import Link from "next/link";
import Avatar from "../Avatars/Avatar";
import { formatMoney } from "@/helpers/formatted.helper";

const STATUS_TEXT = {
    pending: "Pendiente",
    accepted: "Aceptado",
    preparing: "Preparando",
    ready: "Listo",
    on_delivery: "En camino",
    on_the_way: "En camino",
    completed: "Completado",
    rejected: "Rechazado",
    cancelled: "Cancelado",
    cancelled_by_customer: "Cancelado por el cliente",
    cancelled_by_restaurant: "Cancelado por el restaurante",
    expired: "Expirado",
    fake_reported: "Reportado"
};

const STATUS_BADGE_CLASS = {
    pending: "badge-pending",
    accepted: "badge-accepted",
    preparing: "badge-preparing",
    ready: "badge-ready",
    on_the_way: "badge-on-the-way",
    on_delivery: "badge-on-delivery",
    completed: "badge-completed",
    rejected: "badge-rejected",
    cancelled: "badge-cancelled",
    cancelled_by_customer: "badge-cancelled-by-customer",
    cancelled_by_restaurant: "badge-cancelled-by-restaurant",
    expired: "badge-expired",
    fake_reported: "badge-fake-reported"
};

export default function OrderItem({ order }) {
    const business = order?.business || order?.businesses || order?.company || {};

    const businessName = business?.commercial_name || business?.name || "Nombre del comercio";

    const businessImage = business?.profile_image_url || business?.cover_image_url || null;


    return (
        <li className="w-full">
            <Link href={`/orders/${order?.order_code}`} className="w-full flex gap-md p-sm">
                <Avatar image={businessImage} name={businessName} size={80} rounded="rounded-md"/>
                <div className="w-full flex flex-col gap-xs">
                    <div className="w-full flex items-center justify-between">
                        <p className="text-xs text-medium">#{order?.order_code}</p>
                        <p className={`badge badge-status ${STATUS_BADGE_CLASS[order?.status] || "badge-pending"}`}>{STATUS_TEXT[order?.status] || order?.status}</p>
                    </div>
                    <h4 className="text-medium">{businessName}</h4>
                    <p className="text-xs text-muted">S/{formatMoney(order?.total)}</p>
                </div>
            </Link>
        </li>
    );
}