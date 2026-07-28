import Image from "next/image";
import Link from "next/link";
import Avatar from "../Avatars/Avatar";
import { IconMapPin } from "@tabler/icons-react";
import { trackEvent } from "@/services/events.service";
import { useAuth } from "@/context/AuthContext";

export default function Card ({ type, slug, title, subtitle, image, avatar, id = null }) {

    const { user } = useAuth();

    const href = `/${type}/${slug}`;

    const entityType = type === "places" ? "place" : "business";

    const eventName = type === "places" ? "place_card_clicked" : "business_card_clicked";

    const handleTrackClick = () => {
        trackEvent({
            userId: user?.id || null,
            eventName,
            entityType,
            entityId: id,
            metadata: {
                slug,
                title,
                subtitle,
                source: "home_card",
                type
            }
        }).catch((error) => {
            console.warn("No se pudo registrar click en card:", error);
        });
    };

    return (
        <article className="w-full">
            <Link className="flex w-full flex-col" href={href} aria-label={`Ver ${title}`} onClick={handleTrackClick}>
                <div className="relative w-full h bg-surface rounded-md hidden w" style={{"--mnw": "350px", "--h": "180px"}}>
                    <Image src={image || ''} alt={`Portada de ${title}`} width={350} height={180} className="object-cover" loading="eager" />
                </div>
                <div className="w-full flex gap-md py-md">  
                    {type !== 'places' && (
                        <Avatar image={avatar} name={title} size={60} rounded={'rounded-md'} />
                    )}
                    <div className="w-full flex flex-col gap-xs">
                        <h4 className="text-sm text-medium">{title}</h4>
                        <p className="flex items-center gap-xs text-xs text-muted"><IconMapPin size={18}/> {subtitle}</p>
                    </div>
                </div>
            </Link>
        </article>
    )
}