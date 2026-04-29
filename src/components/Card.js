import { AppIcon } from "@/helpers/icons";

export default function Card ({ image, name, text, price }) {
    return (
        <div className="w-full rounded-md border bg-white hidden">
            <div className="relative w-full h bg-surface" style={{"--h": "180px"}}>
                <button className="absolute center w h bg-white rounded-pill" style={{"--w": "40px", "--mnw": "40px", "--h": "40px", "top": "10px", "right": "10px"}}><AppIcon name={'heart'} /></button>
                <img src={image || 'https://placehold.co/600x400/000000/FFFFFF/png'} className="w-full h-full" />
            </div>
            <div className="w-full p-md">
                <div className="w-full flex items-center justify-between">
                    <h3>{name || 'Laguna de Paca'}</h3>
                    <p className="flex items-center gap-xs text-sm text-muted"><AppIcon name={'star'} size={16} color="#ffc107"/> 4.6</p>
                </div>
                <div className="w-full flex">
                    <p className="text-xs text-muted">{text}</p>
                </div>
            </div>
        </div>
    )
}