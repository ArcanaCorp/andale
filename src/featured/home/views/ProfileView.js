import { IconBubble, IconChevronRight, IconFlag, IconInfoCircle, IconLogout2, IconPhone, IconSpeakerphone, IconUserCircle } from "@tabler/icons-react";
import { useAuth } from "@/context/AuthContext";
import { handleOpenLink } from "@/libs/helpers";
import { useNavigate } from "react-router-dom";
import { appVersion } from "@/config";
import './styles/profile.css'

export default function ProfileView () {

    const navigate = useNavigate();
    const { user } = useAuth();
    

    return (

        <>

            <section className='__section_profile'>
                <h5>Cuenta</h5>
                <ul className="__lst_actions">
                    {user !== null ? (
                        <>
                            <li className="__itm_action">
                                <span className={`__span_flex`}><IconUserCircle/> Nombre de usuario</span>
                                <span className={`__span_flex`}><IconChevronRight/></span>
                            </li>
                            <li className="__itm_action">
                                <span className={`__span_flex`}><IconPhone/> Teléfono</span>
                                <span className={`__span_flex`}><IconChevronRight/></span>
                            </li>
                        </>
                    ) : (
                        <li className="__itm_action" onClick={() => navigate('/login')}>
                            <span className={`__span_flex`}><IconUserCircle/> Ingresar a la cuenta</span>
                            <span className={`__span_flex`}><IconChevronRight/></span>
                        </li>
                    )}
                </ul>
            </section>

            {user !== null && (
                <section className='__section_profile'>
                    <h5>Promoción y publicidad</h5>
                    <ul className="__lst_actions">
                        <li className="__itm_action">
                            <span className={`__span_flex`}><IconSpeakerphone/> Publicidad</span>
                            <span className={`__span_flex`}><IconChevronRight/></span>
                        </li>
                    </ul>
                </section>
            )}

            <section className='__section_profile'>
                <h5>Ayuda e información</h5>
                <ul className="__lst_actions">
                    <li className="__itm_action" onClick={() => handleOpenLink('https://wa.me/51966327426?text=Informar+un+problema+en+Ándale+Ya')}>
                        <span className={`__span_flex`}><IconFlag/> Informar de un problema</span>
                        <span className={`__span_flex`}><IconChevronRight/></span>
                    </li>
                    <li className="__itm_action" onClick={() => handleOpenLink('https://wa.me/51966327426?text=Ayuda+en+Ándale+Ya')}>
                        <span className={`__span_flex`}><IconBubble/> Ayuda</span>
                        <span className={`__span_flex`}><IconChevronRight/></span>
                    </li>
                    <li className="__itm_action" onClick={() => handleOpenLink('https://andaleya.pe/legal')}>
                        <span className={`__span_flex`}><IconInfoCircle/> Términos y políticas</span>
                        <span className={`__span_flex`}><IconChevronRight/></span>
                    </li>
                </ul>
            </section>

            {user !== null && (
                <section className='__section_profile'>
                    <h5>Inicio de Sesión</h5>
                    <ul className="__lst_actions">
                        <li className="__itm_action">
                            <span className={`__span_flex`}><IconLogout2/> Cerrar Sesión</span>
                            <span className={`__span_flex`}><IconChevronRight/></span>
                        </li>
                    </ul>
                </section>
            )}

            <div className="__section_info">
                <p>Versión: {appVersion}</p>
                <p>Hecho con ♥️ en Jauja</p>
            </div>

        </>

    )

}