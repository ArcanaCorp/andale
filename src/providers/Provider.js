import { AuthProvider } from "@/context/AuthContext"
import { CartProvider } from "@/context/CartContext"
import { DBProvider } from "@/context/DBContext"
import { LocationProvider } from "@/context/LocationContext"

export const Provider = ({ children }) => {
    return (
        <>
            <AuthProvider>
                <LocationProvider>
                    <DBProvider>
                        <CartProvider>
                            {children}
                        </CartProvider>
                    </DBProvider>
                </LocationProvider>
            </AuthProvider>
        </>
    )
}