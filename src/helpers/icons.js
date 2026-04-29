import { IconHome, IconSparkles2, IconToolsKitchen2, IconBrandSafari, IconUser, IconSettings, IconSearch, IconMapPin, IconBed, IconHeart, IconStar, IconBell, IconChevronLeft, IconChevronRight, IconCredits, IconTicket, IconLanguage, IconMoon, IconSun, IconBuildingStore, IconHelp, IconInfoCircle, IconShieldCheck, IconBook, IconLogout, IconMotorbike } from "@tabler/icons-react";

// Mapa centralizado
const icons = {
    home: IconHome,
    user: IconUser,
    settings: IconSettings,
    search: IconSearch,
    ia: IconSparkles2,
    food: IconToolsKitchen2,
    discover: IconBrandSafari,
    map: IconMapPin,
    bed: IconBed,
    heart: IconHeart,
    star: IconStar,
    bell: IconBell,
    left: IconChevronLeft,
    right: IconChevronRight,
    credits: IconCredits,
    ticket: IconTicket,
    language: IconLanguage,
    moon: IconMoon,
    sun: IconSun,
    store: IconBuildingStore,
    chamo: IconMotorbike,
    help: IconHelp,
    info: IconInfoCircle,
    shield: IconShieldCheck,
    book: IconBook,
    logout: IconLogout
};

// Componente helper
export function AppIcon({ name, size = 24, stroke = 1.2, color = "currentColor", ...props }) {
    
    const IconComponent = icons[name];

    if (!IconComponent) {
        console.warn(`Icon "${name}" no existe`);
        return null;
    }

    return (
        <IconComponent size={size} stroke={stroke} color={color} {...props}/>
    );
}