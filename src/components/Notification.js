import moment from 'moment';
import "moment/locale/es";
import './styles/notify.css'

moment.locale("es");
export default function Notification ({ notify }) {
    return (
        <li className='--notify'>
            <a href={notify.link} className='--notify-link'>
                <div className='--avatar'></div>
                <div className='--info'>
                    <h4 className='--txt-tit'>{notify.titulo}</h4>
                    <p className='--txt-txt'>{notify.descripcion}</p>
                    <p className='--txt-time'>{moment(notify.fecha).fromNow()}</p>
                </div>
            </a>
        </li>
    )
}