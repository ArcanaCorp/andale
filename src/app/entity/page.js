import { useNavigate, useOutletContext } from "react-router-dom"
import { Icon } from "@/helpers/icons";
import { entityViews } from "@/views/entity/views";
import { useEffect, useRef, useState } from "react";
import { trackEntityEvent } from "@/services/events.service";

export default function EntityPage () {

    const navigate = useNavigate();
    const { entity } = useOutletContext();
    const View = entityViews[entity.type];

    const mainRef = useRef(null);
    const [scrolled, setScrolled] = useState(false);

    const handleShare = async () => {
        trackEntityEvent({
            entity,
            action: "share"
        });

        const shareData = {
            title: entity.name,
            text: `Mira ${entity.name} en Ándale Ya`,
            url: window.location.href
        };

        if (navigator.share) {
            await navigator.share(shareData);
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert("Link copiado al portapapeles");
        }
    };

    useEffect(() => {
        const el = mainRef.current;
        if (!el) return;

        const onScroll = () => {
            setScrolled(el.scrollTop > 20); // umbral negocio-friendly
        };

        el.addEventListener("scroll", onScroll);
        return () => el.removeEventListener("scroll", onScroll);
    }, []);

    if (!View) return <h1>Tipo de entidad no soportado</h1>

    return (
        <>
        
            <main ref={mainRef} className="relative w-full h overflow-y scroll-hidden" style={{"--h": "100dvh"}}>

                <div className={`fixed inset-0 w-full h flex align-center justify-between px-sm zIndex ${scrolled ? 'bg-white border-bottom' : ''}`} style={{"--h": "60px", "--zindex": "10001"}}>
                    <button onClick={() => navigate(-1)} className="w h grid center bg-white text-dark rounded-pill" style={{"--w": "30px", "--h": "30px"}}><Icon name={'close'} size={20} /></button>
                    <div className="flex gap-xs">
                        <button className="w h grid center bg-white text-dark rounded-pill" style={{"--w": "30px", "--h": "30px"}} onClick={handleShare}><Icon name={'shared'} size={20} /></button>
                        <button className="w h grid center bg-white text-dark rounded-pill" style={{"--w": "30px", "--h": "30px"}}><Icon name={'dotsVertical'} size={20} /></button>
                    </div>
                </div>

                <View entity={entity} />

            </main>

        </>
    )
}