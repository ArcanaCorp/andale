import { PermissionsProvider } from "@/context/PermissionsContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FilterProvider } from "@/context/FilterContext";
import { AuthProvider } from "@/context/AuthContext";
import { AnalyticsProvider } from "@/context/AnalyticsContext";
import { CartProvider } from "@/context/CartContext";
import { SocketProvider } from "../context/SocketContext";
import { AppProvider } from "../context/AppContext";

const queryClient = new QueryClient();
export default function Providers ({ children }) {

    return (

        <>
            <QueryClientProvider client={queryClient}>
                <SocketProvider>
                    <AppProvider>
                        <AnalyticsProvider>
                            <AuthProvider>
                                <PermissionsProvider>
                                    <CartProvider>
                                        <FilterProvider>
                                            {children}
                                        </FilterProvider>
                                    </CartProvider>
                                </PermissionsProvider>
                            </AuthProvider>
                        </AnalyticsProvider>
                    </AppProvider>
                </SocketProvider>
            </QueryClientProvider>

        </>

    )

}