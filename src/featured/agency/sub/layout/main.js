import { useState } from 'react'
import { IconFlagX } from '@tabler/icons-react';
import moment from 'moment'
import Reviews from '@/components/Reviews';
import CardPacks from '../components/card'
import './styles/main.css'
import 'moment/locale/es';

moment.locale('es-mx'); 
export default function MainSubAgency ({ details }) {

    const [ filter, setFilter ] = useState('all')

    return (

        <main className="__main_sub_agency">

            <section className={`__section_main_agency __section_main_agency_present`}>
                <span>Agencia de viajes</span>
                <h1>{details?.name}</h1>
                <p>{details?.text}</p>
            </section>

            <nav className='__nav'>
                <ul className='__nav_lst'>
                    <li className={`__nav_itm ${filter === 'all' && '__nav_itm--active'}`} onClick={() => setFilter('all')}>Todo</li>
                    {details?.categories.map((ctg) => (
                        <li key={ctg.id} className={`__nav_itm ${filter === ctg.name && '__nav_itm--active'}`} onClick={() => setFilter(ctg.name)}>{ctg.name}</li>
                    ))}
                </ul>
            </nav>

            <section className={`__section_main_agency`}>
                <ul className='__lst_elements'>
                    {details?.packs.length > 0 ? (
                        details?.packs.map((pks) => (
                            <CardPacks key={pks.id} details={details} pack={pks} />
                        ))
                    ) : (
                        <div>
                            <p>No hay paquetes disponibles</p>
                        </div>
                    )}
                </ul>
            </section>

            <section className={`__section_main_agency __section_main_agency_review`}>
                <h3>Reviews</h3>
                <Reviews/>
            </section>

            <section className={`__section_main_agency`}>
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

            <section className={`__section_main_agency __section_main_agency_report`}>
                <ul className='__reports'>
                    <li className='__report'><IconFlagX/> Reportar el negocio</li>
                </ul>
            </section>

        </main>

    )

}