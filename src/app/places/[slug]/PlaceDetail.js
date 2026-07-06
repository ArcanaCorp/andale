'use client'

import ButtonIcon from "@/components/ui/Buttons/ButtonIcon";
import { handleShare } from "@/functions/share.function";
import { IconArrowLeft, IconHeart, IconShare3 } from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function PlaceDetail ({ info }) {

    const router = useRouter();
    const handleBack = () => router.back();

    const onShare = async (data) => {
        try {
            const result = await handleShare(data.name, data.short_description, `https://andaleya.pe/places/${data.slug}/?utm_source=shared`);
            if (!result.ok) toast.warning('Alerta', { description: result.message || 'No se pudo compartir' })
                toast.success('Éxito', { description: 'Se compartió exitosamente.' })
        } catch (error) {
            toast.error('Error', { description: `Error: ${error.message}` })
        }
    }

    if (!info) return <div>No hay datos</div>;

    return (
        <>
            <header className="relative w-full h" style={{"--h": "240px"}}>
                <div className="absolute w-full flex items-center justify-between zIndex-2 p-md">
                    <ButtonIcon bg={'bg-white'} rounded={'rounded-full'} onClick={handleBack}><IconArrowLeft/></ButtonIcon>
                    <div className="flex gap-sm">
                        <ButtonIcon bg={'bg-white'} rounded={'rounded-full'}><IconHeart/></ButtonIcon>
                        <ButtonIcon bg={'bg-white'} rounded={'rounded-full'} onClick={() => onShare(info)}><IconShare3/></ButtonIcon>
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
        </>
    )
}