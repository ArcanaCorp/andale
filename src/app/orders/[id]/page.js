'use client'

import { useAuth } from "@/context/AuthContext";

export default function OrderPage () {

    return (

        <div className="w-full h" style={{"--h": "calc(100dvh - 60px)"}}>
            <div className="w-full h px-md flex items-center justify-between" style={{"--h": "45px"}}>
                <div></div>
                <h2 className="text-sm text-semibold">#AND-985203</h2>
                <div/>
            </div>
            <div className="w-full h p-md flex flex-col gap-md" style={{"--h": "calc(100% - 45px)"}}>
                <div className="w-full p-md rounded-md border-medium border-surface flex flex-col gap-sm">
                    <p className={`text-xs text-success text-medium`}>En proceso</p>
                    <h3 className="text-xl text-semibold">10:00 - 10:15</h3>
                    <div className="w-full h rounded-full bg-surface" style={{"--h": "10px"}}>
                        <div className="w h-full bg-dark rounded-full" style={{"--w": `${10}%`}} />
                    </div>
                    <h4 className="text-medium">El local recibió tu pedido</h4>
                    <p className="text-xs text-muted">En unos minutos arranca la preparación.</p>
                </div>
                <div>
                    <h3 className="text-medium">Detalle del pedido</h3>
                </div>
            </div>
        </div>

    )

}