"use client";

import { fetchListFeed, fetchPlaceBySlug } from "@/services/places.service";
import { useCallback, useEffect, useRef, useState } from "react";

const DEFAULT_FILTERS = {
    category: "",
    district: "",
    search: "",
};

const INITIAL_FEED_STATE = {
    load: true,
    loadingMore: false,
    list: [],
    error: "",
    page: 0,
    hasMore: true,
};

export const usePlaces = () => {

    const [filters, setFilters] = useState(DEFAULT_FILTERS);

    const [feed, setFeed] = useState(INITIAL_FEED_STATE);

    const [details, setDetails] = useState({
        load: false,
        info: null,
        error: "",
    });

    const requestIdRef = useRef(0);
    const loadingMoreRef = useRef(false);

    const loadPage = useCallback(async ({page, replace, activeFilters}) => {
    
        if (!replace && loadingMoreRef.current) return;

        if (!replace) {
            loadingMoreRef.current = true;
        }

        const requestId = ++requestIdRef.current;

        setFeed((prev) => ({
            ...prev,
            load: replace,
            loadingMore: !replace,
            error: "",
        }));

        try {
                
            const response = await fetchListFeed({ page,  pageSize: 10,  filters: activeFilters });

            if (!response.ok) throw new Error(response.message || "No se pudieron obtener los lugares");

            // Ignora respuestas antiguas.
            if (requestId !== requestIdRef.current) return;

            setFeed((prev) => {
                
                const nextList = replace ? response.data : mergeWithoutDuplicates(prev.list, response.data);

                return {
                    ...prev,
                    list: nextList,
                    page,
                    hasMore: response.pagination.hasMore,
                    load: false,
                    loadingMore: false,
                    error: "",
                };
            });

        } catch (error) {
                
            console.error(error);

            if (requestId !== requestIdRef.current) return;

            setFeed((prev) => ({
                ...prev,
                load: false,
                loadingMore: false,
                error: error instanceof Error ? error.message : "Ocurrió un error",
            }));
        
        } finally {
            if (!replace) {
                loadingMoreRef.current = false;
            }
        }
    
    }, []);

    // Reinicia la paginación cuando cambia algún filtro.
    useEffect(() => {
        loadPage({
            page: 0,
            replace: true,
            activeFilters: filters,
        });
    }, [filters, loadPage]);

    const loadMore = useCallback(() => {
        
        if (feed.load || feed.loadingMore || !feed.hasMore) return;

        loadPage({
            page: feed.page + 1,
            replace: false,
            activeFilters: filters,
        });
    }, [
        feed.load,
        feed.loadingMore,
        feed.hasMore,
        feed.page,
        filters,
        loadPage,
    ]);

    const updateFilters = useCallback((partialFilters) => {
        setFilters((previousFilters) => {
            const nextFilters = {
                ...previousFilters,
                ...partialFilters,
            };
            const hasChanges = Object.keys(nextFilters).some((key) => nextFilters[key] !== previousFilters[key]);
            return hasChanges ? nextFilters : previousFilters;
        });
    }, []);

    const clearFilters = useCallback(() => {
        setFilters(DEFAULT_FILTERS);
    }, []);

    const getPlaceBySlug = useCallback(async (slug) => {
        setDetails({
            load: true,
            info: null,
            error: "",
        });

        try {
            const response = await fetchPlaceBySlug(slug);

            if (!response.ok) {
                throw new Error(response.message || "Hubo un error");
            }

            setDetails({
                load: false,
                info: response.data,
                error: "",
            });
        } catch (error) {
            console.error(error);

            setDetails({
                load: false,
                info: null,
                error: error instanceof Error ? error.message : "Ocurrió un error",
            });
        }
    }, []);

    return {
        feed,
        filters,
        details,
        loadMore,
        updateFilters,
        clearFilters,
        getPlaceBySlug,
    };
};

const mergeWithoutDuplicates = (currentItems, newItems) => {
    const itemsMap = new Map();

    [...currentItems, ...newItems].forEach((item) => {
        itemsMap.set(item.id, item);
    });

    return Array.from(itemsMap.values());
};