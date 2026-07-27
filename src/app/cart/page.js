'use client'
import Avatar from "@/components/ui/Avatars/Avatar";
import ButtonBack from "@/components/ui/Buttons/ButtonBack";
import CardItemCart from "@/components/ui/Card/CardItemCart";
import EmptyPage from "@/components/ui/Empty/Empty";
import CheckOut from "@/components/views/CheckOut";
import Loading from "@/components/views/Loading";
import { useCart } from "@/context/CartContext";
import { useDB } from "@/context/DBContext";
import { formatMoney } from "@/helpers/formatted.helper";
import { useNewOrder } from "@/hooks/useNewOrder";
import Link from "next/link";
import { useState } from "react";

export default function Page () {
    
    const { business } = useDB();
    const { cart } = useCart();
    const { form, updateForm } = useNewOrder();

    const [ step, setStep ] = useState(1);
    
    const businesses = business?.list ?? [];
    const products = cart?.products ?? [];

    const company = businesses.find((item) => String(item.id) === String(cart?.company_id));
    
    const subtotal = Number(cart?.subtotal) || 0;
    const deliveryFee = Number(company?.delivery_fee) || 0;
    const total = subtotal + deliveryFee;

    const handleNext = () => setStep(step + 1);


    if (business?.load && products.length > 0) return <Loading/>;

    return (
        <>
            <header className="w-full h px-md flex items-center justify-between" style={{"--h": "45px"}}>
                <ButtonBack/>
                <h2 className="text-sm text-semibold">{step === 1 ? 'Tu carrito' : 'Último paso'}</h2>
                <div></div>
            </header>
            <main className="w-full h" style={{"--h": "calc(100dvh - 45px)"}}>
                {cart?.products.length > 0 ? (
                    step === 1 ? (
                        <>
                            <div className="w-full h flex flex-col gap-md p-md scroll-y" style={{"--h": "calc(calc(100dvh - 45px) - 60px)"}}>
                                <div className="w-full flex items-center justify-between">
                                    <div className="flex gap-md items-center">
                                        <Avatar size={42} rounded={'rounded-md'} name={company?.title} image={company?.avatar} />
                                        <h4 className="text-md text-semibold">{company?.title}</h4>
                                    </div>
                                    <Link href={`/foodies/${company?.slug}`} className="text-xs text-medium text-primary">Ir al local</Link>
                                </div>
                                <div className="w-full flex flex-col gap-md">
                                    {cart?.products.map((p) => (
                                        <CardItemCart key={p?.id} id={p?.id} product={p?.product} amount={p?.amount} />
                                    ))}
                                    <Link href={`/foodies/${company?.slug}`} className="center w-full h bg-surface text-xs text-semibold rounded-full" style={{"--h": "40px"}}>Buscar más productos</Link>
                                </div>
                                <div className="w-full flex flex-col gap-md">
                                    <h4 className="text-md text-semibold">Notas para el pedido</h4>
                                    <textarea className="w-full bg-surface rounded-md p-md text-xs" placeholder="Me podría enviar más kétchup" value={form.customer_notes} onChange={(event) => updateForm("customer_notes", event.target.value)}/>
                                </div>
                                <div className="w-full flex flex-col gap-md bg-surface rounded-md p-md">
                                    <h4 className="text-md text-semibold">Resumen</h4>
                                    <ul className="flex flex-col gap-xs">
                                        <li className="w-full flex items-center justify-between">
                                            <span className="text-xs text-medium">Productos</span> 
                                            <span className="text-sm">s/. {formatMoney(subtotal)}</span>
                                        </li>
                                        <li className="w-full flex items-center justify-between">
                                            <span className="text-xs text-medium">Envío</span> 
                                            <span className="text-sm">{deliveryFee > 0 ? `S/ ${formatMoney(deliveryFee)}` : "Gratis"}</span>
                                        </li>
                                    </ul>
                                    <div className="w-full h bg-neutral-200" style={{"--h": "1px"}}></div>
                                    <div className="w-full flex items-center justify-between">
                                        <h4 className="text-medium">Total</h4>
                                        <span className="text-semibold">s/. {formatMoney(total)}</span>
                                    </div>
                                </div>
                            </div>
                            <footer className="w-full h flex items-center px-md" style={{"--h": "60px"}}>
                                <button className="w-full h rounded-full text-white bg-primary text-xs text-semibold" style={{"--h": "40px"}} onClick={handleNext}>Siguiente</button>
                            </footer>
                        </>
                    ) : (
                        <CheckOut company={company} deliveryFee={deliveryFee} subtotal={subtotal} total={total} />
                    )
                ) : (
                    <EmptyPage page={'cart'} />
                )}
            </main>
            
        </>
    )
}