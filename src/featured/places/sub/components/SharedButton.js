import { IconShare3 } from "@tabler/icons-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import moment from "moment";
import { sharedPlace } from "../../services/place.service";

export default function SharedButton ({ data }) {

    const { user } = useAuth()

    const handleShare = async () => {

        if (user === null) return toast.info('Alerta', { description: 'Inicia sesión para continuar con la acción' })

            try {

                const userAgent = navigator.userAgent;

                // --- Detección de dispositivo ---
                const isTablet = /iPad|Tablet/i.test(userAgent);
                const isMobile = /iPhone|Android|iPod/i.test(userAgent);
                const device = isTablet ? "tablet" : isMobile ? "mobile" : "desktop";

                // --- Detección de navegador ---
                const browser = (() => {
                    if (userAgent.includes("Chrome") && !userAgent.includes("Edge")) return "Chrome";
                    if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) return "Safari";
                    if (userAgent.includes("Firefox")) return "Firefox";
                    if (userAgent.includes("Edg")) return "Edge";
                    if (userAgent.includes("Opera") || userAgent.includes("OPR")) return "Opera";
                    return "Desconocido";
                })();

                // --- Detección de sistema operativo ---
                const os = (() => {
                    if (/Windows/i.test(userAgent)) return "Windows";
                    if (/Mac OS/i.test(userAgent)) return "MacOS";
                    if (/Android/i.test(userAgent)) return "Android";
                    if (/iOS|iPhone|iPad/i.test(userAgent)) return "iOS";
                    if (/Linux/i.test(userAgent)) return "Linux";
                    return "Desconocido";
                })();

                // --- Información de contenido ---
                const contentType = "tourism";
                const contentId = data?.sub || "unknown";
                const sourcePage = window.location.href;

                // --- Plataforma usada para compartir ---
                let platform = "other";
                if (navigator.share) platform = "native_share";
                else platform = "whatsapp_web";

                // --- Metadata adicional ---
                const metadata = {
                    language: navigator.language,
                    screen: `${window.screen.width}x${window.screen.height}`,
                    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                    platform: navigator.platform,
                    referrer: document.referrer || "directo",
                    userAgent,
                };

                const payload = {
                    user_id: user?.sub,
                    content_type: contentType,
                    content_id: contentId,
                    source_page: sourcePage,
                    platform,
                    device_info: device,
                    browser,
                    os,
                    metadata,
                    shared_at: moment().format("YYYY-MM-DD HH:mm:ss"),
                };

                await sharedPlace(payload, data?.sub);

                const shareData = {
                    title: data?.name || "Compartir",
                    text: `¿Conocías este lugar? \n\n*${data?.name}*\n\n📍 ${data?.locationName || "tu zona"}\n🔗 Descúbrelo aquí:\n`,
                    url: window.location.href,
                };
                //await shareRegister({type,id: data?.sub});

                if (navigator.share) {
                    // Si el dispositivo soporta la Web Share API (ej: móviles)
                    await navigator.share(shareData);
                } else {
                    // En Desktop: redirigir a WhatsApp Web
                    const text = encodeURIComponent(`${shareData.text}: ${shareData.url}`);
                    window.open(`https://wa.me/send?text=${text}`, "_blank");
                }

            } catch (error) {
                console.error("❌ Error al compartir:", error);
            }

    }

    return (

        <button className={`__btn __btn_cxd`} onClick={handleShare}><IconShare3/></button>

    )

}