import { subscribeToPush } from '../utils/pushsubscribe';
import { getOrCreateUserId } from '../utils/user';
import { supabase } from '../libs/supabase';

export async function servicePushSubscribe() {
    try {
        const anonId = getOrCreateUserId();
        if (!anonId) return;

        const subscription = await subscribeToPush();
        if (!subscription) return;

        const toBase64 = (buffer) =>
            btoa(String.fromCharCode(...new Uint8Array(buffer)));

        const payload = {
            anon_user_id: anonId,
            endpoint: subscription.endpoint,
            p256dh: toBase64(subscription.getKey("p256dh")),
            auth: toBase64(subscription.getKey("auth")),
            updated_at: new Date().toISOString()
        };

        const { error } = await supabase
            .from("push_subscriptions")
            .upsert(payload, {
                onConflict: "endpoint" // 👈 LA LÍNEA CLAVE
            });

        if (error) {
            console.error("Push subscription error:", error);
        }

    } catch (err) {
        console.error("servicePushSubscribe fatal error:", err);
    }
}