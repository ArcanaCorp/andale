import { useAuth } from "@/context/AuthContext";
export default function PromotionsView () {

    const { user } = useAuth();

    return (
        <>
            {user === null ? (
                <>
                    <h2>Ingresa a tu cuenta</h2>
                    <p>Ingresa a tu cuenta para acceder a promociones exclusivas</p>
                    <a href="/login">Ingresar</a>
                </>
            ) : (

                <>
                    <h2>Tus promociones</h2>
                </>

            )}
        </>
    )
}