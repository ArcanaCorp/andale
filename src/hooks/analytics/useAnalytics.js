import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { trackingVisit } from "../../services/analitycs.service";
import { getOrCreateUserId } from "../../utils/user";
import { usePermissions } from "../../context/PermissionsContext";

export const useAnalyticsVist = () => {
    const location = useLocation();
    const { locationRegion } = usePermissions();
    const hasTracked = useRef(false); // <-- evita doble insert

    useEffect(() => {
        if (hasTracked.current) return; // ya se ejecutó
        if (sessionStorage.getItem('visit_tracked')) return;

        // Si locationRegion aún no tiene datos, esperamos
        if (!locationRegion || Object.keys(locationRegion).length === 0) return;

        const params = new URLSearchParams(location.search);

        const payload = {
            sub_user: getOrCreateUserId(),
            session_id: crypto.randomUUID(),
            source: params.get("utm_source"),
            medium: params.get("utm_medium"),
            campaign: params.get("utm_campaign"),
            partner_id: params.get("partner_id"),
            landing_page: location.pathname,
            device_info: navigator.userAgent,
            country: locationRegion.country,
            region: locationRegion.region,
            city: locationRegion.province,
            metadata: {
                referrer: document.referrer
            }
        };

        trackingVisit(payload)
            .then(() => {
                sessionStorage.setItem('visit_tracked', '1');
                hasTracked.current = true; // <-- bloquea siguiente ejecución
            })
            .catch(err => console.error("Error tracking visit:", err));
        
    }, [location.pathname, location.search, locationRegion]);
};