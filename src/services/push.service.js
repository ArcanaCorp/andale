import Cookies from 'js-cookie'
import { subscribeToPush } from '../utils/pushsubscribe';
import { REACT_APP_API } from '../config';

export const servicePushSubscribe = async () => {
    const token = Cookies.get('c_user');
    const subscription = await subscribeToPush();
    await fetch(`${REACT_APP_API}/notifications/subscribe`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ subscription })
    })
}