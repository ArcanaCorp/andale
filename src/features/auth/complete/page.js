import { useState } from "react";
import { toast } from "sonner";
import { IconUserCircle } from "@tabler/icons-react";
import { serviceComplete } from "../services/auth.service";
import { useNavigate } from "react-router-dom";

export default function CompletePage () {

    const navigate = useNavigate();
    const [ name, setName ] = useState('')
    const [ loading, setLoading ] = useState(false)

    const handleComplete =  async () => {
        
        if (!name) return toast.warning('Alerta', { description: 'Ingresa tu nombre antes por favor' })

        try {
            
            setLoading(true);

            const data = await serviceComplete(name);

            if (!data.ok) return toast.warning('Alerta', { description: data.message })

                toast.success('Éxito', { description: data.message })
                navigate('/')

        } catch (error) {
            toast.error('Error', { description: error.message })
        } finally {
            setLoading(false)
        }
    }

    return (

        <>
        
            <div className="__form_group">
                <label>Ingresa tu nombre completo</label>
                <div className="__entry_box">
                    <span className="__ico"><IconUserCircle/></span>
                    <input type="text" className="__entry" inputMode="text" placeholder="Ingresa tu nombre completo" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
            </div>

            <div className="__form_group">
                <button className="__btn" onClick={handleComplete}>{loading ? 'Completando...' : 'Completar'}</button>
            </div>

        </>

    )

}