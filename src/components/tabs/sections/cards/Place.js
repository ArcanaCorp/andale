import { Link } from "react-router-dom";
import { IconMapPin } from "@tabler/icons-react";

import placeholder from '@/assets/img/placeholder.png'

import './styles/place.css'

export default function Place ({ place }) {

    const image = place?.image === 'URL_ADDRESS' ? placeholder : place?.image;

    return (

        <Link to={`/p/${place.slug}`} className={`__card __card_place`} style={{backgroundImage: `url(${image})`}}>
            <img src={image} alt={`Ven y conoce ${place?.name} | Ándale Ya!`} loading="lazy" />
            <div className="__cpx">
                <h3 className="__title">{place?.name}</h3>
                <p className="__location"><IconMapPin/> {place?.location}</p>
            </div>
        </Link>

    )
}