'use client';

import Avatar from "@/components/ui/Avatars/Avatar";
import ButtonIcon from "@/components/ui/Buttons/ButtonIcon";
import Loading from "@/components/views/Loading";

import { useAuth } from "@/context/AuthContext";
import { getBussinesBySlug } from "@/services/bussines.service";
import {
    getBusinessReviews,
    getMyBusinessReview,
    saveBusinessReview
} from "@/services/reviews.service";

import {
    IconChevronLeft,
    IconStar,
    IconStarFilled
} from "@tabler/icons-react";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

function formatDate(date) {
    if (!date) return "";

    return new Intl.DateTimeFormat("es-PE", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    }).format(new Date(date));
}

function RatingStars({
    value,
    onChange,
    readonly = false,
    size = 22
}) {
    return (
        <div className="flex items-center gap-2xs">
            {[1, 2, 3, 4, 5].map((star) => {
                const active = star <= value;

                const Icon = active
                    ? IconStarFilled
                    : IconStar;

                return (
                    <button
                        key={star}
                        type="button"
                        disabled={readonly}
                        onClick={() => {
                            if (!readonly && onChange) {
                                onChange(star);
                            }
                        }}
                        className="center"
                        style={{
                            color: active
                                ? "var(--color-warning)"
                                : "var(--color-neutral-400)",
                            cursor: readonly ? "default" : "pointer"
                        }}
                    >
                        <Icon size={size} />
                    </button>
                );
            })}
        </div>
    );
}

