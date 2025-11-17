import moment from 'moment'
import FilterBussines from "./FilterBussines";
import 'moment/locale/es';
import './styles/bannerinfo.css'
import { IconFlagX } from '@tabler/icons-react';

moment.locale('es-mx');

export default function BannerInfo ({ banner, details, filter, onChangeFilter }) {

    const subTypes = {
        'restaurant': 'Foodies',
        'hotel': 'Hoteles',
        'agency': 'Agencia de viajes',
        'ecommerce': 'Comercios',
    }

    const txt = subTypes[details?.category] || ''

    return (
        
        <>
            {banner === 'top' && (
                <>

                    <section className={`__section_main_banner`}>
                        <span>{txt}</span>
                        <h1>{details?.name}</h1>
                        <p>{details?.text}</p>
                    </section>

                    {details?.categories.length > 0 && (
                        <FilterBussines filters={details?.categories} filter={filter} onChangeFilter={onChangeFilter} />
                    )}

                </>
            )}
            
            {banner === 'bottom' && (
                <>
                    <section className={`__section_main_banner_bottom`}>
                        <div className='__box_info'>
                            <h3>Información de la Empresa</h3>
                            <ul>
                                <li>Nombre Comercial: {details?.name}</li>
                                <li>Empresa: {details?.name} S.A.C</li>
                                <li>RUC: {details?.ruc ? details?.ruc : 'No proporciono la información'}</li>
                                <li>Teléfono: {details?.phone}</li>
                                <li>Dirección: {details?.address.direction}</li>
                                <li>Se unió {moment(details?.created).format('LL')}</li>
                            </ul>
                        </div>
                    </section>

                    <section className={`__section_main_banner_bottom_report`}>
                        <ul className='__reports'>
                            <li className='__report'><IconFlagX/> Reportar el negocio</li>
                        </ul>
                    </section>
                </>
            )}
        </>

    )

}