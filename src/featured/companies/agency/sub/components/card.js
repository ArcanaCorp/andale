import Images from '@/components/Images'
import './styles/card.css'
export default function CardPacks ({ details, pack }) {

    return (

        <li className='__card_pack'>
            <div className='__card_info'>
                <h3>{pack.name}</h3>
                <p>S/. {(pack.price).toFixed(2)} <span>por persona</span></p>
            </div>
            <div className='__card_image'>
                <Images alt={`Paquete ${pack?.name} de ${details?.name} solo por Ándale Ya!`} />
            </div>
        </li>

    )

}