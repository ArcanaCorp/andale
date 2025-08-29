import { useEffect, useState } from "react";

export default function Install () {

    const [ deferredPrompt, setDeferredPrompt ] = useState(null);
    const [ visible, setVisible ] = useState(false);

    useEffect(() => {

        const isStandalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;

        if (isStandalone) return; // No mostrar si ya está instalada

        // Capturamos el evento que dispara el navegador
        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setVisible(true);
        };

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        };

    }, [])

    const handleInstall = async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt(); // Mostrar modal nativo
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === "accepted") {
            console.log("✅ Usuario aceptó instalar");
        } else {
            console.log("❌ Usuario rechazó instalar");
        }
        setDeferredPrompt(null);
        setVisible(false);
    };

    if (!visible) return null;

    return (

        <div>

            <div>
                <h4>Descarga la app</h4>
                <p>Descarga y disfruta de la mejor manera de conocer Jauja</p>
            </div>
            <button onClick={handleInstall}>Descargar</button>

        </div>

    )

}