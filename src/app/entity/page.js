import { useNavigate, useOutletContext } from "react-router-dom"
import { Icon } from "@/helpers/icons";
import { entityViews } from "@/views/entity/views";
import { useEffect, useRef, useState } from "react";
import { buildShareUrl, shareCopyMap } from "@/functions/shared.function";
import { getOrCreateUserId } from "@/utils/user";
import { trackEntityEvent } from "../../services/events.service";
import { trackEvents } from "../../services/analitycs.service";

export default function EntityPage () {

    const navigate = useNavigate();
    const { entity } = useOutletContext();
    const View = entityViews[entity.type];

    const mainRef = useRef(null);
    const [scrolled, setScrolled] = useState(false);

    const handleShare = async () => {

        const timestamp = new Date().toISOString();

        const sessionId = getOrCreateUserId();

        // Build copy dinámico
        const shareText = shareCopyMap(entity);

        // Build URL con tracking
        const shareUrl = buildShareUrl(entity, sessionId);
        
        // Enviar al tracking
        await trackEntityEvent({
            entity: entity, 
            action: 'share'
        })

        const events = [{
            session_id: sessionId,// puedes derivar otro hash si quieres
            event_type: entity.type,
            pathname: window.location,
            metadata: {
                action: "share",
                entity_type: entity.type,
                entity_id: entity.id,
                share_url: shareUrl
            },
            created_at: timestamp
        }]

        await trackEvents(events)

        // Ejecutar share nativo o copiar link
        const shareData = {
            title: entity.name,
            text: shareText,
            url: shareUrl
        };

        if (navigator.share) {
            await navigator.share(shareData);
        } else {
            await navigator.clipboard.writeText(shareUrl);
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
                    <button onClick={() => navigate('/')} className="w h grid center bg-white text-dark rounded-pill" style={{"--w": "30px", "--h": "30px"}}><Icon name={'close'} size={20} /></button>
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