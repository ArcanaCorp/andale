import { IconShoppingBag, IconHome, IconUserCircle, IconDiscount, IconScan } from "@tabler/icons-react";

export const tabs = [
    {
        key: 'home',
        name: 'Inicio',
        ico: <IconHome/>
    },
    {
        key: 'promotions',
        name: 'Promos',
        ico: <IconDiscount/>
    },
    {
        key: 'scan',
        name: 'Escanear',
        ico: <IconScan/>
    },
    {
        key: 'orders',
        name: 'Pedidos',
        ico: <IconShoppingBag/>,
    },
    {
        key: 'profile',
        name: 'Mi perfil',
        ico: <IconUserCircle/>
    }
]