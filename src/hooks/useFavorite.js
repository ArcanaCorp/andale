'use client';

import { trackEvent } from "@/services/events.service";
import {
    getFavoriteStatus,
    toggleFavorite
} from "@/services/favorites.service";

import { useEffect, useState } from "react";
import { toast } from "sonner";

export function useFavorite({ user, favoriteType, itemId, info }) {

    const [isFavorite, setIsFavorite] = useState(false);
    const [loadingFavorite, setLoadingFavorite] = useState(false);

    const loadFavorite = async () => {
        try {
            if (!user?.id || !itemId) return;

            const status = await getFavoriteStatus({
                userId: user.id,
                favoriteType,
                itemId
            });

            setIsFavorite(status);

        } catch (error) {
            console.error("Error cargando favorito:", error);
        }
    };

    const handleToggleFavorite = async () => {
        try {
            if (!user?.id) {
                toast.warning("Inicia sesión", {
                    description: "Debes iniciar sesión para guardar favoritos."
                });
                return;
            }

            setLoadingFavorite(true);

            const result = await toggleFavorite({userId: user.id, favoriteType, itemId});

            setIsFavorite(result.isFavorite);

            try {
                await trackEvent({
                    userId: user.id,
                    eventName: result.isFavorite ? "favorite_added" : "favorite_removed",
                    entityType: favoriteType, // "business" o "place"
                    entityId: itemId,
                    metadata: {
                        slug: info?.slug || null,
                        title: info?.title || info?.name || info?.commercial_name || null,
                        favorite_type: favoriteType
                    }
                });
            } catch (trackError) {
                console.warn("No se pudo registrar evento favorito:", trackError);
            }

            toast.success(result.message);

        } catch (error) {
            toast.warning("No se pudo actualizar favoritos", {
                description: error.message
            });
        } finally {
            setLoadingFavorite(false);
        }
    };

    useEffect(() => {
        loadFavorite();
    }, [user?.id,itemId]);

    return {
        isFavorite,
        loadingFavorite,
        handleToggleFavorite
    };
}