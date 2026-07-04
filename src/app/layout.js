import { Montserrat } from "next/font/google";
import '@/assets/global.css';
import { Provider } from "@/providers/Provider";
import { Toaster } from "sonner";
import { SITE_URL } from "@/config";

const montserrat = Montserrat({
    variable: "--font-base",
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
})

export const metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: 'Ándale Ya! | Restaurantes, cartas digitales y pedidos por WhatsApp',
        template: '%s | Ándale Ya!'
    },
    description: 'Ándale Ya! conecta restaurantes locales con clientes mediante cartas digitales, pedidos rápidos y atención directa por WhatsApp.',
    applicationName: 'Ándale Ya!',
    keywords: [
        'Ándale Ya',
        'Andale Ya',
        'restaurantes en Jauja',
        'comida en Jauja',
        'carta digital',
        'menú digital',
        'pedidos por WhatsApp',
        'delivery Jauja',
        'restaurantes Perú',
        'plataforma de restaurantes',
        'QR restaurantes'
    ],
    authors: [
        {
            name: 'ARCANA CORP',
            url: 'https://arcanacorp.dev'
        }
    ],
    creator: 'ARCANA CORP',
    publisher: 'ARCANA CORP',
    alternates: {
        canonical: '/'
    },
    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1
        }
    },
    openGraph: {
        type: 'website',
        locale: 'es_PE',
        url: SITE_URL,
        siteName: 'Ándale Ya!',
        title: 'Ándale Ya! | Restaurantes, cartas digitales y pedidos por WhatsApp',
        description: 'Descubre restaurantes locales, revisa cartas digitales y realiza pedidos de forma rápida con Ándale Ya!.',
        images: [
            {
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Ándale Ya! - Restaurantes y pedidos digitales'
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Ándale Ya! | Restaurantes y pedidos digitales',
        description: 'Encuentra restaurantes, revisa cartas digitales y realiza pedidos rápidos con Ándale Ya!.',
        images: ['/og-image.jpg']
    },
    icons: {
        icon: [
            {
                url: '/favicon.ico'
            },
            {
                url: '/icon.png',
                type: 'image/png',
                sizes: '512x512'
            }
        ],
        apple: [
            {
                url: '/apple-icon.png',
                sizes: '180x180',
                type: 'image/png'
            }
        ]
    },
    manifest: '/manifest.json',
    appleWebApp: {
        capable: true,
        title: 'Ándale Ya!',
        statusBarStyle: 'black-translucent'
    },
    formatDetection: {
        telephone: false,
        email: false,
        address: false
    },
    category: 'food'
};

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    themeColor: '#000000'
};

export default function RootLayout ({ children }) {
    return (
        <html lang="es" className={`${montserrat.variable}`} data-scroll-behavior="smooth">
            <body>
                <Provider>{children}</Provider>
                <Toaster position="bottom-center" duration={5000} />
            </body>
        </html>
    )
}