export const shareMessage = (slug, info) => {
    
    const titMap = {
        'restaurant': '¡Mira este restaurante recomendado!',
        'agency': '¡Mira esta agencia recomendada!'
    }

    const linkMap = {
        'restaurant': '&utm_campaign=restaurant_share',
        'agency': '&utm_campaign=agency_share'
    }

    const message = 
        `📍 ${titMap[info?.category]}\n\n` +
        `🍽️ *${info?.name}*\n` +
        `📌 Ubicación: ${info?.location}\n` +
        `📞 Teléfono: ${info?.phone}\n\n` +
        `👀 Mira más aquí 👉 https://kuyaay.com/r/${slug}?utm_source=whatsapp&utm_medium=share&${linkMap[info?.category]}`;
    
    return message;
}