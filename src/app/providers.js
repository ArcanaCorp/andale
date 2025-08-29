import { AuthProvider } from "../features/auth/context/AuthContext";
import { CartProvider } from "../features/cart/context/CartContext";
import { DetailProvider } from "../features/details/context/DetailContext";
import { PermissionsProvider } from "../features/permissions/context/PermissionsContext";
import { TabProvider } from "../features/tabs/context/TabContext";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function AppProviders ({ children }) {
    return (
        <PermissionsProvider>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <TabProvider>
                        <CartProvider>
                            <DetailProvider>
                                {children}
                            </DetailProvider>
                        </CartProvider>
                    </TabProvider>
                </AuthProvider>
            </QueryClientProvider>
        </PermissionsProvider>
    )
}