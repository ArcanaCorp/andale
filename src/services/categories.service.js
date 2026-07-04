import { db } from "@/libs/supabase";

export const getFoodieCategories = async (foodieId) => {
    const { data, error } = await db
        .from("foodie_categories")
        .select("id, name, sort_order")
        .eq("foodie_id", foodieId)
        .eq("is_active", true)
        .order("sort_order", { ascending: true });

    if (error) throw error;

    return data || [];
};