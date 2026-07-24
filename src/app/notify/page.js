'use client'
import ButtonIcon from "@/components/ui/Buttons/ButtonIcon";
import EmptyPage from "@/components/ui/Empty/Empty";
import { IconChevronLeft, IconSettings2 } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function Page () {

    const router = useRouter();
    const notifys = [];

    return (
        <div className="w-full h-screen">
            <div className="w-full h px-md flex items-center justify-between" style={{"--h": "45px"}}>
                <ButtonIcon size={24} onClick={() => router.back()}><IconChevronLeft size={20}/></ButtonIcon>
                <ButtonIcon size={24} onClick={() => router.back()}><IconSettings2 size={20}/></ButtonIcon>
            </div>
            <div className="w-full h py-md" style={{"--h": "calc(100% - 45px)"}}>
                {notifys.length > 0 ? (
                    <div></div>
                ) : (
                    <EmptyPage page={'notify'} />
                )}
            </div>
        </div>
    )
}