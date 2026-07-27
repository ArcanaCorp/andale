'use client';

import { createFoodieOrder } from "@/services/orders.service";
import { useEffect, useMemo, useState } from "react";

const MANUAL_PAYMENT_METHODS = ["yape", "plin"];

const getDefaultAddress = (address) => {
    return [
        address?.road,
        address?.houseNumber
    ]
        .filter(Boolean)
        .join(" ")
        .trim();
};

const getDefaultPhone = (user) => {
    return (
        user?.phone ||
        user?.user_metadata?.phone ||
        user?.user_metadata?.phone_number ||
        ""
    );
};

export const useNewOrder = ({ user, address } = {}) => {
    const [form, setForm] = useState({
        payment_method: "",
        phone: "",
        delivery_address: "",
        delivery_reference: "",
        customer_notes: "",
        payment_attachment: null
    });

    const [sending, setSending] = useState(false);

    const needsPaymentInfo = useMemo(() => {
        return MANUAL_PAYMENT_METHODS.includes(form.payment_method);
    }, [form.payment_method]);

    const isCashPayment = form.payment_method === "cash";

    const updateForm = (field, value) => {
        setForm((prev) => ({
            ...prev,
            [field]: value
        }));
    };

    useEffect(() => {
        const defaultPhone = getDefaultPhone(user);

        if (!defaultPhone) return;

        setForm((prev) => {
            if (prev.phone) return prev;

            return {
                ...prev,
                phone: defaultPhone
            };
        });
    }, [user?.id]);

    useEffect(() => {
        const defaultAddress = getDefaultAddress(address);

        if (!defaultAddress) return;

        setForm((prev) => {
            if (prev.delivery_address) return prev;

            return {
                ...prev,
                delivery_address: defaultAddress
            };
        });
    }, [
        address?.road,
        address?.houseNumber
    ]);

    const validateOrder = ({ cart, products }) => {
        if (!user?.id) {
            return {
                ok: false,
                message: "Necesitas iniciar sesión para realizar el pedido."
            };
        }

        if (!cart?.company_id || products.length === 0) {
            return {
                ok: false,
                message: "Agrega productos antes de realizar el pedido."
            };
        }

        if (!form.payment_method) {
            return {
                ok: false,
                message: "Selecciona un método de pago."
            };
        }

        if (!form.phone.trim()) {
            return {
                ok: false,
                message: "Ingresa tu número de WhatsApp para confirmar el pedido."
            };
        }

        if (!form.delivery_address.trim()) {
            return {
                ok: false,
                message: "Confirma tu dirección de envío."
            };
        }

        return {
            ok: true,
            message: null
        };
    };

    const buildOrderPayload = ({ company, cart, deliveryFee, total, subtotal }) => {
        return {
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

            subtotal: Number(subtotal) || 0,
            delivery_fee: Number(deliveryFee) || 0,
            discount_amount: 0,
            total: Number(total) || 0,

            payment_method: form.payment_method,
            payment_status: "pending",

            customer_notes: form.customer_notes.trim() || null,

            estimated_delivery_time_min:
                company?.delivery_time_min ||
                company?.delivery?.time?.min ||
                null,

            estimated_delivery_time_max:
                company?.delivery_time_max ||
                company?.delivery?.time?.max ||
                null,

            cart_snapshot: cart
        };
    };

    const buildItemsPayload = (products) => {
        return products.map((item) => {
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
    };

    const onSendOrder = async ({ company, cart, deliveryFee, total, subtotal }) => {
        try {
            const products = cart?.products ?? [];

            const validation = validateOrder({cart,products});

            if (!validation.ok) {
                return {
                    ok: false,
                    message: validation.message,
                    order: null
                };
            }

            setSending(true);

            const orderPayload = buildOrderPayload({
                company,
                cart,
                deliveryFee,
                total,
                subtotal
            });

            const itemsPayload = buildItemsPayload(products);

            const createdOrder = await createFoodieOrder({
                order: orderPayload,
                items: itemsPayload,
                company_id: company.id,
                paymentAttachment: form.payment_attachment
            });

            return {
                ok: true,
                message: `Tu pedido ${createdOrder.order_code} fue enviado al local.`,
                order: createdOrder
            };

        } catch (error) {
            console.error(error);

            return {
                ok: false,
                message: error.message || "No se pudo crear el pedido.",
                order: null
            };

        } finally {
            setSending(false);
        }
    };

    return {
        form,
        sending,

        isCashPayment,
        needsPaymentInfo,

        updateForm,
        onSendOrder
    };
};