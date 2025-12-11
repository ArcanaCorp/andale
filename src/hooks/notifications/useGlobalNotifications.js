import { useEffect } from "react";
import { useSocket } from "@/context/SocketContext";
import { toast } from "sonner";
import { useApp } from "../../context/AppContext";

export const useGlobalNotifications = () => {

    const socketRef = useSocket();
    const { addNotification } = useApp();

    useEffect(() => {
        const socket = socketRef?.current;
        if (!socket) return;

        const subscribe = () => {
            console.log("🔗 Suscrito a notificaciones globales");

            const handleNotification = (data) => {
                console.log("📩 Notificación global recibida:", data);

                addNotification({
                    ...data,
                    id: crypto.randomUUID(),
                    leido: false,
                    fecha: new Date().toISOString()
                });

                toast(data.titulo, {
                    description: data.descripcion,
                    action: {
                        label: "Ver",
                        onClick: () => window.location = data.link
                    }
                });

                if (navigator.serviceWorker?.controller) {
                    navigator.serviceWorker.controller.postMessage({
                        type: "SHOW_NOTIFICATION",
                        payload: data
                    });
                }
            };

            socket.on("global:notification", handleNotification);

            return () => {
                console.log("❌ Desuscrito de notificaciones globales");
                socket.off("global:notification", handleNotification);
            };
        };

        // 👉 si el socket ya está conectado, te suscribes de inmediato
        if (socket.connected) return subscribe();

        // 👉 si no está conectado, esperas el evento connect
        socket.on("connect", subscribe);

        return () => socket.off("connect", subscribe);

    }, [socketRef, addNotification]);

};