import { db } from "@/libs/supabase";

const formatBusiness = (business) => {
    if (!business) return null;

    return {
        id: business.id,
        slug: business.slug,
        title: business.name,
        commercial: business.commercial_name,
        description: business.description,
        short_description: business.short_description,
        address: business.address,

        type: business.business_type,
        category: business.category,
        tags: business.tags ?? [],

        avatar: business.profile_image_url,
        image: business.cover_image_url,

        reference: business.reference,

        location: {
            district: business.district,
            province: business.province,
            region: business.region,
            country: business.country,
        },

        coordinates: {
            lat: business.latitude,
            lng: business.longitude,
        },

        contact: {
            maps: business.google_maps_url,
            phone: business.phone,
            whatsapp: business.whatsapp,
            email: business.email,
            web: business.website_url,
            facebook: business.facebook_url,
            instagram: business.instagram_url,
            tiktok: business.tiktok_url,
        },

        status: {
            is_active: business.is_active,
            is_verified: business.is_verified,
            is_featured: business.is_featured,
            is_open: business.is_open,
            accepts_orders: business.accepts_orders,
        },

        services: {
            has_delivery: business.has_delivery,
            has_pickup: business.has_pickup,
            has_dine_in: business.has_dine_in,
        },

        delivery: {
            fee: Number(business.delivery_fee) || 0,
            min_order_amount: Number(business.min_order_amount) || 0,
            free_delivery_from: Number(business.free_delivery_from) || 0,
            radius_km: Number(business.delivery_radius_km) || 0,
            time: {
                min: business.delivery_time_min,
                max: business.delivery_time_max,
            },
        },

        preparation_time: {
            min: business.preparation_time_min,
            max: business.preparation_time_max,
        },

        payment: {
            currency: business.currency ?? "PEN",
            accepts_cash: business.accepts_cash,
            accepts_yape: business.accepts_yape,
            accepts_plin: business.accepts_plin,
            accepts_card: business.accepts_card,
            yape_number: business.yape_number,
            plin_number: business.plin_number,
        },

        opening_hours: business.opening_hours,
        order_settings: business.order_settings,

        rating: {
            average: Number(business.rating_avg) || 0,
            count: Number(business.rating_count) || 0,
        },

        orders_count: Number(business.orders_count) || 0,

        seo: {
            title: business.meta_title,
            description: business.meta_description,
            og_image: business.og_image_url,
        },

        created: business.created_at,
        updated: business.updated_at,
    };
};

export const getBussines = async () => {
    try {

        const { data, error } = await db
            .from("businesses")
            .select("*")
            .order("created_at", {
                ascending: false,
            });

        if (error) throw new Error(error.message || "Hubo un error al obtener los negocios");

        return {
            ok: true,
            code: 200,
            data: (data ?? []).map(formatBusiness),
            error: "",
            message: "Datos obtenidos correctamente.",
        };

    } catch (error) {
        
        console.error("getBussines:", error);

        return {
            ok: false,
            code: 500,
            data: [],
            error,
            message: error instanceof Error ? error.message : "Hubo un error al obtener los negocios",
        };
    }
};

export const getBussinesBySlug = async (slug) => {
    try {
        if (!slug?.trim()) {
            return {
                ok: false,
                code: 400,
                data: null,
                error: "",
                message: "El slug es obligatorio.",
            };
        }

        const { data, error } = await db
            .from("businesses")
            .select("*")
            .eq("slug", slug.trim())
            .maybeSingle();

        if (error) throw new Error(error.message || "Hubo un error al obtener el negocio");

        if (!data) {
            return {
                ok: false,
                code: 404,
                data: null,
                error: "",
                message: "El negocio no existe.",
            };
        }

        return {
            ok: true,
            code: 200,
            data: formatBusiness(data),
            error: "",
            message: "Datos obtenidos correctamente.",
        };
    } catch (error) {
        console.error("getBussinesBySlug:", error);

        return {
            ok: false,
            code: 500,
            data: null,
            error,
            message: error instanceof Error ? error.message : "Hubo un error al obtener el negocio",
        };
    }
};