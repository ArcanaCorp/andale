import { db } from "@/libs/supabase";

export async function getCustomerNotifications(userId) {
    if (!userId) return [];

    const { data, error } = await db
        .from("customer_notifications")
        .select(`
            id,
            user_id,
            order_id,
            title,
            body,
            type,
            url,
            is_read,
            created_at
        `)
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(50);

    if (error) {
        throw new Error(error.message);
    }

    return data || [];
}

export async function markNotificationAsRead(notificationId) {
    if (!notificationId) return null;

    const { data, error } = await db
        .from("customer_notifications")
        .update({
            is_read: true
        })
        .eq("id", notificationId)
        .select("*")
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export async function markAllNotificationsAsRead(userId) {
    if (!userId) return true;

    const { error } = await db
        .from("customer_notifications")
        .update({
            is_read: true
        })
        .eq("user_id", userId)
        .eq("is_read", false);

    if (error) {
        throw new Error(error.message);
    }

    return true;
}