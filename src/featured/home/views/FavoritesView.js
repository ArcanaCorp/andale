import { useAuth } from "@/context/AuthContext";
import { IconHeartFilled } from "@tabler/icons-react";
import { useAnalytics } from "@/context/AnalyticsContext";
import './styles/favorites.css'
export default function FavoritesView () {

    const { user } = useAuth();
    const { favorites } = useAnalytics();

    return (

        <>
            
            {user === null ? (
                <>
                    <h2>Ingresa a tu cuenta</h2>
                    <p>Ingresa a tu cuenta para ver tus favoritos</p>
                    <a href="/login">Ingresar</a>
                </>
            ) : (

                <>

                    <div className="--tittle">
                        <h2>Tus favoritos</h2>
                        <p>Tus favoritos en un solo lugar para que accedas cuando quieras.</p>
                    </div>

                    <ul className="--list">
                        {favorites.map((fav) => (
                            <li key={fav.id} className="--item">
                                <div className="--col-A">
                                    <div className="--picture"></div>
                                    <div className="--info">
                                        <h4>{fav.type === 'place' ? fav.target.name_place : fav.target.name_bussines}</h4>
                                        <p>{fav.type === 'place' ? fav.target.category_place : fav.target.category_bussines}</p>
                                    </div>
                                </div>
                                <button className="--liked"><IconHeartFilled/></button>
                            </li>
                        ))}
                    </ul>

                </>

            )}

        </>

    )

}