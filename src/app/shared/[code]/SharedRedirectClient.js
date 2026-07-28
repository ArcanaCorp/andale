'use client';

import { useAuth } from "@/context/AuthContext";
import { registerSharedLinkVisit } from "@/services/shared-links.service";
import { trackEvent } from "@/services/events.service";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function SharedRedirectClient({ code }) {
    const router = useRouter();
    const { user } = useAuth();

    const handled = useRef(false);

    const handleRedirect = async () => {
        if (handled.current) return;

        handled.current = true;

        try {
            const result = await registerSharedLinkVisit({
                code,
                userId: user?.id || null
            });

            if (!result?.ok) {
                router.replace("/");
                return;
            }

            trackEvent({
                userId: user?.id || null,
                eventName: "shared_link_visited",
                entityType: result.entity_type || "shared_link",
                entityId: result.entity_id || null,
                metadata: {
                    shared_link_id: result.shared_link_id,
                    shared_code: result.code,
                    target_url: result.target_url,
                    utm_source: result.utm_source,
                    utm_medium: result.utm_medium,
                    utm_campaign: result.utm_campaign,
                    utm_content: result.utm_content,
                    utm_term: result.utm_term,
                    source: "shared_redirect"
                }
            }).catch((error) => {
                console.warn("No se pudo registrar evento shared_link_visited:", error);
            });

            router.replace(result.target_url || "/");

        } catch (error) {
            console.error("Error registrando visita compartida:", error);
            router.replace("/");
        }
    };

    useEffect(() => {
        handleRedirect();
    }, [code, user?.id]);

    return (
        <main className="w-full h-screen grid-center bg-background">
            <div className="w-full p-md flex flex-col gap-xs text-center">
                <h1 className="text-md text-semibold">
                    Abriendo Ándale Ya!
                </h1>

                <p className="text-xs text-muted">
                    Estamos cargando el contenido compartido...
                </p>
            </div>
        </main>
    );
}