import { db } from "@/libs/supabase";

export const fetchListFeed = async () => {
    try {
        const { data, error } = await db
            .from("places")
            .select(`
                id,
                slug,
                name,
                category,
                district,
                cover_image_url
            `)
            .limit(5);

        if (error) {
            throw new Error(error.message || "Hubo un error al realizar el fetch");
        }

        const formattedData = (data || []).map((place) => {
            return {
                id: place.id,
                slug: place.slug,
                title: place.name,
                subtitle: `${place.category} · ${place.district}`,
                image: place.cover_image_url,
                avatar: '',
            };
        });

        return {
            ok: true,
            data: formattedData,
            message: "Datos obtenidos correctamente",
            error: "",
            code: 200,
        };
    } catch (error) {
        console.error(error);
        return {
            ok: false,
            data: [],
            error,
            message: error.message || "Hubo un error al realizar el fetch",
            code: 500,
        };
    }
};

export const fetchPlaceBySlug = async (slug) => {
    try {
        
        const { data, error } = await db
            .from('places')
            .select(`*`)
            .eq('slug', slug)
            .maybeSingle();
        
        if (error) throw new Error(error.message || "Error al realizar fetching...");
        
            return { ok: true, data: data, error: '', message: 'Se obtuvieron los datos correctamente.', code: 200 }

    } catch (error) {
        console.error(error);
        return { ok: false, data: null, error: error, message: error.message, code: 500 }
    }
}