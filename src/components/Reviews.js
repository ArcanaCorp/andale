import { IconStar, IconStarFilled } from '@tabler/icons-react';
import './styles/reviews.css'
import moment from 'moment';
export default function Reviews () {

    const reviews = [
        {
            usuario: "Carlos Mendoza",
            review: "Excelente servicio y atención. Superó mis expectativas.",
            estrellas: 5,
            fecha: "2025-11-05"
        },
        {
            usuario: "Lucía Ramírez",
            review: "Buen producto, aunque tardó un poco en llegar.",
            estrellas: 4,
            fecha: "2025-10-29"
        },
        {
            usuario: "Jorge Paredes",
            review: "Regular, esperaba una mejor calidad por el precio.",
            estrellas: 3,
            fecha: "2025-09-18"
        },
            {
            usuario: "Ana Gutiérrez",
            review: "Muy satisfecho con la compra, volveré a pedir sin duda.",
            estrellas: 5,
            fecha: "2025-11-10"
        },
        {
            usuario: "Fernando Salazar",
            review: "El empaque llegó dañado, pero el producto estaba bien.",
            estrellas: 3,
            fecha: "2025-08-25"
        },
        {
            usuario: "María Torres",
            review: "La atención al cliente fue excelente, resolvieron mi duda rápido.",
            estrellas: 4,
            fecha: "2025-11-01"
        },
        {
            usuario: "Ricardo López",
            review: "No me gustó el material, parece frágil.",
            estrellas: 2,
            fecha: "2025-09-02"
        },
        {
            usuario: "Sofía Aguilar",
            review: "Todo perfecto, llegó antes de lo esperado.",
            estrellas: 5,
            fecha: "2025-11-08"
        },
        {
            usuario: "Valeria Quispe",
            review: "Buena relación calidad-precio. Recomendado.",
            estrellas: 4,
            fecha: "2025-10-12"
        },
        {
            usuario: "Diego Fernández",
            review: "No era lo que esperaba. La descripción no coincidía.",
            estrellas: 2,
            fecha: "2025-07-30"
        }
    ];

    return (

        <ul className='__reviews_lst'>
            {reviews.map((rvw, idx) => (
                <li key={idx} className='__review'>
                    <div className='__review_date'>
                        <div className='__stars'>
                            {Array.from({ length: 5 }).map((_, i) =>
                                i < rvw.estrellas
                                    ? <IconStarFilled key={i} size={18} color="#f5b50a" />
                                    : <IconStar key={i} size={18} color="#ccc" />
                            )}
                        </div>
                        •
                        <p>{moment(rvw.fecha).startOf('day').fromNow()}</p>
                    </div>
                    <p className='__review_comment'>{rvw.review}</p>
                    <h4 className='__review_user'>{rvw.usuario}</h4>
                </li>
            ))}
        </ul>

    )

}