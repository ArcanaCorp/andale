import { usePermissions } from "@/context/PermissionsContext";
import { servicePushSubscribe } from "@/services/push.service";

export default function BannerNotifications () {
    
    const { notifications  } = usePermissions();
    const { requestNotificationPermission } = notifications;

    const handleActive = async () => {
        try {
            await requestNotificationPermission();
            await servicePushSubscribe();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <li className="w h rounded-md p-sm bg-primary flex align-end" style={{ "--w": "calc(100dvw - 4rem)", "--mnw": "calc(100dvw - 4rem)", "--h": "120px" }}>
                <div className="text-white">
                    <h4>Activa las notificaciones</h4>
                    <p className="text-xs">Recibe promociones exclusivas, alertas cercanas y novedades antes que nadie.</p>
                    <button className="bg-primary-dark text-xs text-white px-sm py-xs rounded-sm" onClick={handleActive}>Activar ahora</button>
                </div>
            </li>
        </>
    )
}