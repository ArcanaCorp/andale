import './styles/empty.css'

export default function Empty ({ scrn }) {

    const emptyTexts = {
        promotions: {
            title: 'No hay promociones disponibles',
            text: 'Aún no tenemos promociones disponibles para ti.'
        },
        favorite: {
            title: 'Aún no tienes favoritos',
            text: 'Los favoritos que agregues apareceran aquí.'
        },
        orders: {
            title: 'No tienes pedidos aún',
            text: 'Cuando compres algo, aparecerá aquí.'
        },
        profile: {
            title: 'Únete a nosotros',
            text: 'Únete a nosotros para recibir promociones especiales y descuentos.',
            link: '/login',
            label: 'Ingresar a la cuenta'
        },
        notify: {
            title: 'Aún no tienes notificaciones',
            text: 'Te notificaremos en cuenta allá promos especiales.'
        },
        cart: {
            title: 'Tu carrito de compras está vacio',
            text: 'Cuando añadas un producto al carrito aparecerá aquí.'
        }
    }

    // Si no existe el key, fallback genérico
    const { title, text, link, label } = emptyTexts[scrn] || {
        title: 'Sin datos',
        text: 'No hay información disponible en este momento.',
        link: '',
        label: ''
    }

    return (

        <div className='__wdg_empty'>
            <div className='__box_empty'>
                <h3>{title}</h3>
                <p>{text}</p>
                {link && (
                    <a href={link} className='__btn_link'>{label}</a>
                )}
            </div>
        </div>

    )

}