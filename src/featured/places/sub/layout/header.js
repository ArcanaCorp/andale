import { REACT_APP_API_URL } from '@/config/config'
import { IconChevronLeft } from "@tabler/icons-react";
import Images from '@/components/Images';
import SharedButton from "../components/SharedButton";
import LikedButton from "../components/LikedButton";
import placeholder from '@/shared/img/placeholder.png'
import './styles/header.css'
export default function HeaderPlace ({ details }) {
    
    const image = `${REACT_APP_API_URL}/places/${details?.sub}/image/${details?.images?.[0]}` || placeholder;

    return (
        <header className="__header_place">
            <div className="__row_place">
                <a href="/" className="__btn __btn_back"><IconChevronLeft/></a>
                <div className="__flex">
                    <SharedButton/>
                    <LikedButton info={details} />
                </div>
            </div>
            <Images img={image} alt={`Foto de ${details?.name}, ubicado en ${details?.locationName} solo por Ándale Ya!`} className='__image_place_bg' />
        </header>
    )
}