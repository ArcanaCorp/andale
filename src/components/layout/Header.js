'use client'
import { IconBell, IconSearch, IconShoppingBag } from "@tabler/icons-react";
import ButtonIcon from "../ui/Buttons/ButtonIcon";
import { useRouter } from "next/navigation";
import LocationChip from "../ui/Chips/LocationChip";
import { useCart } from "@/context/CartContext";

export default function Header () {

    const { cart } = useCart();
    const router = useRouter();

    return (
        <header className="static inset w-full h bg-primary flex flex-col gap-md py-sm h rounded-bottom-lg" style={{"--h": "130px"}}>
            <div className="w m-auto flex items-center justify-between" style={{"--w": "90%"}}>
                <LocationChip/>
                <div className="flex gap-sm">
                    <ButtonIcon onClick={() => router.push('/notify')} size={35}><IconBell color={'#FFFFFF'} /></ButtonIcon>
                    <div className="relative">
                        <span className="absolute w h center rounded-full bg-white text-xs text-primary" style={{"--w": "18px", "--mnw": "18px", "--h": "18px", top: '-4px', right: '-4px'}}>{cart?.products.length}</span>
                        <ButtonIcon onClick={() => router.push('/cart')} size={35}><IconShoppingBag color={'#FFFFFF'} /></ButtonIcon>
                    </div>
                </div>
            </div>
            <div className="w m-auto" style={{"--w": "90%"}}>
                <div className="relative w-full bg-white rounded-full flex items-center h px-md pointer" onClick={() => router.push('/search')} style={{"--h": "40px"}}>
                    <p className="text-xs text-muted">Buscar platillos, restaurantes y lugares...</p>
                    <div className="absolute grid-center w h bg-primary text-white rounded-full" style={{"--w": "35px", "--h": "35px", top: '2.5px', right: '2.5px'}}><IconSearch size={20}/></div>
                </div>
            </div>
        </header>
    )
}