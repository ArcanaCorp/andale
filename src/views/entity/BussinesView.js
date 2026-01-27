import { entityConf } from "@/config/entity.config";
import { useState } from "react";
import Images from "@/components/Images/Image";
import { Icon } from "@/helpers/icons";
import { trackEntityEvent } from "../../services/events.service";
import FollowButton from "../../components/Buttons/follow.button";
import CardEntity from "../../components/Card/CardEntity";
import SEO from "../../components/SEO";

export default function BussinesView ({ entity }) {

    const [ category, setCategory ] = useState('popular')
    const [ followersCount, setFollowersCount ] = useState(0);

    const filteredItems = (() => {
        if (!entity?.items) return [];

        // Populares
        if (category === "popular") {
            return entity.items.filter(item => item.popular);
        }

        // Descuentos
        if (category === "discount") {
            return entity.items.filter(item => item.discount && item.discount > 0);
        }

        // Categoría dinámica
        return entity.items.filter(item => item.category === category);
    })();

    const handleWhatsApp = () => {
        trackEntityEvent({entity, action: 'whatsapp'})
        const message = `Hola ${entity.name} te estoy escribiendo desde Ándale Ya!`
        const link = `https://wa.me/51${entity.phone}/?text=${encodeURIComponent(message)}`
        window.open(link)
    }

    return (

        <>

            <SEO
                title={`${entity.name} - ${entity.text}`}
                description={entity.text}
                keywords={entity.text}
                image={entity.portada}
                url={`https://andaleya.pe/${entity.sub}`}
            />

            <div className="w-full h bg-secondary" style={{"--h": "120px"}}>
                <Images img={entity.portada} />
            </div>

            <div className="relative w-full bg-white mt rounded-top-lg p-sm" style={{"--mt": "-10px"}}>
                <div className="absolute top w h bg-white rounded-pill grid center" style={{"--w": "100px", "--h": "100px", "--top": "-20px"}}>
                    <div className="w h bg-secondary rounded-pill" style={{"--w": "90px", "--h": "90px"}}>
                        <Images img={entity.photo} style={{borderRadius: 'inherit'}} />
                    </div>
                </div>
                <div className="pl mb-md" style={{"--pl": "110px"}}>
                    <h1 aria-label={entity.name}>{entity.name}</h1>
                    <p className="text-xs text-gray"><b>10</b> reviews • <b>{followersCount}</b> seguidos</p>
                </div>
                <div className="mb-md">
                    <p className="text-xs text-gray">Página • {entityConf.category[entity.category]} </p>
                    <p>{entity.text}</p>
                </div>
                <div className="w-full mb-md flex align-center justify-between gap-xs">
                    <FollowButton entity={entity} setFollowersCount={setFollowersCount} />
                    <button className="w-full h bg-secondary rounded-md text-xs flex align-center justify-center gap-xs" style={{"--h": "35px"}} onClick={handleWhatsApp}><Icon name={'whatsapp'} size={16} /> WhatsApp</button>
                </div>
                <ul className="w-full mb-md flex gap-xs align-center overflow-x scroll-hidden">
                    <li className={`px-sm py-xs text-xs rounded-pill pointer text-nowrap ${category === 'popular' ? 'text-primary fw-semibold bg-primary-transparent' : ''}`} onClick={() => setCategory('popular')}>Populares</li>
                    <li className={`px-sm py-xs text-xs rounded-pill pointer text-nowrap ${category === 'discount' ? 'text-primary fw-semibold bg-primary-transparent' : ''}`} onClick={() => setCategory('discount')}>Descuentos</li>
                    {entity?.categories.map((c) => (
                        <li key={c.id} className={`px-sm py-xs text-xs rounded-pill pointer text-nowrap ${category === c.name ? 'text-primary fw-semibold bg-primary-transparent' : ''}`} onClick={() => setCategory(c.name)}>{c.name}</li>
                    ))}
                </ul>
                <ul className="grid gap-sm grid-cols mb-md" style={{"--cols": "repeat(2, 1fr)"}}>
                    {filteredItems.map((data) => (
                        <CardEntity key={data.id} data={data} />
                    ))}
                </ul>
                <div className="w-full mb-md">
                    <h3 className=" mb-sm">Otras personas dicen</h3>
                    <ul className="flex overflow-x scroll-hidden gap-xs">
                        {[...Array(5)].map((_, i) => (
                            <li key={i} className="w bg-secondary rounded-md p-xs text-xs" style={{"--w": "calc(100dvw - 4rem)", "--mnw": "calc(100dvw - 4rem)"}}>
                                <div>
                                    <div></div>
                                    <div>
                                        <h5>Usuario {i}</h5>
                                        <p></p>
                                    </div>
                                </div>
                                <div>
                                    <p>Estuvo muy rico todo y buena atención llego puntual.</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

        </>

    )
}