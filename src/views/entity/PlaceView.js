import Images from "@/components/Images/Image";
import { useEffect, useState } from "react";
import { getRecommendedPlaces } from "../../services/places.service";
import CardSkeleton from "../../components/Card/Skeleton";
import Component from "../../components/Card/Component";

export default function PlaceView({ entity }) {
    
    const [ recommended, setRecommended ] = useState([]);
    const [ errorRec, setErrorRec ] = useState(null)
    const [ loadingRec, setLoadingRec ] = useState(true);

    useEffect(() => {
        const recommended = async () => {
            try {
                const data = await getRecommendedPlaces({
                    excludeId: entity.id,
                    category: entity.category,
                    district: entity.district
                })
                setRecommended(data)
            } catch (error) {
                setErrorRec(error.message)
            } finally {
                setLoadingRec(false)
            }
        }
        recommended();
    }, [entity])

    return (

        <>

            <div className="w-full h bg-secondary" style={{"--h": "120px"}}>
                <Images img={entity.image} />
            </div>

            <div className="relative w-full bg-white mt rounded-top-lg py-sm" style={{"--mt": "-10px"}}>  
                <div className="mb-md px-md">
                    <p className="text-xs text-gray">{entity.location} • {entity.category} </p>
                    <h1 aria-label={entity.name}>{entity.name}</h1>
                    <p className="text-xs text-gray"><b>10</b> reviews • <b>2</b> seguidos</p>
                </div>
                <div className="mb-md px-md">
                    <h2 className="mb-xs">Acerca de</h2>
                    <p className="text-xs text-gray line-xl">{entity.text}</p>
                </div>
                <div className="mb-md">
                    <h2 className="mb-xs px-md">Galeria de fotos</h2>
                    <ul className="w-full flex gap-xs overflow-x scroll-hidden pl pr" style={{"--pl": "var(--spacing-md)", "--pr": "var(--spacing-md)"}}>
                        {entity.images.map((img, i) => (
                            <li key={i} className="w h rounded-md bg-secondary pointer" style={{"--w": "120px", "--mnw": "120px", "--h": "120px"}}>
                                <Images img={`https://bbuohaidrgnmicuzaajd.supabase.co/storage/v1/object/public/places/images/${entity.sub}/${img.image_iplaces}`} />
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="mb-md px-md">
                    <h2 className="mb-xs">¿Cómo llegar?</h2>
                    <div className="w-full h bg-secondary rounded-md" style={{"--h": "200px"}}></div>
                </div>
                <div className="mb-md">
                    <h2 className="mb-xs px-md">Lugares recomendados</h2>
                    <ul className="w-full flex gap-xs overflow-x scroll-hidden pl pr" style={{"--pl": "var(--spacing-md)", "--pr": "var(--spacing-md)"}}>
                        {loadingRec ? (
                            <CardSkeleton/>
                        ) : (
                            errorRec === null ? (
                                recommended.map((rcm) => (
                                    <Component key={rcm.id} data={rcm} />
                                ))
                            ) : (
                                <h2>{errorRec}</h2>
                            )
                        )}
                    </ul>
                </div>
            </div>
        
        </>
    
    )

}