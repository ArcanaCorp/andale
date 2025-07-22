import { Toaster } from "sonner";
import { Outlet } from "react-router-dom";
import { useUI } from "@/context/UIContext";
import Header from "../../components/tabs/header";
import { useEffect, useRef, useState } from "react";
import DishDetails from "./screens/foods/details/dish";

import './styles/layout.css'

export default function TabLayout () {

    const headerRef = useRef(null);
    const [headerSize, setHeaderSize] = useState({ width: 0, height: 0 });

    const { modal } = useUI();

    useEffect(() => {
        const observer = new ResizeObserver(([entry]) => {
            const { width, height } = entry.contentRect;
            setHeaderSize({ width, height });
        });

        if (headerRef.current) observer.observe(headerRef.current);

        return () => observer.disconnect();
    }, []);


    return (

        <>
        
            <div className="__cnx_header" ref={headerRef}>
                <Header/>
            </div>

            <main className="__main" style={{height: `calc(100dvh - ${headerSize.height}px)`}}>
                <Outlet/>
                {modal.view && (
                    modal.type === 'food' && ( <DishDetails/> )
                )}
            </main>

            <Toaster position="top-center" richColors />


        </>

    )

}