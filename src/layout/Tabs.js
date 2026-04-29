'use client';
import { AppIcon } from "@/helpers/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Tabs () {

    const pathname = usePathname();

    return (
        <footer className="w-full bg-white h" style={{"--h": "60px"}}>
            <ul className="w m-auto h-full flex items-center justify-between" style={{"--w": "90%"}}>
                <Link href={'/'} className="flex w-full h-full flex-col items-center justify-center">
                    <AppIcon name={'home'} size={20} color={pathname === '/' ? '#F90050' : '#888888'} />
                    <span className={`text-xs ${pathname === '/' ? 'text-primary fw-semibold' : 'text-muted'}`}>Inicio</span>
                </Link>
                <Link href={'/routes'} className="flex w-full h-full flex-col items-center justify-center">
                    <AppIcon name={'ia'} size={20} color={pathname === '/routes' ? '#F90050' : '#888888'} />
                    <span className={`text-xs ${pathname === '/routes' ? 'text-primary fw-semibold' : 'text-muted'}`}>Rutas</span>
                </Link>
                <Link href={'/foodies'} className="flex w-full h-full flex-col items-center justify-center">
                    <AppIcon name={'food'} size={20} color={pathname === '/foodies' ? '#F90050' : '#888888'} />
                    <span className={`text-xs ${pathname === '/foodies' ? 'text-primary fw-semibold' : 'text-muted'}`}>Foodies</span>
                </Link>
                <Link href={'/discover'} className="flex w-full h-full flex-col items-center justify-center">
                    <AppIcon name={'discover'} size={20} color={pathname === '/discover' ? '#F90050' : '#888888'} />
                    <span className={`text-xs ${pathname === '/discover' ? 'text-primary fw-semibold' : 'text-muted'}`}>Descubre</span>
                </Link>
                <Link href={'/me'} className="flex w-full h-full flex-col items-center justify-center">
                    <AppIcon name={'user'} size={20} color={pathname === '/me' ? '#F90050' : '#888888'} />
                    <span className={`text-xs ${pathname === '/me' ? 'text-primary fw-semibold' : 'text-muted'}`}>Perfil</span>
                </Link>
            </ul>
        </footer>
    )
}