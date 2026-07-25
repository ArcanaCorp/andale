"use client";

import ButtonIcon from "@/components/ui/Buttons/ButtonIcon";
import Card from "@/components/ui/Card/Card";
import { CATEGORIES, DISTRICT_OPTIONS } from "@/constants/places";
import { useDB } from "@/context/DBContext";
import { IconAdjustmentsHorizontal, IconChevronLeft, IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, } from "react";

export default function PlacesPage() {

    const router = useRouter();
    const { places: { feed, filters, loadMore, updateFilters, clearFilters }} = useDB();

    const [search, setSearch] = useState("");

    // Evita consultar Supabase en cada pulsación.
    useEffect(() => {
        const timeout = setTimeout(() => {
            updateFilters({
                search: search.trim(),
            });
        }, 350);

        return () => clearTimeout(timeout);
    }, [search, updateFilters]);

    const hasActiveFilters = Boolean(filters.category || filters.district || filters.search);

    const handleCategory = (category) => {
        updateFilters({
            category: filters.category === category ? "" : category,
        });
    };
    

    return (
        <div className="flex h-screen w-full flex-col">
            <header className="flex w-full items-center justify-between px-md" style={{ height: "45px" }}>
                <ButtonIcon size={24} onClick={() => router.back()}><IconChevronLeft size={20} /></ButtonIcon>
                <h2 className="text-sm font-semibold">Lugares turísticos</h2>
                <div className="w-6" />
            </header>

            <main className="w-full h scroll-y py-md" style={{"--h": "calc(100dvh - 45px)"}}>

                <div className="px-md">
                    <div className="flex items-center gap-xs rounded-md border px-sm bg-surface">
                        <IconSearch size={18} className="shrink-0"/>
                        <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar lugares" className="w-full bg-surface py-sm text-xs outline-none"/>
                    </div>
                </div>

                <ul className="scroll-x flex w-full items-center gap-xs px-md py-md">
                    <li>
                        <button type="button" className={`badge badge-without-bg`} onClick={clearFilters}>
                            <IconAdjustmentsHorizontal size={16} style={{minWidth: "16px"}}/>
                            {hasActiveFilters ? "Limpiar" : "Filtros"}
                        </button>
                    </li>
                    <li>
                        <label className="cursor-pointer">
                            <select value={filters.district} onChange={(event) => updateFilters({district: event.target.value})} className="badge appearance-none bg-transparent outline-none">
                                <option value="">Distrito</option>
                                {DISTRICT_OPTIONS.map(
                                    (district) => (<option key={district} value={district}>{district}</option>)
                                )}
                            </select>
                        </label>
                    </li>
                    {CATEGORIES.map((category, idx) => {
                        const isActive = filters.category === category;
                        return (
                            <li key={idx}>
                                <button type="button" className={`badge ${isActive ? "is-active" : ""}`} onClick={() => handleCategory(category)}>{category}</button>
                            </li>
                        );
                    })}
                </ul>

                <section className="px-md">
                    {feed.load && (<p className="py-lg text-center text-sm">Cargando lugares...</p>)}

                    {!feed.load && feed.error && (
                        <div className="py-lg text-center">
                            <p className="text-sm text-red-500">
                                {feed.error}
                            </p>
                        </div>
                    )}

                    {!feed.load && !feed.error && feed.list.length === 0 && (
                        <p className="py-lg text-center text-sm">No encontramos lugares con estos filtros.</p>
                    )}

                    {!feed.load && feed.list.length > 0 && (
                        <ul className="grid gap-md">
                            {feed.list.map((place) => (
                                <Card key={place.id} type={'places'} slug={place.slug} title={place.title} image={place.image} subtitle={place.subtitle} />
                            ))}
                        </ul>
                    )}

                    {!feed.load && !feed.error && feed.hasMore && (
                        <button type="button" onClick={loadMore} disabled={feed.loadingMore} className="mt-lg w-full rounded-lg border py-sm text-sm font-semibold disabled:opacity-50">{feed.loadingMore ? "Cargando..." : "Cargar 10 más"} </button>
                    )}

                    {!feed.load && !feed.hasMore && feed.list.length > 0 && (
                        <p className="py-lg text-center text-xs opacity-60">Has visto todos los lugares.</p>
                    )}

                </section>
            </main>
        </div>
    );
}