import { IconKey } from "@tabler/icons-react";
import { useState } from "react";
import { toast } from "sonner";
import { serviceVerify } from "../services/auth.service";
import { useNavigate } from "react-router-dom";

export default function VerifyPage () {

    const navigate = useNavigate()
    const [ code, setCode ] = useState('');
    const [ loading, setLoading ] = useState(false);

    const handleVerify = async () => {

        if (!code) return toast.warning('Alerta', {description: 'Ingresa antes tu número por favor'})

        try {

            setLoading(true);

            const data = await serviceVerify(code);

            if (!data.ok) return toast.warning('Alerta', { description: data.message })
                
                toast.success('Éxito', { description: data.message })
                navigate('/login/complete')

        } catch (error) {
            toast.error('Error', {description: error.message})
        } finally {
            setLoading(false);
        }
    }

    return (

        <>
        
            <div className="__form_group">
                <label>Ingresa el código de 6 dígitos.</label>
                <div className="__entry_box">
                    <span className="__ico"><IconKey/></span>
                    <input type="tel" className="__entry" inputMode="tel" pattern="[0-9]" minLength={6} maxLength={6} name="code" id="code" placeholder="Ingresa el código de 6 dígitos" value={code} onChange={(e) => setCode(e.target.value)} />
                </div>
            </div>

            <div className="__form_group">
                <button className="__btn" onClick={handleVerify}>{loading ? 'Verificando...' : 'Verificar'}</button>
            </div>

        </>

    )

}