import { DBProvider } from "@/context/DBContext"

export const Provider = ({ children }) => {
    return (
        <>
            <DBProvider>
                {children}
            </DBProvider>
        </>
    )
}