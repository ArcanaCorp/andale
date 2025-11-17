import { useAuth } from "@/context/AuthContext";

export default function FavoritesView () {

    const { user } = useAuth();

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
                    <h2>Tus favoritos</h2>
                </>

            )}

        </>

    )

}