import { useEffect } from "react";
import { useLocation } from "react-router-dom"
import { trackingVisit } from "../../services/analitycs.service";
import { getOrCreateUserId } from "../../utils/user";

export const useAnalyticsVist = () => {

    const location = useLocation();

    useEffect(() => {

        const tracked = sessionStorage.getItem('visit_tracked')
        if (tracked) return;

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
            metadata: {
                referrer: document.referrer
            }
        };

        trackingVisit(payload);
        sessionStorage.setItem('visit_tracked', '1')

    }, [location.pathname, location.search])

};