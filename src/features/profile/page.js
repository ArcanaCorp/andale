import { IconChevronRight } from "@tabler/icons-react";
import { itmsLst } from "../../config/profile";
import { useAuth } from "../auth/context/AuthContext";
import Empty from "../pages/Empty";

import banner from '@/shared/images/banner-make.png'
import './styles/page.css'

export default function Profile () {

    const { user } = useAuth();

    return (

        <>
        
            {user === null ? ( <Empty scrn={'profile'} /> ) : (
                <>

                    <header className="--head-pfl">
                        <h3>¡Hola, {user?.name}!</h3>
                    </header>

                    <section className="--section-pfl">

                        {itmsLst.map((il) => (
                        
                            <section key={il.key} className="--sec-itm">
                                <h2 className="--subtlt">{il.title}</h2>
                                <ul className="--sublst">
                                    {il.itms.map((it) => (
                                        <li key={it.key} className="--sublst-itm">
                                            <div className="--col">
                                                {it.ico}
                                                {it.text}
                                            </div>
                                            <IconChevronRight/>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        
                        ))}

                        <section className="--sec-itm">
                            <button className="--btn-logout">Cerrar sesión</button>
                        </section>

                        <section>
                            <img src={banner} alt={`Hecho con Amor en la Primera Capital del Perú - Jauja - ÁndaleYa!`} />
                        </section>
                    
                    </section>
                
                </>
            )}

        </>

    )

}