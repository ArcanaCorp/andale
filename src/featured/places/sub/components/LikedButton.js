import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { toogleLiked } from "../../services/place.service";

export default function LikedButton ({ info }) {

    //const { user } = useAuth()
    const [ liked, setLiked ] = useState(false);

    useEffect(() => {
        const likedPlaces = JSON.parse(localStorage.getItem('likedPlaces')) || [];
        setLiked(likedPlaces.includes(info?.sub))
    }, [info?.sub])

    const handleToogleLiked = async () => {
        try {
            const data = await toogleLiked(info.sub);
        } catch (error) {
            toast.error('Error', { description: error.message })
        }
    }

    return (

        <button className={`__btn __btn_cxd ${liked ? '__btn_cxd_liked' : ''}`} onClick={handleToogleLiked}>{liked ? <IconHeartFilled/> : <IconHeart/>}</button>

    )

}