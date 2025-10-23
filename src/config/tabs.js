import { IconShoppingBag, IconHome, IconDiscount, IconHeart } from "@tabler/icons-react";

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
        key: 'favorite',
        name: 'Favoritos',
        ico: <IconHeart/>
    },
    {
        key: 'orders',
        name: 'Pedidos',
        ico: <IconShoppingBag/>,
    }
]