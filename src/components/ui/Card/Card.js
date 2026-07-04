import Image from "next/image";
import Link from "next/link";
import Avatar from "../Avatars/Avatar";
import { IconMapPin } from "@tabler/icons-react";

export default function Card ({ type, slug, title, subtitle, image, avatar }) {
    return (
        <article className="w-full">
            <Link className="flex w-full flex-col" href={`/${type}/${slug}`} aria-label={`Ver ${title}`}>
                <div className="relative w-full h bg-surface rounded-md hidden w" style={{"--mnw": "350px", "--h": "180px"}}>
                    <Image src={image} alt={`Portada de ${title}`} fill className="object-cover" />
                </div>
                <div className="w-full flex gap-md py-md">
                    {type !== 'places' && (
                        <Avatar image={avatar} name={title} size={60} rounded={'rounded-md'} />
                    )}
                    <div className="w-full flex flex-col gap-xs">
                        <h4 className="text-md text-medium">{title}</h4>
                        <p className="flex items-center gap-xs text-xs text-muted"><IconMapPin size={18}/> {subtitle}</p>
                    </div>
                </div>
            </Link>
        </article>
    )
}