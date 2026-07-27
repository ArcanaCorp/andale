'use client';

import ButtonBack from "@/components/ui/Buttons/ButtonBack";
import Loading from "@/components/views/Loading";

import { useAuth } from "@/context/AuthContext";
import { useOrderDetail } from "@/hooks/useOrderDetail";

import { useParams } from "next/navigation";
import { ORDER_TYPE_LABELS, PAYMENT_LABELS, STATUS_VIEW, formatMoney, formatTimeRange } from "@/helpers/orders.helper";

export default function OrderPage() {

    const { code } = useParams();
    const { user, loadAuth } = useAuth();

    const { order, loadingOrder, errorOrder, loadOrder } = useOrderDetail({ orderCode: code, userId: user?.id });

    if (loadAuth || loadingOrder) return <Loading />;

    if (!user) {
        return (
            <main className="w-full h-full grid-center p-md">
                <p className="text-sm text-muted text-center">
                    Inicia sesión para ver tu pedido.
                </p>
            </main>
        );
    }

    if (errorOrder || !order) {
        return (
            <main className="w-full h-full grid-center p-md">
                <div className="w-full flex flex-col gap-md text-center">
                    <p className="text-sm text-muted">{errorOrder || "No se encontró el pedido."}</p>
                    <button type="button" className="text-sm text-primary text-semibold" onClick={loadOrder}>Reintentar</button>
                </div>
            </main>
        );
    }

    const status = STATUS_VIEW[order.status] || STATUS_VIEW.pending;

    const items = order.foodie_order_items || [];

    return (
        <div className="w-full h" style={{ "--h": "calc(100dvh - 60px)" }}>
            <div
                className="w-full h px-md flex items-center justify-between"
                style={{
                    "--h": "45px"
                }}
            >
                <ButtonBack />

                <h2 className="text-sm text-semibold">
                    {order.order_code}
                </h2>

                <div />
            </div>

            <div
                className="w-full h p-md flex flex-col gap-md scroll-y"
                style={{
                    "--h": "calc(100% - 45px)"
                }}
            >
                <section className="w-full p-md rounded-md border-medium border-surface flex flex-col gap-sm">
                    <p className="text-xs text-success text-medium">
                        {status.label}
                    </p>

                    <h3 className="text-xl text-semibold">
                        {formatTimeRange(order)}
                    </h3>

                    <div
                        className="w-full h rounded-full bg-surface"
                        style={{
                            "--h": "10px"
                        }}
                    >
                        <div
                            className="w h-full bg-dark rounded-full"
                            style={{
                                "--w": `${status.progress}%`
                            }}
                        />
                    </div>

                    <h4 className="text-medium">
                        {status.title}
                    </h4>

                    <p className="text-xs text-muted">
                        {status.description}
                    </p>
                </section>

                <section className="w-full flex flex-col gap-sm">
                    <h3 className="text-md text-semibold">
                        Resumen
                    </h3>

                    <div className="w-full bg-surface rounded-md p-md flex flex-col gap-xs">
                        <div className="w-full flex items-center justify-between">
                            <span className="text-xs text-muted">
                                Tipo
                            </span>

                            <span className="text-xs text-semibold">
                                {ORDER_TYPE_LABELS[order.order_type] || order.order_type}
                            </span>
                        </div>

                        <div className="w-full flex items-center justify-between">
                            <span className="text-xs text-muted">
                                Pago
                            </span>

                            <span className="text-xs text-semibold">
                                {PAYMENT_LABELS[order.payment_method] || order.payment_method}
                            </span>
                        </div>

                        <div className="w-full flex items-center justify-between">
                            <span className="text-xs text-muted">
                                Total
                            </span>

                            <span className="text-xs text-semibold">
                                S/ {formatMoney(order.total)}
                            </span>
                        </div>
                    </div>
                </section>

                {order.delivery_address && (
                    <section className="w-full flex flex-col gap-sm">
                        <h3 className="text-md text-semibold">
                            Entrega
                        </h3>

                        <div className="w-full bg-surface rounded-md p-md flex flex-col gap-xs">
                            <p className="text-xs text-muted">
                                Dirección
                            </p>

                            <p className="text-sm text-semibold">
                                {order.delivery_address}
                            </p>

                            {order.delivery_reference && (
                                <p className="text-xs text-muted">
                                    {order.delivery_reference}
                                </p>
                            )}
                        </div>
                    </section>
                )}

                <section className="w-full flex flex-col gap-sm">
                    <h3 className="text-md text-semibold">
                        Detalle del pedido
                    </h3>

                    <ul className="w-full flex flex-col gap-sm">
                        {items.map((item) => (
                            <li
                                key={item.id}
                                className="w-full bg-white border-thin border-surface rounded-md p-sm flex items-center justify-between gap-md"
                            >
                                <div className="w-full flex flex-col gap-2xs">
                                    <p className="text-sm text-semibold">
                                        {item.quantity} x {item.product_name}
                                    </p>

                                    <p className="text-xs text-muted">
                                        S/ {formatMoney(item.unit_price)} c/u
                                    </p>
                                </div>

                                <p className="text-sm text-semibold">
                                    S/ {formatMoney(item.subtotal)}
                                </p>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="w-full flex flex-col gap-sm bg-surface rounded-md p-md">
                    <div className="w-full flex items-center justify-between">
                        <span className="text-xs text-muted">
                            Productos
                        </span>

                        <span className="text-xs text-semibold">
                            S/ {formatMoney(order.subtotal)}
                        </span>
                    </div>

                    <div className="w-full flex items-center justify-between">
                        <span className="text-xs text-muted">
                            Envío
                        </span>

                        <span className="text-xs text-semibold">
                            {Number(order.delivery_fee) > 0
                                ? `S/ ${formatMoney(order.delivery_fee)}`
                                : "Gratis"}
                        </span>
                    </div>

                    <div
                        className="w-full h bg-neutral-200"
                        style={{
                            "--h": "1px"
                        }}
                    />

                    <div className="w-full flex items-center justify-between">
                        <span className="text-sm text-semibold">
                            Total
                        </span>

                        <span className="text-sm text-semibold">
                            S/ {formatMoney(order.total)}
                        </span>
                    </div>
                </section>
            </div>
        </div>
    );
}