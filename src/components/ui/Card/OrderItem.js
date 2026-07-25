import Link from "next/link";
import Avatar from "../Avatars/Avatar";
import { formatMoney } from "@/helpers/formatted.helper";

const STATUS_TEXT = {
    'pending': 'Pendiente',
    'accepted': 'Aceptado',
    'preparing': 'Preparando',
    'ready': 'Listo',
    'on_delivery': 'En camino',
    'completed': 'Completado',
    'rejected': 'rechazado',
    'cancelled_by_customer': 'Cancelado por el cliente',
    'cancelled_by_restaurant': 'Cancelado por el restaurante',
    'expired': 'Expirado',
    'fake_reported': 'Reportado'
}

export default function OrderItem ({ order }) {
    return (
        <li key={order.id} className="w-full">
            <Link href={`/orders/${order.order_code}`} className="w-full flex gap-md">
                <Avatar image={order.business.profile_image_url} name={order.business.name || `Nombre del comercio`} size={80} rounded={'rounded-md'} />
                <div className="w-full flex flex-col gap-2xs">
                    <div className="w-full flex items-center justify-between">
                        <p className="text-xs text-medium">#{order.order_code}</p>
                        <p className="text-xs text-medium">{STATUS_TEXT[order.status]}</p>
                    </div>
                    <h4>{order.business.name || `Nombre del comercio`}</h4>
                    <p>S/{formatMoney(order.total)}</p>
                </div>
            </Link>
        </li>
    )
}