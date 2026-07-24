'use client'
import Avatar from "@/components/ui/Avatars/Avatar";
import ButtonAmount from "@/components/ui/Buttons/ButtonAmount";
import ButtonIcon from "@/components/ui/Buttons/ButtonIcon";
import EmptyPage from "@/components/ui/Empty/Empty";
import { useCart } from "@/context/CartContext";
import { useDB } from "@/context/DBContext";
import { IconChevronLeft, IconPlus } from "@tabler/icons-react";
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
                <h2 className="text-sm text-semibold">Tu carrito</h2>
                <div></div>
            </header>
            <main className="w-full h scroll-y" style={{"--h": "calc(100dvh - 45px)"}}>
                {cart?.products.length > 0 ? (
                    <>
                        <div className="w-full h flex flex-col gap-md p-md" style={{"--h": "calc(calc(100dvh - 45px) - 60px)"}}>
                            <div className="w-full flex items-center justify-between">
                                <div className="flex gap-md items-center">
                                    <Avatar size={42} rounded={'rounded-md'} name={company?.title} image={company?.avatar} />
                                    <h4 className="text-md text-semibold">{company?.title}</h4>
                                </div>
                                <Link href={`/foodies/${company?.slug}`} className="text-xs text-medium text-primary">Ir al local</Link>
                            </div>
                            <div className="w-full flex flex-col gap-md">
                                {cart?.products.map((p) => (
                                    <article key={p.id} className="w-full flex gap-sm">
                                        <Avatar size={80} rounded={'rounded-md'} name={p?.product.name} image={p?.product.image_url} />
                                        <div className="w-full flex items-start gap-xs">
                                            <div className="w-full">
                                                <h4 className="text-sm text-medium">{p?.product.name}</h4>
                                                <p className="text-md text-semibold">s/. {(p?.product.price).toFixed(2)}</p>
                                                <p className="text-xs text-muted">{p?.product.description}</p>
                                            </div>
                                            <ButtonAmount idProduct={p.id} size={28} amount={p?.amount} />
                                        </div>
                                    </article>
                                ))}
                            </div>
                            <div className="w-full flex flex-col gap-md bg-surface rounded-md p-md">
                                <h4 className="text-md text-semibold">Resumen</h4>
                                <ul className="flex flex-col gap-xs">
                                    <li className="w-full flex items-center justify-between"><span className="text-xs text-medium">Productos</span> <span>s/. {(cart?.subtotal).toFixed(2)}</span></li>
                                    <li className="w-full flex items-center justify-between"><span className="text-xs text-medium">Envío gratis</span> <span>s/. {company?.delivery_fee}</span></li>
                                </ul>
                                <div className="w-full h bg-neutral-200" style={{"--h": "1px"}}></div>
                                <div className="w-full flex items-center justify-between">
                                    <h4>Subtotal</h4>
                                    <span>s/. {(cart?.subtotal + company?.delivery_fee).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                        <footer className="w-full h flex items-center px-md" style={{"--h": "60px"}}>
                            <button className="w-full h rounded-full text-white bg-primary text-xs text-semibold" style={{"--h": "40px"}}>Realizar pedido</button>
                        </footer>
                    </>
                ) : (
                    <EmptyPage page={'cart'} />
                )}
            </main>
            
        </>
    )
}