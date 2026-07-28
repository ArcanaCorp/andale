'use client';

import ButtonIcon from "@/components/ui/Buttons/ButtonIcon";
import { handleShare } from "@/functions/share.function";
import { trackEvent } from "@/services/events.service";
import { createSharedLink } from "@/services/shared-links.service";

import {
    IconArrowLeft,
    IconBrandFacebook,
    IconBrandLinkedin,
    IconBrandWhatsapp,
    IconBrandX,
    IconChevronRight,
    IconCopy,
    IconInfoCircle,
    IconMapPin,
    IconShare3,
    IconStar,
    IconX
} from "@tabler/icons-react";

import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

export default function SharedModal({ open, onClose, type = "foodie", info, user = null, onGoInfo = null, onGoReviews = null, extraOptions = [] }) {
    
    const [viewMode, setViewMode] = useState("menu");
    const [sharedLink, setSharedLink] = useState(null);
    const [preparingShare, setPreparingShare] = useState(false);

    if (!open || !info) return null;

    const isPlace = type === "place" || type === "places";
    const isFoodie = type === "foodie" || type === "foodies" || type === "business";

    const entityType = isPlace ? "place" : "business";
    const routeBase = isPlace ? "places" : "foodies";

    const title = info.title || info.name || info.commercial || "Ándale Ya!";

    const description = cleanText(info.description || info.short_description) || (isPlace ? "Descubre este lugar en Ándale Ya!" : "Mira este negocio en Ándale Ya!");

    const imageUrl = info.image || info.cover_image_url || info.avatar || info.profile_image_url || "https://placehold.net/300x300.png";

    const mapsUrl = info.google_maps_url || info.maps_url || info.contact?.maps || buildMapsUrl(info);

    const handleClose = () => {
        setViewMode("menu");
        onClose?.();
    };

    const safeTrack = async ({ eventName, metadata = {} }) => {
        try {
            await trackEvent({
                userId: user?.id || null,
                eventName,
                entityType,
                entityId: info.id,
                metadata: {
                    slug: info.slug || null,
                    title,
                    source: `${entityType}_shared_modal`,
                    ...metadata
                }
            });
        } catch (error) {
            console.warn(`No se pudo registrar evento ${eventName}:`, error);
        }
    };

    const getOrCreateSharedLink = async () => {
        if (sharedLink) return sharedLink;

        setPreparingShare(true);

        try {
            const link = await createSharedLink({
                userId: user?.id || null,
                entityType,
                entityId: info.id,
                targetPath: `/${routeBase}/${info.slug}`,
                metaTitle: title,
                metaDescription: description,
                metaImageUrl: imageUrl,
                utmSource: "shared",
                utmMedium: "app_share",
                utmCampaign: isPlace ? "place_share" : "business_share",
                utmContent: info.slug
            });

            setSharedLink(link);

            return link;

        } finally {
            setPreparingShare(false);
        }
    };

    const handleOpenShareOptions = async () => {
        try {
            await getOrCreateSharedLink();

            await safeTrack({
                eventName: `${entityType}_share_options_opened`
            });

            setViewMode("share");

        } catch (error) {
            toast.error("Error", {
                description: error.message
            });
        }
    };

    const handleShareChannel = async (channel) => {
        try {
            const link = await getOrCreateSharedLink();

            const shareUrl = `https://andaleya.pe/shared/${link.code}`;
            const text = `${title} - ${description}`;

            if (channel === "native") {
                const result = await handleShare(
                    title,
                    description,
                    shareUrl
                );

                if (!result.ok) {
                    return toast.warning("Alerta", {
                        description: result.message || "No se pudo compartir"
                    });
                }

                await safeTrack({
                    eventName: `${entityType}_shared_native`,
                    metadata: getShareMetadata({
                        channel,
                        link,
                        shareUrl
                    })
                });

                toast.success("Éxito", {
                    description: "Se compartió exitosamente."
                });

                return;
            }

            if (channel === "copy") {
                await navigator.clipboard.writeText(shareUrl);

                await safeTrack({
                    eventName: `${entityType}_shared_copy`,
                    metadata: getShareMetadata({
                        channel,
                        link,
                        shareUrl
                    })
                });

                toast.success("Link copiado", {
                    description: "El enlace se copió correctamente."
                });

                return;
            }

            const encodedUrl = encodeURIComponent(shareUrl);
            const encodedText = encodeURIComponent(text);

            const shareUrls = {
                whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
                facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
                x: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
                linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
            };

            const url = shareUrls[channel];

            if (!url) return;

            await safeTrack({
                eventName: `${entityType}_shared_${channel}`,
                metadata: getShareMetadata({
                    channel,
                    link,
                    shareUrl
                })
            });

            window.open(
                url,
                "_blank",
                "noopener,noreferrer"
            );

        } catch (error) {
            toast.error("Error", {
                description: error.message
            });
        }
    };

    const handleGoInfo = async () => {
        await safeTrack({
            eventName: `${entityType}_info_opened`
        });

        onGoInfo?.();
    };

    const handleGoReviews = async () => {
        await safeTrack({
            eventName: `${entityType}_reviews_opened`
        });

        onGoReviews?.();
    };

    const handleOpenMaps = async () => {
        if (!mapsUrl) {
            return toast.warning("Sin ubicación", {
                description: "Este lugar todavía no tiene enlace de Maps."
            });
        }

        await safeTrack({
            eventName: `${entityType}_maps_opened`,
            metadata: {
                maps_url: mapsUrl
            }
        });

        window.open( mapsUrl, "_blank", "noopener,noreferrer");

    };

    const handleExtraOption = async (option) => {
        await safeTrack({
            eventName: option.eventName || `${entityType}_extra_option_clicked`,
            metadata: {
                option_key: option.key || null,
                option_label: option.label || null
            }
        });

        option.onClick?.();
    };

    return (
        <div className="absolute inset w-screen h-screen bg-overlay flex flex-col justify-end zIndex-modal">
            <div className="w-full bg-white rounded-top-md p-md flex flex-col gap-md">
                <div className="w-full flex items-center justify-between">
                    {viewMode === "share" ? (
                        <ButtonIcon
                            bg="bg-surface"
                            rounded="rounded-full"
                            onClick={() => setViewMode("menu")}
                        >
                            <IconArrowLeft />
                        </ButtonIcon>
                    ) : (
                        <div />
                    )}

                    <h3 className="text-sm text-semibold">
                        {viewMode === "share"
                            ? isPlace
                                ? "Compartir lugar"
                                : "Compartir local"
                            : "Opciones"}
                    </h3>

                    <ButtonIcon
                        bg="bg-surface"
                        rounded="rounded-full"
                        onClick={handleClose}
                    >
                        <IconX />
                    </ButtonIcon>
                </div>

                {viewMode === "menu" ? (
                    <ul className="w-full flex flex-col gap-md">
                        {isFoodie && (
                            <>
                                <button
                                    type="button"
                                    className="flex items-center justify-between py-md"
                                    onClick={handleGoInfo}
                                >
                                    <div className="flex gap-sm items-center text-sm">
                                        <IconInfoCircle />
                                        Información sobre el local
                                    </div>

                                    <IconChevronRight />
                                </button>

                                <button
                                    type="button"
                                    className="flex items-center justify-between py-md"
                                    onClick={handleGoReviews}
                                >
                                    <div className="flex gap-sm items-center text-sm">
                                        <IconStar />
                                        Leer opiniones
                                    </div>

                                    <IconChevronRight />
                                </button>
                            </>
                        )}

                        {isPlace && (
                            <button
                                type="button"
                                className="flex items-center justify-between py-md"
                                onClick={handleOpenMaps}
                            >
                                <div className="flex gap-sm items-center text-sm">
                                    <IconMapPin />
                                    Abrir en Google Maps
                                </div>

                                <IconChevronRight />
                            </button>
                        )}

                        {extraOptions.map((option) => {
                            const Icon = option.icon;

                            return (
                                <button
                                    key={option.key || option.label}
                                    type="button"
                                    className="flex items-center justify-between py-md"
                                    onClick={() => handleExtraOption(option)}
                                >
                                    <div className="flex gap-sm items-center text-sm">
                                        {Icon ? <Icon /> : <IconInfoCircle />}
                                        {option.label}
                                    </div>

                                    <IconChevronRight />
                                </button>
                            );
                        })}

                        <button
                            type="button"
                            className="flex items-center justify-between py-md"
                            onClick={handleOpenShareOptions}
                            disabled={preparingShare}
                        >
                            <div className="flex gap-sm items-center text-sm">
                                <IconShare3 />
                                {preparingShare
                                    ? "Preparando link..."
                                    : "Compartir"}
                            </div>

                            <IconChevronRight />
                        </button>
                    </ul>
                ) : (
                    <div className="w-full flex flex-col gap-md">
                        <div className="w-full flex gap-md items-center bg-surface rounded-md p-sm">
                            <div
                                className="relative w h rounded-md bg-white hidden"
                                style={{
                                    "--w": "54px",
                                    "--mnw": "54px",
                                    "--h": "54px"
                                }}
                            >
                                <Image
                                    src={imageUrl}
                                    alt={`Foto de ${title}`}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="w-full flex flex-col gap-2xs">
                                <h4 className="text-sm text-semibold">
                                    {title}
                                </h4>

                                <p className="text-xs text-muted">
                                    Comparte con un enlace corto de Ándale Ya!
                                </p>
                            </div>
                        </div>

                        <div className="w-full grid grid-cols-3 gap-sm">
                            <ShareButton
                                label="WhatsApp"
                                icon={<IconBrandWhatsapp />}
                                onClick={() => handleShareChannel("whatsapp")}
                            />

                            <ShareButton
                                label="Facebook"
                                icon={<IconBrandFacebook />}
                                onClick={() => handleShareChannel("facebook")}
                            />

                            <ShareButton
                                label="X"
                                icon={<IconBrandX />}
                                onClick={() => handleShareChannel("x")}
                            />

                            <ShareButton
                                label="LinkedIn"
                                icon={<IconBrandLinkedin />}
                                onClick={() => handleShareChannel("linkedin")}
                            />

                            <ShareButton
                                label="Copiar"
                                icon={<IconCopy />}
                                onClick={() => handleShareChannel("copy")}
                            />

                            <ShareButton
                                label="Más"
                                icon={<IconShare3 />}
                                onClick={() => handleShareChannel("native")}
                                primary
                            />
                        </div>

                        {sharedLink?.code && (
                            <div className="w-full bg-surface rounded-md p-sm">
                                <p className="text-2xs text-muted">
                                    Link generado
                                </p>

                                <p className="text-xs text-medium">
                                    andaleya.pe/shared/{sharedLink.code}
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

function ShareButton({ label, icon, onClick, primary = false }) {

    return (
        <button type="button" className={`w-full rounded-md p-sm flex flex-col items-center gap-xs text-xs ${primary ? "bg-primary text-white" : "bg-surface"}`}onClick={onClick}>
            {icon}
            {label}
        </button>
    );
}

function cleanText(value = "") {
    return String(value)
        .replace(/<[^>]*>/g, "")
        .replace(/\s+/g, " ")
        .trim();
}

function buildMapsUrl(info) {
    const lat = info?.latitude || info?.coordinates?.lat || null;

    const lng = info?.longitude || info?.coordinates?.lng || null;

    if (lat && lng) {
        return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    }

    const query = [
        info?.name,
        info?.district,
        info?.province,
        info?.department || info?.region
    ]
        .filter(Boolean)
        .join(", ");

    if (!query) return null;

    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function getShareMetadata({ channel, link, shareUrl }) {
    return {
        channel,
        shared_link_id: link.id,
        shared_code: link.code,
        shared_url: shareUrl,
        target_url: link.target_url,
        utm_source: link.utm_source,
        utm_medium: link.utm_medium,
        utm_campaign: link.utm_campaign,
        utm_content: link.utm_content,
        utm_term: link.utm_term
    };
}