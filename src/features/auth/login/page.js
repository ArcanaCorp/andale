import { useState } from "react";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { IconPhone } from "@tabler/icons-react";
import { serviceLogin } from "../services/auth.service";
import { useLocation, useNavigate } from "react-router-dom";

export default function LoginPage () {

    const navigate = useNavigate();
    const location = useLocation();
    const [ phone, setPhone ] = useState('');
    const [ loading, setLoading ] = useState(false);

    const handleLogin = async () => {

        if (!phone) return toast.warning('Alerta', {description: 'Ingresa antes tu número por favor'})

        try {
            
            setLoading(true)

            const data = await serviceLogin(phone)

            if (!data.ok) {
                toast.warning('Alerta', { description: data.message })
            }

            toast.success('Éxito', { description: data.message })
            Cookies.set('o_auth', data.data, { expires: 365 })
            navigate(`/login/verify/${location.search === '' ? '' : location.search}`)
            
        } catch (error) {
            toast.error('Error', {
                description: error.message
            })
        } finally {
            setLoading(false);
        }
    }

    return (

        <>
        
            <div className="__form_group">
                <label>Ingresa tu número telefónico</label>
                <div className="__entry_box">
                    <span className="__ico"><IconPhone/></span>
                    <input type="tel" className="__entry" pattern="[0-9]" minLength={9} maxLength={9} inputMode="tel" name="phone" id="phone" placeholder="Ingresa tu número telefónico" autoComplete="off" onChange={(e) => setPhone(e.target.value)} />
                </div>
            </div>

            <div className="__form_group">
                <button className="__btn" onClick={handleLogin}>{loading ? 'Cargando...' : 'Continuar'}</button>
            </div>

            <div className="__form_group">
                <p className="__txt_terms">Al <b>Continuar</b>, aceptas nuestros <a href="/">Términos y Condiciones</a> y <a href="/">Política de Privacidad</a>.<br/>Podremos enviarte promociones exclusivas y novedades de negocios afiliados para mejorar tu experiencia.</p>
            </div>

        </>

    )

}