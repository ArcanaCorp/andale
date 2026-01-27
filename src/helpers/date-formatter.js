import moment from 'moment'
import 'moment/locale/es';
moment.locale('es-mx');

export const formattedDate = (date, type) => {
    return moment(date).format(type)
}

export const formatDateToDayMonth = (dateStr) => {
    const date = moment(dateStr, "YYYY-MM-DD"); // parseamos la fecha
    return {
        day: date.date(),           // día del mes
        month: date.format("MMM").toLowerCase() // mes abreviado en minúscula, ej: "mar"
    };
}