import HeaderNavigate from "@/components/HeaderNavigate";
import Filters from "@/components/Filters";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getFilters } from "@/services/filters.service";
import './styles/layout.css'

export default function HeaderPlaces () {

    const [ filters, setFilters ] = useState([])

    const getFilter = async () => {
        try {
            const data = await getFilters();
            if (!data.ok) return toast.warning('Alerta', { description: data.message })
                setFilters(data?.data)
        } catch (error) {
            console.error(error);
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (filters.length === 0) {
            getFilter();
        }
    }, [filters])

    return (

        <header className="__header_places">
            <HeaderNavigate cart={false} />
            <div className="__row __row_B">
                <Filters defecto='Todo' filtros={filters} />
            </div>
        </header>

    )

}