import { useEffect } from "react";
import { useSocket } from "@/context/SocketContext";
import { toast } from "sonner";
import { useApp } from "../../context/AppContext";

export const useGlobalNotifications = () => {

    const socketRef = useSocket();
    const { addNotification } = useApp();

    useEffect(() => {
        if (!socketRef) return;

        let socket = socketRef.current;

        const attachListeners = () => {
            if (!socket) return;

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
                socket.off("global:notification", handleNotification);
            };
        };

        // Si el socket YA existe y ya conectó → enganchar de inmediato
        if (socket && socket.connected) {
            return attachListeners();
        }

        // Si existe pero no conectó → esperar el evento "connect"
        if (socket) {
            console.log("⏳ Esperando conexión del socket...");
            socket.on("connect", attachListeners);

            return () => {
                socket.off("connect", attachListeners);
            };
        }

    }, [socketRef, addNotification]);

};