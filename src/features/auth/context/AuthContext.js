import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { serviceAccount } from "../services/auth.service";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Hidrata el estado inicial desde sessionStorage
    const [user, setUser] = useState(() => {
        const stored = sessionStorage.getItem("user");
        if (stored) {
            try {
                return jwtDecode(JSON.parse(stored)); // decodifica instantáneo
            } catch (err) {
                console.error("Error decoding stored token", err);
                return null;
            }
        }
        return null;
    });

    const getAccount = async () => {
        try {
            const data = await serviceAccount();
            if (data.ok) {
                const decoded = jwtDecode(data.user);
                setUser(decoded);
                console.log(decoded);
                sessionStorage.setItem("user", JSON.stringify(data.user)); // guarda el token
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const cook = Cookies.get("o_auth");
        if (cook && !user) {
            getAccount();
        }
    }, [user]);

    const contextValue = {
        user,
        getAccount,
    };

    return (
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);