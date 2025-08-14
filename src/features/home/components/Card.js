import { useNavigate } from 'react-router-dom'
import placeholder from '@/shared/images/placeholder.png'
import './styles/card.css'
export default function Card ({ data }) {

    const navigate = useNavigate();
    
    return (

        <li className={`__card`} onClick={() => navigate(`/${data.sub}`)}>
            <div className={`__card_image`}>
                <img className='__image' src={data?.image || placeholder} alt={`Foto de portada de ${data?.name}`} loading='eager' fetchPriority='high' style={{viewTransitionName: `photo-${data?.sub}-${data?.id}`}} />
            </div>
            <div className={`__card_info`}>
                <h4>{data?.name}</h4>
                <p>{data?.text}</p>
            </div>
        </li>

    )

}