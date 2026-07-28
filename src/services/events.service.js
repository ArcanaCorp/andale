import { db } from "@/libs/supabase";

function getSessionId() {
    if (typeof window === "undefined") return null;

    const key = "andale_session_id";
    const existing = localStorage.getItem(key);

    if (existing) return existing;

    const sessionId = crypto.randomUUID();
    localStorage.setItem(key, sessionId);

    return sessionId;
}

export async function trackEvent({
    userId = null,
    eventName,
    entityType = null,
    entityId = null,
    metadata = {}
}) {
    if (!eventName) return null;

    let authUserId = null;

    try {
        const { data } = await db.auth.getSession();
        authUserId = data?.session?.user?.id || null;
    } catch (error) {
        authUserId = null;
    }

    const finalUserId = authUserId || null;

    const payload = {
        user_id: finalUserId,
        event_name: eventName,
        entity_type: entityType,
        entity_id: entityId,
        route:
            typeof window !== "undefined"
                ? `${window.location.pathname}${window.location.search}`
                : null,
        referrer:
            typeof document !== "undefined"
                ? document.referrer || null
                : null,
        session_id: getSessionId(),
        user_agent:
            typeof navigator !== "undefined"
                ? navigator.userAgent || null
                : null,
        metadata: {
            ...metadata,
            passed_user_id: userId || null,
            auth_user_id: authUserId || null
        }
    };

    const { data, error } = await db
        .from("app_events")
        .insert(payload)
        .select("*")
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return data;
}