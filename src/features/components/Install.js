import { useEffect, useState } from "react";
import './styles/install.css'

export default function Install () {

    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setVisible(false)
        };

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) {
            alert("❌ No se puede instalar la app en este dispositivo o ya está instalada.");
            return;
        }

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        console.log(outcome === "accepted" ? "✅ Instalado" : "❌ Rechazado");
        setDeferredPrompt(null);
    };

    if (!deferredPrompt || !visible) return null;

    return (

        <section className="__section_install">
            <div className={`__baner_install`}>
                <div className="__col">
                    <h3>Descarga la app</h3>
                    <p>Descarga y disfruta de la mejor manera de conocer Jauja</p>
                </div>
                <button className="__btn_install" onClick={handleInstall}>Descargar</button>
            </div>
        </section>

    )

}