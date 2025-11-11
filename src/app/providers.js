import { PermissionsProvider } from "@/context/PermissionsContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FilterProvider } from "@/context/FilterContext";

const queryClient = new QueryClient();
export default function Providers ({ children }) {

    return (

        <>
            <QueryClientProvider client={queryClient}>
                <PermissionsProvider>
                    <FilterProvider>
                        {children}
                    </FilterProvider>
                </PermissionsProvider>
            </QueryClientProvider>

        </>

    )

}