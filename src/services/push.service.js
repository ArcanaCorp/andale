import { subscribeToPush } from '../utils/pushsubscribe';
import { getOrCreateUserId } from '../utils/user';
import { supabase } from '../libs/supabase';

export async function servicePushSubscribe() {
    const anonId = getOrCreateUserId();
    if (!anonId) return;

    const subscription = await subscribeToPush();
    if (!subscription) return;

    console.log(subscription);

    const { endpoint, keys } = subscription;

    const payload = {
        anon_user_id: anonId,
        endpoint,
        p256dh: keys.p256dh,
        auth: keys.auth
    };

    const { error } = await supabase
        .from("push_subscriptions")
        .upsert(payload, {
            onConflict: "anon_user_id"
        });

    if (error) {
        console.error("Push subscription error:", error);
    }
}