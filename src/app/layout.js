import { Poppins } from "next/font/google";
import '@/assets/global.css'
import { AuthProvider } from "@/context/AuthContext";
import Tabs from "@/layout/Tabs";
import { DBProvider } from "@/context/DBContext";
import { PermissionProvider } from "@/context/PermissionContext";

const poppins = Poppins({
    variable: "--font-poppins-sans",
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    subsets: ["latin"]
});

export const metadata = {
    title: {
        default: "Ándale Ya",
        template: "%s | Ándale Ya"
    },
    description: "Descubre restaurantes, eventos, lugares turísticos y experiencias en Jauja. Explora, pide y vive la ciudad con Ándale Ya.",
    keywords: [
        "Jauja",
        "turismo en Jauja",
        "restaurantes en Jauja",
        "eventos en Jauja",
        "qué hacer en Jauja",
        "lugares turísticos Jauja"
    ],
    authors: [{ name: "Ándale Ya" }],
    creator: "Ándale Ya",
    publisher: "Ándale Ya",
    metadataBase: new URL("https://www.andaleya.pe"),
    openGraph: {
        title: "Ándale Ya",
        description: "Descubre restaurantes, eventos y lugares turísticos en Jauja desde un solo lugar.",
        url: "https://www.andaleya.pe",
        siteName: "Ándale Ya",
        locale: "es_PE",
        type: "website",
        images: [
            {
                url: "/images/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Ándale Ya - Turismo y restaurantes en Jauja"
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        title: "Ándale Ya",
        description: "Explora restaurantes, eventos y turismo en Jauja.",
        images: ["/images/og-image.jpg"]
    },
    robots: {
        index: true,
        follow: true
    }
};

export default function RootLayout ({ children }) {
    return (
        <html lang="es" translate="no" dir="ltr">
            <PermissionProvider>
                <DBProvider>
                    <AuthProvider>
                        <body className={`${poppins.variable}`}>
                            <main className="w-full h scroll-y py-md" style={{"--h": "calc(100dvh - 60px)"}}>{children}</main>
                            <Tabs/>
                        </body>
                    </AuthProvider>
                </DBProvider>
            </PermissionProvider>
        </html>
    )
}