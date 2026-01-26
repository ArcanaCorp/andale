import { supabase } from "@/libs/supabase";
import { getOrCreateUserId } from "../utils/user";

export async function followEntity(entity) {
    return supabase.from("entity_follows").insert({
        entity_type: entity.type,
        entity_id: entity.id,
        entity_sub: entity.sub,
        anon_user: getOrCreateUserId()
    });
}

export async function unfollowEntity(entity) {
    
    const anonUserId = getOrCreateUserId();

    const { data } = await supabase
        .from("entity_follows")
        .select("id_follow")
        .eq("entity_type", entity.type)
        .eq("entity_id", entity.id)
        .eq("anon_user", anonUserId)
        .maybeSingle();

    if (!data) {
        console.warn("No follow encontrado para eliminar");
        return;
    }

    return supabase
        .from("entity_follows")
        .delete()
        .eq("id_follow", data.id_follow);
}

export async function isFollowingEntity(entity) {
    const { data } = await supabase
        .from("entity_follows")
        .select("id_follow")
        .eq("entity_type", entity.type)
        .eq("entity_id", entity.id)
        .eq("anon_user", getOrCreateUserId())
        .maybeSingle();

    return !!data;
}

export async function getFollowersCount(entity) {
    const { count } = await supabase
        .from("entity_follows")
        .select("*", { count: "exact", head: true })
        .eq("entity_type", entity.type)
        .eq("entity_id", entity.id);

    return count || 0;
}