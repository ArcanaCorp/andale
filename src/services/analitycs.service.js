import { UAParser } from "ua-parser-js";
import { supabase } from "../libs/supabase";

export const trackingVisit = async (payload) => {
    try {

        const parser = new UAParser(navigator.userAgent);
        const ua = parser.getResult();

        const device_type = ua.device.type ?? 'desktop';
        const os = ua.os.name ?? null;
        const browser = ua.browser.name ?? null;

        const { error } = await supabase
        .from('visits')
        .insert([
            {
                ...payload,
                device_type,
                os,
                browser,
                metadata: JSON.stringify(payload.metadata),
                visit_date: new Date().toISOString().split("T")[0],
                visit_time: new Date().toTimeString().slice(0, 8),
            }
        ])
        if (error) throw error;

        return { ok: true };
    } catch (error) {
        return { ok: false, message: `Error: ${error.message}`, error: error, code: 500 }
    }
}