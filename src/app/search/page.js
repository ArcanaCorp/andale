'use client';

import Avatar from "@/components/ui/Avatars/Avatar";
import ButtonIcon from "@/components/ui/Buttons/ButtonIcon";
import EmptyPage from "@/components/ui/Empty/Empty";
import { useAuth } from "@/context/AuthContext";
import { trackEvent } from "@/services/events.service";

import { searchAll } from "@/services/search.service";

import { IconChevronLeft, IconMapPin, IconSearch, IconBuildingStore, IconX } from "@tabler/icons-react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function Page() {

    const router = useRouter();

    const { user } = useAuth();

    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorSearch, setErrorSearch] = useState("");
    const [results, setResults] = useState({
        businesses: [],
        places: [],
        total: 0
    });

    const hasQuery = useMemo(() => {
        return query.trim().length >= 2;
    }, [query]);

    const handleSearch = async () => {
        try {
            const cleanQuery = query.trim();

            if (cleanQuery.length < 2) {
                setResults({
                    businesses: [],
                    places: [],
                    total: 0
                });
                return;
            }

            setLoading(true);
            setErrorSearch("");

            const data = await searchAll({
                query: cleanQuery
            });

            await trackEvent({
                userId: user?.id || null,
                eventName: "search",
                metadata: {
                    query: cleanQuery,
                    total: data.total
                }
            });

            setResults(data);

        } catch (error) {
            console.error("Error buscando:", error);
            setErrorSearch(error.message || "No se pudo realizar la búsqueda.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            handleSearch();
        }, 450);

        return () => clearTimeout(timeout);
    }, [query]);

    return (

        <div className="w-full h-screen">

            <div className="w-full h px-md flex items-center gap-xs justify-between" style={{"--h": "45px"}}>
                <ButtonIcon size={24} onClick={() => router.back()}><IconChevronLeft size={20} /></ButtonIcon>
                <div className="relative w-full bg-surface rounded-full h" style={{"--h": "35px"}}>
                    <input type="text" className="w-full h-full text-xs px-md pr-xl rounded-full" placeholder="Locales, lugares turísticos..." value={query} autoFocus onChange={(event) => setQuery(event.target.value)}/>

                    {query ? (
                        <button type="button" className="absolute center" style={{top: "8px", right: "12px"}} onClick={() => setQuery("")}>
                            <IconX size={18} />
                        </button>
                    ) : (
                        <IconSearch size={18} style={{position: "absolute", top: "8px", right: "12px"}}/>
                    )}
                </div>
            </div>

            <main className="w-full h py-md scroll-y" style={{ "--h": "calc(100dvh - 45px)"}}>
                
                {!hasQuery && (
                    <div className="w-full px-md py-lg flex flex-col gap-xs">
                        <h3>¿Qué estás buscando?</h3>
                        <p className="text-sm text-muted">Busca restaurantes, cafeterías, negocios o lugares turísticos.</p>
                    </div>
                )}

                {loading && (
                    <div className="w-full px-md py-lg center">
                        <p className="text-sm text-muted">Buscando...</p>
                    </div>
                )}

                {errorSearch && (
                    <div className="w-full px-md mb-md">
                        <div className="w-full bg-danger-light rounded-md p-md">
                            <p className="text-sm text-danger">{errorSearch}</p>
                        </div>
                    </div>
                )}

                {!loading && hasQuery && results.total === 0 && (
                    <EmptyPage page="search" />
                )}

                {!loading && results.businesses.length > 0 && (
                    <section className="w-full flex flex-col gap-sm mb-lg">
                        <div className="w-full px-md flex items-center justify-between">
                            <h3>Locales</h3>
                            <span className="badge">{results.businesses.length}</span>
                        </div>

                        <ul className="w-full flex flex-col gap-md px-md">
                            {results.businesses.map((business) => {

                                const businessName = business.commercial_name || business.name || "Negocio";
                                const image = business.profile_image_url || business.cover_image_url || null;

                                return (
                                    <li key={business.id}>
                                        <Link href={`/foodies/${business.slug}`} className="w-full flex gap-md">
                                            <Avatar image={image} name={businessName} size={72} rounded="rounded-md"/>
                                            <div className="w-full flex flex-col gap-2xs">
                                                <div className="w-full flex items-center justify-between gap-sm">
                                                    <h4>{businessName}</h4>
                                                    <IconBuildingStore size={18} style={{minWidth: "18px"}}/>
                                                </div>
                                                <p className="text-xs text-muted">{business.category || business.business_type || "Local"}</p>
                                                <p className="text-xs text-muted">{business.district || business.province || "Jauja"}</p>
                                                {business.accepts_orders && (<span className="badge badge-ready">Acepta pedidos</span>)}
                                            </div>
                                        </Link>
                                    </li>
                                );

                            })}
                        </ul>

                    </section>
                )}

                {!loading && results.places.length > 0 && (
                    <section className="w-full flex flex-col gap-sm">

                        <div className="w-full px-md flex items-center justify-between">
                            <h3>Lugares</h3>
                            <span className="badge">{results.places.length}</span>
                        </div>

                        <ul className="w-full flex flex-col gap-md px-md">
                            {results.places.map((place) => {

                                const placeName = place.name || "Lugar turístico";
                                const image = place.image_url || place.cover_image_url || null;

                                return (
                                    <li key={place.id}>
                                        <Link href={`/places/${place.slug || place.id}`} className="w-full flex gap-md">
                                            <Avatar image={image} name={placeName} size={72} rounded="rounded-md"/>

                                            <div className="w-full flex flex-col gap-2xs">
                                                <div className="w-full flex items-center justify-between gap-sm">
                                                    <h4>{placeName}</h4>
                                                    <IconMapPin size={18} style={{minWidth: "18px"}}/>
                                                </div>
                                                <p className="text-xs text-muted">{place.category || place.type || "Lugar"}</p>
                                                <p className="text-xs text-muted">{place.district || place.province || place.department || "Jauja"}</p>
                                            </div>
                                        </Link>
                                    </li>
                                );

                            })}
                        </ul>

                    </section>
                )}

            </main>

        </div>
    );
}