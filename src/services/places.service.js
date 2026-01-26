import { supabase } from "@/libs/supabase";

export async function getRecommendedPlaces({ excludeId, category, district }) {

    const { data, error } = await supabase
        .from("places")
        .select(`
            id_place,
            sub_place,
            name_place,
            location_name_place,
            district_location_place,
            images_places (
                image_iplaces
            )
        `)
        .neq("id_place", excludeId)
        .eq("category_place", category)
        .eq("district_location_place", district)
        .limit(5);

    if (error) throw error;

    return data.map(p => ({
        id: p.id_place,
        sub: p.sub_place,
        name: p.name_place,
        text: `${p.location_name_place}, ${p.district_location_place}`,
        image: p.images_places?.[0]
            ? `https://bbuohaidrgnmicuzaajd.supabase.co/storage/v1/object/public/places/images/${p.sub_place}/${p.images_places[0].image_iplaces}`
            : null
    }));
}