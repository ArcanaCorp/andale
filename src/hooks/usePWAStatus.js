import { useEffect, useState } from "react";

export function usePWAStatus() {
    const [isInstalled, setIsInstalled] = useState(false);
    const [installPromptEvent, setInstallPromptEvent] = useState(null);
    const [hasUpdate, setHasUpdate] = useState(false);

    useEffect(() => {
        // --- Detectar instalación ---
        const isIOSStandalone = window.navigator.standalone === true;
        const isStandaloneDisplay = window.matchMedia("(display-mode: standalone)").matches;

        setIsInstalled(isIOSStandalone || isStandaloneDisplay);

        // --- Detectar instalación disponible ---
        const installHandler = (e) => {
            e.preventDefault();
            setInstallPromptEvent(e);
        };

        window.addEventListener("beforeinstallprompt", installHandler);

        // --- Detectar update ---
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

    const canInstall = !!installPromptEvent && !isInstalled;

    return {
        isInstalled,
        canInstall,
        hasUpdate,
        installPromptEvent
    };
}