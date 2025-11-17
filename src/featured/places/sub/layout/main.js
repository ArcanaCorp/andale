import { REACT_APP_API_URL } from '@/config/config'
import { IconMapPin } from '@tabler/icons-react'
import Maps from '../components/Maps'
import Images from '@/components/Images'
import './styles/main.css'
import RecomendPlaces from '../components/RecomendPlaces'
export default function MainPlace ({ details, openModalImage }) {

    console.log(details);
    

    return (

        <main className="__main_place">

            <section className='__section_place'>
                <p className='__subtext'><IconMapPin/> {details?.locationName}</p>
                <h1 className='__title'>{details?.name}</h1>
            </section>

            <section className='__section_place'>
                <h3 className='__subtitle'>Acerca de</h3>
                <p className='__parragraph'>{details?.text}</p>
            </section>

            <section className='__section_place'>
                <h3 className='__subtitle'>Galeria</h3>
                <ul className='__list_gallery'>
                    {details?.images.length > 0 && (
                        details?.images.map((img, idx) => (
                            <li key={idx} className='__photo' onClick={() => openModalImage(img, details?.sub)}>
                                <Images img={`${REACT_APP_API_URL}/places/${details?.sub}/image/${img}`} alt={`Galeria de fotos de ${details?.name}${img?.image}`} />
                            </li>
                        ))
                    )}
                </ul>
            </section>

            <section className='__section_place'>
                <h3 className='__subtitle'>¿Cómo llegar?</h3>
                <Maps locationMap={details?.location} />
            </section>

            <section className='__section_place'>
                <h3 className='__subtitle'>Lugares recomendados</h3>
                <RecomendPlaces info={details} />
            </section>

        </main>

    )

}