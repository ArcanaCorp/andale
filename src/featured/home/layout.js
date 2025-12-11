import { Toaster } from "sonner";
import Header from "./layout/header";
import Tabs from "./layout/tabs";
import Main from "./layout/main";
import "@/config/maps.config";
import { useGlobalNotifications } from "@/hooks/notifications/useGlobalNotifications";

export default function AppLayout () {

    useGlobalNotifications();

    return (

        <>
            <Header/>
            <Main/>
            <Tabs/>
            <Toaster position="top-center" duration={3000} richColors />
        </>

    )

}