import { Link, useLocation } from "react-router-dom"
import { TABS_LIST } from "@/config/config"
import './styles/tabs.css'

export default function Tabs () {

    const location = useLocation();

    return (

        <ul className="__tabs">
            {TABS_LIST.map((tab, idx) => (
                <li key={idx} className={`__tab`}>
                    <Link to={tab.url} className={`__a_tab ${location.pathname === tab.url ? '__a_tab--active' : ''}`}>
                        <span className="__tab_ico">{tab.ico}</span>
                        <span className="__tab_txt">{tab.txt}</span>
                    </Link>
                </li>
            ))}
        </ul>

    )

}