import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackingVisit, pushVisitParam } from "../../services/analitycs.service";
import { getOrCreateUserId } from "../../utils/user";
import { usePermissions } from "../../context/PermissionsContext";
import { buildParamsFingerprint } from "../../helpers/fingerprint";

const SESSION_KEY = "session_id";
const VISIT_CREATED_KEY = "visit_created";

export const useAnalyticsVist = () => {
    const location = useLocation();
    const { locationRegion } = usePermissions();

    useEffect(() => {
        // 1️⃣ Esperar región
        const hasRegionData =
            locationRegion?.country &&
            locationRegion?.region &&
            locationRegion?.province;

        if (!hasRegionData) return;

        // 2️⃣ Obtener o crear session_id
        let sessionId = sessionStorage.getItem(SESSION_KEY);
        if (!sessionId) {
            sessionId = crypto.randomUUID();
            sessionStorage.setItem(SESSION_KEY, sessionId);
        }

        // 3️⃣ Crear visita SOLO una vez
        if (!sessionStorage.getItem(VISIT_CREATED_KEY)) {
            const payload = {
                sub_user: getOrCreateUserId(),
                session_id: sessionId,
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
                    sessionStorage.setItem(VISIT_CREATED_KEY, "1");
                })
                .catch(console.error);
        }

        const params = new URLSearchParams(location.search);

        if (params.toString()) {
            const paramsKey = `visit_params_sent_${buildParamsFingerprint(
                location.pathname,
                location.search
            )}`;

            if (!sessionStorage.getItem(paramsKey)) {
                params.forEach((value, key) => {
                    pushVisitParam({
                        session_id: sessionId,
                        param_name: key,
                        param_value: value
                    });
                });

                // Marcar ESTA combinación como enviada
                sessionStorage.setItem(paramsKey, "1");

                // Limpiar URL sin recargar
                window.history.replaceState(
                    {},
                    document.title,
                    window.location.pathname
                );
            }
        }

    }, [location.pathname, location.search, locationRegion]); // ⚠️ NO depende de pathname
};