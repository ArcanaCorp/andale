export const handleShare = async ( title, text, url ) => {
    const shareData = {
        title: title || "Ándale Ya!",
        text: text || "Descubre todo desde la palma de tu mano.",
        url: url || "https://andaleya.pe/?utm_source=shared",
    };

    try {
        if (navigator.share) {
            await navigator.share(shareData);
            return { ok: true, message: 'Se compartio correctamente.', error: null };
        }

        // Fallback para navegadores que no soportan navigator.share
        await navigator.clipboard.writeText(url);
        
    } catch (error) {
        // El usuario simplemente cerró el menú de compartir
        if (error?.name === "AbortError") return { ok: false, message: `Hubo un error al compartir`, error: error };;
        console.error("Error al compartir:", error);
    }
};