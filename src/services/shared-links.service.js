import { db } from "@/libs/supabase";

function generateCode(length = 7) {
    const chars = "abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    const values = new Uint32Array(length);

    crypto.getRandomValues(values);

    return Array.from(values)
        .map((value) => chars[value % chars.length])
        .join("");
}

function buildUrlWithUtms(targetPath, utms) {
    const params = new URLSearchParams();

    if (utms.utm_source) params.set("utm_source", utms.utm_source);
    if (utms.utm_medium) params.set("utm_medium", utms.utm_medium);
    if (utms.utm_campaign) params.set("utm_campaign", utms.utm_campaign);
    if (utms.utm_content) params.set("utm_content", utms.utm_content);
    if (utms.utm_term) params.set("utm_term", utms.utm_term);

    const query = params.toString();

    if (!query) return targetPath;

    return `${targetPath}?${query}`;
}

export async function createSharedLink({
    userId = null,
    entityType,
    entityId,
    targetPath,
    metaTitle,
    metaDescription,
    metaImageUrl = null,
    utmSource = "shared",
    utmMedium = "app_share",
    utmCampaign = "organic_share",
    utmContent = null,
    utmTerm = null
}) {
    const code = generateCode();

    const targetUrl = buildUrlWithUtms(targetPath, {
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
        utm_content: utmContent,
        utm_term: utmTerm
    });

    const { data, error } = await db
        .from("shared_links")
        .insert({
            code,
            entity_type: entityType,
            entity_id: entityId || null,
            target_path: targetPath,
            target_url: targetUrl,
            utm_source: utmSource,
            utm_medium: utmMedium,
            utm_campaign: utmCampaign,
            utm_content: utmContent,
            utm_term: utmTerm,
            meta_title: metaTitle || null,
            meta_description: metaDescription || null,
            meta_image_url: metaImageUrl || null,
            created_by: userId || null
        })
        .select("*")
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export async function registerSharedLinkVisit({ code, userId = null }) {
    
    const sessionId = getOrCreateSessionId();

    let authUserId = null;

    try {
        const { data } = await db.auth.getSession();
        authUserId = data?.session?.user?.id || null;
    } catch (error) {
        authUserId = null;
    }

    const { data, error } = await db.rpc(
        "register_shared_link_visit",
        {
            p_code: code,
            p_user_id: authUserId || userId || null,
            p_session_id: sessionId,
            p_referrer:
                typeof document !== "undefined"
                    ? document.referrer || null
                    : null,
            p_user_agent:
                typeof navigator !== "undefined"
                    ? navigator.userAgent || null
                    : null
        }
    );

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

function getOrCreateSessionId() {
    if (typeof window === "undefined") return null;

    const key = "andale_session_id";
    const existing = localStorage.getItem(key);

    if (existing) return existing;

    const sessionId = crypto.randomUUID();
    localStorage.setItem(key, sessionId);

    return sessionId;
}