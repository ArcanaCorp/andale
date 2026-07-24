export default function EmptyPage ({ page }) {

    const TEXTS_LIST = {
        'super': {
            title: 'Aún no tenemos locales en tu zona',
            text: 'Estamos trabajando para llegar a ti con los mejores supermercados.'
        },
        'promos': {
            title: 'No hay promociones ahora',
            text: '¡Acá vas a ver descuentos y beneficios para aprovechar!'
        },
        'orders': {
            title: 'No tienes pedidos',
            text: 'Aún no realiste ningún pedido. Cuando los tengas las verás acá.'
        },
        'notify': {
            title: 'No tienes notificaciones',
            text: 'Ya viste o eliminaste todas las notificaciones. Cuando tengas nuevas las verás acá.'
        },
        'cart': {
            title: 'No tienes productos',
            text: 'No agregaste o eliminaste los productos del carrito.'
        },
    }

    return (
        <div className="w-full h-full center">
            <div className="w m-auto flex flex-col gap-xs text-center" style={{"--mxw": "90%"}}>
                <h3 className="text-semibold">{TEXTS_LIST[page].title}</h3>
                <p className="text-muted text-xs">{TEXTS_LIST[page].text}</p>
            </div>
        </div>
    )
}