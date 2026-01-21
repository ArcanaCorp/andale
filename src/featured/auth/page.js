import { useState } from "react";
import { IconBrandWhatsapp, IconChevronLeft, IconLockPassword, IconUserCircle } from "@tabler/icons-react";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { login, validar } from "./services/auth.service";
import './styles/page.css'
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { updateUserAccount } from "@/services/user.service";
import { TOKEN_KEY_ACCOUNT } from "../../config/config";
export default function LoginPage () {

    const navigate = useNavigate();
    const { fetchAccount } = useAuth();
    const [ formStep, setFormStep ] = useState(1)
    const [ phone, setPhone ] = useState();
    const [ code, setCode ] = useState();
    const [ name, setName ] = useState();
    const [ loading, setLoading ] = useState(false);

    const handleSendPhone = async () => {
        if (!phone || !Number(phone) || phone.length < 9) return toast.warning('Alerta', { description: 'Ingresa un número válido' })
            try {
                setLoading(true);
                const data = await login(phone);
                if (!data.ok) return toast.warning('Alerta', { description: data.message })
                    toast.success('Éxito', { description: data.message })
                    setFormStep(2);
            } catch (error) {
                toast.error('Error', { description: error.message })
            } finally {
                setLoading(false)
            }
    }

    const handleValidePhone = async () => {
        if (!code || !Number(code) || code.length !== 6 || !phone || !Number(phone) || phone.length !== 9) return toast.warning('Alerta', { description: 'Ingrese un código válido por favor.' })
            try {
                setLoading(true)
                const data = await validar(phone, code)
                if (!data.ok) return toast.warning('Alerta', { description: data.message })
                    toast.success('Éxito', { description: data.message })
                    Cookies.set(TOKEN_KEY_ACCOUNT, data.sub, { expires: 365 })
                    if (!data.completed) {
                        setFormStep(3)
                        return;
                    }
                    await fetchAccount()
                    navigate('/')
            } catch (error) {
                toast.error('Error', { description: error.message })
            } finally {
                setLoading(false)
            }
    }

    const handleCompleteInfo = async () => {
        if (!name) return toast.warning('Alerta', { description: 'Completa el campo requerido' })
        try {
            setLoading(true);
            const sub = Cookies.get(TOKEN_KEY_ACCOUNT);
            const data = await updateUserAccount(sub, 'name_user', name)
            if (!data.ok) return toast.warning('Alerta', { description: data.message })
                toast.success('Éxito', { description: data.message })
                await fetchAccount()
                navigate('/')
        } catch (error) {
            toast.error('Error', { description: error.message })
        } finally {
            setLoading(false)
        }
    }

    return (

        <>
        
            <header className="__header_login">
                <a href="/" className="__btn_back"><IconChevronLeft/></a>
                <h3>Iniciar Sesión</h3>
            </header>

            <main className="__main_login">

                <h1 className="__title">
                    <p className="__txt_secondary">Qué bueno</p>
                    <p className="__txt_primary">Tenerte aquí</p>
                </h1>

                <p className="__txt_description">Explora, descubre y aprovecha todo lo que te espera dentro de la app.</p>

                <div className="__form">

                    {formStep === 1 && (
                        <div className="__form_group">
                            <label htmlFor="phone">Ingresa tu número de WhatsApp</label>
                            <div className="__form_control">
                                <span className="__form_ico"><IconBrandWhatsapp/></span>
                                <input type="tel" className="__entry_block" name="phone" id="phone" value={phone} pattern="[0-9]" inputMode="tel" minLength={9} maxLength={9} placeholder="Ingresa tu número de WhatsApp" onChange={(e) => setPhone(e.target.value)} />
                            </div>
                        </div>
                    )}

                    {formStep === 2 && (
                        <div className="__form_group">
                            <label htmlFor="code">Ingresa el código que te enviamos</label>
                            <div className="__form_control">
                                <span className="__form_ico"><IconLockPassword/></span>
                                <input type="number" className="__entry_block" name="code" id="code" value={code} pattern="[0-9]" inputMode="numeric" minLength={6} maxLength={6} placeholder="Ingresa el código de 6 dígitos" onChange={(e) => setCode(e.target.value)} />
                            </div>
                        </div>
                    )}

                    {formStep === 3 && (
                        <div className="__form_group">
                            <label htmlFor="username">Ingresa tu nombre de usuario</label>
                            <div className="__form_control">
                                <span className="__form_ico"><IconUserCircle/></span>
                                <input type="text" className="__entry_block" name="username" id="username" value={name} pattern="^[A-Za-z]{3,}$" inputMode="text" minLength={3} placeholder="Ingresa tu nombre de usuario" onChange={(e) => setName(e.target.value)} />
                            </div>
                        </div>
                    )}

                    <div className="__form_group">
                        {formStep === 1 && (
                            <button className="__btn_block_primary" onClick={handleSendPhone}>{loading ? 'Cargando...' : 'Continuar'}</button>
                        )}
                        {formStep === 2 && (
                            <button className="__btn_block_primary" onClick={handleValidePhone}>{loading ? 'Validando...' : 'Validar'}</button>
                        )}
                        {formStep === 3 && (
                            <button className="__btn_block_primary" onClick={handleCompleteInfo}>{loading ? 'Finalizando...' : 'Continuar'}</button>
                        )}
                    </div>

                    <div className="__form_group">
                        <p>Al usar el servicio estas aceptando los <a  href="/legal/?origin=login">Términos y Condiciones</a>, <a href="/legal/privacy-policy/?origin=login">Política de privacidad y Tratamiendo de datos personales</a>.</p>
                    </div>

                </div>

            </main>

        </>

    )

}