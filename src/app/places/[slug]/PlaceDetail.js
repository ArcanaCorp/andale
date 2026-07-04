'use client'

import ButtonIcon from "@/components/ui/Buttons/ButtonIcon";
import { IconArrowLeft, IconHeart } from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function PlaceDetail ({ info }) {

    const router = useRouter();
    const handleBack = () => router.back();

    if (!info) return <div>No hay datos</div>;

    return (
        <>
            <header className="relative w-full h" style={{"--h": "240px"}}>
                <div className="absolute w-full flex items-center justify-between zIndex-2 p-md">
                    <ButtonIcon bg={'bg-white'} rounded={'rounded-full'} onClick={handleBack}><IconArrowLeft/></ButtonIcon>
                    <ButtonIcon bg={'bg-white'} rounded={'rounded-full'}><IconHeart/></ButtonIcon>
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
        </>
    )
}