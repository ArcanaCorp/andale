'use client'
import { IconHome, IconBasket, IconDiscount, IconReceipt, IconUser } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Tabs () {

    const pathname = usePathname();

    return (
        pathname !== '/me' && (
            <footer className="w-full h" style={{"--h": "60px"}}>
                <ul className="w-full h-full px-md flex items-center justify-between">
                    <li className="w-full">
                        <Link href={'/'} className={`flex flex-col items-center gap-2xs ${pathname === '/' ? 'text-dark text-medium' : 'text-muted'}`}><IconHome/> <span className={`text-2xs ${pathname === '/' ? 'text-medium' : 'text-muted'}`}>Inicio</span></Link>
                    </li>
                    <li className="w-full">
                        <Link href={'/super'} className={`flex flex-col items-center gap-2xs ${pathname === '/super' ? 'text-dark text-medium' : 'text-muted'}`}><IconBasket/> <span className={`text-2xs ${pathname === '/super' ? 'text-medium' : 'text-muted'}`}>Súper</span></Link>
                    </li>
                    <li className="w-full">
                        <Link href={'/promos'} className={`flex flex-col items-center gap-2xs ${pathname === '/promos' ? 'text-dark text-medium' : 'text-muted'}`}><IconDiscount/> <span className={`text-2xs ${pathname === '/promos' ? 'text-medium' : 'text-muted'}`}>Promos</span></Link>
                    </li>
                    <li className="w-full">
                        <Link href={'/orders'} className={`flex flex-col items-center gap-2xs ${pathname === '/orders' ? 'text-dark text-medium' : 'text-muted'}`}><IconReceipt/> <span className={`text-2xs ${pathname === '/orders' ? 'text-medium' : 'text-muted'}`}>Pedidos</span></Link>
                    </li>
                    <li className="w-full">
                        <Link href={'/me'} className={`flex flex-col items-center gap-2xs ${pathname === '/me' ? 'text-dark text-medium' : 'text-muted'}`}><IconUser/> <span className={`text-2xs ${pathname === '/me' ? 'text-medium' : 'text-muted'}`}>Mi perfil</span></Link>
                    </li>
                </ul>
            </footer>
        )
    )
}