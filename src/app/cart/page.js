'use client'
import Avatar from "@/components/ui/Avatars/Avatar";
import ButtonBack from "@/components/ui/Buttons/ButtonBack";
import CardItemCart from "@/components/ui/Card/CardItemCart";
import EmptyPage from "@/components/ui/Empty/Empty";
import CheckOut from "@/components/views/CheckOut";
import Loading from "@/components/views/Loading";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useDB } from "@/context/DBContext";
import { formatMoney } from "@/helpers/formatted.helper";
import { useNewOrder } from "@/hooks/useNewOrder";
import { trackEvent } from "@/services/events.service";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Page () {
    
    const { user } = useAuth();
    const trackedCartView = useRef(false);
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

    const getCartMetadata = () => ({
        business_id: company?.id || cart?.company_id || null,
        business_slug: company?.slug || null,
        business_name: company?.title || company?.name || null,
        products_count: products.length,
        products_quantity: products.reduce((sum, item) => sum + Number(item.amount || 0), 0),
        subtotal,
        delivery_fee: deliveryFee,
        total,
        products: products.map((item) => ({
            id: item?.product?.id || item?.id,
            name: item?.product?.name || null,
            price: Number(item?.product?.price || 0),
            amount: Number(item?.amount || 0),
            subtotal: Number(item?.subtotal || 0)
        }))
    });

    const handleNext = async () => {
        try {
            await trackEvent({
                userId: user?.id || null,
                eventName: "checkout_started",
                entityType: "business",
                entityId: company?.id || cart?.company_id || null,
                metadata: {
                    ...getCartMetadata(),
                    source: "cart_next_button"
                }
            });
        } catch (error) {
            console.warn("No se pudo registrar inicio de checkout:", error);
        }
        setStep(step + 1);
    }

    const handleGoBusiness = () => {
        trackEvent({
            userId: user?.id || null,
            eventName: "cart_business_opened",
            entityType: "business",
            entityId: company?.id || cart?.company_id || null,
            metadata: {
                ...getCartMetadata(),
                source: "cart_header"
            }
        }).catch((error) => {
            console.warn("No se pudo registrar apertura del local:", error);
        });
    };

    const handleContinueShopping = () => {
        trackEvent({
            userId: user?.id || null,
            eventName: "cart_continue_shopping",
            entityType: "business",
            entityId: company?.id || cart?.company_id || null,
            metadata: {
                ...getCartMetadata(),
                source: "cart_products_section"
            }
        }).catch((error) => {
            console.warn("No se pudo registrar búsqueda de más productos:", error);
        });
    };

    const handleNoteBlur = () => {
        if (!form.customer_notes?.trim()) return;

        trackEvent({
            userId: user?.id || null,
            eventName: "cart_note_added",
            entityType: "business",
            entityId: company?.id || cart?.company_id || null,
            metadata: {
                ...getCartMetadata(),
                note_length: form.customer_notes.length
            }
        }).catch((error) => {
            console.warn("No se pudo registrar nota del pedido:", error);
        });
    };

    useEffect(() => {
        if (trackedCartView.current) return;
        if (!company?.id || products.length === 0) return;

        trackedCartView.current = true;

        trackEvent({
            userId: user?.id || null,
            eventName: "cart_viewed",
            entityType: "business",
            entityId: company.id,
            metadata: {
                ...getCartMetadata(),
                source: "cart_page"
            }
        }).catch((error) => {
            console.warn("No se pudo registrar vista de carrito:", error);
        });
        
    }, [user?.id,company?.id,products.length]);

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
                                    <Link href={`/foodies/${company?.slug}`} className="text-xs text-medium text-primary" onClick={handleGoBusiness}>Ir al local</Link>
                                </div>
                                <div className="w-full flex flex-col gap-md">
                                    {cart?.products.map((p) => (
                                        <CardItemCart key={p?.id} id={p?.id} product={p?.product} amount={p?.amount} />
                                    ))}
                                    <Link href={`/foodies/${company?.slug}`} onClick={handleContinueShopping} className="center w-full h bg-surface text-xs text-semibold rounded-full" style={{"--h": "40px"}}>Buscar más productos</Link>
                                </div>
                                <div className="w-full flex flex-col gap-md">
                                    <h4 className="text-md text-semibold">Notas para el pedido</h4>
                                    <textarea className="w-full bg-surface rounded-md p-md text-xs" placeholder="Me podría enviar más kétchup" value={form.customer_notes} onChange={(event) => updateForm("customer_notes", event.target.value)} onBlur={handleNoteBlur} />
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