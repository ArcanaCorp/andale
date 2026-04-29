import Card from "@/components/Card";
import { AppIcon } from "@/helpers/icons";

export default function Page () {
    return (
        <>
            <div className="w-full flex flex-col gap-md mb-md">
                <div className="w-full px-md">
                    <h1 className="w text-2xl fw-normal" style={{"--mxw": "80%"}}>Tu ruta ideal para hoy</h1>
                    <p className="flex items-center gap-xs text-muted text-xs">Basado en tu ubicación y preferencias.</p>
                </div>
                <div className="w-full px-md">
                    <button className="btn btn-block btn-primary rounded-pill">Genera tu ruta personalizada con IA</button>
                </div>
            </div>
            <div className="w-full flex flex-col gap-md">
                <div className="w-full flex items-center justify-between px-md">
                    <h2 className="text-lg fw-medium">Rutas recomendadas</h2>
                </div>
                <ul className="w-full flex flex-col px-md gap-md">
                    {Array.from({length: 4}).map((_, i) => (
                        <li key={i} className="w-full flex gap-md">
                            <div className="center w h bg-primary rounded-pill text-white" style={{"--w": "50px", "--mnw": "50px", "--h": "50px"}}><AppIcon name={'food'} /></div>
                            <Card/>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}