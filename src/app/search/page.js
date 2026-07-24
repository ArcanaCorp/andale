'use client';

import ButtonIcon from "@/components/ui/Buttons/ButtonIcon";
import { IconChevronLeft, IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function Page () {

    const router = useRouter();

    return (
        <div className="w-full h-screen">
            <div className="w-full h px-md flex items-center gap-xs justify-between" style={{"--h": "45px"}}>
                <ButtonIcon size={24} onClick={() => router.back()}><IconChevronLeft size={20}/></ButtonIcon>
                <div className="relative w-full bg-surface rounded-full h" style={{"--h": "35px"}}>
                    <input type="text" className="w-full h-full text-xs px-md rounded-full" placeholder="Locales, platos y productos..." />
                    <IconSearch size={18} style={{"position": "absolute", "top": "8px", "right": "12px"}}/>
                </div>
            </div>
        </div>
    )
}