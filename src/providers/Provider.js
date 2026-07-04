import { AuthProvider } from "@/context/AuthContext"
import { DBProvider } from "@/context/DBContext"

export const Provider = ({ children }) => {
    return (
        <>
            <AuthProvider>
                <DBProvider>
                    {children}
                </DBProvider>
            </AuthProvider>
        </>
    )
}