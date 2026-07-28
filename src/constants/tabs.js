import { IconHome, IconBasket, IconDiscount, IconReceipt, IconUser } from "@tabler/icons-react";

export const tabs = [
    {
        key: "home",
        label: "Inicio",
        href: "/",
        icon: IconHome
    },
    {
        key: "super",
        label: "Súper",
        href: "/super",
        icon: IconBasket
    },
    {
        key: "promos",
        label: "Promos",
        href: "/promos",
        icon: IconDiscount
    },
    {
        key: "orders",
        label: "Pedidos",
        href: "/orders",
        icon: IconReceipt
    },
    {
        key: "account",
        label: "Mi perfil",
        href: "/account",
        icon: IconUser
    }
];