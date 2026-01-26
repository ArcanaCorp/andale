import { Helmet } from "react-helmet";
import { Link, Outlet, useSearchParams } from "react-router-dom";
import logo from '@/shared/img/LOGO-PRIMARY.svg'
import Images from "../../components/Images/Image";

export default function LegalLayout() {
    
    const [ searchParams ] = useSearchParams();
    const origin = searchParams.get('origin');

    const textOrigin = {
        'login': 'Iniciar Sesión'
    }

    const text = textOrigin[origin] || 'Ir a Ándale Ya!'

    return (

        <>
        
            <Helmet>
                <title>Legal | Ándale Ya! | Lugares, Delivery, hotel y compras en Jauja</title>
                <meta name="description" content="Consulta los documentos legales de Ándale Ya: Términos y Condiciones, Políticas de Privacidad y Avisos Legales. Operamos con transparencia, seguridad y cumplimiento normativo desde Jauja, Junín, Perú." />
                <meta name="keywords" content="Ándale Ya, términos y condiciones, política de privacidad, documentos legales, empresa peruana, Jauja, ARCANA CORP, cumplimiento legal, protección de datos" />
                <meta name="author" content="ARCANA CORP S.A.C" />
                <meta name="robots" content="index, follow" />
                <meta property="og:title" content="Documentos Legales | Ándale Ya! | Transparencia y Confianza" />
                <meta property="og:description" content="Conoce nuestras políticas y términos. En Ándale Ya! priorizamos tu confianza y seguridad." />
                <meta property="og:image" content={logo} />
                <meta property="og:url" content="https://andaleya.pe/legal" />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="es_PE" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Documentos Legales | Ándale Ya!" />
                <meta name="twitter:description" content="Transparencia y cumplimiento legal. Conoce nuestras políticas y términos oficiales." />
                <meta name="twitter:image" content={logo} />
                <link rel="canonical" href="https://andaleya.pe/legal" />
            </Helmet>

            <header className="w-full h border-bottom" style={{"--h": "60px"}}>
                <div className="w h m-auto flex align-center justify-between" style={{"--w": "90%"}}>
                    <Link to={`/`}>
                        <Images img={logo} alt="Logo de Ándale Ya - Lugares, Delivery, hotel y compras en Jauja" className="w h" style={{"--w": "100%", "--h": "45px"}} />
                    </Link>
                    <Link to={`/`}>{text}</Link>
                </div>
            </header>

            <main className="w-full py-md">
                <Outlet/>
            </main>

            <footer className="w-full border-top">
                <div className="w m-auto text-gray py-md" style={{"--w": "90%"}}>
                    <p>ARCANA CORP S.A.C</p>
                    <p><b>RUC:</b> 20612123901</p>
                </div>
            </footer>

        </>

    )

}