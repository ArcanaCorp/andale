import ButtonIcon from "@/components/ui/Buttons/ButtonIcon";
import EmptyPage from "@/components/ui/Empty/Empty";
import { IconChevronDown, IconShoppingBag, IconAdjustmentsHorizontal } from "@tabler/icons-react";

export default function Page () {

    const orders = [];

    return (
        <div className="w-full h" style={{"--h": "calc(100dvh - 60px)"}}>
            <div className="w-full h px-md flex items-center justify-between" style={{"--h": "45px"}}>
                <div></div>
                <h2 className="text-sm text-semibold">Mis pedidos</h2>
                <ButtonIcon size={24}><IconShoppingBag size={20}/></ButtonIcon>
            </div>
            <div className="w-full h py-md" style={{"--h": "calc(100% - 45px)"}}>
                <ul className="w-full flex items-center gap-xs scroll-x px-md">
                    <li className="badge badge-without-bg"><IconAdjustmentsHorizontal size={16} style={{"minWidth": "16px"}}/> Filtros</li>
                    <li className="badge">Entregados</li>
                    <li className="badge">Cancelados</li>
                    <li className="badge">Periodo <IconChevronDown size={16} style={{"minWidth": "16px"}}/></li>
                </ul>
                {orders.length > 0 ? (
                    <div></div>
                ) : (
                    <EmptyPage page={'orders'} />
                )}
            </div>
        </div>
    )
}