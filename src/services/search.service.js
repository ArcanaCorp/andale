import { BUSSINES_IMAGE_BASE, PLACES_IMAGE_BASE } from "../config";
import { calculateScore } from "../helpers/search.helper";
import { supabase } from "../libs/supabase";
import { getOrCreateUserId } from "../utils/user";

export const searchItems = async (query) => {
    if (!query || query.trim().length < 2) return [];

    const q = `%${query}%`;

    const placesRes = await supabase
        .from("places")
        .select(`
            id_place,
            sub_place,
            name_place,
            text_place,
            category_place,
            district_location_place,
            province_location_place,
            images_places!inner (
                image_iplaces
            )
        `)
        .or(`name_place.ilike.${q},text_place.ilike.${q},category_place.ilike.${q},district_location_place.ilike.${q},province_location_place.ilike.${q}`)
        .limit(1, { foreignTable: 'images_places' });

    const bussinesRes = await supabase
        .from("bussines")
        .select("id_bussines, sub_bussines, short_bussines,name_bussines,text_bussines,category_bussines,district_bussines,province_bussines, photo_bussines")
        .or(`name_bussines.ilike.${q},text_bussines.ilike.${q},category_bussines.ilike.${q},district_bussines.ilike.${q},province_bussines.ilike.${q}`);

    if (placesRes.error || bussinesRes.error) {
        console.error(placesRes.error || bussinesRes.error);
        return [];
    }

    const normalize = [
        ...placesRes.data.map(p => ({
            type: "place",
            id: p.id_place,
            sub: p.sub_place,
            name: p.name_place,
            description: p.text_place,
            category: p.category_place,
            image: `${PLACES_IMAGE_BASE}/${p.sub_place}/${p.images_places[0].image_iplaces}`,
            location: `${p.district_location_place}, ${p.province_location_place}`
        })),
        ...bussinesRes.data.map(b => ({
            type: "bussines",
            id: b.id_bussines,
            sub: b.short_bussines || b.sub_bussines,
            name: b.name_bussines,
            description: b.text_bussines,
            category: b.category_bussines,
            image: `${BUSSINES_IMAGE_BASE}/${b.sub_bussines}/${b.photo_bussines}`,
            location: `${b.district_bussines}, ${b.province_bussines}`
        }))
    ];

    return normalize
        .map(item => ({
            ...item,
            score: calculateScore(item, query)
        }))
        .filter(i => i.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 20);
};

export const trackSearchClick = async (item, query) => {

    const user = getOrCreateUserId();

    if (!user) return;

    await supabase.from("search_logs").insert({
        query,
        entity_type: item.type,
        entity_id: item.id,
        sub_user: user
    });
};