import { initSocket } from "./connection";
import { registerGlobalEvents } from "./events";

export const setupSockets = (user) => {
    const socket = initSocket(user);
    registerGlobalEvents();
    return socket;
};