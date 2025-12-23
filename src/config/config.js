import { IconDiscount, IconHeart, IconHome, IconListDetails, IconUserCircle } from "@tabler/icons-react"
import { REACT_APP_API } from "../config";

export const REACT_APP_API_URL = REACT_APP_API || 'https://andale.ttutis.com/api/v1'
export const SOCKET_URL = "https://andale.ttutis.com";
export const API_KEY_MAPS = 'AIzaSyAUfHQAHDTtaJsMG0POlX0MO4gxdqU_b9c'
export const TERRITORY_LIST = {
    provincia: "Jauja",
    departamento: "Junín",
    distritos: [
        "Acolla",
        "Apata",
        "Ataura",
        "Canchayllo",
        "Curicaca",
        "El Mantaro",
        "Huamalí",
        "Huaripampa",
        "Huertas",
        "Janjaillo",
        "Jauja",
        "Julcán",
        "Leonor Ordóñez",
        "Llocllapampa",
        "Marco",
        "Masma",
        "Masma Chicche",
        "Molinos",
        "Monobamba",
        "Muqui",
        "Muquiyauyo",
        "Paca",
        "Paccha",
        "Pancán",
        "Parco",
        "Pomacancha",
        "Ricrán",
        "San Lorenzo",
        "San Pedro de Chunán",
        "Sausa",
        "Sincos",
        "Tunanmarca",
        "Yauli",
        "Yauyos"
    ]
}

export const TABS_LIST = [
    {
        url: '/',
        txt: 'Inicio',
        ico: <IconHome/>
    },
    {
        url: '/favorites',
        txt: 'Favoritos',
        ico: <IconHeart/>
    },
    {
        url: '/promotions',
        txt: 'Promociones',
        ico: <IconDiscount/>
    },
    {
        url: '/orders',
        txt: 'Pedidos',
        ico: <IconListDetails/>
    },
    {
        url: '/account',
        txt: 'Mi perfil',
        ico: <IconUserCircle/>
    }
]