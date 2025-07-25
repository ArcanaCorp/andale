import './styles/agencycard.css'
export default function AgencyCard ({ agency, packs, filter }) {

    const image = packs?.image === '' ? agency.photo : packs?.image

    return (

        <div className={`__agency_card ${filter !== 'all' && filter !== packs?.category ? '__agency_card--hidden' : ''}`}>
            <div className='__info'>
                <h3>{packs.name}</h3>
                <p>S/. {packs.price}</p>
            </div>
            <div className="__image" style={{backgroundImage: `url(${image})`}}>
                <img src={image} alt={`Ven y conoce ${packs?.name} con la agencia ${agency?.name} | Ándale Ya!`} loading='lazy' style={{display: 'none'}} />
            </div>
        </div>

    )

}