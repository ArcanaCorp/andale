'use client';

import Location from "@/components/Location";
import NearbyList from "@/components/NearbyList";
import { AppIcon } from "@/helpers/icons";
import Link from "next/link";

export default function Home() {

    return (
        <>
            <div className="w-full flex flex-col gap-md mb-md">
                <div className="w-full px-md">
                    <Location/>
                    <h1 className="w text-2xl fw-normal" style={{"--mxw": "80%"}}>Hola, ¿qué quieres hacer hoy?</h1>
                </div>
                <ul className="w-full flex gap-md scroll-x px-md">
                    <li className="w bg-primary p-md rounded-md text-white" style={{"--mnw": "280px"}}>
                        <Link className="w-full flex flex-col gap-md" href={'/routes'}>
                            <div className="center w h bg-primary-hover text-white rounded-md" style={{"--w": "50px", "--mnw": "50px", "--h": "50px"}}><AppIcon name={'ia'} /></div>
                            <div className="w-full flex flex-col text-white">
                                <h3>Generar ruta con IA</h3>
                                <p className="text-sm text-neutral">Planifica tu día perfecto en segundos.</p>
                            </div>
                        </Link>
                    </li>
                    <li className="w bg-white p-md rounded-md text-white border" style={{"--mnw": "280px"}}>
                        <Link className="w-full flex flex-col gap-md" href={'/foodies'}>
                            <div className="center w h bg-surface text-main rounded-md" style={{"--w": "50px", "--mnw": "50px", "--h": "50px"}}><AppIcon name={'food'} /></div>
                            <div className="w-full flex flex-col text-main">
                                <h3>Explorar restaurantes</h3>
                                <p className="text-sm">Sabor local y cocina de autor.</p>
                            </div>
                        </Link>
                    </li>
                    <li className="w bg-white p-md rounded-md text-white border" style={{"--mnw": "280px"}}>
                        <Link className="w-full flex flex-col gap-md" href={'/hotels'}>
                            <div className="center w h bg-surface text-main rounded-md" style={{"--w": "50px", "--mnw": "50px", "--h": "50px"}}><AppIcon name={'bed'} /></div>
                            <div className="w-full flex flex-col text-main">
                                <h3>Buscar hoteles</h3>
                                <p className="text-sm">Descansa en los mejores lugares.</p>
                            </div>
                        </Link>
                    </li>
                    <li className="w bg-white p-md rounded-md text-white border" style={{"--mnw": "280px"}}>
                        <Link className="w-full flex flex-col gap-md" href={'/discover'}>
                            <div className="center w h bg-surface text-main rounded-md" style={{"--w": "50px", "--mnw": "50px", "--h": "50px"}}><AppIcon name={'discover'} /></div>
                            <div className="w-full flex flex-col text-main">
                                <h3>Experiencias cercanas</h3>
                                <p className="text-sm">Aventuras a la vuelta de la esquina.</p>
                            </div>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="w-full flex flex-col gap-md">
                <div className="w-full flex items-center justify-between px-md">
                    <h2 className="text-lg fw-medium">Lugares cerca de ti</h2>
                </div>
                <NearbyList/>
            </div>
        </>
    )
}