import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { getOrCreateUserId } from "@/utils/user";
import { trackEvents } from "@/services/analitycs.service";

export const useGlobalTracking = (batchSize = 10, intervalMs = 5000, scrollThrottleMs = 200) => {
    const eventsBuffer = useRef([]);
    const sessionIdKey = 'session_id';
    const location = useLocation();
    const lastScrollTime = useRef(0);

    // Session ID único por pestaña
    let sessionId = sessionStorage.getItem(sessionIdKey);
    if (!sessionId) {
        sessionId = crypto.randomUUID();
        sessionStorage.setItem(sessionIdKey, sessionId);
    }

    const pushEvent = (event) => {
        const timestamp = new Date().toISOString();
        eventsBuffer.current.push({
            ...event,
            session_id: sessionId,
            sub_user: getOrCreateUserId(),
            pathname: event.pathname || location.pathname,
            created_at: timestamp,
        });

        if (eventsBuffer.current.length >= batchSize) flushEvents();
    };

    const flushEvents = () => {
        if (eventsBuffer.current.length === 0) return;

        const toSend = [...eventsBuffer.current];
        eventsBuffer.current = [];

        trackEvents(toSend).catch(err => {
            console.error("Error sending events:", err);
            eventsBuffer.current.unshift(...toSend); // reintentar
        });
    };

    useEffect(() => {
        // 1️⃣ Pageview
        pushEvent({
            event_type: 'pageview',
            metadata: {
                url: window.location.href,
                title: document.title,
                referrer: document.referrer
            },
            pathname: location.pathname
        });

        // 2️⃣ Clicks
        const handleClick = (e) => {
            // Delay mínimo para capturar la ruta si hay redirect SPA
            setTimeout(() => {
                pushEvent({
                    event_type: 'click',
                    metadata: {
                        id: e.target.id || null,
                        classList: Array.from(e.target.classList),
                        text: e.target.innerText?.slice(0, 50) || null,
                        dataset: e.target.dataset || null
                    },
                    pathname: window.location.pathname
                });
            }, 50);
        };
        window.addEventListener('click', handleClick);

        // 3️⃣ Scroll con throttle
        const handleScroll = () => {
            const now = Date.now();
            if (now - lastScrollTime.current < scrollThrottleMs) return;
            lastScrollTime.current = now;

            pushEvent({
                event_type: 'scroll',
                metadata: {
                    scrollY: window.scrollY,
                    scrollX: window.scrollX,
                    viewportHeight: window.innerHeight,
                    scrollPercent: Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100)
                },
                pathname: window.location.pathname
            });
        };
        window.addEventListener('scroll', handleScroll);

        // 4️⃣ Intervalo de flush
        const interval = setInterval(() => flushEvents(), intervalMs);

        // Cleanup
        return () => {
            window.removeEventListener('click', handleClick);
            window.removeEventListener('scroll', handleScroll);
            clearInterval(interval);
            flushEvents();
        };
    }, [location.pathname]);

    return { pushEvent, flushEvents };
};