import moment from "moment";

const DAYS = [
    "domingo",
    "lunes",
    "martes",
    "miercoles",
    "jueves",
    "viernes",
    "sabado"
];

const createTimeRange = (schedule, date) => {

    if (!schedule?.open || !schedule?.close) return null;

    const [openHour, openMinute] = schedule.open
        .split(":")
        .map(Number);

    const [closeHour, closeMinute] = schedule.close
        .split(":")
        .map(Number);

    const start = date
        .clone()
        .startOf("day")
        .hour(openHour)
        .minute(openMinute)
        .second(0);

    const end = date
        .clone()
        .startOf("day")
        .hour(closeHour)
        .minute(closeMinute)
        .second(0);

    // Ejemplo: 18:00 a 02:00
    if (!end.isAfter(start)) {
        end.add(1, "day");
    }

    return {
        start,
        end
    };

};

export const getOpeningStatus = (openingHours) => {

    if (!openingHours) {
        return {
            isOpen: false,
            status: "unknown",
            label: "Horario no disponible",
            detail: null
        };
    }

    const now = moment();

    const todayIndex = now.day();
    const todayKey = DAYS[todayIndex];

    const todaySchedule = openingHours[todayKey];

    /*
     * Primero revisamos si sigue abierto
     * desde el día anterior.
     *
     * Ejemplo:
     * sábado 18:00 → domingo 02:00
     */
    const previousDayIndex = (todayIndex + 6) % 7;
    const previousDayKey = DAYS[previousDayIndex];

    const previousSchedule = openingHours[previousDayKey];

    if (previousSchedule?.is_open) {

        const previousDate = now.clone().subtract(1, "day");

        const previousRange = createTimeRange(
            previousSchedule,
            previousDate
        );

        if (
            previousRange &&
            now.isBetween(
                previousRange.start,
                previousRange.end,
                undefined,
                "[)"
            )
        ) {
            return {
                isOpen: true,
                status: "open",
                label: "Abierto",
                detail: `Cierra a las ${previousSchedule.close}`,
                open: previousSchedule.open,
                close: previousSchedule.close
            };
        }

    }

    /*
     * El negocio no atiende hoy
     */
    if (!todaySchedule?.is_open) {

        return getNextOpening({
            openingHours,
            now
        });

    }

    const todayRange = createTimeRange(
        todaySchedule,
        now
    );

    if (!todayRange) {
        return {
            isOpen: false,
            status: "unknown",
            label: "Horario no disponible",
            detail: null
        };
    }

    /*
     * Actualmente abierto
     */
    const isOpen = now.isBetween(
        todayRange.start,
        todayRange.end,
        undefined,
        "[)"
    );

    if (isOpen) {
        return {
            isOpen: true,
            status: "open",
            label: "Abierto",
            detail: `Cierra a las ${todaySchedule.close}`,
            open: todaySchedule.open,
            close: todaySchedule.close
        };
    }

    /*
     * Todavía no abre hoy
     */
    if (now.isBefore(todayRange.start)) {
        return {
            isOpen: false,
            status: "closed",
            label: "Cerrado",
            detail: `Abre a las ${todaySchedule.open}`,
            open: todaySchedule.open,
            close: todaySchedule.close
        };
    }

    /*
     * Ya cerró hoy: buscar próxima apertura
     */
    return getNextOpening({
        openingHours,
        now
    });

};


const getNextOpening = ({
    openingHours,
    now
}) => {

    for (let offset = 1; offset <= 7; offset++) {

        const nextDate = now.clone().add(offset, "day");
        const nextDayKey = DAYS[nextDate.day()];

        const schedule = openingHours[nextDayKey];

        if (!schedule?.is_open || !schedule?.open) {
            continue;
        }

        const dayLabel = offset === 1
            ? "mañana"
            : nextDayKey;

        return {
            isOpen: false,
            status: "closed",
            label: "Cerrado",
            detail: `Abre ${dayLabel} a las ${schedule.open}`,
            open: schedule.open,
            close: schedule.close,
            nextDay: nextDayKey
        };

    }

    return {
        isOpen: false,
        status: "closed",
        label: "Cerrado",
        detail: "Sin próxima apertura disponible"
    };

};