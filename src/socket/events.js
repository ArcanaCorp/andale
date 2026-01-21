import { getSocket } from "./connection";

export const registerGlobalEvents = () => {

    const socket = getSocket();

    if (!socket) return;

    socket.on("connect", () => {
        console.log(`🟢 Socket conectado: ${socket.id}`);
    })

    socket.on("disconnect", () => {
        console.log("🔴 Socket desconectado");
    });

}