'use client'
import Avatar from "@/components/ui/Avatars/Avatar";
import ButtonIcon from "@/components/ui/Buttons/ButtonIcon";
import { useCart } from "@/context/CartContext";
import { useDB } from "@/context/DBContext";
import { IconChevronLeft } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page () {
    
    const router = useRouter();
    const { bussines } = useDB();
    const { cart } = useCart();

    const company = bussines.find((b) => b.id === cart.company_id);    
    
    return (
        <>
            <header className="w-full h px-md flex items-center gap-md" style={{"--h": "60px"}}>
                <ButtonIcon bg={'bg-surface'} rounded={'rounded-md'} onClick={() => router.back()}><IconChevronLeft/></ButtonIcon>
                <h4>Carrito de compras</h4>
            </header>
            <main className="w-full h p-md scroll-y" style={{"--h": "calc(100dvh - 60px)"}}>
                <div className="w-full flex items-center justify-between">
                    <div className="flex gap-md items-center">
                        <Avatar size={52} rounded={'rounded-md'} name={company?.title} image={company?.avatar} />
                        <h4>{company?.title}</h4>
                    </div>
                    <Link href={`/foodies/${company?.slug}`} className="text-xs text-medium text-primary">Ir al local</Link>
                </div>
                <div>
                    {cart?.products.map((p) => (
                        <article key={p.id}>{p.subtotal}</article>
                    ))}
                    <button className="w-full rounded-full py-sm text-white bg-primary text-sm text-medium">Realizar pedido</button>
                </div>
            </main>
        </>
    )
}