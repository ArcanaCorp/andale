import { IconBed, IconMapPin, IconCar, IconToolsKitchen2 } from "@tabler/icons-react";

export const tabsItems = [
    {
        path: '/',
        key: 'index',
        tab: 'Lugares',
        ico: <IconMapPin strokeWidth={1.2} stroke={'#888888'}/>
    },
    {
        path: '/restaurants',
        key: 'restaurants',
        tab: 'Restaurantes',
        ico: <IconToolsKitchen2 strokeWidth={1.2} stroke={'#888888'}/>
    },
    {
        path: '/hotels',
        key: 'hotels',
        tab: 'Hoteles',
        ico: <IconBed strokeWidth={1.2} stroke={'#888888'}/>
    },
    {
        path: '/transport',
        key: 'transport',
        tab: 'Transporte',
        ico: <IconCar strokeWidth={1.2} stroke={'#888888'}/>
    }
]