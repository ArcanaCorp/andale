import { Helmet } from "react-helmet";

export default function SEO ({title, description, keywords, image, url, type = "website", siteName = "Ándale Ya!", twitterHandle = "@andale_ya", locale = "es_PE", schema}) {

    const fullTitle = title
        ? `${title} | ${siteName} | Lugares, Delivery, hotel y compras en Jauja`
        : `${siteName} | Lugares, Delivery, hotel y compras en Jauja`;

    const defaultDescription = description || "Descubre lugares, delivery, hoteles y compras en Jauja con Ándale Ya! — Tu guía local confiable en Junín.";

    const defaultImage = image || "https://andaleya.pe/default-share.jpg";
    const canonicalUrl = url || "https://andaleya.pe/";

    const structuredData = schema
        ? JSON.stringify(schema)
        : JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": siteName,
            "url": canonicalUrl,
            "description": defaultDescription,
        });

    return (

        <Helmet>
            {/* Title & Basic Meta */}
            <title>{fullTitle}</title>
            <meta name="description" content={defaultDescription} />
            <meta name="keywords" content={keywords || "Jauja, turismo, delivery, hoteles, Ándale Ya"} />
            <meta name="robots" content="index, follow" />
            <meta name="author" content={siteName} />

            {/* Canonical URL */}
            <link rel="canonical" href={canonicalUrl} />

            {/* Open Graph */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={defaultDescription} />
            <meta property="og:image" content={defaultImage} />
            <meta property="og:locale" content={locale} />
            <meta property="og:site_name" content={siteName} />

            {/* Twitter Cards */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={defaultDescription} />
            <meta name="twitter:image" content={defaultImage} />
            <meta name="twitter:creator" content={twitterHandle} />

            {/* Structured Data */}
            <script type="application/ld+json">{structuredData}</script>
        </Helmet>

    )

}