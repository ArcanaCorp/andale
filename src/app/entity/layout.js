import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { getEntityBySlug } from "@/services/entity.service";
import ErrorScreen from "../../components/ErrorScreen";
import SplashScreen from "../../components/SplashScreen";

export default function EntityLayout () {{

    const { slug } = useParams();

    const [entity, setEntity] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!slug) return;

        const fetchEntity = async () => {
            try {
                setLoading(true);
                const data = await getEntityBySlug(slug);
                setEntity(data);
            } catch (err) {
                setError(err.message || "No encontrado");
            } finally {
                setLoading(false);
            }
        };

        fetchEntity();
    }, [slug])

    if (loading) return <SplashScreen/>;

    if (error || !entity) return <ErrorScreen/>;

    return <Outlet context={{entity}} />

}}