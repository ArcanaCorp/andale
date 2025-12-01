import { useEffect, useState } from "react";

export function usePWAStatus() {
    const [isInstalled, setIsInstalled] = useState(false);
    const [installPromptEvent, setInstallPromptEvent] = useState(null);
    const [hasUpdate, setHasUpdate] = useState(false);

    useEffect(() => {
        // ----- Detectar si está instalada -----
        const isIOSStandalone = window.navigator.standalone === true;
        const isStandaloneDisplay = window.matchMedia("(display-mode: standalone)").matches;

        if (isIOSStandalone || isStandaloneDisplay) {
            setIsInstalled(true);
        }

        // ----- Detectar si puede instalarse -----
        const installHandler = (e) => {
            e.preventDefault();
            setInstallPromptEvent(e);
        };

        window.addEventListener("beforeinstallprompt", installHandler);

        // ----- Detectar nueva versión del SW -----
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.addEventListener("message", (event) => {
                if (event.data?.type === "NEW_VERSION_AVAILABLE") {
                    setHasUpdate(true);
                }
            });
        }

        return () => {
            window.removeEventListener("beforeinstallprompt", installHandler);
        };
    }, []);

    return { isInstalled, installPromptEvent, hasUpdate };
}