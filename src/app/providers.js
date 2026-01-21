import { PermissionsProvider } from "@/context/PermissionsContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FilterProvider } from "@/context/FilterContext";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { AppProvider } from "../context/AppContext";

const queryClient = new QueryClient();
export default function Providers ({ children }) {

    return (

        <>
            <QueryClientProvider client={queryClient}>
                <AppProvider>
                    <AuthProvider>
                        <PermissionsProvider>
                            <CartProvider>
                                <FilterProvider>
                                    {children}
                                </FilterProvider>
                            </CartProvider>
                        </PermissionsProvider>
                    </AuthProvider>
                </AppProvider>
            </QueryClientProvider>

        </>

    )

}