'use client';

const { createContext, useState, useEffect, useContext } = require("react");
import { db } from "../libs/supabase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [ user, setUser ] = useState(null);
    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
        // 1. Obtener usuario inicial
        const getUser = async () => {
            const { data } = await db.auth.getUser()
            setUser(data.user)
            setLoading(false)
        }

        getUser()

        // 2. Escuchar cambios de sesión (login / logout)
        const { data: listener } = db.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
        })

        return () => {
            listener.subscription.unsubscribe()
        }
    }, [])

    // 3. Acciones centralizadas (escala mejor)
    const loginWithGoogle = async () => {
        await db.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: 'https://andaleya.pe'
            }
        })
    }

    const logout = async () => {
        await db.auth.signOut()
    }
    
    const contextValue = {
        user,
        loading,
        loginWithGoogle,
        logout
    }

    return (
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    )

}

export const useAuth = () => useContext(AuthContext);