import { IconBackpack, IconHotelService, IconMapPin, IconShoppingBagCheck, IconToolsKitchen } from '@tabler/icons-react'

import './styles/categories.css'
export default function Categories () {

    const categoriesList = [
        {
            url: '/places',
            ico: <IconMapPin/>,
            txt: 'Lugares'
        },
        {
            url: '/agency',
            ico: <IconBackpack/>,
            txt: 'Agencias'
        },
        {
            url: '/foodies',
            ico: <IconToolsKitchen/>,
            txt: 'Restaurantes'
        },
        {
            url: '/hotels',
            ico: <IconHotelService/>,
            txt: 'Hoteles'
        },
        {
            url: '/store',
            ico: <IconShoppingBagCheck/>,
            txt: 'Tiendas'
        }
    ]

    return (

        <ul className='__categories'>
            {categoriesList.map((ctg, idx) => (
                <li key={idx} className='__category'>
                    <a href={ctg.url} className='__a_category'>
                        {ctg.ico}
                        <p>{ctg.txt}</p>
                    </a>
                </li>
            ))}
        </ul>

    )

}