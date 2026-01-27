import { Outlet } from "react-router-dom";
import Header from "../layout/header";
import SEO from "../components/SEO";

export default function RootLayout () {

    return (

        <>

            <SEO
                title={`Ándale Ya! | Lugares, Delivery, hotel y compras en Jauja`}
                description={`Ándale Ya! es la app jaujina que te conecta con mototaxis, delivery de comida, compras, gas y más. ¡Descárgala y mejora tu día!`}
            />
        
            <Header/>

            <main className="w-full h overflow-y scroll-hidden py-md" style={{"--h": "calc(100dvh - 120px)"}}>
                <Outlet/>
            </main>

        </>

    )

}