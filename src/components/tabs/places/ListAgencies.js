import { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDB } from '@/context/DBContext';

import { getTopAgency } from '@/services/agency.service';

import Avatars from '@/components/ui/avatars'


import './styles/listagencies.css'

export default function ListAgencies () {

    const navigate = useNavigate();
    const { agencyList, savedAgencyList } = useDB();

    const getAgencies = useCallback( async () => {
        try {
            const data = await getTopAgency();
            if (!data.ok) return console.warn(data.message);
                savedAgencyList(data.data)
        } catch (error) {
            console.error(error)
        }
    }, [savedAgencyList])

    useEffect(() => {
        if (agencyList.length === 0) {
            getAgencies();
        }
    }, [agencyList, getAgencies])

    return (
        <section className="__section __section_agencies">
            <ul className="__list_agencies">
                {agencyList.map((a) => (
                    <li key={a.id} onClick={() => navigate(`/a/${a.short}`, { viewTransition: true })}>
                        <Avatars image={a.photo} size={80} name={a.name} radius={'pill'} />
                        <p>{a.name}</p>
                    </li>
                ))}
            </ul>
        </section>
    )
}