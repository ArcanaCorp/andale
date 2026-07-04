'use client';

import Header from "@/components/layout/Header";
import List from "@/components/ui/List";
import { useDB } from "@/context/DBContext";

export default function Page () {

    const { bussines, loadBussines, placesFeed } = useDB();

    return (
        <>
            <Header/>
            <main className="w-full h py-md scroll-y" style={{"--h": "calc(100dvh - 130px)"}}>
                <div className="w-full px-md"><h3 className="text-lg text-semibold">Lugares por conocer</h3></div>
                <List type={'places'} list={placesFeed.list} load={placesFeed.load} orientation={'horizontal'} />
                <div className="w-full px-md"><h3 className="text-lg text-semibold">Los mejores sabores</h3></div>
                <List type={'foodies'} list={bussines} load={loadBussines} orientation={'vertical'} />
            </main>
        </>
    )
}