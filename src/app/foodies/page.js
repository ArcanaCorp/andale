'use client';

import { FOODIES_CATEGORY } from "@/config";
import { useState } from "react";

export default function Page () {

    const [ filter, setFilter ] = useState('all');

    return (
        <>
            <div className="w-full flex flex-col gap-md mb-md">
                <div className="w-full px-md">
                    <h1 className="w text-2xl fw-normal" style={{"--mxw": "80%"}}>Disfruta la mejor sazón</h1>
                    <p className="flex items-center gap-xs text-muted text-xs">Las mejores delicias a un click de distancia.</p>
                </div>
                <ul className="w-full flex scroll-x px-md gap-md">
                    <button className={`chip ${filter === 'all' ? 'chip-active' : ''}`} onClick={() => setFilter('all')}>Todo</button>
                    {FOODIES_CATEGORY.map((fc) => (
                        <button key={fc} className={`chip ${filter === fc ? 'chip-active' : ''}`} onClick={() => setFilter(fc)}>{fc}</button>
                    ))}
                </ul>
            </div>
        </>
    )
}