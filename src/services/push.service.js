import { subscribeToPush } from '../utils/pushsubscribe';
import { getOrCreateUserId } from '../utils/user';
import { supabase } from '../libs/supabase';

export async function servicePushSubscribe() {
    const anonId = getOrCreateUserId();
    if (!anonId) return;

    const subscription = await subscribeToPush();
    if (!subscription) return;

    const { endpoint } = subscription;

    const p256dh = subscription.getKey("p256dh");
    const auth = subscription.getKey("auth");

    // convertir ArrayBuffer → base64
    const toBase64 = (buffer) => btoa(String.fromCharCode(...new Uint8Array(buffer)));

    const payload = {
        anon_user_id: anonId,
        endpoint,
        p256dh: toBase64(p256dh),
        auth: toBase64(auth)
    };

    console.log(payload);

    const { error } = await supabase
        .from("push_subscriptions")
        .upsert(payload, {
            onConflict: "anon_user_id"
        });

    if (error) {
        console.error("Push subscription error:", error);
    }
}