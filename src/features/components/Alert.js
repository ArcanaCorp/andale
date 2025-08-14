import { IconAlertCircle, IconInfoCircleFilled } from "@tabler/icons-react"

import './styles/alert.css'

export default function Alert ({ title, text, type }) {
    
    const icons = {
        'info': <IconInfoCircleFilled/>,
    }

    const ico = icons[type] || <IconAlertCircle/>

    return (
        <div className={`__alert __alert_${type}`}>
            {ico}
            <div className="__text">
                <h3 className="__tit">{title}</h3>
                <p className="__txt">{text}</p>
            </div>
        </div>
    )
}