"use client";

import { getMyFoodieOrders, getOrderById } from "@/services/orders.service";

import { db } from "@/libs/supabase";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const CACHE_TTL = 1000 * 60 * 5;
const DEFAULT_PAGE_SIZE = 20;

const STATUS_MESSAGES = {
    pending: "Tu pedido está pendiente de confirmación.",
    accepted: "Tu pedido fue aceptado por el negocio.",
    preparing: "Tu pedido está en preparación.",
    ready: "Tu pedido está listo.",
    on_the_way: "Tu pedido está en camino.",
    completed: "Tu pedido fue completado.",
    cancelled: "Tu pedido fue cancelado.",
    rejected: "Tu pedido fue rechazado por el negocio."
};

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

        const cachedOrders = Array.isArray(cache.orders)
            ? cache.orders
            : [];

        /*
         * Importante:
         * No vamos a confiar en cachés vacíos.
         * Si una vez se guardó orders: [],
         * forzamos consulta real a DB.
         */
        if (cachedOrders.length === 0) {
            localStorage.removeItem(
                getCacheKey(userId)
            );

            return null;
        }

        return {
            orders: cachedOrders,
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

const writeOrdersCache = ({ userId, orders, page, hasMore, }) => {
    try {
        if (typeof window === "undefined" || !userId) {
            return;
        }

        const safeOrders = Array.isArray(orders)
            ? orders
            : [];

        /*
         * No guardamos caché vacío en primera página.
         * Así evitamos que el localStorage se quede pegado
         * con orders: [].
         */
        if (page === 0 && safeOrders.length === 0) {
            localStorage.removeItem(
                getCacheKey(userId)
            );

            return;
        }

        const cache = {
            orders: safeOrders,
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

const mergeOrderKeepingMedia = (oldOrder, newOrder) => {
    if (!oldOrder) return newOrder;

    const oldItems = oldOrder.foodie_order_items || [];
    const newItems = newOrder.foodie_order_items || [];

    const mergedItems = newItems.map((newItem) => {
        const oldItem = oldItems.find((item) => item.id === newItem.id);

        return {
            ...oldItem,
            ...newItem,
            product_image_url:
                newItem.product_image_url ||
                oldItem?.product_image_url ||
                null,
            product_name:
                newItem.product_name ||
                oldItem?.product_name ||
                null,
            product_description:
                newItem.product_description ||
                oldItem?.product_description ||
                null
        };
    });

    return {
        ...oldOrder,
        ...newOrder,

        business: {
            ...(oldOrder.business || {}),
            ...(newOrder.business || {}),
            profile_image_url:
                newOrder.business?.profile_image_url ||
                oldOrder.business?.profile_image_url ||
                null,
            cover_image_url:
                newOrder.business?.cover_image_url ||
                oldOrder.business?.cover_image_url ||
                null
        },

        foodie_order_items:
            mergedItems.length > 0
                ? mergedItems
                : oldItems
    };
};

const upsertOrder = (currentOrders, updatedOrder) => {
    const exists = currentOrders.some(
        (order) => order.id === updatedOrder.id
    );

    if (!exists) {
        return [
            updatedOrder,
            ...currentOrders
        ];
    }

    return currentOrders.map((order) =>
        order.id === updatedOrder.id
            ? mergeOrderKeepingMedia(order, updatedOrder)
            : order
    );
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

    const [realtimeUserId, setRealtimeUserId] =
        useState(null);

    const loadingRef = useRef(false);
    const activeUserRef = useRef(null);
    const currentPageRef = useRef(0);
    const hasMoreRef = useRef(true);

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

                currentPageRef.current = page;
                hasMoreRef.current = hasMore;

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
                setRealtimeUserId(null);
                setOrders([]);
                setCurrentPage(0);
                setHasMoreOrders(true);
                setErrorOrders("");

                return [];
            }

            if (
                activeUserRef.current &&
                activeUserRef.current !== userId
            ) {
                setOrders([]);
                setCurrentPage(0);
                setHasMoreOrders(true);
            }

            activeUserRef.current = userId;
            setRealtimeUserId(userId);
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

                    currentPageRef.current =
                        cachedData.page;

                    hasMoreRef.current =
                        cachedData.hasMore;

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

        setRealtimeUserId(null);
        setOrders([]);
        setCurrentPage(0);
        setHasMoreOrders(true);
        setErrorOrders("");
        setLoadingOrders(false);
        setLoadingMoreOrders(false);
    }, []);

    const updateOrderFromRealtime = useCallback(
        async (orderId) => {
            try {
                if (!orderId || !realtimeUserId) return;

                const fullOrder = await getOrderById({
                    orderId,
                    userId: realtimeUserId
                });

                if (!fullOrder) return;

                let nextOrders = [];

                setOrders((previousOrders) => {
                    nextOrders = upsertOrder(
                        previousOrders,
                        fullOrder
                    );

                    return nextOrders;
                });

                writeOrdersCache({
                    userId: realtimeUserId,
                    orders: nextOrders,
                    page: currentPageRef.current,
                    hasMore: hasMoreRef.current,
                });

                toast.info("Pedido actualizado", {
                    description:
                        STATUS_MESSAGES[fullOrder.status] ||
                        `Estado: ${fullOrder.status}`
                });

            } catch (error) {
                console.error(
                    "Error actualizando pedido en tiempo real:",
                    error
                );
            }
        },
        [realtimeUserId]
    );

    useEffect(() => {
        if (!realtimeUserId) return;

        const channel = db
            .channel(`customer-orders-${realtimeUserId}`)
            .on(
                "postgres_changes",
                {
                    event: "UPDATE",
                    schema: "public",
                    table: "foodie_orders",
                    filter: `user_id=eq.${realtimeUserId}`
                },
                async (payload) => {
                    const orderId = payload?.new?.id;

                    if (!orderId) return;

                    await updateOrderFromRealtime(orderId);
                }
            )
            .subscribe((status) => {
                if (status === "SUBSCRIBED") {
                    console.log(
                        "Realtime cliente conectado:",
                        realtimeUserId
                    );
                }

                if (status === "CHANNEL_ERROR") {
                    console.error(
                        "Error en realtime de órdenes del cliente"
                    );
                }
            });

        return () => {
            db.removeChannel(channel);
        };

    }, [
        realtimeUserId,
        updateOrderFromRealtime
    ]);

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