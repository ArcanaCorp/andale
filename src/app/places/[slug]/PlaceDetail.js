'use client'

import ButtonIcon from "@/components/ui/Buttons/ButtonIcon";
import { useAuth } from "@/context/AuthContext";
import { handleShare } from "@/functions/share.function";
import { useFavorite } from "@/hooks/useFavorite";
import { trackEvent } from "@/services/events.service";
import { createSharedLink } from "@/services/shared-links.service";
import { IconArrowLeft, IconHeart, IconPhoto, IconRoute, IconShare3 } from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEffect, useRef, useState } from "react";
import SharedModal from "@/components/ui/Modals/SharedModal";

export default function PlaceDetail ({ info }) {

    const router = useRouter();

    const { user } = useAuth();

    const { isFavorite, loadingFavorite, handleToggleFavorite } = useFavorite({ user, favoriteType: "place", itemId: info?.id });

    const [view, setView] = useState(false);

    const handleBack = async () => {
        try {
            await trackEvent({
                userId: user?.id || null,
                eventName: "place_back_clicked",
                entityType: "place",
                entityId: info?.id || null,
                metadata: {
                    slug: info?.slug || null,
                    title: info?.title || info?.name || null,
                    source: "place_detail_header"
                }
            });
        } catch (error) {
            console.warn("No se pudo registrar volver desde lugar:", error);
        }

        router.back();
    };

    const trackedPlaceView = useRef(false);

    useEffect(() => {
        if (trackedPlaceView.current) return;
        if (!info?.id) return;

        trackedPlaceView.current = true;

        setTimeout(() => {
            trackEvent({
                userId: user?.id || null,
                eventName: "place_view",
                entityType: "place",
                entityId: info.id,
                metadata: {
                    slug: info.slug,
                    title: info.title || info.name,
                    category: info.category || null,
                    district: info.district || null,
                    province: info.province || null,
                    source: "place_detail"
                }
            }).catch((error) => {
                console.warn("No se pudo registrar vista del lugar:", error);
            });
        }, 300);

    }, [info?.id, user?.id]);

    if (!info) return <div>No hay datos</div>;

    return (
        <>
            <header className="relative w-full h" style={{"--h": "240px"}}>
                <div className="absolute w-full flex items-center justify-between zIndex-2 p-md">
                    <ButtonIcon bg={'bg-white'} rounded={'rounded-full'} onClick={handleBack}><IconArrowLeft/></ButtonIcon>
                    <div className="flex gap-sm">
                        <ButtonIcon bg={'bg-white'} rounded={'rounded-full'} onClick={handleToggleFavorite} disabled={loadingFavorite}><IconHeart color={isFavorite ? "var(--color-brand-500)" : "currentColor"} fill={isFavorite ? "var(--color-brand-500)" : "none"}/></ButtonIcon>
                        <ButtonIcon bg={'bg-white'} rounded={'rounded-full'} onClick={() => setView(true)}><IconShare3/></ButtonIcon>
                    </div>
                </div>
                <Image src={info.cover_image_url} alt={`Foto de portada de ${info.name}`} fill placeholder="blur" blurDataURL="https://placehold.net/600x600.png" />
            </header>
            <main className="w-full h scroll-y py-md flex flex-col gap-md" style={{"--h": "calc(100dvh - 240px)"}}>
                <div className="w-full flex px-md">
                    <div className="w-full flex flex-col">
                        <p className="text-xs text-muted text-medium">{info.category}</p>
                        <h1 className="text-xl text-semibold">{info.name}</h1>
                        <p className="text-uppercase text-xs text-semibold text-muted">{info.district} · {info.province} · {info.department}</p>
                    </div>
                </div>
                <div className="w-full flex flex-col gap-xs px-md">
                    <h3>Acerca de</h3>
                    <p className="text-xs text-muted">{info.short_description}</p>
                </div>
                <div className="w-full flex flex-col gap-xs px-md">
                    <h3>Actividades</h3>
                    <ul className="w-full flex flex-col gap-xs ml-sm">
                        {info?.activities.map((txt, idx) => (
                            <li key={idx} className="text-sm text-muted">- {txt}</li>
                        ))}
                    </ul>
                </div>
                <div className="w-full flex flex-col gap-xs">
                    <h3 className="px-md">Galeria</h3>
                    <ul className="w-full flex gap-md scroll-x px-md">
                        {info?.gallery_images.map((img, i) => (
                            <li key={i} className="relative w h bg-surface rounded-md" style={{"--w": "120px", "--mnw": "120px", "--h": "120px"}}>
                                <Image src={img} alt={`Fotos de la galeria de ${info.name}`} width={120} height={120} />
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="w-full flex flex-col gap-xs px-md">
                    <h3>Cómo llegar</h3>
                    <div className="w-full h rounded-md hidden bg-surface" style={{"--h": "240px"}}></div>
                </div>
            </main>
            {view && (
                <SharedModal
                    open={view}
                    onClose={() => setView(false)}
                    type="place"
                    info={info}
                    user={user}
                    extraOptions={[
                        {
                            key: "gallery",
                            label: "Ver galería",
                            icon: IconPhoto,
                            eventName: "place_gallery_opened",
                            onClick: () => {
                                setView(false);
                                document
                                    .getElementById("place-gallery")
                                    ?.scrollIntoView({
                                        behavior: "smooth"
                                    });
                            }
                        },
                        {
                            key: "route",
                            label: "Cómo llegar",
                            icon: IconRoute,
                            eventName: "place_route_opened",
                            onClick: () => {
                                setView(false);
                                document
                                    .getElementById("place-route")
                                    ?.scrollIntoView({
                                        behavior: "smooth"
                                    });
                            }
                        }
                    ]}
                />
            )}
        </>
    )
}