import { useEffect, useState } from "react"
import PlaceCard from "../../components/card";
import { getRecommendations } from "../../services/place.service";

export default function RecomendPlaces ({ info }) {

    const [ places, setPlaces ] = useState([]);

    useEffect(() => {
        const recomendations = async () => {
            try {
                if (places.length === 0) {
                    const data = await getRecommendations(info?.sub)
                    if (!data.ok) {
                        setPlaces([])
                        return;
                    }
                    setPlaces(data?.data)
                }
            } catch (error) {
                console.error(error);
            }
        }
        recomendations();
    }, []);

    return (

        places.length === 0 ? (
            <div>No tenemos recomendaciones por el momento</div>       
        ) : (
            <ul className="__lst_recommend">
                {places.map((place) => (
                    <PlaceCard key={place.id} info={place} />
                ))}
            </ul>
        )

    )

}