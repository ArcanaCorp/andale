import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { getUserAccount } from "@/services/user.service";
import { setupSockets } from "@/socket";
import { TOKEN_KEY_SESSION, TOKEN_KEY_ACCOUNT } from "@/config/config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const socketRef = useRef(null);

    const loadUserFromSession = () => {
        try {
            const token = sessionStorage.getItem(TOKEN_KEY_SESSION);
            if (!token) return null;
            return jwtDecode(token);
        } catch {
            sessionStorage.removeItem(TOKEN_KEY_SESSION);
            return null;
        }
    };

    const fetchAccount = async () => {
        try {
            const data = await getUserAccount(); // 👈 sin sub
            if (!data.ok) throw new Error();
            sessionStorage.setItem(TOKEN_KEY_SESSION, data.token);
            setUser(jwtDecode(data.token));
        } catch {
            setUser(null);
            sessionStorage.removeItem(TOKEN_KEY_SESSION);
        }
    };

    useEffect(() => {
        const initAuth = async () => {
            const sessionUser = loadUserFromSession();
            if (sessionUser) {
                setUser(sessionUser);
                setLoading(false);
                return;
            }

            const authToken = Cookies.get(TOKEN_KEY_ACCOUNT);
            
            if (authToken) {
                await fetchAccount();
            }

            setLoading(false);
        };

        initAuth();
    }, []);

    // ==========================
    // 🔌 SOCKET LIFECYCLE
    // ==========================
    useEffect(() => {
        if (user && !socketRef.current) {
            socketRef.current = setupSockets(user);
        }

        if (!user && socketRef.current) {
            socketRef.current.disconnect();
            socketRef.current = null;
        }

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
                socketRef.current = null;
            }
        };
    }, [user]);

    const contextValue = {
        user,
        loading,
        fetchAccount,
        socket: socketRef.current,
    }

    return (
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);