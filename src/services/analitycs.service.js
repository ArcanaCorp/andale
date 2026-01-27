import { UAParser } from "ua-parser-js";
import { supabase } from "../libs/supabase";

export const trackingVisit = async (payload) => {
    try {
        const parser = new UAParser(navigator.userAgent);
        const ua = parser.getResult();

        const device_type = ua.device.type ?? "desktop";
        const os = ua.os.name ?? null;
        const browser = ua.browser.name ?? null;

        const visitPayload = {
            ...payload,
            device_type,
            os,
            browser,
            metadata: payload.metadata ?? {},
            visit_date: new Date().toISOString().split("T")[0],
            visit_time: new Date().toTimeString().slice(0, 8)
        };

        const { data, error } = await supabase
            .from("visits")
            .insert([visitPayload], { ignoreDuplicates: true })
            .select("id, session_id")
            .single();

        if (error && error.code !== "23505") {
            throw error;
        }

        return {
            ok: true,
            visit: data
        };

    } catch (error) {
        console.error("trackingVisit error:", error);
        return {
            ok: false,
            message: error.message,
            error
        };
    }
};

export const pushVisitParam = async ({ session_id, param_name, param_value }) => {
    try {
        const { error } = await supabase
            .from("visit_params")
            .insert([
                { session_id, param_name, param_value }
            ]);

        if (error) throw error;

        return { ok: true };
    } catch (error) {
        console.error("pushVisitParam error:", error);
        return { ok: false };
    }
};


export const trackEvents = async (events) => {
    
    if (!events || events.length === 0) return;

    const { data, error } = await supabase
        .from('visit_events')
        .insert(events.map(event => ({
            session_id: event.session_id,// puedes derivar otro hash si quieres
            event_type: event.event_type,
            pathname: event.pathname,
            metadata: event.metadata ? JSON.stringify(event.metadata) : null,
            created_at: event.created_at
        })));

    if (error) {
        console.error("Error inserting events:", error);
        throw error;
    }

    return data;
}