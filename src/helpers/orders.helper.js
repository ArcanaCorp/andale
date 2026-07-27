export const STATUS_VIEW = {
    pending: {
        label: "Pendiente",
        title: "Tu pedido fue enviado",
        description: "El local todavía debe confirmar tu pedido.",
        progress: 10
    },
    accepted: {
        label: "Aceptado",
        title: "El local recibió tu pedido",
        description: "En unos minutos arranca la preparación.",
        progress: 30
    },
    preparing: {
        label: "En preparación",
        title: "Tu pedido está en preparación",
        description: "El local está preparando tus productos.",
        progress: 55
    },
    ready: {
        label: "Listo",
        title: "Tu pedido está listo",
        description: "Puedes recogerlo o esperar el envío.",
        progress: 75
    },
    on_the_way: {
        label: "En camino",
        title: "Tu pedido está en camino",
        description: "El pedido ya salió hacia tu dirección.",
        progress: 85
    },
    completed: {
        label: "Completado",
        title: "Pedido completado",
        description: "Gracias por comprar con Ándale Ya!",
        progress: 100
    },
    cancelled: {
        label: "Cancelado",
        title: "Pedido cancelado",
        description: "Este pedido fue cancelado.",
        progress: 100
    },
    rejected: {
        label: "Rechazado",
        title: "Pedido rechazado",
        description: "El local no pudo aceptar este pedido.",
        progress: 100
    }
};

export const PAYMENT_LABELS = {
    cash: "Efectivo",
    yape: "Yape",
    plin: "Plin",
    card: "Tarjeta",
    other: "Otro"
};

export const ORDER_TYPE_LABELS = {
    delivery: "Delivery",
    pickup: "Recojo",
    dine_in: "En local"
};

export const formatMoney = (value) => {
    return Number(value || 0).toLocaleString("es-PE", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

export const formatTimeRange = (order) => {

    const min = order?.estimated_delivery_time_min || order?.delivery_time_min || null;
    const max = order?.estimated_delivery_time_max || order?.delivery_time_max || null;

    if (min && max) return `${min} - ${max} min`;

    if (min) return `${min} min aprox.`;

    return "Tiempo por confirmar";
}