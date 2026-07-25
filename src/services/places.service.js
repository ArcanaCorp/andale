import { db } from "@/libs/supabase";

const DEFAULT_PAGE_SIZE = 10;

export const fetchListFeed = async ({page = 0, pageSize = DEFAULT_PAGE_SIZE, filters = {}} = {}) => {
    try {
        const from = page * pageSize;

        // range() es inclusivo.
        // Solicitamos 11 registros para saber si existe otra página.
        const to = from + pageSize;

        let query = db
            .from("places")
            .select(`
                id,
                slug,
                name,
                category,
                district,
                cover_image_url
            `)
            .order("id", { ascending: false })
            .range(from, to);

        if (filters.category?.trim()) {
            query = query.eq(
                "category",
                filters.category.trim().toUpperCase()
            );
        }

        if (filters.district?.trim()) {
            query = query.eq(
                "district",
                filters.district.trim().toUpperCase()
            );
        }

        if (filters.search?.trim()) {
            query = query.ilike(
                "name",
                `%${filters.search.trim()}%`
            );
        }

        const { data, error } = await query;

        if (error) {
            throw new Error(error.message || "Hubo un error al obtener los lugares");
        }

        const rows = data || [];
        const hasMore = rows.length > pageSize;

        // Solo enviamos los 10 registros visibles.
        const pageRows = rows.slice(0, pageSize);

        const formattedData = pageRows.map((place) => ({
            id: place.id,
            slug: place.slug,
            title: place.name,
            subtitle: `${place.category} · ${place.district}`,
            image: place.cover_image_url,
            avatar: "",
            category: place.category,
            district: place.district,
        }));

        return {
            ok: true,
            data: formattedData,
            pagination: {
                page,
                pageSize,
                hasMore,
            },
            message: "Datos obtenidos correctamente",
            error: "",
            code: 200,
        };
    } catch (error) {
        console.error(error);

        return {
            ok: false,
            data: [],
            pagination: {
                page,
                pageSize,
                hasMore: false,
            },
            error,
            message:
                error instanceof Error
                    ? error.message
                    : "Hubo un error al obtener los lugares",
            code: 500,
        };
    }
};

export const fetchPlaceBySlug = async (slug) => {
    try {
        const { data, error } = await db
            .from("places")
            .select("*")
            .eq("slug", slug)
            .maybeSingle();

        if (error) {
            throw new Error(
                error.message || "Error al obtener el lugar"
            );
        }

        return {
            ok: true,
            data,
            error: "",
            message: "Se obtuvieron los datos correctamente.",
            code: 200,
        };
    } catch (error) {
        console.error(error);

        return {
            ok: false,
            data: null,
            error,
            message:
                error instanceof Error
                    ? error.message
                    : "Error al obtener el lugar",
            code: 500,
        };
    }
};