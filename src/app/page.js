'use client';

import Header from "@/components/layout/Header";
import List from "@/components/ui/List";
import { useAuth } from "@/context/AuthContext";
import { useDB } from "@/context/DBContext";
import Login from "./auth/login";
import Tabs from "@/components/layout/Tabs";
import Link from "next/link";

export default function Page () {

    const { bussines, loadBussines, placesFeed } = useDB();
    const { user, loadAuth } = useAuth();

    if (loadAuth) {
        return (
            <main className="w-full h-screen grid-center">
                Cargando...
            </main>
        );
    }

    if (!user) {
        return <Login/>;
    }

    return (
        <>
            <Header/>
            <main className="w-full h py-md scroll-y" style={{"--h": "calc(100dvh - 190px)"}}>
                <div className="w-full px-md flex items-center justify-between">
                    <h3 className="text-md text-semibold">Lugares por conocer</h3>
                    <Link href={'/places'} className="text-2xs text-medium text-primary">Ver más</Link>
                </div>
                <List type={'places'} list={placesFeed.list} load={placesFeed.load} orientation={'horizontal'} />
                <div className="w-full px-md"><h3 className="text-md text-semibold">Los mejores sabores</h3></div>
                <List type={'foodies'} list={bussines} load={loadBussines} orientation={'vertical'} />
            </main>
            <Tabs/>
        </>
    )
}