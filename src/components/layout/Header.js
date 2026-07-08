'use client'
import { IconBell, IconSearch, IconUser } from "@tabler/icons-react";
import ButtonIcon from "../ui/Buttons/ButtonIcon";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import LocationChip from "../ui/Chips/LocationChip";

export default function Header () {

    const { user } = useAuth();
    const router = useRouter();

    return (
        <header className="static inset w-full h bg-primary flex flex-col gap-md py-sm h" style={{"--h": "130px"}}>
            <div className="w m-auto flex items-center justify-between" style={{"--w": "90%"}}>
                <div>
                    <p className="text-xs text-white">Enviar a</p>
                    <LocationChip/>
                </div>
                <div className="flex gap-sm">
                    <ButtonIcon><IconBell color={'#FFFFFF'} /></ButtonIcon>
                    {user && (
                        <ButtonIcon onClick={() => router.push('/me')}><IconUser color={'#FFFFFF'} /></ButtonIcon>
                    )}
                </div>
            </div>
            <div className="w m-auto" style={{"--w": "90%"}}>
                <div className="relative w-full bg-white rounded-full flex items-center h px-md" style={{"--h": "50px"}}>
                    <p className="text-xs text-muted">Buscar platillos, restaurantes y lugares...</p>
                    <div className="absolute grid-center w h bg-primary text-white rounded-full" style={{"--w": "45px", "--h": "45px", top: '2.5px', right: '2.5px'}}><IconSearch/></div>
                </div>
            </div>
        </header>
    )
}