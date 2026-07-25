'use client';

import { getBussines } from "@/services/bussines.service";
import { useState, useCallback } from "react";

export const useBussines = () => {
    const [list, setList] = useState([]);
    const [load, setLoad] = useState(true);
    const [error, setError] = useState("");

    const getList = useCallback(async () => {
        setLoad(true);
        setError("");

        try {
            const response = await getBussines();
            if (!response.ok) throw new Error(response.message || "No se pudieron obtener los negocios");
            setList(response.data);
        } catch (error) {
            console.error(error);
            setError(error instanceof Error ? error.message : "Ocurrió un error al obtener los negocios");
        } finally {
            setLoad(false);
        }
    }, []);

    return {
        list,
        load,
        error,
        getList
    };
};