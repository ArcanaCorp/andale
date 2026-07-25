import Icons from "@/constants/icons";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useLocation } from "@/context/LocationContext";
import { formatMoney } from "@/helpers/formatted.helper";
import { createFoodieOrder } from "@/services/orders.service";
import { useState } from "react";
import { toast } from "sonner";

export default function CheckOut ({ company, subtotal, total, deliveryFee }) {

    const { user } = useAuth();
    const { address } = useLocation();
    const { cart, clearCart } = useCart();

    const [form, setForm] = useState({
        payment_method: "",
        phone: "",
        delivery_address: "",
        delivery_reference: "",
        customer_notes: "",
        payment_attachment: null
    });
    const [sending, setSending] = useState(false);

    const updateForm = (field, value) => {
        setForm((prev) => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSend = async () => {
        try {

            if (!user?.id) return toast.warning("Inicia sesión", { description: "Necesitas iniciar sesión para realizar el pedido."});

            if (!cart?.company_id || products.length === 0) return toast.warning("Carrito vacío", { description: "Agrega productos antes de realizar el pedido."});

            if (!form.payment_method) return toast.warning("Método de pago", { description: "Selecciona un método de pago."});

            if (!form.phone.trim()) return toast.warning("Teléfono requerido", { description: "Ingresa tu número de WhatsApp para confirmar el pedido."});

            if (!form.delivery_address.trim()) return toast.warning("Dirección requerida", { description: "Confirma tu dirección de envío."});

            setSending(true);

            const orderPayload = {
                company_id: cart.company_id,
                user_id: user.id,

                status: "pending",

                customer_phone: form.phone.trim(),

                order_type: "delivery",

                delivery_address: form.delivery_address.trim(),
                delivery_reference: form.delivery_reference.trim() || null,

                delivery_latitude: address?.latitude || null,
                delivery_longitude: address?.longitude || null,
                delivery_location_accuracy: address?.accuracy || null,

                subtotal,
                delivery_fee: deliveryFee,
                discount_amount: 0,
                total,

                payment_method: form.payment_method,
                payment_status: "pending",

                customer_notes: form.customer_notes.trim() || null,

                estimated_delivery_time_min: company?.delivery_time_min || null,
                estimated_delivery_time_max: company?.delivery_time_max || null,

                cart_snapshot: cart
            };

            const itemsPayload = products.map((item) => {
                const product = item.product;

                return {
                    product_id: product.id,
                    product_name: product.name,
                    product_description: product.description || null,
                    product_image_url: product.image_url || null,
                    quantity: Number(item.amount) || 1,
                    unit_price: Number(product.price) || 0,
                    subtotal: Number(item.subtotal) || 0
                };
            });

            const createdOrder = await createFoodieOrder({
                order: orderPayload,
                items: itemsPayload
            });

            toast.success("Pedido realizado", {description: `Tu pedido ${createdOrder.order_code} fue enviado al local.`});

            // Luego aquí puedes limpiar carrito y redirigir
            clearCart();
            // router.push(`/orders/${createdOrder.id}`);

        } catch (error) {
            console.error(error);
            toast.error("Error", {description: error.message || "No se pudo realizar el pedido."});
        } finally {
            setSending(false);
        }
    };

    console.log(company);

    return (
        <>
        
            <div className="w-full h flex flex-col gap-md py-md scroll-y" style={{"--h": "calc(calc(100dvh - 45px) - 60px)"}}>
                <div className="w-full flex flex-col gap-sm">
                    <h4 className="text-md text-semibold px-md">¿Cómo quieres pagar?</h4>
                    <ul className="w-full flex gap-sm scroll-x px-md">
                        {company?.payment.accepts_yape && (
                            <li className={`w h center rounded-md bg-yape pointer ${form.payment_method === 'yape' ? 'border-medium border-brand-500' : ''}`} style={{"--w": "240px", "--mnw": "240px", "--h": "120px"}} onClick={() => updateForm("payment_method", "yape")}>
                                <img src="/yape-vector.svg" className="w-full h-full" alt="Logo de Yape" />
                            </li>
                        )}
                        {company?.payment.accepts_plin && (
                            <li className={`w h center rounded-md bg-plin pointer ${form.payment_method === 'plin' ? 'border-medium border-brand-500' : ''}`} style={{"--w": "240px", "--mnw": "240px", "--h": "120px"}} onClick={() => updateForm("payment_method", "plin")}>
                                <img src="/plin-vector.svg" className="w-full h-full" alt="Logo de Yape" />
                            </li>
                        )}
                        {company?.payment.accepts_card && (
                            <li className={`w h center rounded-md bg-surface text-lg text-bold pointer ${form.payment_method === 'card' ? 'border-medium border-brand-500' : ''}`} style={{"--w": "240px", "--mnw": "240px", "--h": "120px"}} onClick={() => updateForm("payment_method", "card")}>Pago con tarjeta</li>
                        )}
                        {company?.payment.accepts_cash && (
                            <li className={`w h center rounded-md bg-surface text-lg text-bold pointer ${form.payment_method === 'cash' ? 'border-medium border-brand-500' : ''}`} style={{"--w": "240px", "--mnw": "240px", "--h": "120px"}} onClick={() => updateForm("payment_method", "cash")}>Efectivo</li>
                        )}
                    </ul>
                </div>
                <div className="w-full px-md">
                    {form.payment_method !== "" && form.payment_method !== 'efectivo' && (
                        <div className="w-full flex flex-col gap-sm bg-surface p-sm rounded-md">
                            {form.payment_method === 'yape' || form.payment_method === 'plin' && (
                                <>
                                    <div className="flex flex-col gap-2xs text-center pointer">
                                        <p className="text-xs text-italic">Katia Camarena Lasich</p>
                                        <h3 className="text-xl">{form.payment_method === 'yape' ? company?.payment.yape_number : company?.payment.plin_number}</h3>
                                        <p className="text-xs text-italic">Toca el número para copiar y realizar el pago</p>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>
                <div className="w-full px-md flex flex-col gap-md">
                    {!user?.phone && (
                        <div className="w-full flex flex-col gap-sm">
                            <h4 className="text-md text-semibold">Datos de contacto</h4>
                            <ul className="w-full flex flex-col gap-md">
                                <li className="w-full flex gap-sm">
                                    <Icons name={'user'} strokeWidth={1.2} size={20} />
                                    <div>
                                        <p className="text-sm text-medium">Nombre del cliente</p>
                                        <p className="text-xs text-muted">{user?.user_metadata.name || 'Sin nombre'}</p>
                                    </div>
                                </li>
                                <li className="w-full flex flex-col gap-sm">
                                    <div className="w-full flex gap-sm">
                                        <Icons name={'phone'} strokeWidth={1.2} size={20} />
                                        <div className="w-full flex justify-between">
                                            <div>
                                                <p className="text-sm text-medium">Número de teléfono</p>
                                                <p className="text-xs text-muted">{form.phone || 'Sin número'}</p>
                                            </div>
                                            <button className="text-xs text-primary">Agregar número</button>
                                        </div>
                                    </div>
                                    <input type="number" placeholder="987 654 321" className="w-full bg-surface p-sm text-xs rounded-md outline-none" value={form.phone} onChange={(event) => updateForm("phone", event.target.value)}/>
                                </li>
                            </ul>
                        </div>
                    )}
                    <div className="w-full flex flex-col gap-sm">
                        <h4 className="text-md text-semibold">Datos de entrega</h4>
                        <ul className="w-full flex flex-col gap-md">
                            <li className="w-full flex gap-sm">
                                <Icons name={'delivery'} strokeWidth={1.2} size={20} />
                                <div>
                                    <p className="text-sm text-medium">Delivery</p>
                                    <p className="text-xs text-muted">{company?.delivery.time.min} - {company?.delivery.time.max} min</p>
                                </div>
                            </li>
                            <li className="w-full flex gap-sm">
                                <Icons name={'mappin'} strokeWidth={1.2} size={20} />
                                <div className="text-sm text-medium">
                                    <p>Ubicación</p>
                                    <p className="text-xs text-muted">{address?.road} {address?.houseNumber || ''}</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    {form.payment_method !== '' && form.payment_method !== 'efectivo' && (
                        <div className="w-full flex flex-col gap-sm">
                            <h4 className="text-md text-semibold">Adjunta la captura de pago</h4>
                            <label htmlFor="attachment" className="w-full h rounded-md center bg-surface pointer" style={{"--h": "160px"}}>
                                <Icons name={'camera'} size={20} strokeWidth={1.2} />
                                <input type="file" id="attachment" accept="image/*" hidden onChange={(event) => { const file = event.target.files?.[0] || null; updateForm("payment_attachment", file);}} />
                            </label>
                        </div>
                    )}
                    <div className="w-full flex flex-col gap-md bg-surface rounded-md p-md">
                        <h4 className="text-md text-semibold">Resumen</h4>
                        <ul className="flex flex-col gap-xs">
                            <li className="w-full flex items-center justify-between">
                                <span className="text-xs text-medium">Productos</span> 
                                <span className="text-sm">s/. {formatMoney(subtotal)}</span>
                            </li>
                            <li className="w-full flex items-center justify-between">
                                <span className="text-xs text-medium">Envío</span> 
                                <span className="text-sm">{deliveryFee > 0 ? `S/ ${formatMoney(deliveryFee)}` : "Gratis"}</span>
                            </li>
                        </ul>
                        <div className="w-full h bg-neutral-200" style={{"--h": "1px"}}></div>
                        <div className="w-full flex items-center justify-between">
                            <h4 className="text-medium">Total</h4>
                            <span className="text-semibold">s/. {formatMoney(total)}</span>
                        </div>
                    </div>
                </div>
            </div>  
            <footer className="w-full h flex items-center px-md" style={{"--h": "60px"}}>
                <button className="w-full h rounded-full text-white bg-primary text-xs text-semibold" style={{"--h": "40px"}} onClick={handleSend} disabled={sending}>{sending ? "Enviando pedido..." : "Realizar pedido"}</button>
            </footer>

        </>
    )
}