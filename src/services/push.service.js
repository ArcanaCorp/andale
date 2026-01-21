import Cookies from 'js-cookie'
import { subscribeToPush } from '../utils/pushsubscribe';
import { REACT_APP_API } from '../config';

export const servicePushSubscribe = async () => {
    const token = Cookies.get('c_user');
    const annonId = localStorage.getItem('anon_user_id')
    if (!token && !annonId) return console.log({ok: false, error: 'No se encontraron los datos necesarios'});
    const subscription = await subscribeToPush();
    await fetch(`${REACT_APP_API}/notifications/subscribe`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token || annonId}`
        },
        body: JSON.stringify({ subscription })
    })
}