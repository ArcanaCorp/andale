import './styles/avatar.css'
export default function Avatars ({ image, size, name, radius }) {
    return (
        <div className={`__avatar`} style={{width: `${size}px`, height: `${size}px`, minWidth: `${size}px`, backgroundImage: `url(${image})`, borderRadius: `var(--radius-${radius})`}}>
            <img src={image} alt={`Foto del restaurante ${name} aliado de ÁndaleYa!`} loading='lazy' style={{display: 'none'}} />
        </div>
    )
}