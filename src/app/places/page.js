"use client";

import ButtonIcon from "@/components/ui/Buttons/ButtonIcon";
import Card from "@/components/ui/Card/Card";
import { CATEGORIES, DISTRICT_OPTIONS } from "@/constants/places";
import { useAuth } from "@/context/AuthContext";
import { useDB } from "@/context/DBContext";
import { trackEvent } from "@/services/events.service";
import { IconAdjustmentsHorizontal, IconChevronLeft, IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, } from "react";

export default function PlacesPage() {

    const router = useRouter();
    const { user } = useAuth();
    const trackedPageView = useRef(false);
    const lastTrackedSearch = useRef("");
    const { places: { feed, filters, loadMore, updateFilters, clearFilters }} = useDB();

    const [search, setSearch] = useState("");

    const safeTrack = ({ eventName, entityType = "place", entityId = null, metadata = {} }) => {
        trackEvent({
            userId: user?.id || null,
            eventName,
            entityType,
            entityId,
            metadata: {
                source: "places_page",
                current_filters: {
                    category: filters?.category || null,
                    district: filters?.district || null,
                    search: filters?.search || null
                },
                visible_results: feed?.list?.length || 0,
                ...metadata
            }
        }).catch((error) => {
            console.warn(`No se pudo registrar evento ${eventName}:`, error);
        });
    };

    // Evita consultar Supabase en cada pulsación.
    useEffect(() => {
        const timeout = setTimeout(() => {

            const cleanSearch = search.trim();
            updateFilters({search: cleanSearch});

            if ( cleanSearch.length >= 2 && lastTrackedSearch.current !== cleanSearch) {

                lastTrackedSearch.current = cleanSearch;

                safeTrack({
                    eventName: "places_search_applied",
                    metadata: {
                        search: cleanSearch,
                        search_length: cleanSearch.length
                    }
                });
            }

            if ( cleanSearch.length === 0 && lastTrackedSearch.current ) {

                lastTrackedSearch.current = "";
                safeTrack({
                    eventName: "places_search_cleared"
                });
            }

        }, 350);

        return () => clearTimeout(timeout);
    }, [search, updateFilters]);

    const hasActiveFilters = Boolean(filters.category || filters.district || filters.search);

    useEffect(() => {
        if (trackedPageView.current) return;

        trackedPageView.current = true;

        safeTrack({
            eventName: "places_page_viewed",
            entityType: "page",
            metadata: {
                route: "/places"
            }
        });
    }, []);

    const handleCategory = (category) => {
        const nextCategory = filters.category === category ? "" : category;

        safeTrack({
            eventName: nextCategory ? "places_category_filter_selected" : "places_category_filter_removed",
            metadata: {
                category,
                next_category: nextCategory || null
            }
        });

        updateFilters({
            category: nextCategory
        });
    };
    
    const handleDistrictChange = (district) => {
        safeTrack({
            eventName: district ? "places_district_filter_selected" : "places_district_filter_removed",
            metadata: {
                district: district || null
            }
        });

        updateFilters({
            district
        });
    };

    const handleClearFilters = () => {
        safeTrack({
            eventName: "places_filters_cleared",
            metadata: {
                previous_filters: {
                    category: filters.category || null,
                    district: filters.district || null,
                    search: filters.search || null
                }
            }
        });

        setSearch("");
        clearFilters();
    };

    const handleLoadMore = () => {
        safeTrack({
            eventName: "places_load_more_clicked",
            metadata: {
                current_results: feed?.list?.length || 0
            }
        });

        loadMore();
    };

    const handleBack = () => {
        safeTrack({
            eventName: "places_back_clicked",
            metadata: {
                route: "/places"
            }
        });

        router.back();
    };

    return (
        <div className="flex h-screen w-full flex-col">
            <header className="flex w-full items-center justify-between px-md" style={{ height: "45px" }}>
                <ButtonIcon size={24} onClick={handleBack}><IconChevronLeft size={20} /></ButtonIcon>
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
                        <button type="button" className={`badge badge-without-bg`} onClick={handleClearFilters}>
                            <IconAdjustmentsHorizontal size={16} style={{minWidth: "16px"}}/>
                            {hasActiveFilters ? "Limpiar" : "Filtros"}
                        </button>
                    </li>
                    <li>
                        <label className="cursor-pointer">
                            <select value={filters.district} onChange={(event) => handleDistrictChange(event.target.value)} className="badge appearance-none bg-transparent outline-none border-none">
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
                                <Card key={place.id} id={place.id} type={'places'} slug={place.slug} title={place.title} image={place.image} subtitle={place.subtitle} />
                            ))}
                        </ul>
                    )}

                    {!feed.load && !feed.error && feed.hasMore && (
                        <button type="button" onClick={handleLoadMore} disabled={feed.loadingMore} className="mt-lg w-full rounded-lg border py-sm text-sm font-semibold disabled:opacity-50">{feed.loadingMore ? "Cargando..." : "Cargar 10 más"} </button>
                    )}

                    {!feed.load && !feed.hasMore && feed.list.length > 0 && (
                        <p className="py-lg text-center text-xs opacity-60">Has visto todos los lugares.</p>
                    )}

                </section>
            </main>
        </div>
    );
}