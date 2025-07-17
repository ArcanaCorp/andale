import { Toaster } from "sonner";
import { Outlet } from "react-router-dom";
import Header from "../../components/tabs/header";

import './styles/layout.css'

export default function TabLayout () {

    return (

        <>
        
            <Header/>

            <main className="__main">
                <Outlet/>
            </main>

            <Toaster position="top-center" richColors />

        </>

    )

}