import { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { SOCKET_URL } from "../config/config";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {

    const socketRef = useRef(null);

    useEffect(() => {
        
        const socket = io(SOCKET_URL, {
            transports: ["websocket"],
            autoConnect: true,
            withCredentials: true
        });

        socketRef.current = socket;

        socket.on("connect", () => {
            console.log(`Socket connected: ${socket.id}`);
        })

        socket.on('disconnect', () => {
            console.log(`Socket desconnect`);
        })

        socket.on("connect_error", (err) => {
            console.error("Error al conectar:", err.message);
        });

        return () => {
            socket.current.disconnect()
        };

    }, []);

    return (
        <SocketContext.Provider value={socketRef}>
            {children}
        </SocketContext.Provider>
    )

}

export const useSocket = () => useContext(SocketContext);