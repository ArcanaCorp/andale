import { fetchPlaceBySlug } from "@/services/places.service";
import PlaceDetail from "./PlaceDetail";
import { SITE_NAME, SITE_URL } from "@/config";
import { notFound } from "next/navigation";

async function getPlace(slug) {
    try {
        const response = await fetchPlaceBySlug(slug);

        if (!response.ok) {
            throw new Error(response.message || response.error || "Hubo un error");
        }

        return response.data;
    } catch (error) {
        console.error("Error obteniendo place:", error);
        return null;
    }
}

function buildFallbackDescription(place) {
    if (!place?.name) {
        return "Descubre lugares turísticos, rutas, experiencias y atractivos para planificar tu próxima visita.";
    }

    return `Descubre ${place.name}, conoce su ubicación, actividades, fotografías e información turística para planificar tu visita.`;
}

export async function generateMetadata({ params }) {
    const { slug } = await params;

    const place = await getPlace(slug);

    if (!place) {
        return {
            title: `Lugar no encontrado | ${SITE_NAME}`,
            description: "El lugar turístico solicitado no está disponible.",
            robots: {
                index: false,
                follow: false,
            },
        };
    }

    const title = place.meta_title || `${place.name} | ${SITE_NAME}`;
    const description = place.meta_description || buildFallbackDescription(place);
    const image = place.og_image_url || place.cover_image_url || null;
    const canonicalUrl = `${SITE_URL}/places/${place.slug}`;

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
                        alt: `Imagen de ${place.name}`,
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

export default async function PlacePage({ params }) {
    const { slug } = await params;

    const place = await getPlace(slug);

    if (!place) {
        notFound();
    }

    return <PlaceDetail info={place} />;
}