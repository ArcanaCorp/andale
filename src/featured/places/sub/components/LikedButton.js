import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { toogleLiked } from "../../services/place.service";
import { useAuth } from "@/context/AuthContext";

export default function LikedButton ({ info }) {

    const { user } = useAuth()
    const [ liked, setLiked ] = useState(false);

    useEffect(() => {
        const likedPlaces = JSON.parse(localStorage.getItem('likedPlaces')) || [];
        setLiked(likedPlaces.includes(info?.sub))
    }, [info?.sub])

    const handleToogleLiked = async () => {
        try {
            const data = await toogleLiked(user?.sub, info.sub);
            if (!data.ok) {
                toast.error("Error", { description: data.message });
                return;
            }

            const { action } = data.data;

            // Estado actual de likes en localStorage
            const likedPlaces = JSON.parse(localStorage.getItem("likedPlaces")) || [];

            if (action === "added") {
                setLiked(true);

                if (!likedPlaces.includes(info.sub)) {
                    likedPlaces.push(info.sub);
                }

                toast.success("Agregado a favoritos");
            }

            if (action === "removed") {
                setLiked(false);

                const index = likedPlaces.indexOf(info.sub);
                if (index !== -1) likedPlaces.splice(index, 1);

                toast.success("Removido de favoritos");
            }

            // Guardamos actualización
            localStorage.setItem("likedPlaces", JSON.stringify(likedPlaces));
            
        } catch (error) {
            toast.error('Error', { description: error.message })
        }
    }

    return (

        <button className={`__btn __btn_cxd ${liked ? '__btn_cxd_liked' : ''}`} onClick={handleToogleLiked}>{liked ? <IconHeartFilled/> : <IconHeart/>}</button>

    )

}