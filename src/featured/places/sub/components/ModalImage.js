import Images from '@/components/Images';
import { REACT_APP_API_URL } from '@/config/config'
import { IconX } from '@tabler/icons-react'
import './styles/modalimage.css'
export default function ModalImage ({ image, sub, onCloseModalImage }) {
    const img = `${REACT_APP_API_URL}/places/${sub}/image/${image}`
    
    return (

        <div className='__overlay_modal_image'>
            <button className='__btn_close' onClick={onCloseModalImage}><IconX/></button>
            <Images img={img} alt={`Imagen ${image}`} />
        </div>

    )

}