import { useAuth } from "@/context/AuthContext";

export default function OrdersView () {

    const { user } = useAuth();

    return (

        <>
            {user === null ? (
                <>
                    <h2>Ingresa a tu cuenta</h2>
                    <p>Ingresa a tu cuenta para guardar tus pedidos</p>
                    <a href="/login">Ingresar</a>
                </>
            ) : (

                <>
                    <h2>Tus pedidos</h2>
                </>

            )}
        </>

    )

}