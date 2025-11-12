import HeaderNavigate from "@/components/HeaderNavigate";
import Filters from "@/components/Filters";
import './styles/layout.css'

export default function HeaderHotel () {

    const list = [
        {
            category: '1 estrella'
        },
        {
            category: '2 estrellas'
        },
        {
            category: '3 estrellas'
        },
        {
            category: '4 estrellas'
        },
        {
            category: '5 estrellas'
        },
        {
            category: 'Campestre'
        },
        {
            category: 'Casa hospedaje'
        }
    ]

    return (

        <header className="__header_hotels">
            <HeaderNavigate cart={false} />
            <div className="__row __row_B">
                <Filters defecto={'Todo'} filtros={list} />
            </div>
        </header>

    )

}