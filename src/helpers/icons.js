import { IconBell, IconChevronDown, IconSearch, IconBackpack, IconHotelService, IconMapPin, IconShoppingBagCheck, IconToolsKitchen, IconChevronLeft, IconX, IconShare3, IconBrandWhatsapp, IconCirclePlus, IconDots, IconDotsVertical, IconCheck } from '@tabler/icons-react'

const ICONS = {
    'bell': IconBell,
    'chevronDown': IconChevronDown,
    'search': IconSearch,
    'backPack': IconBackpack,
    'hotel': IconHotelService,
    'mapPin': IconMapPin,
    'shopping': IconShoppingBagCheck,
    'foods': IconToolsKitchen,
    'chevronLeft': IconChevronLeft,
    'close': IconX,
    'shared': IconShare3,
    'whatsapp': IconBrandWhatsapp,
    'follow': IconCirclePlus,
    'dots': IconDots,
    'dotsVertical': IconDotsVertical,
    'check': IconCheck,
}

export const Icon = ({ name, size=24, color='currentColor', stroke=1.2, className, ...props }) => {
    const IconComponent = ICONS[name];
    if (!IconComponent) return null;
    return (
        <IconComponent size={size} color={color} stroke={stroke} className={className} {...props} />
    )
}