import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProvider } from "../context/AppContext";
import { PermissionsProvider } from "@/context/PermissionsContext";

const queryClient = new QueryClient();

export default function Providers ({children}) {
    
    return (

        <>
        
            <QueryClientProvider client={queryClient}>
                <AppProvider>
                    <PermissionsProvider>
                        {children}
                    </PermissionsProvider>
                </AppProvider>
            </QueryClientProvider>

        </>

    )

}