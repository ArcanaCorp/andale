import ButtonIcon from "@/components/ui/Buttons/ButtonIcon";
import EmptyPage from "@/components/ui/Empty/Empty";
import { IconShoppingBag } from "@tabler/icons-react";

export default function Page () {
    return (
        <div className="w-full h" style={{"--h": "calc(100dvh - 60px)"}}>
            <div className="w-full h px-md flex items-center justify-between" style={{"--h": "45px"}}>
                <div></div>
                <h2 className="text-sm text-semibold">Súper</h2>
                <ButtonIcon size={24}><IconShoppingBag size={20}/></ButtonIcon>
            </div>
            <div className="w-full h py-md" style={{"--h": "calc(100% - 45px)"}}>
                <EmptyPage page={'super'}/>
            </div>
        </div>
    )
}