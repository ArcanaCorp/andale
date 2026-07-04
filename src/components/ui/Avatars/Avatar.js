import Image from "next/image";

export default function Avatar ({ image='/fallback.png', name, size, rounded }) {
    return (
        <picture className={`block w h bg-white rounded-sm border-thin border-neutral-100 hidden ${rounded}`} style={{"--w": `${size}px`, "--mnw": `${size}px`, "--h": `${size}px`}}>
            <Image src={image} alt={`Ir a ${name}`} width={size} height={size} />
        </picture>
    )
}