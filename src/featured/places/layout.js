import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

export default function PlaceLayout () {
    return (
        <>
            <Outlet/>
            <Toaster position="top-center" duration={3000} richColors/>
        </>
    )
}