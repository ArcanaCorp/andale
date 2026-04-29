import { db } from "@/libs/supabase";

export const getPlaces = async () => {
    try {
        const { data, error } = await db
            .from('places')
            .select(`
                id_place,
                sub_place,
                name_place,
                category_place,
                images_places!inner(
                    image_iplaces
                )
            `)
            .limit(1, { foreignTable: "images_places" });

        if (error) throw new Error(error);
            return data ?? [];

    } catch (error) {
        console.error(error);
    }
}

export const getNearbyPlaces = async ({ lat, lng, radius = 5000 }) => {
    
    try {
        const { data, error } = await db.rpc("nearby_places", {
            user_lat: lat,
            user_lng: lng,
            radius_meters: radius,
        });

        if (error) throw error;

        return data ?? [];
    } catch (error) {
        console.error(error);
        return [];
    }
};