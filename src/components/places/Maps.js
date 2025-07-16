export default function Maps ({ place, location }) {

    const lugar = `${place} - ${location}`
    const url = `https://www.google.com/maps?q=${encodeURIComponent(lugar)}&output=embed`;

    return (
        <>
            <iframe src={url} width="100%" height="250" style={{ border: 0, borderRadius: 'var(--radius-md)' }} allowFullScreen="" loading="lazy" title={`Mapa de ${place}`}></iframe>
        </>
    )

}