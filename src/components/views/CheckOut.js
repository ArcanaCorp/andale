'use client';

import Icons from "@/constants/icons";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useLocation } from "@/context/LocationContext";
import { formatMoney } from "@/helpers/formatted.helper";
import { useNewOrder } from "@/hooks/useNewOrder";
import { trackEvent } from "@/services/events.service";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import CartChoosedPay from "../ui/Card/CartChoosedPay";

export default function CheckOut({ company, subtotal, total, deliveryFee }) {

    const router = useRouter();

    const { user } = useAuth();
    const { address } = useLocation();
    const { cart, clearCart } = useCart();

    const { form, sending, needsPaymentInfo, updateForm, onSendOrder } = useNewOrder({ user, address });

    const [editPhone, setEditPhone] = useState(false);
    const [editAddress, setEditAddress] = useState(false);

    const trackedCheckoutView = useRef(false);
    const trackedPhone = useRef(false);
    const trackedAddress = useRef(false);

    const payment = company?.payment ?? {};

    const deliveryTimeMin = company?.delivery_time_min || company?.delivery?.time?.min || null;

    const deliveryTimeMax = company?.delivery_time_max || company?.delivery?.time?.max || null;

    const paymentNumber = form.payment_method === "yape" ? payment?.yape_number : form.payment_method === "plin" ? payment?.plin_number : null;

    const paymentLabel = form.payment_method === "yape" ? "Yape" : form.payment_method === "plin" ? "Plin" : "";

    const paymentOwner = payment?.holder_name || payment?.owner_name || company?.name || company?.title || "Titular del negocio";

    const phoneDigits = form.phone.replace(/\D/g, "");
    const phoneIsValid = phoneDigits.length === 9;
    const showPhoneInput = editPhone || !phoneIsValid;
    const showAddressInput = editAddress || !form.delivery_address;

    const safeTrack = async ({ eventName, entityType = "business", entityId = company?.id || cart?.company_id || null, metadata = {} }) => {

        try {
            await trackEvent({
                userId: user?.id || null,
                eventName,
                entityType,
                entityId,
                metadata: {
                    business_id: company?.id || cart?.company_id || null,
                    business_slug: company?.slug || null,
                    business_name: company?.commercial || company?.commercial_name || company?.title || company?.name || null,
                    products_count: cart?.products?.length || 0,
                    products_quantity: cart?.products?.reduce((sum, item) => sum + Number(item.amount || 0), 0) || 0,
                    subtotal: Number(subtotal || 0),
                    delivery_fee: Number(deliveryFee || 0),
                    total: Number(total || 0),
                    payment_method: form.payment_method || null,
                    has_payment_attachment: !!form.payment_attachment,
                    has_phone: !!form.phone,
                    has_delivery_address: !!form.delivery_address,
                    ...metadata
                }
            });
        } catch (error) {
            console.warn(`No se pudo registrar evento ${eventName}:`, error);
        }
    };

    const handleSelectPaymentMethod = async (method) => {
        updateForm("payment_method", method);

        await safeTrack({
            eventName: "payment_method_selected",
            metadata: {
                payment_method: method,
                source: "checkout_payment_section"
            }
        });
    };

    const handleCopyPaymentNumber = async () => {
        if (!paymentNumber) return;

        try {
            await navigator.clipboard.writeText(paymentNumber);

            await safeTrack({
                eventName: "payment_number_copied",
                metadata: {
                    payment_method: form.payment_method,
                    payment_label: paymentLabel
                }
            });

            toast.success("Número copiado", {
                description: `Número de ${paymentLabel} copiado correctamente.`
            });

        } catch (error) {
            toast.error("Error", {
                description: "No se pudo copiar el número."
            });
        }
    };

    const onChangePhone = (event) => {
        const phone = event.target.value
            .replace(/\D/g, "")
            .slice(0, 9);

        updateForm("phone", phone);
    };

    const handlePhoneBlur = async () => {
        if (!form.phone || trackedPhone.current) return;

        trackedPhone.current = true;

        await safeTrack({
            eventName: "checkout_phone_updated",
            metadata: {
                phone_digits: phoneDigits.length,
                phone_is_valid: phoneIsValid
            }
        });
    };

    const handleAddressBlur = async () => {
        if (!form.delivery_address?.trim() || trackedAddress.current) return;

        trackedAddress.current = true;

        await safeTrack({
            eventName: "checkout_address_updated",
            metadata: {
                address_length: form.delivery_address.length,
                has_reference: !!form.delivery_reference?.trim()
            }
        });
    };

    const handleAttachmentChange = async (event) => {
        const file = event.target.files?.[0] || null;

        updateForm("payment_attachment", file);

        if (!file) return;

        await safeTrack({
            eventName: "payment_attachment_selected",
            metadata: {
                file_name: file.name,
                file_type: file.type,
                file_size: file.size,
                payment_method: form.payment_method
            }
        });
    };

    const handleNewOrder = async () => {
        try {
            const needsPaymentAttachment = ["yape", "plin"].includes(
                form.payment_method
            );

            if (needsPaymentAttachment && !form.payment_attachment) {
                await safeTrack({
                    eventName: "order_validation_failed",
                    metadata: {
                        reason: "missing_payment_attachment",
                        payment_method: form.payment_method
                    }
                });

                return toast.warning(
                    "Adjunta la captura del pago para continuar."
                );
            }

            await safeTrack({
                eventName: "order_submit_clicked",
                metadata: {
                    source: "checkout_submit_button"
                }
            });

            const data = await onSendOrder({ company, cart, address, deliveryFee, total, subtotal });

            if (!data.ok) {
                await safeTrack({
                    eventName: "order_create_failed",
                    metadata: {
                        reason: data.message || "unknown_error"
                    }
                });

                return toast.warning("Alerta", {
                    description:
                        data.message ||
                        "Hubo un error al enviar la orden."
                });
            }

            await safeTrack({
                eventName: "order_created",
                entityType: "order",
                entityId: data.order?.id || null,
                metadata: {
                    order_id: data.order?.id || null,
                    order_code: data.order?.order_code || null,
                    status: data.order?.status || "pending",
                    business_id: company?.id || cart?.company_id || null,
                    business_slug: company?.slug || null,
                    business_name:
                        company?.commercial ||
                        company?.commercial_name ||
                        company?.title ||
                        company?.name ||
                        null,
                    products_count: cart?.products?.length || 0,
                    products_quantity: cart?.products?.reduce(
                        (sum, item) => sum + Number(item.amount || 0),
                        0
                    ) || 0,
                    subtotal: Number(subtotal || 0),
                    delivery_fee: Number(deliveryFee || 0),
                    total: Number(total || 0),
                    payment_method: form.payment_method || null,
                    has_payment_attachment: !!form.payment_attachment
                }
            });

            clearCart();

            toast.success("Pedido enviado correctamente", {
                description: data.message
            });

            router.replace(`/orders/${data.order.order_code}`);

        } catch (error) {
            await safeTrack({
                eventName: "order_create_failed",
                metadata: {
                    reason: error.message || "unexpected_error"
                }
            });

            toast.error("Error", {
                description: error.message
            });
        }
    };

    useEffect(() => {
        if (trackedCheckoutView.current) return;
        if (!company?.id && !cart?.company_id) return;

        trackedCheckoutView.current = true;

        safeTrack({
            eventName: "checkout_viewed",
            metadata: {
                source: "checkout_page"
            }
        });
    }, [company?.id, cart?.company_id]);

    return (
        <>

            <div className="w-full h flex flex-col gap-md py-md scroll-y" style={{"--h": "calc(calc(100dvh - 45px) - 60px)"}}>
                
                <section className="w-full flex flex-col gap-sm">
                    
                    <h4 className="text-md text-semibold px-md">¿Cómo quieres pagar?</h4>

                    <ul className="w-full flex gap-sm scroll-x px-md">

                        {payment?.accepts_yape && (
                            <CartChoosedPay form={form} type={'yape'} onChoosed={handleSelectPaymentMethod} />
                        )}

                        {payment?.accepts_plin && (
                            <CartChoosedPay form={form} type={'plin'} onChoosed={handleSelectPaymentMethod} />
                        )}

                        {payment?.accepts_card && (
                            <CartChoosedPay form={form} type={'card'} onChoosed={handleSelectPaymentMethod} />
                        )}

                        {payment?.accepts_cash && (
                            <CartChoosedPay form={form} type={'cash'} onChoosed={handleSelectPaymentMethod} />
                        )}

                    </ul>
                    
                </section>

                {needsPaymentInfo && paymentNumber && (
                    <section className="w-full px-md">
                        <div className="w-full flex flex-col gap-sm bg-surface p-sm rounded-md">
                            <button type="button" className="flex flex-col gap-2xs text-center pointer" onClick={handleCopyPaymentNumber} >
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

                                <Icons name="user" strokeWidth={1.2} size={20} />
                                <div>
                                    <p className="text-sm text-medium">Nombre del cliente</p>
                                    <p className="text-xs text-muted">{user?.user_metadata?.name || "Sin nombre"}</p>
                                </div>

                            </li>

                            <li className="w-full flex flex-col gap-sm">

                                <div className="w-full flex gap-sm">

                                    <Icons name="phone" strokeWidth={1.2} size={20} />

                                    <div className="w-full flex justify-between gap-md">
                                        <div>
                                            <p className="text-sm text-medium">Número de teléfono</p>
                                            <p className="text-xs text-muted">{form.phone || "Sin número"}</p>
                                        </div>
                                        <button type="button" className={`text-xs ${showPhoneInput && !phoneIsValid ? "text-muted cursor-not-allowed" : "text-primary"}`} disabled={showPhoneInput && !phoneIsValid} onClick={() => setEditPhone((prev) => !prev)} >
                                            {showPhoneInput ? phoneIsValid ? "Ocultar" : `Faltan ${9 - phoneDigits.length} dígitos` : "Editar"}
                                        </button>
                                    </div>

                                </div>

                                {showPhoneInput && (
                                    <input type="tel" placeholder="987 654 321" className="w-full bg-surface p-sm text-xs rounded-md outline-none" value={form.phone} onChange={(event) => onChangePhone(event)} onBlur={handlePhoneBlur} />
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
                                    <input type="text" placeholder="Ingresa tu dirección" className="w-full bg-surface p-sm text-xs rounded-md outline-none" value={form.delivery_address} onChange={(event) => updateForm("delivery_address", event.target.value)} onBlur={handleAddressBlur} />
                                )}

                                <input type="text" placeholder="Referencia: color de puerta, piso, frente a..." className="w-full bg-surface p-sm text-xs rounded-md outline-none" value={form.delivery_reference} onChange={(event) => updateForm("delivery_reference", event.target.value)} />
                            
                            </li>

                        </ul>

                    </section>

                    {needsPaymentInfo && (
                        <section className="w-full flex flex-col gap-sm">

                            <h4 className="text-md text-semibold">Adjunta la captura de pago</h4>
                            <label htmlFor="attachment" className="w-full h rounded-md center bg-surface pointer flex-col gap-xs" style={{"--h": "160px"}}>
                                <Icons name="camera" size={20} strokeWidth={1.2} />
                                <span className="text-xs text-muted">{form.payment_attachment?.name || "Seleccionar captura"}</span>
                                <input type="file" id="attachment" accept="image/*" hidden onChange={handleAttachmentChange}/>
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

                        <div className="w-full h bg-neutral-200" style={{"--h": "1px"}} />

                        <div className="w-full flex items-center justify-between">
                            <h4 className="text-medium">Total</h4>
                            <span className="text-semibold">S/ {formatMoney(total)}</span>
                        </div>

                    </section>

                </div>

            </div>

            <footer className="w-full h flex items-center px-md" style={{"--h": "60px"}}>
                <button className="w-full h rounded-full text-white bg-primary text-xs text-semibold" style={{"--h": "40px"}} onClick={handleNewOrder} disabled={sending}>{sending ? "Enviando pedido..." : "Realizar pedido"}</button>
            </footer>
        </>
    );
}