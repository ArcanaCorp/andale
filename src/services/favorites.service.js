import { db } from "@/libs/supabase";

const getFavoriteColumn = (favoriteType) => {
    if (favoriteType === "business") return "business_id";
    if (favoriteType === "place") return "place_id";

    throw new Error("Tipo de favorito no válido.");
};

export async function getFavoriteStatus({
    userId,
    favoriteType,
    itemId
}) {
    if (!userId || !favoriteType || !itemId) return false;

    const column = getFavoriteColumn(favoriteType);

    const { data, error } = await db
        .from("customer_favorites")
        .select("id")
        .eq("user_id", userId)
        .eq("favorite_type", favoriteType)
        .eq(column, itemId)
        .maybeSingle();

    if (error) {
        throw new Error(error.message);
    }

    return !!data;
}

export async function toggleFavorite({
    userId,
    favoriteType,
    itemId
}) {
    if (!userId) {
        throw new Error("Inicia sesión para agregar favoritos.");
    }

    if (!itemId) {
        throw new Error("No se encontró el elemento.");
    }

    const column = getFavoriteColumn(favoriteType);

    const { data: existingFavorite, error: findError } = await db
        .from("customer_favorites")
        .select("id")
        .eq("user_id", userId)
        .eq("favorite_type", favoriteType)
        .eq(column, itemId)
        .maybeSingle();

    if (findError) {
        throw new Error(findError.message);
    }

    if (existingFavorite?.id) {
        const { error: deleteError } = await db
            .from("customer_favorites")
            .delete()
            .eq("id", existingFavorite.id);

        if (deleteError) {
            throw new Error(deleteError.message);
        }

        return {
            isFavorite: false,
            message: "Quitado de favoritos"
        };
    }

    const payload = {
        user_id: userId,
        favorite_type: favoriteType,
        business_id: favoriteType === "business" ? itemId : null,
        place_id: favoriteType === "place" ? itemId : null
    };

    const { error: insertError } = await db
        .from("customer_favorites")
        .insert(payload);

    if (insertError) {
        throw new Error(insertError.message);
    }

    return {
        isFavorite: true,
        message: "Agregado a favoritos"
    };
}