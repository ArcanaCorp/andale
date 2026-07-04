'use client'

import { IconArrowLeft, IconDotsVertical, IconHeart } from "@tabler/icons-react"
import ButtonIcon from "../ui/Buttons/ButtonIcon"
import { useRouter } from "next/navigation"

export default function HeaderFoodie ({ profile }) {

    const router = useRouter();

    return (
        <header className="relative w-full h bg-surface rounded-bottom-md" style={{"--h": "160px"}}>
            <div className="absolute w-full flex items-center justify-between px-md py-sm" style={{"zIndex": "2"}}>
                <ButtonIcon onClick={() => router.back()}><IconArrowLeft/></ButtonIcon>
                <div className="flex items-center gap-md">
                    <ButtonIcon><IconHeart/></ButtonIcon>
                    <ButtonIcon><IconDotsVertical/></ButtonIcon>
                </div>
            </div>
            <div className="absolute w-full" style={{"zIndex": "2", "bottom": "-40px"}}>
                <div className="w m-auto flex gap-md bg-white rounded-md p-sm" style={{"--w": "90%"}}>
                    <div className="relative w h rounded-md hidden bg-neutral-100" style={{"--w": "60px", "--mnw": "60px", "--h": "60px"}}>
                        <Image src={profile?.profile_image_url} width={60} height={60} alt={`${profile.name}`} />
                    </div>
                    <div>
                        <h1 className="text-lg">{profile.name}</h1>
                    </div>
                </div>
            </div>
            <Image src={profile?.cover_image_url} alt={`${profile.name}`} fill sizes="100dvw" priority style={{"zIndex": "1"}}/>
        </header>
    )
}