import moment from 'moment';
import "moment/locale/es";
import avatar from '@/shared/img/avatar-bg.png'
import './styles/notify.css'
import Images from './Images';

moment.locale("es");
export default function Notification ({ notify }) {
    return (
        <li className='--notify'>
            <a href={notify.link} className='--notify-link'>
                <div className='--avatar'>
                    <Images img={avatar} alt={`Avatar de Ándale Ya!`} />
                </div>
                <div className='--info'>
                    <h4 className='--txt-tit'>{notify.title}</h4>
                    <p className='--txt-txt'>{notify.body}</p>
                    <p className='--txt-time'>{moment(notify.created_at).fromNow()}</p>
                </div>
            </a>
        </li>
    )
}