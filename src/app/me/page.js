'use client';
import Avatar from "@/components/ui/Avatars/Avatar";
import ButtonIcon from "@/components/ui/Buttons/ButtonIcon";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/libs/supabase";
import { IconBell, IconBook, IconChevronLeft, IconChevronRight, IconHeart, IconInfoCircle, IconLogout, IconMapPin, IconShoppingBag, IconShoppingBagPlus, IconUser } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page () {
    
    const router = useRouter();
    const { user } = useAuth();

    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        try {
            setLoading(true);

            const { error } = await db.auth.signOut({
                scope: 'local'
            });

            if (error) {
                throw error;
            }

            router.replace('/');
            router.refresh();
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
            setLoading(false);
        }
    };
    
    return (
        <>
            <header className="w-full h px-md flex items-center justify-between" style={{"--h": "45px"}}>
                <ButtonIcon size={24} onClick={() => router.back()}><IconChevronLeft size={20}/></ButtonIcon>
                <h2 className="text-sm text-semibold">¡Hola, {user?.user_metadata.name}!</h2>
                <Avatar image={user?.user_metadata.avatar_url} name={user?.user_metadata.name} rounded={'rounded-sm'} size={24} />
            </header>
            <main className="w-full h p-md scroll-y flex flex-col gap-md" style={{"--h": "calc(100dvh - 45px)"}}>
                <div className="w-full flex flex-col gap-sm">
                    <h3>Perfil</h3>
                    <ul className="w-full flex flex-col gap-md">
                        <li className="w-full flex items-center justify-between py-sm pointer">
                            <div className="flex gap-sm items-center text-sm"><IconUser/> Información Personal</div>
                            <IconChevronRight/>
                        </li>
                        <li className="w-full flex items-center justify-between py-sm pointer">
                            <div className="flex gap-sm items-center text-sm"><IconMapPin/> Direcciones</div>
                            <IconChevronRight/>
                        </li>
                        <li className="w-full flex items-center justify-between py-sm pointer">
                            <div className="flex gap-sm items-center text-sm"><IconShoppingBag/> Pedidos</div>
                            <IconChevronRight/>
                        </li>
                        <li className="w-full flex items-center justify-between py-sm pointer">
                            <div className="flex gap-sm items-center text-sm"><IconHeart/> Favoritos</div>
                            <IconChevronRight/>
                        </li>
                    </ul>
                </div>
                <div className="w-full flex flex-col gap-sm">
                    <h3>Configuración</h3>
                    <ul className="w-full flex flex-col gap-md">
                        <li className="w-full flex items-center justify-between py-sm pointer">
                            <div className="flex gap-sm items-center text-sm"><IconBell/> Notificaciones</div>
                            <IconChevronRight/>
                        </li>
                        <li className="w-full flex items-center justify-between py-sm pointer" onClick={() => router.push('/terms')}>
                            <div className="flex gap-sm items-center text-sm"><IconInfoCircle/> Información Legal</div>
                            <IconChevronRight/>
                        </li>
                        <li className="w-full flex items-center justify-between py-sm pointer">
                            <div className="flex gap-sm items-center text-sm"><IconBook/> Libro de reclamaciones</div>
                            <IconChevronRight/>
                        </li>
                        <li className="w-full flex items-center justify-between py-sm pointer">
                            <div className="flex gap-sm items-center text-sm"><IconShoppingBagPlus/> Registrar mi negocio</div>
                            <IconChevronRight/>
                        </li>
                        <li className="w-full flex items-center justify-between py-sm pointer" onClick={handleLogout}>
                            <div className="flex gap-sm items-center text-sm"><IconLogout/> {loading ? 'Cerrando...' : 'Cerrar Sesión'}</div>
                        </li>
                    </ul>
                </div>
            </main>
        </>
    )
}