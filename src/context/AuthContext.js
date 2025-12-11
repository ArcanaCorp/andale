import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";
import { getUserAccount } from "@/services/user.service";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(() => {
        try {
            const token = sessionStorage.getItem("tt_user");
            if (!token) return null;
            return jwtDecode(token);
        } catch {
            return null; // Token corrupto → sesión inválida
        }
    });

    const userInfo = async (sub) => {
        try {
            const data = await getUserAccount(sub);
            if (!data.ok) {
                setUser(null)
                sessionStorage.removeItem('tt_user')
                return;
            }
            sessionStorage.setItem('tt_user', data.token)
            const decoded = jwtDecode(data.token);
            setUser(decoded);
        } catch (error) {
            setUser(null)
            console.error(error);
            sessionStorage.removeItem("tt_user");
        }
    }

    useEffect(() => {
        const verifyAccount = async () => {
            try {
                const token = Cookies.get('c_user')
                if (token) {
                    console.log(token);
                    await userInfo(token)
                }
            } catch (error) {
                console.error(error);
            }
        }
        verifyAccount();
    }, [])

    const contextValue = {
        user,
        userInfo
    }

    return (
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    )

}

export const useAuth = () => useContext(AuthContext);