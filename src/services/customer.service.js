import { db } from "@/libs/supabase";

export async function updateCustomerProfile({ userId, fullName, phone }) {

    if (!userId) throw new Error("No se encontró el usuario.");

    const { error: authError } = await db.auth.updateUser({
        data: {
            name: fullName,
            phone
        }
    });

    if (authError) throw new Error(authError.message);

    const { data, error } = await db
        .from("profiles")
        .upsert({
            id: userId,
            full_name: fullName,
            phone,
            updated_at: new Date().toISOString()
        }, {
            onConflict: "id"
        })
        .select("*")
        .single();

    if (error) throw new Error(error.message);

    return data;
}

export async function getCustomerAddresses(userId) {
    if (!userId) return [];

    const { data, error } = await db
        .from("customer_addresses")
        .select("*")
        .eq("user_id", userId)
        .order("is_default", { ascending: false })
        .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);

    return data || [];
}

export async function createCustomerAddress(payload) {
    const { data, error } = await db
        .from("customer_addresses")
        .insert(payload)
        .select("*")
        .single();

    if (error) throw new Error(error.message);

    return data;
}

export async function deleteCustomerAddress(id) {
    const { error } = await db
        .from("customer_addresses")
        .delete()
        .eq("id", id);

    if (error) throw new Error(error.message);

    return true;
}

export async function setDefaultCustomerAddress({
    userId,
    addressId
}) {
    if (!userId || !addressId) {
        throw new Error("Faltan datos.");
    }

    await db
        .from("customer_addresses")
        .update({ is_default: false })
        .eq("user_id", userId);

    const { data, error } = await db
        .from("customer_addresses")
        .update({ is_default: true })
        .eq("id", addressId)
        .eq("user_id", userId)
        .select("*")
        .single();

    if (error) throw new Error(error.message);

    return data;
}

export async function getCustomerFavorites(userId) {
    if (!userId) return [];

    const { data, error } = await db
        .from("customer_favorites")
        .select(`
            id,
            favorite_type,
            business_id,
            place_id,
            created_at,
            businesses (
                id,
                slug,
                name,
                commercial_name,
                profile_image_url,
                cover_image_url,
                category,
                district,
                province,
                rating_avg
            ),
            places (
                id,
                slug,
                name,
                description,
                category,
                type,
                district,
                province,
                departament,
                image_url,
                cover_image_url
            )
        `)
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

    if (error) {
        throw new Error(error.message);
    }

    return data || [];
}

export async function createCustomerClaim(payload) {
    const { data, error } = await db
        .from("customer_claims")
        .insert(payload)
        .select("*")
        .single();

    if (error) throw new Error(error.message);

    return data;
}

export async function getCustomerProfile(userId) {
    if (!userId) return null;

    const { data, error } = await db
        .from("profiles")
        .select("id, full_name, phone, email, avatar_url")
        .eq("id", userId)
        .maybeSingle();

    if (error) {
        throw new Error(error.message);
    }

    return data;
}