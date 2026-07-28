import { db } from "@/libs/supabase";

const normalizeSearch = (value) => {
    return value
        ?.trim()
        ?.replace(/\s+/g, " ")
        ?.replace(/[(),]/g, "") || "";
};

const buildIlikeOr = (fields, searchValue) => {
    return fields
        .map((field) => `${field}.ilike.${searchValue}`)
        .join(",");
};

export async function searchAll({ query }) {
    const cleanQuery = normalizeSearch(query);

    if (!cleanQuery || cleanQuery.length < 2) {
        return {
            businesses: [],
            places: [],
            dishes: [],
            total: 0
        };
    }

    const searchValue = `%${cleanQuery}%`;

    const businessesOr = buildIlikeOr(
        [
            "name",
            "commercial_name",
            "short_description",
            "description",
            "category",
            "district",
            "province"
        ],
        searchValue
    );

    const placesOr = buildIlikeOr(
        [
            "name",
            "description",
            "category",
            "type",
            "district",
            "province",
            "department"
        ],
        searchValue
    );

    const dishesOr = buildIlikeOr(
        [
            "name",
            "description"
        ],
        searchValue
    );

    const [
        businessesResult,
        placesResult,
        dishesResult
    ] = await Promise.all([
        db
            .from("businesses")
            .select(`
                id,
                slug,
                name,
                commercial_name,
                short_description,
                description,
                business_type,
                category,
                district,
                province,
                profile_image_url,
                cover_image_url,
                rating_avg,
                is_open,
                accepts_orders
            `)
            .eq("is_active", true)
            .or(businessesOr)
            .limit(12),

        db
            .from("places")
            .select(`
                id,
                slug,
                name,
                description,
                category,
                type,
                district,
                province,
                department,
                cover_image_url
            `)
            .eq("is_active", true)
            .or(placesOr)
            .limit(12),

        db
            .from("foodie_dishes")
            .select(`
                id,
                foodie_id,
                name,
                description,
                price,
                image_url,
                businesses:businesses!foodie_dishes_foodie_id_fkey (
                    id,
                    slug,
                    name,
                    commercial_name,
                    profile_image_url
                )
            `)
            .eq("is_active", true)
            .or(dishesOr)
            .limit(12)
    ]);

    if (businessesResult.error) {
        throw new Error(businessesResult.error.message);
    }

    if (placesResult.error) {
        throw new Error(placesResult.error.message);
    }

    if (dishesResult.error) {
        throw new Error(dishesResult.error.message);
    }

    const businesses = businessesResult.data || [];
    const places = placesResult.data || [];
    const dishes = dishesResult.data || [];

    return {
        businesses,
        places,
        dishes,
        total: businesses.length + places.length + dishes.length
    };
}