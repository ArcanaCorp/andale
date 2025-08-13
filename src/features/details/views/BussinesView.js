import { Suspense, useState } from "react";
import { IconBrandWhatsapp, IconMapPin, IconPhone } from "@tabler/icons-react";
import ProductList from "../components/ProductList";
import SkeletonCard from "../components/SkeletonCard";

import './styles/bussinesview.css'

export default function BussinesView ({ data }) {

    const [ filter, setFilter ] = useState('all');

    const company = {
        sub: data?.sub,
        short: data?.short,
        name: data?.name,
        photo: data?.photo,
        location: data?.location
    }

    const message = `Hola *${data?.name}*\nDeseo más información de sus productos.`
    const handleSendMessage = () => window.open(`https://wa.me/51${data?.phone}/?text=${encodeURIComponent(message)}`, '_blank')
    const handleOpenMap = () => window.open(`https://www.google.com/maps?q=${encodeURIComponent(data?.location)}`, '_blank')
    const handleCall = () => window.open(`tel:51${data?.phone}`, '_blank')

    return (

        <>
        
            <section className={`__section __section_detail`}>
                <div className="__row">
                    <h1 className="__title">{data?.name}</h1>
                    <p className="__parragrahp">{data?.text}</p>
                </div>
                <div className="__row">
                    <ul className="__info">
                        <li className="__info_column" onClick={handleCall}>
                            <IconPhone/>
                            <p>Llamar</p>
                        </li>
                        <li className="__info_column" onClick={handleOpenMap}>
                            <IconMapPin/>
                            <p>Ubicación</p>
                        </li>
                        <li className="__info_column" onClick={handleSendMessage}>
                            <IconBrandWhatsapp/>
                            <p>Escribir</p>
                        </li>
                    </ul>
                </div>
            </section>

            <section className={`__section __section_detail`}>
                <ul className={`__categories`}>
                    <li className={`__category ${filter === 'all' ? '__category--active' : ''}`} onClick={() => setFilter('all')}>
                        <span>Todo</span>
                    </li>
                    {data?.filters.map((f, index) => (
                        <li key={index} className={`__category ${filter === f ? '__category--active' : ''}`} onClick={() => setFilter(f)}>
                            <span>{f}</span>
                        </li>
                    ))}
                </ul>
            </section>

            <section className={`__section __section_detail`}>
                <Suspense fallback={<SkeletonCard/>}>
                    <ProductList type={data?.type} company={company} hidden={filter} />
                </Suspense>
            </section>

        </>

    )

}