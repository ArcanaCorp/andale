import { useNavigate } from 'react-router-dom'
import './styles/place.css'
export default function Place ({ place }) {

    const navigate = useNavigate();

    return (

        <div className='--place_card' onClick={() => navigate(`/${place.sub}`)}>
            <div className='--place_card_img'>
                <img src={place.image} alt={`Foto de ${place.name} ubicado en ${place.text}`} loading='lazy' />
            </div>
            <div className='--place_card_txt'>
                <h4 aria-label={place.name}>{place.name}</h4>
                <p aria-label={place.text}>{place.text}</p>
            </div>
        </div>

    )

}