"use client";

import Header from "@/components/layout/Header";
import List from "@/components/ui/List";
import { useAuth } from "@/context/AuthContext";
import { useDB } from "@/context/DBContext";
import Link from "next/link";
import Login from "./auth/login";
import Loading from "@/components/views/Loading";
import ButtonCustomerNotifications from "@/components/ui/Buttons/ButtonCustomerNotifications";

export default function Page() {
    const { places, business } = useDB();
    const { user, loadAuth } = useAuth();

    if (loadAuth) return <Loading/>;

    if (!user) {
        return <Login />;
    }

    return (
        <>
            <Header />
            <main className="w-full h scroll-y py-md" style={{"--h": "calc(100dvh - 190px)"}}>
                <ButtonCustomerNotifications user={user} />
                <section>
                    <div className="flex w-full items-center justify-between px-md">
                        <h3 className="text-md text-semibold">
                            Lugares por conocer
                        </h3>

                        <Link
                            href="/places"
                            className="text-xs text-medium text-primary"
                        >
                            Ver más
                        </Link>
                    </div>

                    <List
                        type="places"
                        list={places.feed.list}
                        load={places.feed.load}
                        error={places.feed.error}
                        orientation="horizontal"
                        limit={5}
                        emptyMessage="No hay lugares turísticos disponibles"
                    />
                </section>

                <section>
                    <div className="w-full px-md">
                        <h3 className="text-md text-semibold">
                            Los mejores sabores
                        </h3>
                    </div>

                    <List
                        type="foodies"
                        list={business.list}
                        load={business.load}
                        error={business.error}
                        orientation="vertical"
                        emptyMessage="No hay negocios disponibles"
                    />
                </section>
            </main>
        </>
    );
}