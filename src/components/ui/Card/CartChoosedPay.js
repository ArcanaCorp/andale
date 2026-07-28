const LIST_PAYMENTS = {
    'yape': {
        title: 'Yape',
        image: 'yape-vector.svg'
    },
    'plin': {
        title: 'Plin',
        image: 'plin-vector.svg'
    },
    'card': {
        title: 'Pago con tarjeta',
        image: null
    },
    'cash': {
        title: 'Efectivo',
        image: null
    },
}

export default function CartChoosedPay ({ form, type, onChoosed }) {
    return (
        <li className={`w h center rounded-md bg-surface text-lg text-bold pointer ${form.payment_method === type ? "border-medium border-brand-500" : ""}`} style={{"--w": "240px", "--mnw": "240px", "--h": "120px"}} onClick={() => onChoosed(type)}>
            {LIST_PAYMENTS[type].image === null ? LIST_PAYMENTS[type].title : ( <img src={`/${LIST_PAYMENTS[type].image}`} className="w-full h-full" alt={`Logo de ${LIST_PAYMENTS[type].title}`} /> )}
        </li>
    )
}