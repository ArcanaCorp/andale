import { supabase } from "@/libs/supabase";
import { BUSSINES_IMAGE_BASE, PLACES_IMAGE_BASE } from "@/config";

export async function getSummaryHome() {

    // 1️⃣ Lugares turísticos
    const placesPromise = supabase
        .from("places")
        .select(`
            id_place,
            sub_place,
            name_place,
            location_name_place,
            district_location_place,
            province_location_place,
            region_location_place,
            images_places!inner (
                id_iplaces,
                image_iplaces
            )
        `)
        .limit(5)
        .limit(1, { foreignTable: "images_places" });

    // 2️⃣ Negocios por categoría
    const bussinesPromise = supabase
        .from("bussines")
        .select(`
            id_bussines,
            sub_bussines,
            short_bussines,
            name_bussines,
            direction_bussines,
            category_bussines,
            photo_bussines
        `);

    const [{ data: places, error: placesError }, { data: bussines, error: bussinesError }] = await Promise.all([placesPromise, bussinesPromise]);
    

    if (placesError) throw placesError;
    if (bussinesError) throw bussinesError;

    // 3️⃣ Helpers
    const mapBussines = (list) =>
        list.map((b) => ({
            id: b.id_bussines,
            sub: b.short_bussines || b.sub_bussines,
            name: b.name_bussines,
            text: b.direction_bussines,
            image: `${BUSSINES_IMAGE_BASE}/${b.sub_bussines}/${b.photo_bussines}`,
        }));

    // 4️⃣ Armar estructura final
    return [
        {
            title: "Conoce lo mejor de Jauja",
            list: places.map((p) => ({
                id: p.id_place,
                sub: p.sub_place,
                name: p.name_place,
                text: `${p.location_name_place}, ${p.province_location_place}, ${p.region_location_place}`,
                image: `${PLACES_IMAGE_BASE}/${p.sub_place}/${p.images_places[0].image_iplaces}`,
            })),
            link: "/places",
        },
        {
            title: "Visita con los mejores Jauja",
            list: mapBussines(
                bussines.filter((b) => b.category_bussines === "agency")
            ),
            link: "/agency",
        },
        {
            title: "Deliciosos manjares Jauja",
            list: mapBussines(
                bussines.filter((b) => b.category_bussines === "restaurant")
            ),
            link: "/foodies",
        },
        {
            title: "Descansa como en casa Jauja",
            list: mapBussines(
                bussines.filter((b) => b.category_bussines === "hotel")
            ),
            link: "/hotels",
        },
        {
            title: "Llévate lo mejor Jauja",
            list: mapBussines(
                bussines.filter((b) => b.category_bussines === "ecommerce")
            ),
            link: "/store",
        },
    ];
}