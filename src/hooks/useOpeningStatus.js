'use client';

import { useEffect, useState } from "react";
import { getOpeningStatus } from "@/functions/opening-hours.function";

export function useOpeningStatus(openingHours) {

    const [status, setStatus] = useState(null);

    useEffect(() => {

        if (!openingHours) {
            setStatus(null);
            return;
        }

        const updateStatus = () => {
            setStatus(
                getOpeningStatus(openingHours)
            );
        };

        updateStatus();

        const interval = setInterval(
            updateStatus,
            60 * 1000
        );

        return () => clearInterval(interval);

    }, [openingHours]);

    return status;

}