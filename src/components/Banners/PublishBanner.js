import { usePermissions } from "@/context/PermissionsContext";
import { usePWAStatus } from "@/hooks/usePWAStatus";
import BannerNotifications from "./BannerNotifications";

export default function PublishBanner() {
    const { notifications } = usePermissions();
    const { canInstall, hasUpdate, installPromptEvent } = usePWAStatus();

    const handleInstall = async () => {
        if (!installPromptEvent) return;
        installPromptEvent.prompt();
        await installPromptEvent.userChoice;
    };

    const handleUpdate = () => {
        window.location.reload();
    };

    return (
        <ul className="w-full flex gap-xs overflow-x pl pr scroll-hidden mb-md" style={{ "--pl": "1rem", "--pr": "1rem" }}>
            {notifications.notificationPermission !== "granted" && (
                <BannerNotifications/>
            )}

            {hasUpdate && (
                <li className="w h rounded-md p-sm bg-primary flex align-end" style={{ "--w": "calc(100dvw - 4rem)", "--mnw": "calc(100dvw - 4rem)", "--h": "120px" }}>
                    <div className="text-white">
                        <h4>Actualización disponible</h4>
                        <p className="text-xs">Mejores funciones, más velocidad y nuevas promos.</p>
                        <button onClick={handleUpdate} className="bg-primary-dark text-xs text-white px-sm py-xs rounded-sm">Actualizar ahora</button>
                    </div>
                </li>
            )}

            {canInstall && !hasUpdate && (
                <li className="w h rounded-md p-sm bg-primary flex align-end" style={{ "--w": "calc(100dvw - 4rem)", "--mnw": "calc(100dvw - 4rem)", "--h": "120px" }}>
                    <div className="text-white">
                        <h4>Instala la app</h4>
                        <p className="text-xs">Accede más rápido, recibe beneficios exclusivos y ahorra datos.</p>
                        <button onClick={handleInstall} className="bg-primary-dark text-xs text-white px-sm py-xs rounded-sm">Instalar</button>
                    </div>
                </li>
            )}

        </ul>
    );
}