"use client";

import { getMyFoodieOrders, getOrders } from "@/services/orders.service";
import { useCallback, useRef, useState } from "react";

const CACHE_TTL = 1000 * 60 * 5;
const DEFAULT_PAGE_SIZE = 20;

const getCacheKey = (userId) => {
    return `andale_orders_${userId}`;
};

const readOrdersCache = (userId) => {
    try {
        if (typeof window === "undefined" || !userId) {
            return null;
        }

        const raw = localStorage.getItem(
            getCacheKey(userId)
        );

        if (!raw) return null;

        const cache = JSON.parse(raw);

        if (
            !cache?.expiresAt ||
            Date.now() > cache.expiresAt
        ) {
            localStorage.removeItem(
                getCacheKey(userId)
            );

            return null;
        }

        return {
            orders: Array.isArray(cache.orders)
                ? cache.orders
                : [],
            page: Number(cache.page) || 0,
            hasMore:
                typeof cache.hasMore === "boolean"
                    ? cache.hasMore
                    : true,
        };
    } catch (error) {
        console.error(
            "Error leyendo caché de órdenes:",
            error
        );

        return null;
    }
};

const writeOrdersCache = ({
    userId,
    orders,
    page,
    hasMore,
}) => {
    try {
        if (typeof window === "undefined" || !userId) {
            return;
        }

        const cache = {
            orders,
            page,
            hasMore,
            cachedAt: Date.now(),
            expiresAt: Date.now() + CACHE_TTL,
        };

        localStorage.setItem(
            getCacheKey(userId),
            JSON.stringify(cache)
        );
    } catch (error) {
        console.error(
            "Error guardando caché de órdenes:",
            error
        );
    }
};

const clearOrdersCache = (userId) => {
    try {
        if (typeof window === "undefined" || !userId) {
            return;
        }

        localStorage.removeItem(
            getCacheKey(userId)
        );
    } catch (error) {
        console.error(
            "Error limpiando caché de órdenes:",
            error
        );
    }
};

const mergeOrders = (currentOrders, newOrders) => {
    const ordersMap = new Map();

    [...currentOrders, ...newOrders].forEach(
        (order) => {
            ordersMap.set(order.id, order);
        }
    );

    return Array.from(ordersMap.values());
};

export const useOrder = () => {
    const [orders, setOrders] = useState([]);

    const [loadingOrders, setLoadingOrders] =
        useState(false);

    const [
        loadingMoreOrders,
        setLoadingMoreOrders,
    ] = useState(false);

    const [errorOrders, setErrorOrders] =
        useState("");

    const [currentPage, setCurrentPage] =
        useState(0);

    const [hasMoreOrders, setHasMoreOrders] =
        useState(true);

    const loadingRef = useRef(false);
    const activeUserRef = useRef(null);

    const fetchOrdersPage = useCallback(
        async ({
            userId,
            page = 0,
            pageSize = DEFAULT_PAGE_SIZE,
            replace = false,
        }) => {
            if (!userId || loadingRef.current) {
                return [];
            }

            loadingRef.current = true;
            setErrorOrders("");

            if (replace) {
                setLoadingOrders(true);
            } else {
                setLoadingMoreOrders(true);
            }

            try {
                /*
                 * userId no se envía al RPC.
                 * PostgreSQL obtiene el usuario con auth.uid().
                 */
                const response = await getMyFoodieOrders({
                    page,
                    pageSize,
                });

                if (!response?.ok) {
                    throw new Error(
                        response?.message ||
                            "No se pudieron cargar las órdenes"
                    );
                }

                const newOrders = Array.isArray(
                    response.data
                )
                    ? response.data
                    : [];

                /*
                 * Preferimos hasMore del servicio.
                 * Si no existe, lo inferimos según
                 * la cantidad recibida.
                 */
                const hasMore =
                    typeof response.pagination
                        ?.hasMore === "boolean"
                        ? response.pagination.hasMore
                        : newOrders.length === pageSize;

                let nextOrders = [];

                setOrders((previousOrders) => {
                    nextOrders = replace
                        ? newOrders
                        : mergeOrders(
                              previousOrders,
                              newOrders
                          );

                    return nextOrders;
                });

                setCurrentPage(page);
                setHasMoreOrders(hasMore);

                writeOrdersCache({
                    userId,
                    orders: nextOrders,
                    page,
                    hasMore,
                });

                return newOrders;
            } catch (error) {
                console.error(
                    "Error obteniendo órdenes:",
                    error
                );

                setErrorOrders(
                    error instanceof Error
                        ? error.message
                        : "No se pudieron cargar las órdenes"
                );

                return [];
            } finally {
                loadingRef.current = false;
                setLoadingOrders(false);
                setLoadingMoreOrders(false);
            }
        },
        []
    );

    const getOrdersList = useCallback(
        async ({
            userId,
            forceRefresh = false,
            pageSize = DEFAULT_PAGE_SIZE,
        }) => {
            if (!userId) {
                activeUserRef.current = null;
                setOrders([]);
                setCurrentPage(0);
                setHasMoreOrders(true);
                setErrorOrders("");

                return [];
            }

            /*
             * Si cambió el usuario, eliminamos
             * el estado visual del usuario anterior.
             */
            if (
                activeUserRef.current &&
                activeUserRef.current !== userId
            ) {
                setOrders([]);
                setCurrentPage(0);
                setHasMoreOrders(true);
            }

            activeUserRef.current = userId;
            setErrorOrders("");

            if (!forceRefresh) {
                const cachedData =
                    readOrdersCache(userId);

                if (cachedData) {
                    setOrders(cachedData.orders);
                    setCurrentPage(cachedData.page);
                    setHasMoreOrders(
                        cachedData.hasMore
                    );

                    return cachedData.orders;
                }
            }

            if (forceRefresh) {
                clearOrdersCache(userId);
            }

            return fetchOrdersPage({
                userId,
                page: 0,
                pageSize,
                replace: true,
            });
        },
        [fetchOrdersPage]
    );

    const loadMoreOrders = useCallback(
        async ({
            userId,
            pageSize = DEFAULT_PAGE_SIZE,
        }) => {
            if (
                !userId ||
                loadingRef.current ||
                !hasMoreOrders
            ) {
                return [];
            }

            return fetchOrdersPage({
                userId,
                page: currentPage + 1,
                pageSize,
                replace: false,
            });
        },
        [
            currentPage,
            hasMoreOrders,
            fetchOrdersPage,
        ]
    );

    const refreshOrders = useCallback(
        async ({
            userId,
            pageSize = DEFAULT_PAGE_SIZE,
        }) => {
            if (!userId) return [];

            clearOrdersCache(userId);

            return getOrdersList({
                userId,
                pageSize,
                forceRefresh: true,
            });
        },
        [getOrdersList]
    );

    const clearOrders = useCallback((userId) => {
        if (userId) {
            clearOrdersCache(userId);
        }

        activeUserRef.current = null;

        setOrders([]);
        setCurrentPage(0);
        setHasMoreOrders(true);
        setErrorOrders("");
        setLoadingOrders(false);
        setLoadingMoreOrders(false);
    }, []);

    return {
        orders,

        loadingOrders,
        loadingMoreOrders,
        errorOrders,

        currentPage,
        hasMoreOrders,

        getOrdersList,
        loadMoreOrders,
        refreshOrders,
        clearOrders,
    };
};