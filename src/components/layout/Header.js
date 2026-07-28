'use client'
import { IconBell, IconSearch, IconShoppingBag } from "@tabler/icons-react";
import ButtonIcon from "../ui/Buttons/ButtonIcon";
import { useRouter } from "next/navigation";
import LocationChip from "../ui/Chips/LocationChip";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { trackEvent } from "@/services/events.service";

export default function Header () {

    const router = useRouter();

    const { user } = useAuth();
    const { cart } = useCart();

    const products = cart?.products || [];

    const getCartMetadata = () => ({
        source: "home_header",
        products_count: products.length,
        products_quantity: products.reduce( (sum, item) => sum + Number(item.amount || 0), 0 ),
        cart_company_id: cart?.company_id || null,
        subtotal: Number(cart?.subtotal || 0)
    });

    const safeTrack = async ({ eventName, metadata = {} }) => {

        try {
            await trackEvent({
                userId: user?.id || null,
                eventName,
                entityType: "navigation",
                entityId: null,
                metadata: {
                    ...getCartMetadata(),
                    ...metadata
                }
            });
        } catch (error) {
            console.warn(`No se pudo registrar evento ${eventName}:`, error);
        }
    };

    const handleGoNotify = async () => {
        await safeTrack({
            eventName: "notifications_opened",
            metadata: {
                target: "/notify"
            }
        });

        router.push("/notify");
    };

    const handleGoCart = async () => {
        await safeTrack({
            eventName: "cart_opened_from_header",
            metadata: {
                target: "/cart"
            }
        });

        router.push("/cart");
    };

    const handleGoSearch = async () => {
        await safeTrack({
            eventName: "search_opened_from_header",
            metadata: {
                target: "/search"
            }
        });

        router.push("/search");
    };

    const handleLocationClick = async () => {
        await safeTrack({
            eventName: "location_chip_clicked",
            metadata: {
                source: "header_location_chip"
            }
        });
    };

    return (
        <header className="static inset w-full h bg-primary flex flex-col gap-md py-sm h rounded-bottom-lg" style={{"--h": "130px"}}>
            <div className="w m-auto flex items-center justify-between" style={{"--w": "90%"}}>
                <LocationChip/>
                <div className="flex gap-sm">
                    <ButtonIcon onClick={handleGoNotify} size={35}><IconBell color={'#FFFFFF'} /></ButtonIcon>
                    <div className="relative">
                        {products.length > 0 && (
                            <span className="absolute w h center rounded-full bg-white text-xs text-primary" style={{"--w": "18px", "--mnw": "18px", "--h": "18px", top: '-4px', right: '-4px'}}>{products.length}</span>
                        )}
                        <ButtonIcon onClick={handleGoCart} size={35}><IconShoppingBag color={'#FFFFFF'} /></ButtonIcon>
                    </div>
                </div>
            </div>
            <div className="w m-auto" style={{"--w": "90%"}}>
                <div className="relative w-full bg-white rounded-full flex items-center h px-md pointer" onClick={handleGoSearch} style={{"--h": "40px"}}>
                    <p className="text-xs text-muted">Buscar platillos, restaurantes y lugares...</p>
                    <div className="absolute grid-center w h bg-primary text-white rounded-full" style={{"--w": "35px", "--h": "35px", top: '2.5px', right: '2.5px'}}><IconSearch size={20}/></div>
                </div>
            </div>
        </header>
    )
}