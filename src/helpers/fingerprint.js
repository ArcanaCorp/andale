export const buildParamsFingerprint = (pathname, search) => {
    const params = new URLSearchParams(search);

    // Normalizamos (orden estable)
    const entries = Array.from(params.entries())
        .sort(([a], [b]) => a.localeCompare(b));

    return `${pathname}?${entries.map(([k, v]) => `${k}=${v}`).join("&")}`;
};