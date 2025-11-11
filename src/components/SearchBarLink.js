import { IconSearch } from "@tabler/icons-react";
import './styles/searchbarlink.css'

export default function SearchBarLink ({ type }) {

    return (
        <a href='/search' className={`__a __a_search_bar ${`__a __a_search_bar_${type}`}`}>
            <span>Buscar hamburguesas</span>
            <span className={`__btn_search ${`__btn_search_${type}`}`}><IconSearch/></span>
        </a>
    )

}