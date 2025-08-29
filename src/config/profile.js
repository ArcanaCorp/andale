import { IconHeart, IconMapPin, IconShoppingBag, IconUser } from "@tabler/icons-react";

export const itmsLst = [
    {
        key: 1,
        title: 'Perfil',
        itms: [
            {
                key: 1,
                text: 'Información Personal',
                ico: <IconUser/>
            },
            {
                key: 2,
                text: 'Direcciones',
                ico: <IconMapPin/>
            },
            {
                key: 3,
                text: 'Favoritos',
                ico: <IconHeart/>
            }
        ]
    },
    {
        key: 2,
        title: 'Más información',
        itms: [
            {
                key: 1,
                text: 'Quiero ser socio Ándale',
                ico: <IconShoppingBag/>
            },
            {
                key: 2,
                text: 'Términos y Condiciones',
                ico: <IconUser/>
            },
            {
                key: 3,
                text: 'Libro de Reclamaciones',
                ico: <IconMapPin/>
            },
            {
                key: 4,
                text: 'Política de Privacidad',
                ico: <IconHeart/>
            }
        ]
    }
]