import moment from 'moment'
import 'moment/locale/es';
moment.locale('es-mx');

export const formattedDate = (date, type) => {
    return moment(date).format(type)
}