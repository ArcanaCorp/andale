import { db } from "@/libs/supabase";

export const getBussines = async () => {
    try {
        const { data, error } = await db
            .from('businesses')
            .select(`
                id,
                slug,
                name,
                business_type,
                category,
                address,
                profile_image_url,
                cover_image_url
            `)
        if (error) throw new Error(error || `Hubo un error al fetching...`);

            const formattedData = (data || []).map((foodie) => {
                return {
                    id: foodie.id,
                    slug: foodie.slug,
                    title: foodie.name,
                    subtitle: foodie.address,
                    avatar: foodie.profile_image_url,
                    image: foodie.cover_image_url,
                }
            });

            return { 
                ok: true, 
                code: 200, 
                data: formattedData, 
                error: '', 
                message: 'Datos obtenidos correctamente.'
            }

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
}

export const getBussinesBySlug = async (slug) => {
    try {
        const { data, error } = await db
            .from('businesses')
            .select(`*`)
            .eq('slug', slug)
        if (error) throw new Error(error || `Hubo un error al fetching...`);
            return { ok: true, code: 200, data: data[0], error: '', message: 'Datos obtenidos correctamente.' }
    } catch (error) {
        console.error(error);
        return { ok: false, code: 500, error: error, message: error.message }
    }
}