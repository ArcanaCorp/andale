'use client';

import Icons from "@/constants/icons";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useLocation } from "@/context/LocationContext";
import { formatMoney } from "@/helpers/formatted.helper";
import { useNewOrder } from "@/hooks/useNewOrder";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function CheckOut({ company, subtotal, total, deliveryFee }) {

    const router = useRouter()

    const { user } = useAuth();
    const { address } = useLocation();
    const { cart, clearCart } = useCart();

    const { form, sending, needsPaymentInfo, updateForm, onSendOrder } = useNewOrder({ user, address });

    const [editPhone, setEditPhone] = useState(false);
    const [editAddress, setEditAddress] = useState(false);

    const payment = company?.payment ?? {};

    const deliveryTimeMin = company?.delivery_time_min || company?.delivery?.time?.min || null;

    const deliveryTimeMax = company?.delivery_time_max || company?.delivery?.time?.max || null;

    const paymentNumber = form.payment_method === "yape" ? payment?.yape_number : form.payment_method === "plin" ? payment?.plin_number : null;

    const paymentLabel = form.payment_method === "yape" ? "Yape" : form.payment_method === "plin" ? "Plin" : "";

    const paymentOwner = payment?.holder_name || payment?.owner_name || company?.name || "Titular del negocio";

    const phoneDigits = form.phone.replace(/\D/g, "")
    const phoneIsValid = phoneDigits.length === 9
    const showPhoneInput = editPhone || !phoneIsValid
    const showAddressInput = editAddress || !form.delivery_address;

    const handleCopyPaymentNumber = async () => {
        if (!paymentNumber) return;

        try {
            await navigator.clipboard.writeText(paymentNumber);
            toast.success("Número copiado", { description: `Número de ${paymentLabel} copiado correctamente.`});
        } catch (error) {
            toast.error("Error", { description: "No se pudo copiar el número."});
        }
    };

    const onChangePhone = (event) => {
        const phone = event.target.value
            .replace(/\D/g, "")
            .slice(0, 9)
        updateForm("phone", phone)
    }

    const handleNewOrder = async () => {
        try {

            const needsPaymentAttachment = ["yape", "plin"].includes(form.payment_method);

            if (needsPaymentAttachment && !form.payment_attachment) return toast.warning('Adjunta la captura del pago para continuar.')

            const data = await onSendOrder({ company, cart, address, deliveryFee, total, subtotal });

            if (!data.ok) return toast.warning("Alerta", { description: data.message || "Hubo un error al enviar la orden."});

                clearCart();
                toast.success("Pedido enviado correctamente", {description: data.message});
                router.replace(`/orders/${data.order.order_code}`)

        } catch (error) {
            toast.error("Error", {description: error.message});
        }
    };

    return (
        <>
            <div className="w-full h flex flex-col gap-md py-md scroll-y" style={{ "--h": "calc(calc(100dvh - 45px) - 60px)" }}>
                
                <section className="w-full flex flex-col gap-sm">
                    <h4 className="text-md text-semibold px-md">¿Cómo quieres pagar?</h4>
                    <ul className="w-full flex gap-sm scroll-x px-md">
                        {payment?.accepts_yape && (
                            <li className={`w h center rounded-md bg-yape pointer ${form.payment_method === "yape" ? "border-medium border-brand-500" : ""}`} style={{"--w": "240px","--mnw": "240px","--h": "120px"}} onClick={() => updateForm("payment_method", "yape")}>
                                <img src="/yape-vector.svg" className="w-full h-full" alt="Logo de Yape"/>
                            </li>
                        )}

                        {payment?.accepts_plin && (
                            <li className={`w h center rounded-md bg-plin pointer ${form.payment_method === "plin" ? "border-medium border-brand-500" : ""}`} style={{"--w": "240px","--mnw": "240px","--h": "120px"}} onClick={() => updateForm("payment_method", "plin")}>
                                <img src="/plin-vector.svg" className="w-full h-full" alt="Logo de Plin" />
                            </li>
                        )}

                        {payment?.accepts_card && (
                            <li className={`w h center rounded-md bg-surface text-lg text-bold pointer ${form.payment_method === "card" ? "border-medium border-brand-500" : "" }`} style={{"--w": "240px","--mnw": "240px","--h": "120px"}} onClick={() => updateForm("payment_method", "card")} >
                                Pago con tarjeta
                            </li>
                        )}

                        {payment?.accepts_cash && (
                            <li className={`w h center rounded-md bg-surface text-lg text-bold pointer ${form.payment_method === "cash" ? "border-medium border-brand-500" : ""}`} style={{"--w": "240px","--mnw": "240px","--h": "120px"}} onClick={() => updateForm("payment_method", "cash")} >
                                Efectivo
                            </li>
                        )}
                    </ul>
                </section>

                {needsPaymentInfo && paymentNumber && (
                    <section className="w-full px-md">
                        <div className="w-full flex flex-col gap-sm bg-surface p-sm rounded-md">
                            <button type="button" className="flex flex-col gap-2xs text-center pointer" onClick={handleCopyPaymentNumber}>
                                <p className="text-xs text-italic">{paymentOwner} | {paymentLabel}</p>
                                <h3 className="text-xl">{paymentNumber}</h3>
                                <p className="text-xs text-italic">Toca el número para copiar y realizar el pago</p>
                            </button>
                        </div>
                    </section>
                )}

                <div className="w-full px-md flex flex-col gap-md">

                    <section className="w-full flex flex-col gap-sm">
                        <h4 className="text-md text-semibold">Datos de contacto</h4>
                        <ul className="w-full flex flex-col gap-md">
                            <li className="w-full flex gap-sm">
                                <Icons name="user" strokeWidth={1.2} size={20}/>
                                <div>
                                    <p className="text-sm text-medium">Nombre del cliente</p>
                                    <p className="text-xs text-muted">{user?.user_metadata?.name || "Sin nombre"}</p>
                                </div>
                            </li>
                            <li className="w-full flex flex-col gap-sm">
                                <div className="w-full flex gap-sm">
                                    <Icons name="phone" strokeWidth={1.2} size={20}/>
                                    <div className="w-full flex justify-between gap-md">
                                        <div>
                                            <p className="text-sm text-medium">Número de teléfono</p>
                                            <p className="text-xs text-muted">{form.phone || "Sin número"}</p>
                                        </div>
                                        <button type="button" className={`text-xs ${showPhoneInput && !phoneIsValid ? "text-muted cursor-not-allowed" : "text-primary"}`} disabled={showPhoneInput && !phoneIsValid} onClick={() => setEditPhone((prev) => !prev)}>
                                            {showPhoneInput ? phoneIsValid ? "Ocultar" : `Faltan ${9 - phoneDigits.length} dígitos` : "Editar"}
                                        </button>
                                    </div>
                                </div>

                                {showPhoneInput && (
                                    <input type="tel" placeholder="987 654 321" className="w-full bg-surface p-sm text-xs rounded-md outline-none" value={form.phone} onChange={(event) => onChangePhone(event)}/>
                                )}
                            </li>
                        </ul>
                    </section>

                    <section className="w-full flex flex-col gap-sm">
                        <h4 className="text-md text-semibold">Datos de entrega</h4>
                        <ul className="w-full flex flex-col gap-md">
                            <li className="w-full flex gap-sm">
                                <Icons name="delivery" strokeWidth={1.2} size={20} />
                                <div>
                                    <p className="text-sm text-medium">Delivery</p>
                                    <p className="text-xs text-muted">{deliveryTimeMin && deliveryTimeMax ? `${deliveryTimeMin} - ${deliveryTimeMax} min` : "Tiempo por confirmar"}</p>
                                </div>
                            </li>
                            <li className="w-full flex flex-col gap-sm">
                                <div className="w-full flex gap-sm">
                                    <Icons name="mappin" strokeWidth={1.2} size={20} />
                                    <div className="w-full flex justify-between gap-md">
                                        <div>
                                            <p className="text-sm text-medium">Dirección</p>
                                            <p className="text-xs text-muted">{form.delivery_address || "Sin dirección"}</p>
                                        </div>
                                        <button type="button" className="text-xs text-primary" onClick={() => setEditAddress((prev) => !prev)}>
                                            {showAddressInput ? "Ocultar" : "Editar"}
                                        </button>
                                    </div>
                                </div>
                                {showAddressInput && (
                                    <input type="text" placeholder="Ingresa tu dirección" className="w-full bg-surface p-sm text-xs rounded-md outline-none" value={form.delivery_address} onChange={(event) => updateForm("delivery_address", event.target.value)}/>
                                )}
                                <input type="text" placeholder="Referencia: color de puerta, piso, frente a..." className="w-full bg-surface p-sm text-xs rounded-md outline-none" value={form.delivery_reference} onChange={(event) => updateForm("delivery_reference", event.target.value)}/>
                            </li>
                        </ul>
                    </section>

                    {needsPaymentInfo && (
                        <section className="w-full flex flex-col gap-sm">
                            <h4 className="text-md text-semibold">Adjunta la captura de pago</h4>
                            <label htmlFor="attachment" className="w-full h rounded-md center bg-surface pointer flex-col gap-xs" style={{ "--h": "160px" }}>
                                <Icons name="camera" size={20} strokeWidth={1.2} />
                                <span className="text-xs text-muted">{form.payment_attachment?.name || "Seleccionar captura"}</span>
                                <input type="file" id="attachment" accept="image/*" hidden
                                    onChange={(event) => {
                                        const file = event.target.files?.[0] || null;
                                        updateForm("payment_attachment",file);
                                    }}
                                />
                            </label>
                        </section>
                    )}

                    <section className="w-full flex flex-col gap-md bg-surface rounded-md p-md">
                        <h4 className="text-md text-semibold">Resumen</h4>

                        <ul className="flex flex-col gap-xs">
                            <li className="w-full flex items-center justify-between">
                                <span className="text-xs text-medium">Productos</span>
                                <span className="text-sm">S/ {formatMoney(subtotal)}</span>
                            </li>
                            <li className="w-full flex items-center justify-between">
                                <span className="text-xs text-medium">Envío</span>
                                <span className="text-sm">{deliveryFee > 0 ? `S/ ${formatMoney(deliveryFee)}` : "Gratis"}</span>
                            </li>
                        </ul>

                        <div className="w-full h bg-neutral-200" style={{ "--h": "1px" }}/>

                        <div className="w-full flex items-center justify-between">
                            <h4 className="text-medium">Total</h4>
                            <span className="text-semibold">S/ {formatMoney(total)}</span>
                        </div>
                    </section>

                </div>

            </div>

            <footer className="w-full h flex items-center px-md" style={{ "--h": "60px" }}>
                <button className="w-full h rounded-full text-white bg-primary text-xs text-semibold" style={{ "--h": "40px" }} onClick={handleNewOrder} disabled={sending}>
                    {sending ? "Enviando pedido..." : "Realizar pedido"}
                </button>
            </footer>
        </>
    );
}