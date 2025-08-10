import { IconBrandWhatsapp, IconMapPin, IconPhone } from "@tabler/icons-react";
import Card from "../components/Card";

import './styles/bussinesview.css'

export default function BussinesView ({ data }) {

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
                    <li className={`__category __category--active`}>
                        <span>Todo</span>
                    </li>
                    <li className={`__category`}>
                        <span>Clásico</span>
                    </li>
                    <li className={`__category`}>
                        <span>Premium</span>
                    </li>
                </ul>
            </section>

            <section className={`__section __section_detail`}>
                <ul className={`__list_product`}>
                    {data?.products.map((p) => (
                        <Card key={p.id} type={data?.category} data={p} />
                    ))}
                </ul>
            </section>

        </>

    )

}