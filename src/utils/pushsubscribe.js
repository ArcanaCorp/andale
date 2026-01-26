import { REACT_VAPID_PUBLIC_KEY } from "../config";

export const subscribeToPush = async () => {

    if (Notification.permission !== "granted") return null;

    const registration = await navigator.serviceWorker.ready;
    let subscription = await registration.pushManager.getSubscription();
    console.log(subscription);
    // 2. Si existe, la reutilizamos
    if (subscription) {
        return subscription;
    }
    
    subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: REACT_VAPID_PUBLIC_KEY
    });
    return subscription;
}