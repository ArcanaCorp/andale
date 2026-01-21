import { subscribeToPush } from '../utils/pushsubscribe';
import { REACT_APP_API } from '../config';

export const servicePushSubscribe = async () => {
    const annonId = localStorage.getItem('anon_user_id')
    if (!annonId) return;
    const subscription = await subscribeToPush();
    await fetch(`${REACT_APP_API}/notifications/subscribe`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${annonId}`
        },
        body: JSON.stringify({ subscription })
    })
}