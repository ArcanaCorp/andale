'use client';

import { db } from "@/libs/supabase";
import Image from "next/image";


export default function Login() {

    const handleGoogle = async () => {

        const { error } = await db.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: window.location.origin
            }
        });

        if (error) {
            console.error('Error con Google:', error);
        }

    };

    return (
        <main className="w-full h-screen">
            <div className="w-full h grid-center" style={{"--h": "calc(100dvh - 160px)"}}>
                <div className="w h" style={{"--w": "250px", "--h": "250px"}}>
                    <Image src={'/logo512.png'} width={250} height={250} alt="Logo de Ándale Ya" />
                </div>
            </div>
            <div className="w-full p-md flex flex-col gap-sm">
                <button type="button" onClick={handleGoogle} className="w-full h rounded-full bg-neutral-200 text-medium" style={{"--h": "48px"}}>Continuar con Google</button>
                <p className="text-xs text-muted text-center">Al dar click en <b>continuar</b> con Google éstas aceptando nuestro términos y condiciones de uso, política de privacidad y uso de datos.</p>
            </div>
        </main>
    );

}