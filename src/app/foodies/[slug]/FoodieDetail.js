'use client'

import ButtonIcon from "@/components/ui/Buttons/ButtonIcon";
import ListCategory from "@/components/ui/List/ListCategory";
import ListDishes from "@/components/ui/List/ListDishes";
import CartModal from "@/components/ui/Modals/CartModal";
import SharedModal from "@/components/ui/Modals/SharedModal";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { handleShare } from "@/functions/share.function";
import { useFavorite } from "@/hooks/useFavorite";
import { useFoodieMenu } from "@/hooks/useFoodie";
import { useOpeningStatus } from "@/hooks/useOpeningStatus";
import { trackEvent } from "@/services/events.service";
import { createSharedLink } from "@/services/shared-links.service";
import { IconArrowLeft, IconDotsVertical, IconHeart, IconShoppingBag, } from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function FoodieDetail ({ info }) {

    const router = useRouter();
    const { user } = useAuth();
    const { cart } = useCart();

    const [ view, setView ] = useState(false);

    const { categories, dishes, activeCategory, selectCategory, loadingCategories, loadingDishes, dish, selectedDish } = useFoodieMenu(info?.id, 10);

    const { isFavorite, loadingFavorite, handleToggleFavorite } = useFavorite({ user, favoriteType: "business", itemId: info?.id, info});

    const openingStatus = useOpeningStatus(info?.opening_hours);

    const handleBack = () => router.back();

    const handleOpenView = () => {
        setView(true);
    };

    const deliveryFee = Number(info.delivery.fee) === 0 ? "Gratis" : `S/ ${Number(info.delivery.fee).toFixed(2)}`;

    const handleToCart = async () => {
        try {
            await trackEvent({
                userId: user?.id || null,
                eventName: "cart_opened_from_float",
                entityType: "business",
                entityId: info.id,
                metadata: {
                    slug: info.slug,
                    title:
                        info.title ||
                        info.name ||
                        info.commercial ||
                        null,
                    source: "floating_cart_button",
                    cart_items_count: cart?.products?.length || 0,
                    cart_total: cart?.total || 0
                }
            });
        } catch (error) {
            console.warn("No se pudo registrar apertura de carrito:", error);
        }
        router.push('/cart');
    }

    if (!info) return <div>No hay datos</div>;

    return (

        <>
        
            <header className="relative w-full h rounded-bottom-md" style={{"--h": "160px"}}>
                <div className="absolute w-full flex items-center justify-between zIndex-2 p-md">
                    <ButtonIcon bg={'bg-white'} rounded={'rounded-full'} onClick={handleBack}><IconArrowLeft/></ButtonIcon>
                    <div className="flex gap-md">
                        <ButtonIcon bg={'bg-white'} rounded={'rounded-full'} onClick={handleToggleFavorite}disabled={loadingFavorite}><IconHeart color={isFavorite ? "var(--color-brand-500)" : "currentColor"} fill={isFavorite ? "var(--color-brand-500)" : "none"}/></ButtonIcon>
                        <ButtonIcon bg={'bg-white'} rounded={'rounded-full'} onClick={handleOpenView}><IconDotsVertical/></ButtonIcon>
                    </div>
                </div>
                <Image src={info.image} alt={`Foto de portada de ${info.title || info.name}`} fill placeholder="blur" blurDataURL="https://placehold.net/600x600.png" />
            </header>

            <main className="absolute w-full py-md scroll-y h flex flex-col gap-md zIndex-2 bg-white rounded-top-lg" style={{"--h": "calc(100dvh - 80px)", "marginTop": "-80px"}}>
                <div className="w-full flex flex-col gap-sm px-md">
                    <h1>{info.title || info.name}</h1>
                    <div className="text-xs text-muted" dangerouslySetInnerHTML={{__html: info.description}}></div>
                    <ul className="w-full rounded-sm p-sm border-thin border-surface flex items-center justify-between">
                        <li className="w-full text-xs text-center">
                            <p className="text-xs text-muted">Ahora</p>
                            <p className={`text-sm ${openingStatus?.isOpen ? "text-success" : "text-danger"}`}><b>{openingStatus?.label || 'Sin horario'}</b></p>
                        </li>            
                        <li className="w-full text-xs text-center">
                            <p className="text-xs text-muted">Envio</p>
                            <p className="text-sm"><b>{deliveryFee}</b></p>
                        </li>
                        <li className="w-full text-xs text-center">
                            <p className="text-xs text-muted">Recibes en</p>
                            <p className="text-sm"><b>{info.delivery.time.min} - {info.delivery.time.max} min</b></p>
                        </li>
                    </ul>
                </div>
                <div className="w-full flex flex-col gap-md">
                    <ListCategory list={categories} load={loadingCategories} active={activeCategory} onSelected={selectCategory} />
                    <ListDishes list={dishes} load={loadingDishes} onSelected={selectedDish} info={info} />
                </div>
            </main>

            {view && (
                <SharedModal
                    open={view}
                    onClose={() => setView(false)}
                    type="foodie"
                    info={info}
                    user={user}
                    onGoInfo={() => {
                        sessionStorage.setItem(
                            `business_${info.slug}`,
                            JSON.stringify(info)
                        );

                        router.push(`/foodies/${info.slug}/info`);
                    }}
                    onGoReviews={() => {
                        router.push(`/foodies/${info.slug}/reviews`);
                    }}
                />
            )}

            {dish && (<CartModal dish={dish} selectedDish={selectedDish} business={info} /> )}

            {cart.products.length > 0 && ( <button className="absolute flex gap-md items-center px-md h rounded-full bg-dark text-white zIndex-float text-sm text-medium" style={{"--h": "48px", "bottom": "10px", "left": "30%"}} onClick={handleToCart}><IconShoppingBag/> Carrito <span className="grid-center w h bg-white text-dark text-sm rounded-full" style={{"--w": "20px", "--mnw": "20px", "--h": "20px"}}>{cart.products.length}</span></button> )}

        </>

    )

}