import { IconChevronLeft, IconSearch } from "@tabler/icons-react";
import { Link } from "react-router-dom";

export default function SearchHeader () {

    return (

        <header className="__header_search">
            <Link to={'/'} className="__btn_back" viewTransition><IconChevronLeft/></Link>
            <div className="__search">
                <div className="__ico"><IconSearch/></div>
                <input type="search" className="__searching_entry" autoFocus placeholder="Buscar lugares, restaurantes, hoteles y más" />
            </div>
        </header>

    )

}