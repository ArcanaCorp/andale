import HeaderNavigate from "@/components/HeaderNavigate";
import Filters from "@/components/Filters";
import './styles/layout.css'

export default function HeaderStore () {

    const list = [
        {
            category: 'Marca Jauja'
        },
        {
            category: 'Artesanías'
        },
        {
            category: 'Souvenirs'
        },
        {
            category: 'Bebidas'
        },
    ]

    return (

        <header className="__header_store">
            <HeaderNavigate/>
            <div className="__row __row_B">
                <Filters defecto={'Todo'} filtros={list} />
            </div>
        </header>

    )

}