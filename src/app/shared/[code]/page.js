import { db } from "@/libs/supabase";
import SharedRedirectClient from "./SharedRedirectClient";

async function getSharedLink(code) {
    const { data } = await db
        .from("shared_links")
        .select(`
            id,
            code,
            entity_type,
            entity_id,
            target_url,
            meta_title,
            meta_description,
            meta_image_url,
            is_active,
            expires_at
        `)
        .eq("code", code)
        .eq("is_active", true)
        .maybeSingle();

    return data;
}

export async function generateMetadata({ params }) {
    const { code } = await params;

    const sharedLink = await getSharedLink(code);

    const title = sharedLink?.meta_title || "Ándale Ya!";

    const description = sharedLink?.meta_description || "Descubre lugares, restaurantes y experiencias en Ándale Ya!";

    const image = sharedLink?.meta_image_url || "https://andaleya.pe/og-image.jpg";

    const url = `https://andaleya.pe/shared/${code}`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url,
            siteName: "Ándale Ya!",
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: title
                }
            ],
            type: "website"
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [image]
        }
    };
}

export default async function Page({ params }) {
    const { code } = await params;

    return (
        <SharedRedirectClient code={code} />
    );
}