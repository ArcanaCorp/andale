import { supabase } from "@/libs/supabase";
import { getOrCreateUserId } from "../utils/user";

export async function trackEntityEvent({entity, action}) {
    try {
        await supabase.from("entity_events").insert({
            entity_type: entity.type,   // bussines | place
            entity_id: entity.id,
            entity_sub: entity.sub || entity.slug,
            action_event: action,
            anon_user: getOrCreateUserId(),
            user_agent: navigator.userAgent
        });
    } catch (err) {
        // No rompas UX por analytics
        console.warn("Event tracking failed", err.message);
    }
}
