import { db } from "@/libs/supabase";
import { uploadPaymentAttachment } from "./storage.service";

export async function createFoodieOrder({ order, items, company_id, paymentAttachment = null }) {

    const { data: createdOrder, error: orderError } = await db
        .from("foodie_orders")
        .insert(order)
        .select("id, order_code, status, total")
        .single();

    if (orderError) {
        throw orderError;
    }

    const orderItems = items.map((item) => ({
        order_id: createdOrder.id,
        product_id: item.product_id,
        product_name: item.product_name,
        product_description: item.product_description,
        product_image_url: item.product_image_url,
        quantity: item.quantity,
        unit_price: item.unit_price,
        subtotal: item.subtotal
    }));

    const { error: itemsError } = await db
        .from("foodie_order_items")
        .insert(orderItems);

    if (itemsError) {
        await db
            .from("foodie_orders")
            .delete()
            .eq("id", createdOrder.id);

        throw itemsError;
    }

    if (paymentAttachment) {
        const attachment = await uploadPaymentAttachment({
            file: paymentAttachment,
            companyId: company_id,
            orderId: createdOrder.id,
            orderCode: createdOrder.order_code
        });

        const { error: updateError } = await db
            .from("foodie_orders")
            .update({
                payment_attachment_url: attachment.url,
                payment_attachment_path: attachment.path
            })
            .eq("id", createdOrder.id);

        if (updateError) {
            throw updateError;
        }

        return {
            ...createdOrder,
            payment_attachment_url: attachment.url,
            payment_attachment_path: attachment.path
        };
    }

    return createdOrder;
}

export const getMyFoodieOrders = async ({ page = 0, pageSize = 20 } = {}) => {
    try {
        const safePage = Math.max(
            Number(page) || 0,
            0
        );

        const safePageSize = Math.min(
            Math.max(Number(pageSize) || 20, 1),
            100
        );

        const { data, error } = await db.rpc(
            "get_my_foodie_orders",
            {
                p_limit: safePageSize,
                p_offset: safePage * safePageSize,
            }
        );

        if (error) {
            throw new Error(
                error.message ||
                    "No se pudieron obtener los pedidos"
            );
        }

        return {
            ok: true,
            code: 200,
            data: data ?? [],
            error: "",
            pagination: {
                page: safePage,
                pageSize: safePageSize,
            },
            message: "Pedidos obtenidos correctamente.",
        };
    } catch (error) {
        console.error("getMyFoodieOrders:", error);

        return {
            ok: false,
            code: 500,
            data: [],
            error,
            pagination: {
                page,
                pageSize,
            },
            message:
                error instanceof Error
                    ? error.message
                    : "No se pudieron obtener los pedidos",
        };
    }
};