import { supabase } from "@/libs/supabase";
import { getOrCreateUserId } from "../utils/user";
import { BUSSINES_IMAGE_BASE, PLACES_IMAGE_BASE } from "@/config";
import { normalizeItem } from "../helpers/normalizer";
import { EVENTS_IMAGE_BASE } from "../config";

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
            images_places (image_iplaces)
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

    // 2️⃣ Buscar en BUSSINES
    const { data: bussines } = await supabase
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
            bussines_category (id_bcategory, name_bcategory)
        `)
        .or(`sub_bussines.eq.${slug},short_bussines.eq.${slug}`)
        .maybeSingle();

    if (bussines) {
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
            items
        };
    }

    // 3️⃣ Buscar en EVENTS
    const { data: event } = await supabase
        .from("events")
        .select(`
            *,
            events_activities (
                *
            )
        `)
        .eq("slug", slug)
        .maybeSingle();

    if (!event) return null;

    // normalizar actividades crudas
    const rawActivities = (event.events_activities || []).map(act => ({
        id: act.id,
        title: act.title,
        description: act.description,
        startDate: act.start_date || event.start_date, // si quieres, puedes agregar start_date por actividad
        startTime: act.start_time,
        endTime: act.end_time,
        venue: act.venue,
        address: act.address,
        city: act.city || event.city,
        region: act.region || event.region,
        country: act.country || event.country,
        lat: act.lat || event.lat,
        lng: act.lng || event.lng,
        organizerName: act.organizer_name || event.organizer_name,
        organizerContact: act.organizer_contact || event.organizer_contact,
        organizerWebsite: act.organizer_website || event.organizer_website,
        capacity: act.capacity,
        tags: act.tags
    }));

    return {
        type: "event",
        id: event.id,
        slug: event.slug,
        title: event.title,
        category: event.category,
        description: event.description,
        cover: `${EVENTS_IMAGE_BASE}/${event.slug}/${event.cover}`,
        hero: `${EVENTS_IMAGE_BASE}/${event.slug}/${event.hero}`,
        startDate: event.start_date,
        endDate: event.end_date,
        allDay: event.all_day,
        city: event.city,
        region: event.region,
        country: event.country,
        lat: event.lat,
        lng: event.lng,
        organizerName: event.organizer_name,
        organizerContact: event.organizer_contact,
        organizerWebsite: event.organizer_website,
        views: event.views,
        featured: event.featured,
        status: event.status,
        createdAt: event.created_at,
        updatedAt: event.updated_at,
        activities: rawActivities
    };

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

export async function getEvents() {
    
    const { data } = await supabase
        .from('events')
        .select('*')

    if (!data) return null;

    return data;

}