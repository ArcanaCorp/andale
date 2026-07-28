import { db } from "@/libs/supabase";

export async function getBusinessReviews(businessId) {
    if (!businessId) return [];

    const { data, error } = await db
        .from("business_reviews")
        .select(`
            id,
            business_id,
            user_id,
            rating,
            comment,
            created_at,
            updated_at,
            profiles (
                id,
                full_name,
                avatar_url
            )
        `)
        .eq("business_id", businessId)
        .eq("is_active", true)
        .order("created_at", {
            ascending: false
        });

    if (error) {
        throw new Error(error.message);
    }

    return data || [];
}

export async function getMyBusinessReview({
    businessId,
    userId
}) {
    if (!businessId || !userId) return null;

    const { data, error } = await db
        .from("business_reviews")
        .select("*")
        .eq("business_id", businessId)
        .eq("user_id", userId)
        .maybeSingle();

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export async function saveBusinessReview({
    businessId,
    user,
    rating,
    comment
}) {
    if (!businessId) {
        throw new Error("No se encontró el negocio.");
    }

    if (!user?.id) {
        throw new Error("Inicia sesión para dejar una reseña.");
    }

    if (!rating || rating < 1 || rating > 5) {
        throw new Error("Selecciona una calificación válida.");
    }

    await db
        .from("profiles")
        .upsert({
            id: user.id,
            email: user.email || null,
            full_name: user.user_metadata?.name || user.user_metadata?.full_name || null,
            avatar_url: user.user_metadata?.avatar_url || null,
            updated_at: new Date().toISOString()
        }, {
            onConflict: "id"
        });

    const { data, error } = await db
        .from("business_reviews")
        .upsert({
            business_id: businessId,
            user_id: user.id,
            rating,
            comment: comment?.trim() || null,
            is_active: true,
            updated_at: new Date().toISOString()
        }, {
            onConflict: "business_id,user_id"
        })
        .select("*")
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return data;
}