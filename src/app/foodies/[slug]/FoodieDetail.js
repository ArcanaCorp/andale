'use client'

import ButtonIcon from "@/components/ui/Buttons/ButtonIcon";
import ListCategory from "@/components/ui/List/ListCategory";
import ListDishes from "@/components/ui/List/ListDishes";
import CartModal from "@/components/ui/Modals/CartModal";
import { useCart } from "@/context/CartContext";
import { handleShare } from "@/functions/share.function";
import { useFoodieMenu } from "@/hooks/useFoodie";
import { useOpeningStatus } from "@/hooks/useOpeningStatus";
import { IconArrowLeft, IconChevronRight, IconDotsVertical, IconHeart, IconInfoCircle, IconShare3, IconShoppingBag, IconStar, IconX } from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function FoodieDetail ({ info }) {

    const router = useRouter();
    const { cart } = useCart();

    const [ view, setView ] = useState(false);

    const { categories, dishes, activeCategory, selectCategory, loadingCategories, loadingDishes, dish, selectedDish } = useFoodieMenu(info?.id, 10);

    const openingStatus = useOpeningStatus(info?.opening_hours);

    const handleBack = () => router.back();

    const onShare = async () => {

        try {

            const result = await handleShare(
                info.name,
                info.description,
                `https://andaleya.pe/foodies/${info.slug}?utm_source=shared`
            );

            if (!result.ok) return toast.warning("Alerta", {description: result.message || "No se pudo compartir"});

                toast.success("Éxito", {description:"Se compartió exitosamente."});

        } catch (error) {
            toast.error("Error", {description: error.message});
        }
    };

    if (!info) return <div>No hay datos</div>;

    const deliveryFee = Number(info.delivery_fee) === 0 ? "Gratis" : `S/ ${Number(info.delivery_fee).toFixed(2)}`;

    const handleToCart = () => router.push('/cart');

    return (

        <>
        
            <header className="relative w-full h rounded-bottom-md" style={{"--h": "160px"}}>
                <div className="absolute w-full flex items-center justify-between zIndex-2 p-md">
                    <ButtonIcon bg={'bg-white'} rounded={'rounded-full'} onClick={handleBack}><IconArrowLeft/></ButtonIcon>
                    <div className="flex gap-md">
                        <ButtonIcon bg={'bg-white'} rounded={'rounded-full'}><IconHeart/></ButtonIcon>
                        <ButtonIcon bg={'bg-white'} rounded={'rounded-full'} onClick={() => setView(true)}><IconDotsVertical/></ButtonIcon>
                    </div>
                </div>
                <Image src={info.cover_image_url} alt={`Foto de portada de ${info.name}`} fill placeholder="blur" blurDataURL="https://placehold.net/600x600.png" />
            </header>

            <main className="absolute w-full py-md scroll-y h flex flex-col gap-md zIndex-2 bg-white rounded-top-lg" style={{"--h": "calc(100dvh - 80px)", "marginTop": "-80px"}}>
                <div className="w-full flex flex-col gap-sm px-md">
                    <h1>{info.name}</h1>
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
                            <p className="text-sm"><b>{info.delivery_time_min} - {info.delivery_time_max} min</b></p>
                        </li>
                    </ul>
                </div>
                <div className="w-full flex flex-col gap-md">
                    <ListCategory list={categories} load={loadingCategories} active={activeCategory} onSelected={selectCategory} />
                    <ListDishes list={dishes} load={loadingDishes} onSelected={selectedDish} />
                </div>
            </main>

            {view && (
                <div className="absolute inset w-screen h-screen bg-overlay flex flex-col justify-end zIndex-modal">
                    <div className="w-full bg-white rounded-top-md p-md">
                        <div className="w-full flex items-center justify-end">
                            <ButtonIcon bg={'bg-surface'} rounded={'rounded-full'} onClick={() => setView(false)}><IconX/></ButtonIcon>
                        </div>
                        <ul className="w-full flex flex-col gap-md">
                            <button className="flex items-center justify-between py-md"><div className="flex gap-sm items-center text-sm"><IconInfoCircle/> Información sobre el local</div> <IconChevronRight/></button>
                            <button className="flex items-center justify-between py-md"><div className="flex gap-sm items-center text-sm"><IconStar/> Leer opiniones</div> <IconChevronRight/></button>
                            <button className="flex items-center justify-between py-md" onClick={() => onShare(info)}><div className="flex gap-sm items-center text-sm"><IconShare3/> Compartir</div> <IconChevronRight/></button>
                        </ul>
                    </div>
                </div>
            )}

            {dish && (<CartModal dish={dish} selectedDish={selectedDish} /> )}

            {cart.products.length > 0 && ( <button className="absolute flex gap-md items-center px-md h rounded-full bg-dark text-white zIndex-float text-sm text-medium" style={{"--h": "48px", "bottom": "10px", "left": "30%"}} onClick={handleToCart}><IconShoppingBag/> Carrito <span className="grid-center w h bg-white text-dark text-sm rounded-full" style={{"--w": "20px", "--mnw": "20px", "--h": "20px"}}>{cart.products.length}</span></button> )}

        </>

    )

}