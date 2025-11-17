import { Helmet } from 'react-helmet'
import { Outlet, useSearchParams } from 'react-router-dom'

import logo from '@/shared/img/LOGO-PRIMARY.svg'

import './styles/layout.css'

export default function LegalLayout () {

    const [searchParams] = useSearchParams();
    const origin = searchParams.get("origin");

    const linkMap = {
        'login': 'Iniciar Sesión'
    }

    const txt = linkMap[origin] || 'Ir a Ándale Ya!'
    

    return (

        <>

            <Helmet>
                <title>Legal | Ándale Ya! | Lugares, Delivery, hotel y compras en Jauja</title>
                <meta name="description" content="Consulta los documentos legales de Ándale Ya: Términos y Condiciones, Políticas de Privacidad y Avisos Legales. Operamos con transparencia, seguridad y cumplimiento normativo desde Jauja, Junín, Perú." />
                <meta name="keywords" content="Ándale Ya, términos y condiciones, política de privacidad, documentos legales, empresa peruana, Jauja, ARCANA CORP, cumplimiento legal, protección de datos" />
                <meta name="author" content="ARCANA CORP S.A.C" />
                <meta name="robots" content="index, follow" />

                {/* Open Graph (para compartir en redes sociales) */}
                <meta property="og:title" content="Documentos Legales | Ándale Ya! | Transparencia y Confianza" />
                <meta property="og:description" content="Conoce nuestras políticas y términos. En Ándale Ya! priorizamos tu confianza y seguridad." />
                <meta property="og:image" content={logo} />
                <meta property="og:url" content="https://andaleya.pe/legal" />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="es_PE" />

                {/* Twitter Cards */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Documentos Legales | Ándale Ya!" />
                <meta name="twitter:description" content="Transparencia y cumplimiento legal. Conoce nuestras políticas y términos oficiales." />
                <meta name="twitter:image" content={logo} />

                {/* Canonical link */}
                <link rel="canonical" href="https://andaleya.pe/legal" />
            </Helmet>
        
            <header className='__header'>
                <div className='__header_box'>
                    <a href='/' className='__a __a_link __a_link_block __a_link_img'>
                        <img src={logo} className='__img __img_logo' alt='Logo de Ándale Ya - Lugares, Delivery, hotel y compras en Jauja' loading='lazy' fetchPriority='high' />
                    </a>
                    <a href={`${origin !== null ? `/${origin}` : '/'}`} className='__a __a_link __a_link_btn'>{txt}</a>
                </div>
            </header>

            <main className='__main'>
                <Outlet/>
            </main>

            <footer className='__footer'>
                <div className='__footer_box'>
                    <p>ARCANA CORP S.A.C</p>
                    <p><b>RUC:</b> 20612123901</p>
                </div>
            </footer>

        </>

    )

}