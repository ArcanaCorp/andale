export async function registerCustomerPush({
    userId
}) {
    if (!userId) {
        throw new Error("No se encontró el usuario.");
    }

    if (!VAPID_PUBLIC_KEY) {
        throw new Error("Falta NEXT_PUBLIC_VAPID_PUBLIC_KEY.");
    }

    if (!("serviceWorker" in navigator)) {
        throw new Error("Este navegador no soporta Service Worker.");
    }

    if (!("PushManager" in window)) {
        throw new Error("Este navegador no soporta Push Notifications.");
    }

    if (!("Notification" in window)) {
        throw new Error("Este navegador no soporta notificaciones.");
    }

    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
        throw new Error("No se concedió permiso para notificaciones.");
    }

    const registration = await navigator.serviceWorker.register("/sw.js");

    await navigator.serviceWorker.ready;

    let subscription = await registration.pushManager.getSubscription();

    if (!subscription) {
        subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
        });
    }

    const subscriptionJson = subscription.toJSON();

    const { error } = await db
        .from("customer_push_subscriptions")
        .upsert({
            user_id: userId,
            subscription: subscriptionJson,
            endpoint: subscription.endpoint,
            user_agent: navigator.userAgent,
            is_active: true
        }, {
            onConflict: "endpoint"
        });

    if (error) {
        throw new Error(error.message);
    }

    return subscriptionJson;
}