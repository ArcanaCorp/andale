import { db } from "@/libs/supabase";

export async function createFoodieOrder({ order, items }) {
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

    return createdOrder;
}