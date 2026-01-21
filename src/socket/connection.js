import { io } from "socket.io-client";
import { SOCKET_URL } from "@/config";

let socket = null;

export const initSocket = (user) => {
    
    if (!socket && user) {
        socket = io(SOCKET_URL, {
            transports: ["polling", "websocket"],
            reconnection: true,
            reconnectionAttempts: 10,
            reconnectionDelay: 500,
            autoConnect: true,
            auth: {    // client | bussines | driver
                role: 'client',
                userId: user.sub
            }
        });

        console.log(`⚡ Socket iniciado → client:${user.sub}`);
    }
    return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};