import { getBussinesBySlug } from "@/services/bussines.service";
import { notFound } from "next/navigation";
import { SITE_NAME, SITE_URL } from "@/config";
import FoodieDetail from "./FoodieDetail";

async function getFoodie(slug) {
    try {
        const response = await getBussinesBySlug(slug);
        if (!response.ok) {
            throw new Error(response.message || response.error || "Hubo un error");
        }
        return response.data;
    } catch (error) {
        console.error("Error obteniendo foodie:", error);
        return null;
    }
}

function buildFallbackDescription(foodie) {
    if (!foodie?.name) {
        return "Descubre lugares turísticos, rutas, experiencias y atractivos para planificar tu próxima visita.";
    }

    return `Disfruta ${foodie.name}, conoce su ubicación, actividades, fotografías e información turística para planificar tu visita.`;
}
export async function generateMetadata({ params }) {
    const { slug } = await params;

    const foodie = await getFoodie(slug);

    if (!foodie) {
        return {
            title: `Lugar no encontrado | ${SITE_NAME}`,
            description: "El lugar turístico solicitado no está disponible.",
            robots: {
                index: false,
                follow: false,
            },
        };
    }

    const title = foodie.meta_title || `${foodie.name} | ${SITE_NAME}`;
    const description = foodie.meta_description || buildFallbackDescription(foodie);
    const image = foodie.og_image_url || foodie.cover_image_url || null;
    const canonicalUrl = `${SITE_URL}/foodies/${foodie.slug}`;

    return {
        title,
        description,
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title,
            description,
            url: canonicalUrl,
            siteName: SITE_NAME,
            type: "article",
            locale: "es_PE",
            images: image
                ? [
                    {
                        url: image,
                        width: 1200,
                        height: 630,
                        alt: `Imagen de ${foodie.name}`,
                    },
                ]
                : [],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: image ? [image] : [],
        },
    };
}

export default async function FoodiePage({ params }) {
    const { slug } = await params;
    const foodie = await getFoodie(slug);
    if (!foodie) {
        notFound();
    }

    return <FoodieDetail info={foodie} />
}