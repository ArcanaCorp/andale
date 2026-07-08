import { AuthProvider } from "@/context/AuthContext"
import { CartProvider } from "@/context/CartContext"
import { DBProvider } from "@/context/DBContext"

export const Provider = ({ children }) => {
    return (
        <>
            <AuthProvider>
                <DBProvider>
                    <CartProvider>
                        {children}
                    </CartProvider>
                </DBProvider>
            </AuthProvider>
        </>
    )
}