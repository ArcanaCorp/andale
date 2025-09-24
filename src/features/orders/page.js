import moment from "moment";
import { useOrders } from "./context/OrdersContext";
import { IconAdjustmentsHorizontal } from "@tabler/icons-react";
import Empty from "../pages/Empty";
import './styles/page.css'

import placholder from '@/shared/images/placeholder.png'

export default function Orders () {

    const { orders } = useOrders();

    return (

        orders.length === 0 ? ( <Empty scrn={'orders'} /> ) : (
            <>
            
                <ul className="__filters_orders">
                    <li className="__filter">
                        <IconAdjustmentsHorizontal size={16}/>
                        <span>Filtros</span>
                    </li>
                    <li className="__filter __filter_choosed">
                        <span>Entregados</span>
                    </li>
                    <li className="__filter __filter_choosed">
                        <span>Cancelados</span>
                    </li>
                </ul>

                <ul className="__lst_orders">
                    {orders.map((o, i) => (
                        <li key={i} className="__order">
                            <div className="__col">
                                <picture className="__pic">
                                    <img 
                                        src={o.company.image} 
                                        alt={`Logo de ${o.company.name} en ÁndaleYa`} 
                                        onError={(e) => {
                                            e.target.onerror = null; // evitar loop infinito
                                            e.target.src = placholder; // tu placeholder local o url pública
                                        }}
                                    />
                                </picture>
                                <div className="__info">
                                    <p className="__subtext">#{o.id} • {moment(o.date).startOf('day').fromNow()}</p>
                                    <h3>{o.company.name}</h3>
                                    <p className="__subtext">{o.products === 1 ? `${o.products} producto` : `${o.products} productos`}</p>
                                </div>
                            </div>
                            <h4>S/. {(o.total).toFixed(2)}</h4>
                        </li>
                    ))}
                </ul>

            </>
        )
        

    )

}