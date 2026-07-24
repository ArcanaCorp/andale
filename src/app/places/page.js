'use client';

import ButtonIcon from "@/components/ui/Buttons/ButtonIcon";
import { IconAdjustmentsHorizontal, IconChevronLeft, IconChevronDown } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function PlacesPage () {
    
    const router = useRouter();
    
    return (
        <div className="w-full h-screen">
            <div className="w-full h px-md flex items-center justify-between" style={{"--h": "45px"}}>
                <ButtonIcon size={24} onClick={() => router.back()}><IconChevronLeft size={20}/></ButtonIcon>
                <h2 className="text-sm text-semibold">Lugares turísticos</h2>
                <div></div>
            </div>
            <div className="w-full h py-md" style={{"--h": "calc(100% - 45px)"}}>
                <ul className="w-full flex items-center gap-xs scroll-x px-md">
                    <li className="badge badge-without-bg"><IconAdjustmentsHorizontal size={16} style={{"minWidth": "16px"}}/> Filtros</li>
                    <li className="badge">Cerca de mi</li>
                    <li className="badge">Distrito <IconChevronDown size={16} style={{"minWidth": "16px"}}/></li>
                    <li className="badge">Sitios naturales</li>
                    <li className="badge">Manifestaciones Culturales</li>
                    <li className="badge">Folclore</li>
                    <li className="badge">Contemporáneas</li>
                    <li className="badge">Acontecimientos Programados</li>
                </ul>
            </div>
        </div>
    )
}