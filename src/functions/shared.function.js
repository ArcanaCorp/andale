export const shareCopyMap = (entity) => {
    const map = {
        'place': `Descubre ${entity.name} en Ándale Ya, un lugar que no te puedes perder!`,
        'business': `Conoce ${entity.name} en Ándale Ya, el mejor negocio para ti!`,
        'event': `No te pierdas ${entity.name} en Ándale Ya, ¡un evento increíble!`,
        'default': `Mira ${entity.name || entity.title} en Ándale Ya!`
    }
    return map[entity.type] || map['default'] 
};

export const buildShareUrl = (entity, sessionId, params = {}) => {
    const baseUrl = window.location.origin + window.location.pathname;

    // Agregar query params (UTM o session tracking)
    const urlParams = new URLSearchParams({
        ...params,
        shared_by_session: sessionId,
        entity_type: entity.type,
        entity_id: entity.id,
        utm_source: 'shared',
        utm_medium: 'shared_user',
        partner_id: sessionId
    });

    return `${baseUrl}?${urlParams.toString()}`;
};