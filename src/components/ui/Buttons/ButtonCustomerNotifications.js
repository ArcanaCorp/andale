'use client';

import { registerCustomerPush } from "@/services/push.service";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ButtonCustomerNotifications({
    user
}) {
    const [pushEnabled, setPushEnabled] = useState(false);
    const [checkingPush, setCheckingPush] = useState(true);
    const [activatingPush, setActivatingPush] = useState(false);

    const checkPushStatus = async () => {
        try {
            if (
                typeof window === "undefined" ||
                !("serviceWorker" in navigator) ||
                !("PushManager" in window) ||
                !("Notification" in window)
            ) {
                setPushEnabled(false);
                return;
            }

            if (Notification.permission !== "granted") {
                setPushEnabled(false);
                return;
            }

            const registration = await navigator.serviceWorker.register("/sw.js");
            const subscription = await registration.pushManager.getSubscription();

            setPushEnabled(!!subscription);

        } catch (error) {
            console.error("Error revisando notificaciones:", error);
            setPushEnabled(false);
        } finally {
            setCheckingPush(false);
        }
    };

    const handleEnablePush = async () => {
        try {
            if (!user?.id) {
                toast.warning("Inicia sesión para activar notificaciones.");
                return;
            }

            setActivatingPush(true);

            await registerCustomerPush({
                userId: user.id
            });

            setPushEnabled(true);

            toast.success("Notificaciones activadas", {
                description: "Te avisaremos cuando cambie el estado de tus pedidos."
            });

        } catch (error) {
            toast.warning("No se activaron las notificaciones", {
                description: error.message
            });
        } finally {
            setActivatingPush(false);
        }
    };

    useEffect(() => {
        checkPushStatus();
    }, []);

    if (checkingPush || pushEnabled) {
        return null;
    }

    return (
        <div className="w-full p-md">
            <button type="button" className="w-full h rounded-full bg-primary text-white text-xs text-semibold" style={{ "--h": "40px" }} onClick={handleEnablePush} disabled={activatingPush}>
                {activatingPush ? "Activando notificaciones..." : "Activar avisos de mis pedidos"}
            </button>
        </div>
    );
}