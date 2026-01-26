import { supabase } from "@/libs/supabase";
import { getOrCreateUserId } from "../utils/user";
import { BUSSINES_IMAGE_BASE, PLACES_IMAGE_BASE } from "@/config";
import { normalizeItem } from "../helpers/normalizer";

const CATEGORY_RESOLVER = {
    restaurant: {
        table: "dishes",
        select: `
            id_dish,
            category_dish,
            name_dish,
            text_dish,
            price_dish,
            image_dish,
            discount_dish,
            popular_dish
        `,
        map: dish => ({
            id: dish.id_dish,
            category: dish.category_dish,
            name: dish.name_dish,
            text: dish.text_dish,
            price: dish.price_dish,
            image: dish.image_dish,
            discount: dish.discount_dish,
            popular: dish.popular_dish
        })
    },
    agency: {
        table: "packs",
        select: `
            id_pack,
            name_pack,
            text_pack,
            price_pack,
            image_pack,
            category_pack
        `,
        map: pack => ({
            id: pack.id_pack,
            name: pack.name_pack,
            text: pack.text_pack,
            price: pack.price_pack,
            image: pack.image_pack,
            category: pack.category_pack
        })
    },
    ecommerce: {
        table: "products",
        select: `
            id_product,
            name_product,
            priceu_product,
            image_product,
            category_product
        `,
        map: product => ({
            id: product.id_product,
            name: product.name_product,
            price: product.priceu_product,
            image: product.image_product,
            category: product.category_product
        })
    },
    hotel: {
        table: "bedrooms",
        select: `
            id_bedroom,
            name_bedroom,
            price_bedroom,
            image_bedroom,
            category_bedroom
        `,
        map: bedroom => ({
            id: bedroom.id_bedroom,
            name: bedroom.name_bedroom,
            price: bedroom.price_bedroom,
            image: bedroom.image_bedroom,
            category: bedroom.category_bedroom
        })
    }
};

export async function getEntityBySlug(slug) {

    // 1️⃣ Buscar en PLACES
    const { data: place } = await supabase
        .from("places")
        .select(`
            id_place,
            sub_place,
            name_place,
            text_place,
            category_place,
            district_location_place,
            province_location_place,
            region_location_place,
            images_places (
                image_iplaces
            )
        `)
        .eq("sub_place", slug)
        .maybeSingle();

    if (place) {
        return {
            type: "place",
            id: place.id_place,
            sub: place.sub_place,
            name: place.name_place,
            category: place.category_place,
            text: `${place.text_place}`,
            district: place.district_location_place,
            province: place.province_location_place,
            region: place.region_location_place,
            location: `${place.district_location_place}, ${place.province_location_place}, ${place.region_location_place}`,
            image: place.images_places?.[0]
                ? `${PLACES_IMAGE_BASE}/${place.sub_place}/${place.images_places[0].image_iplaces}`
                : null,
            images: place.images_places
        };
    }

    const { data: bussines, error } = await supabase
        .from("bussines")
        .select(`
            id_bussines,
            short_bussines,
            sub_bussines,
            name_bussines,
            text_bussines,
            phone_bussines,
            direction_bussines,
            category_bussines,
            photo_bussines,
            bussines_category (
                id_bcategory,
                name_bcategory
            )
        `)
        .or(`sub_bussines.eq.${slug},short_bussines.eq.${slug}`)
        .maybeSingle();

    if (error || !bussines) return null;

    // 2️⃣ Resolver dinámico según categoría
    const resolver = CATEGORY_RESOLVER[bussines.category_bussines];

    let items = [];

    if (resolver) {
        const { data } = await supabase
            .from(resolver.table)
            .select(resolver.select)
            .eq("sub_bussines", bussines.sub_bussines);

        items = (data || [])
            .map(item =>
                normalizeItem(
                    bussines.category_bussines,
                    item,
                    bussines.sub_bussines
                )
            )
            .filter(Boolean);
    }

    return {
        type: "bussines",
        id: bussines.id_bussines,
        sub: bussines.short_bussines || bussines.sub_bussines,
        name: bussines.name_bussines,
        text: bussines.text_bussines,
        phone: bussines.phone_bussines,
        category: bussines.category_bussines,
        direction: bussines.direction_bussines,
        photo: `${BUSSINES_IMAGE_BASE}/${bussines.sub_bussines}/${bussines.photo_bussines}`,
        portada: `${BUSSINES_IMAGE_BASE}/${bussines.sub_bussines}/${bussines.photo_bussines}`,
        categories: bussines.bussines_category?.map(cat => ({
            id: cat.id_bcategory,
            name: cat.name_bcategory
        })) || [],
        items // 🔥 aquí viven dishes | packs | products | bedrooms
    };

    throw new Error("Entidad no encontrada");
}

export async function followEntity(entity) {
    return supabase.from("entity_follows").insert({
        entity_type: entity.type,
        entity_id: entity.id,
        entity_sub: entity.sub,
        anon_user: getOrCreateUserId()
    });
}

export async function unfollowEntity(entity) {
    return supabase
        .from("entity_follows")
        .delete()
        .eq("entity_type", entity.type)
        .eq("entity_id", entity.id)
        .eq("anon_user", getOrCreateUserId()
    );
}