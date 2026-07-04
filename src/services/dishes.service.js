import { db } from "@/libs/supabase";

export const getFoodieDishes = async ({ foodieId, categoryId = null, page = 0, limit = 10 }) => {
    const from = page * limit;
    const to = from + limit - 1;

    let query = db
        .from("foodie_dishes")
        .select(`
            id,
            name,
            description,
            price,
            image_url,
            category_id,
            sort_order
        `)
        .eq("foodie_id", foodieId)
        .eq("is_active", true)
        .eq("is_available", true)
        .order("sort_order", { ascending: true })
        .range(from, to);

    if (categoryId) {
        query = query.eq("category_id", categoryId);
    }

    const { data, error } = await query;

    if (error) throw error;

    return data || [];
};