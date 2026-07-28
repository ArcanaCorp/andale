'use client';

import Avatar from "@/components/ui/Avatars/Avatar";
import ButtonIcon from "@/components/ui/Buttons/ButtonIcon";
import Loading from "@/components/views/Loading";
import { useAuth } from "@/context/AuthContext";
import { getCustomerFavorites } from "@/services/customer.service";
import { IconChevronLeft, IconHeart, IconMapPin, IconBuildingStore } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const FAVORITE_FILTERS = [
    {
        label: "Todos",
        value: "all"
    },
    {
        label: "Locales",
        value: "business"
    },
    {
        label: "Lugares",
        value: "place"
    }
];

export default function Page() {
    const router = useRouter();
    const { user, loadAuth } = useAuth();

    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState("all");

    const filteredFavorites = useMemo(() => {
        if (activeFilter === "all") {
            return favorites;
        }

        return favorites.filter(
            (item) => item.favorite_type === activeFilter
        );
    }, [favorites, activeFilter]);

    const loadFavorites = async () => {
        try {
            if (!user?.id) {
                setFavorites([]);
                return;
            }

            setLoading(true);

            const data = await getCustomerFavorites(user.id);
            setFavorites(data);

        } catch (error) {
            console.error("Error cargando favoritos:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (loadAuth) return;

        loadFavorites();
    }, [loadAuth, user?.id]);

    if (loadAuth || loading) return <Loading />;

    return (
        <>
            <header
                className="w-full h px-md flex items-center justify-between"
                style={{
                    "--h": "45px"
                }}
            >
                <ButtonIcon
                    size={24}
                    onClick={() => router.back()}
                >
                    <IconChevronLeft size={20} />
                </ButtonIcon>

                <h2 className="text-sm text-semibold">
                    Favoritos
                </h2>

                <div style={{ width: 24 }} />
            </header>

            <main
                className="w-full h py-md scroll-y"
                style={{
                    "--h": "calc(100dvh - 45px)"
                }}
            >
                <ul className="w-full flex items-center gap-xs scroll-x px-md mb-md">
                    {FAVORITE_FILTERS.map((item) => (
                        <li key={item.value}>
                            <button
                                type="button"
                                className={`badge ${activeFilter === item.value ? "is-active" : ""}`}
                                onClick={() => setActiveFilter(item.value)}
                            >
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>

                {filteredFavorites.length > 0 ? (
                    <ul className="w-full flex flex-col gap-md px-md">
                        {filteredFavorites.map((item) => {
                            const isBusiness = item.favorite_type === "business";
                            const data = isBusiness
                                ? item.businesses
                                : item.places;

                            if (!data) return null;

                            const title = isBusiness
                                ? data.commercial_name || data.name
                                : data.name;

                            const image = isBusiness
                                ? data.profile_image_url || data.cover_image_url
                                : data.image_url || data.cover_image_url;

                            const href = isBusiness
                                ? `/foodies/${data.slug}`
                                : `/places/${data.slug || data.id}`;

                            const category = isBusiness
                                ? data.category || "Restaurante"
                                : data.category || data.type || "Lugar turístico";

                            const location =
                                data.district ||
                                data.province ||
                                data.region ||
                                "Jauja";

                            return (
                                <li key={item.id}>
                                    <Link
                                        href={href}
                                        className="w-full flex gap-md"
                                    >
                                        <Avatar
                                            image={image}
                                            name={title}
                                            size={72}
                                            rounded="rounded-md"
                                        />

                                        <div className="w-full flex flex-col gap-2xs">
                                            <div className="w-full flex items-center justify-between gap-sm">
                                                <h4>
                                                    {title}
                                                </h4>

                                                {isBusiness ? (
                                                    <IconBuildingStore
                                                        size={18}
                                                        style={{
                                                            minWidth: "18px"
                                                        }}
                                                    />
                                                ) : (
                                                    <IconMapPin
                                                        size={18}
                                                        style={{
                                                            minWidth: "18px"
                                                        }}
                                                    />
                                                )}
                                            </div>

                                            <p className="text-xs text-muted">
                                                {category}
                                            </p>

                                            <p className="text-xs text-muted">
                                                {location}
                                            </p>

                                            <span className="badge" style={{ width: "fit-content" }}>
                                                {isBusiness ? "Local" : "Lugar"}
                                            </span>
                                        </div>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <div className="w-full h-full grid-center text-center px-md">
                        <div className="flex flex-col items-center gap-sm">
                            <IconHeart size={40} />

                            <h3>
                                No tienes favoritos aún
                            </h3>

                            <p className="text-sm text-muted">
                                Guarda locales y lugares turísticos para encontrarlos más rápido.
                            </p>
                        </div>
                    </div>
                )}
            </main>
        </>
    );
}