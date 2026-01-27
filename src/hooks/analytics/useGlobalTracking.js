import { useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { getOrCreateUserId } from "@/utils/user";
import { trackEvents } from "@/services/analitycs.service";

export const useGlobalTracking = ( batchSize = 10, intervalMs = 5000, scrollThrottleMs = 200) => {
    
    const location = useLocation();

    const eventsBuffer = useRef([]);
    const lastScrollTime = useRef(0);

    const batchSizeRef = useRef(batchSize);
    const intervalMsRef = useRef(intervalMs);
    const scrollThrottleMsRef = useRef(scrollThrottleMs);

    const SESSION_KEY = "session_id";

    // 🧠 Session ID único por pestaña
    let sessionId = sessionStorage.getItem(SESSION_KEY);
    if (!sessionId) {
        sessionId = crypto.randomUUID();
        sessionStorage.setItem(SESSION_KEY, sessionId);
    }

    // 📌 Flush de eventos
    const flushEvents = useCallback(() => {
        if (eventsBuffer.current.length === 0) return;

        const toSend = [...eventsBuffer.current];
        eventsBuffer.current = [];

        trackEvents(toSend).catch(err => {
            console.error("Error sending events:", err);
            eventsBuffer.current.unshift(...toSend);
        });
    }, []);

    // 📌 Push de eventos (buffer)
    const pushEvent = useCallback(
        (event) => {
            const timestamp = new Date().toISOString();

            eventsBuffer.current.push({
                ...event,
                session_id: sessionId,
                sub_user: getOrCreateUserId(),
                pathname: event.pathname || location.pathname,
                created_at: timestamp
            });

            if (eventsBuffer.current.length >= batchSizeRef.current) {
                flushEvents();
            }
        },
        [flushEvents, location.pathname, sessionId]
    );

    useEffect(() => {
        // 1️⃣ Pageview
        pushEvent({
            event_type: "pageview",
            metadata: {
                url: window.location.href,
                title: document.title,
                referrer: document.referrer
            },
            pathname: location.pathname
        });

        // 2️⃣ Click tracking
        const handleClick = (e) => {
            setTimeout(() => {
                const target = e.target;

                pushEvent({
                    event_type: "click",
                    metadata: {
                        id: target?.id || null,
                        classList: target?.classList
                            ? Array.from(target.classList)
                            : [],
                        text: target?.innerText?.slice(0, 50) || null,
                        dataset: target?.dataset || null
                    },
                    pathname: window.location.pathname
                });
            }, 50);
        };

        window.addEventListener("click", handleClick);

        // 3️⃣ Scroll tracking (throttled)
        const handleScroll = () => {
            const now = Date.now();
            if (now - lastScrollTime.current < scrollThrottleMsRef.current) return;
            lastScrollTime.current = now;

            const scrollHeight =
                document.body.scrollHeight - window.innerHeight;

            pushEvent({
                event_type: "scroll",
                metadata: {
                    scrollY: window.scrollY,
                    scrollX: window.scrollX,
                    viewportHeight: window.innerHeight,
                    scrollPercent: scrollHeight > 0
                        ? Math.round((window.scrollY / scrollHeight) * 100)
                        : 0
                },
                pathname: window.location.pathname
            });
        };

        window.addEventListener("scroll", handleScroll);

        // 4️⃣ Intervalo de flush
        const interval = setInterval(
            flushEvents,
            intervalMsRef.current
        );

        // Cleanup
        return () => {
            window.removeEventListener("click", handleClick);
            window.removeEventListener("scroll", handleScroll);
            clearInterval(interval);
            flushEvents();
        };
    }, [location.pathname, pushEvent, flushEvents]);

    return {
        pushEvent,
        flushEvents
    };
};