'use client';

import { getBussines } from "@/services/bussines.service";
import { useState } from "react";

export const useBussines = () => {

    const [ list, setList ] = useState([]);
    const [ load, setLoad ] = useState(true);

    const getList = async () => {
        try {
            const data = await getBussines();
            if (!data.ok) throw new Error(data.message || data.error);
                setList(data.data)
        } catch (error) {
            console.error(error);
        } finally {
            setLoad(false);
        }
    }

    return {
        list,
        load,
        getList
    }

}