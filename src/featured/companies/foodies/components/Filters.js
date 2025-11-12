import { IconAdjustmentsHorizontal } from '@tabler/icons-react'
import './styles/filters.css'
export default function Filters () {

    return (

        <ul className="__filters">
            <li className={`__filter`}>
                <IconAdjustmentsHorizontal/>
                <span>Filtrar</span>
            </li>
            <li className={`__filter`}>Retiro en local</li>
            <li className={`__filter`}>Descuentos</li>
            <li className={`__filter`}>Envío gratis</li>
        </ul>

    )

}