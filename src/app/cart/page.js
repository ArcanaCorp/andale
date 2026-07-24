'use client'
import Avatar from "@/components/ui/Avatars/Avatar";
import ButtonIcon from "@/components/ui/Buttons/ButtonIcon";
import EmptyPage from "@/components/ui/Empty/Empty";
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
            <header className="w-full h px-md flex items-center justify-between" style={{"--h": "45px"}}>
                <ButtonIcon size={24} onClick={() => router.back()}><IconChevronLeft size={20}/></ButtonIcon>
                <h2 className="text-sm text-semibold">Carrito de compras</h2>
                <div></div>
            </header>
            <main className="w-full h p-md scroll-y" style={{"--h": "calc(100dvh - 45px)"}}>
                {cart.length > 0 ? (
                <>
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
                </>
                ) : (
                    <EmptyPage page={'cart'} />
                )}
            </main>
        </>
    )
}