export default function Page() {
    const router = useRouter();
    const params = useParams();

    const slug = params?.slug;

    const { user, loadAuth } = useAuth();

    const [business, setBusiness] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [errorReviews, setErrorReviews] = useState("");

    const [form, setForm] = useState({
        rating: 5,
        comment: ""
    });

    const average = useMemo(() => {
        if (!reviews.length) return 0;

        const total = reviews.reduce((sum, item) => {
            return sum + Number(item.rating || 0);
        }, 0);

        return total / reviews.length;
    }, [reviews]);

    const loadData = async () => {
        try {
            if (!slug) return;

            setLoading(true);
            setErrorReviews("");

            const businessResult = await getBussinesBySlug(slug);

            if (!businessResult.ok) {
                setErrorReviews(businessResult.message);
                return;
            }

            const businessData = businessResult.data;
            setBusiness(businessData);

            const reviewsData = await getBusinessReviews(businessData.id);
            setReviews(reviewsData);

            if (user?.id) {
                const myReview = await getMyBusinessReview({
                    businessId: businessData.id,
                    userId: user.id
                });

                if (myReview) {
                    setForm({
                        rating: myReview.rating || 5,
                        comment: myReview.comment || ""
                    });
                }
            }

        } catch (error) {
            console.error("Error cargando reseñas:", error);
            setErrorReviews(error.message || "No se pudieron cargar las reseñas.");
        } finally {
            setLoading(false);
        }
    };

    const handleSaveReview = async (event) => {
        event.preventDefault();

        try {
            if (!user?.id) {
                toast.warning("Inicia sesión", {
                    description: "Debes iniciar sesión para dejar una reseña."
                });
                return;
            }

            setSaving(true);

            await saveBusinessReview({
                businessId: business.id,
                user,
                rating: form.rating,
                comment: form.comment
            });

            toast.success("Reseña guardada", {
                description: "Gracias por compartir tu experiencia."
            });

            const reviewsData = await getBusinessReviews(business.id);
            setReviews(reviewsData);

        } catch (error) {
            toast.warning("No se pudo guardar", {
                description: error.message
            });
        } finally {
            setSaving(false);
        }
    };

    useEffect(() => {
        if (!loadAuth) {
            loadData();
        }
    }, [
        loadAuth,
        slug,
        user?.id
    ]);

    if (loadAuth || loading) {
        return <Loading />;
    }

    return (
        <div className="w-full h-screen">
            <div
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
                    Reseñas
                </h2>

                <div style={{ width: 24 }} />
            </div>

            <main
                className="w-full h p-md scroll-y flex flex-col gap-lg"
                style={{
                    "--h": "calc(100dvh - 45px)"
                }}
            >
                {errorReviews ? (
                    <div className="w-full h-full grid-center text-center">
                        <p className="text-sm text-muted">
                            {errorReviews}
                        </p>
                    </div>
                ) : (
                    <>
                        <section className="w-full bg-surface rounded-md p-md flex flex-col gap-sm">
                            <p className="text-xs text-muted">
                                Opiniones sobre
                            </p>

                            <h1 className="text-lg text-semibold">
                                {business?.commercial || business?.title}
                            </h1>

                            <div className="flex items-center gap-sm">
                                <RatingStars
                                    value={Math.round(average)}
                                    readonly
                                    size={20}
                                />

                                <p className="text-sm text-muted">
                                    {reviews.length > 0
                                        ? `${average.toFixed(1)} de 5 · ${reviews.length} reseñas`
                                        : "Sin reseñas todavía"}
                                </p>
                            </div>
                        </section>

                        <form
                            className="w-full bg-surface rounded-md p-md flex flex-col gap-md"
                            onSubmit={handleSaveReview}
                        >
                            <div className="w-full flex flex-col gap-xs">
                                <h3 className="text-sm text-semibold">
                                    Tu reseña
                                </h3>

                                <p className="text-xs text-muted">
                                    Califica tu experiencia con este negocio.
                                </p>
                            </div>

                            <RatingStars
                                value={form.rating}
                                onChange={(rating) =>
                                    setForm((prev) => ({
                                        ...prev,
                                        rating
                                    }))
                                }
                                size={28}
                            />

                            <textarea
                                className="w-full py-sm px-md bg-background rounded-md text-sm"
                                rows={4}
                                placeholder="Escribe un comentario opcional..."
                                value={form.comment}
                                onChange={(event) =>
                                    setForm((prev) => ({
                                        ...prev,
                                        comment: event.target.value
                                    }))
                                }
                            />

                            <button
                                type="submit"
                                className="w-full h rounded-full bg-primary text-white text-sm text-semibold"
                                style={{
                                    "--h": "42px"
                                }}
                                disabled={saving}
                            >
                                {saving
                                    ? "Guardando..."
                                    : "Guardar reseña"}
                            </button>
                        </form>

                        <section className="w-full flex flex-col gap-sm">
                            <h3 className="text-sm text-semibold">
                                Comentarios
                            </h3>

                            {reviews.length > 0 ? (
                                <ul className="w-full flex flex-col gap-md">
                                    {reviews.map((review) => {
                                        const profile = review.profiles;

                                        const name =
                                            profile?.full_name ||
                                            "Usuario de Ándale";

                                        return (
                                            <li
                                                key={review.id}
                                                className="w-full bg-surface rounded-md p-md flex flex-col gap-sm"
                                            >
                                                <div className="w-full flex items-center gap-sm">
                                                    <Avatar
                                                        image={profile?.avatar_url}
                                                        name={name}
                                                        size={42}
                                                        rounded="rounded-full"
                                                    />

                                                    <div className="w-full flex flex-col gap-2xs">
                                                        <h4 className="text-sm text-semibold">
                                                            {name}
                                                        </h4>

                                                        <p className="text-xs text-muted">
                                                            {formatDate(review.created_at)}
                                                        </p>
                                                    </div>
                                                </div>

                                                <RatingStars
                                                    value={review.rating}
                                                    readonly
                                                    size={18}
                                                />

                                                {review.comment && (
                                                    <p className="text-sm">
                                                        {review.comment}
                                                    </p>
                                                )}
                                            </li>
                                        );
                                    })}
                                </ul>
                            ) : (
                                <div className="w-full bg-surface rounded-md p-md text-center">
                                    <p className="text-sm text-muted">
                                        Sé el primero en dejar una reseña.
                                    </p>
                                </div>
                            )}
                        </section>
                    </>
                )}
            </main>
        </div>
    );
}