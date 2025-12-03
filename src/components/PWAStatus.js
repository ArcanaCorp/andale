import { usePWAStatus } from "@/hooks/usePWAStatus";
import avatar from '@/shared/img/avatar-bg.png'
import './styles/pwastatus.css'

export default function PWAStatus() {
    
    const { isInstalled, installPromptEvent, hasUpdate } = usePWAStatus();

    const handleUpdate = () => {
        if (navigator?.serviceWorker?.controller) {
            navigator.serviceWorker.controller.postMessage({ type: "SKIP_WAITING" });
            window.location.reload(); // refresh duro: garantiza cargar la nueva build
        }
    };

    return (
        <div className="__pwa_status">
            <div className="__pwa_status--content">
                {hasUpdate && (
                    <>
                        <h3>Nueva versión disponible</h3>
                        <p>Actualiza para obtener las mejoras más recientes.</p>
                        <button onClick={handleUpdate}>Actualizar ahora</button>
                    </>
                )}
                {!isInstalled && (
                    <>
                        <h3>Instala la app</h3>
                        <p>Y disfruta de los beneficios que tenemos para ti.</p>
                        {installPromptEvent && (
                            <button onClick={() => installPromptEvent.prompt()}>Instalar</button>
                        )}
                    </>
                )}
            </div>
            <img className="__img_avatar" src={avatar} alt="Avatar de Ándale Ya!" fetchPriority="high" decoding="async" />
        </div>
    );
}