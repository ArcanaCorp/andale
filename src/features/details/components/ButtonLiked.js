import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { toogleLiked } from "../services/liked.service";
import { useEffect, useState } from "react";

export default function ButtonLiked ({ info }) {

    const [liked, setLiked] = useState(false);

    useEffect(() => {
        const likedPlaces = JSON.parse(localStorage.getItem("likedPlaces")) || [];
        setLiked(likedPlaces.includes(info?.sub));
    }, [info?.sub]);

    const handleToggleLiked = async () => {
        try {
        const response = await toogleLiked(info?.sub);
        if (!response.ok) return console.warn(response.message);

            const likedPlaces = JSON.parse(localStorage.getItem("likedPlaces")) || [];

            if (response.data === true) {
                // Si se agregó el like
                const updated = [...likedPlaces, info.sub];
                localStorage.setItem("likedPlaces", JSON.stringify(updated));
                setLiked(true);
            } else {
                // Si se quitó el like
                const updated = likedPlaces.filter((id) => id !== info.sub);
                localStorage.setItem("likedPlaces", JSON.stringify(updated));
                setLiked(false);
            }
        } catch (error) {
            console.error("Error al cambiar el estado de like:", error);
        }
    };

    return (

        <button className={`__btn ${liked ? '__btn_liked' : ''}`} onClick={handleToggleLiked}>{liked ? <IconHeartFilled/> : <IconHeart/>}</button>

    )

}