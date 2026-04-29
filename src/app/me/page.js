'use client';

import { useAuth } from "@/context/AuthContext"
import { AppIcon } from "@/helpers/icons";

export default function Page () {

    const { user, loginWithGoogle } = useAuth();

    const avatarUrl = user?.user_metadata?.avatar_url;

    return (

        <>

            <div className="w-full flex flex-col gap-md mb-md">
                <div className="w-full px-md">
                    <h1 className="w text-2xl fw-normal" style={{"--mxw": "80%"}}>Cuenta</h1>
                    {!user && (<p className="text-muted text-xs">Ingresa con tu cuenta de <b>Google</b> para disfrutar los beneficios.</p>)}
                </div>
            </div>

            <div className="w-full px-md mb-md">
                {!user ? (
                    <button className="w-full bg-white rounded-pill border fw-semibold" onClick={loginWithGoogle}>Ingresar con Google</button>
                ) : (
                    <div className="w-full flex flex-col gap-xs items-center justify-center">
                        <div className="w h rounded-pill bg-white" style={{"--w": "180px", "--mnw": "180px", "--h": "180px"}}>
                            <img src={avatarUrl} onError={(e) => e.currentTarget.src = `https://ui-avatars.com/api/?name=${user?.user_metadata?.name}`} className="w-full h-full rounded-pill" />
                        </div>
                        <h2>{user?.user_metadata?.name}</h2>
                    </div>
                )}
            </div>

            <div className="w-full px-md mb-md flex flex-col gap-md">
                <h3>Beneficios</h3>
                <ul className="w-full bg-white rounded-md flex flex-col">
                    <li className="w-full flex items-center justify-between py-md px-sm">
                        <div className="flex gap-xs items-center">
                            <AppIcon name={'credits'}/>
                            <p className="fw-semibold">Puntos</p>
                        </div>
                        <p className="text-muted text-xs fw-semibold">0 pts</p>
                    </li>
                    <li className="w-full flex items-center justify-between py-md px-sm">
                        <div className="flex gap-xs items-center">
                            <AppIcon name={'ticket'}/>
                            <p className="fw-semibold">Cupones</p>
                        </div>
                        <AppIcon name={'right'} />
                    </li>
                </ul>
            </div>
            <div className="w-full px-md mb-md flex flex-col gap-md">
                <h3>Preferencias</h3>
                <ul className="w-full bg-white rounded-md flex flex-col">
                    <li className="w-full flex items-center justify-between py-md px-sm">
                        <div className="flex gap-xs items-center">
                            <AppIcon name={'bell'}/>
                            <p className="fw-semibold">Notificaciones</p>
                        </div>
                        <AppIcon name={'right'} />
                    </li>
                    <li className="none w-full flex items-center justify-between py-md px-sm">
                        <div className="flex gap-xs items-center">
                            <AppIcon name={'language'}/>
                            <p className="fw-semibold">Idioma</p>
                        </div>
                        <AppIcon name={'right'} />
                    </li>
                    <li className="w-full flex items-center justify-between py-md px-sm">
                        <div className="flex gap-xs items-center">
                            <AppIcon name={'moon'}/>
                            <p className="fw-semibold">Tema</p>
                        </div>
                        <AppIcon name={'right'} />
                    </li>
                </ul>
            </div>
            <div className="w-full px-md mb-md flex flex-col gap-md">
                <h3>Ayuda e información</h3>
                <ul className="w-full bg-white rounded-md flex flex-col gap-sm">
                    <li className="w-full flex items-center justify-between py-md px-sm">
                        <div className="flex gap-xs items-center">
                            <AppIcon name={'store'}/>
                            <p className="fw-semibold">Quiero ser socio</p>
                        </div>
                        <AppIcon name={'right'} />
                    </li>
                    <li className="none w-full flex items-center justify-between py-md px-sm">
                        <div className="flex gap-xs items-center">
                            <AppIcon name={'chamo'}/>
                            <p className="fw-semibold">Quiero ser repartidor</p>
                        </div>
                        <AppIcon name={'right'} />
                    </li>
                    <li className="w-full flex items-center justify-between py-md px-sm">
                        <div className="flex gap-xs items-center">
                            <AppIcon name={'help'}/>
                            <p className="fw-semibold">Centro de ayuda</p>
                        </div>
                        <AppIcon name={'right'} />
                    </li>
                    <li className="w-full flex items-center justify-between py-md px-sm">
                        <div className="flex gap-xs items-center">
                            <AppIcon name={'info'}/>
                            <p className="fw-semibold">Centro de privacidad</p>
                        </div>
                        <AppIcon name={'right'} />
                    </li>
                    <li className="w-full flex items-center justify-between py-md px-sm">
                        <div className="flex gap-xs items-center">
                            <AppIcon name={'shield'}/>
                            <p className="fw-semibold">Términos y políticas</p>
                        </div>
                        <AppIcon name={'right'} />
                    </li>
                    <li className="w-full flex items-center justify-between py-md px-sm">
                        <div className="flex gap-xs items-center">
                            <AppIcon name={'book'}/>
                            <p className="fw-semibold">Libro de reclamaciones</p>
                        </div>
                        <AppIcon name={'right'} />
                    </li>
                </ul>
            </div>
            {user && (
                <div className="w-full px-md mb-md">
                    <button className="w-full bg-white fw-semibold border rounded-pill flex items-center gap-xs justify-center"><AppIcon name={'logout'} /> Cerrar Sesión</button>
                </div>
            )}
            <div className="w-full px-md">
                <p className="text-xs text-center text-muted">Hecho con ♥️ en Jauja</p>
            </div>

        </>

    )
}