'use client';

import ButtonIcon from "@/components/ui/Buttons/ButtonIcon";
import Loading from "@/components/views/Loading";
import { getBussinesBySlug } from "@/services/bussines.service";

import {
    IconBrandFacebook,
    IconBrandInstagram,
    IconBrandTiktok,
    IconCash,
    IconChevronLeft,
    IconClock,
    IconCreditCard,
    IconInfoCircle,
    IconMapPin,
    IconPhone,
    IconShoppingBag,
    IconStar,
    IconTruckDelivery,
    IconWorldWww
} from "@tabler/icons-react";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DAYS = [
    ["lunes", "Lunes"],
    ["martes", "Martes"],
    ["miercoles", "Miércoles"],
    ["jueves", "Jueves"],
    ["viernes", "Viernes"],
    ["sabado", "Sábado"],
    ["domingo", "Domingo"]
];

function formatMoney(value, currency = "PEN") {
    const amount = Number(value || 0);

    if (currency === "PEN") {
        return `S/ ${amount.toFixed(2)}`;
    }

    return `${currency} ${amount.toFixed(2)}`;
}

function formatYesNo(value) {
    return value ? "Sí" : "No";
}

function Section({ title, children }) {
    return (
        <section className="w-full flex flex-col gap-sm">
            <h3 className="text-sm text-semibold">
                {title}
            </h3>

            <div className="w-full bg-surface rounded-md p-md flex flex-col">
                {children}
            </div>
        </section>
    );
}

function InfoRow({ icon, label, value, href }) {
    if (!value && value !== 0) return null;

    const content = (
        <div className="w-full flex items-start gap-sm py-sm">
            <div
                className="center rounded-full bg-background"
                style={{
                    width: 34,
                    height: 34,
                    minWidth: 34
                }}
            >
                {icon}
            </div>

            <div className="w-full flex flex-col gap-2xs">
                <p className="text-xs text-muted">
                    {label}
                </p>

                <p className="text-sm">
                    {value}
                </p>
            </div>
        </div>
    );

    if (href) {
        return (
            <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="w-full"
            >
                {content}
            </a>
        );
    }

    return content;
}

export default function Page() {
    const router = useRouter();
    const params = useParams();

    const slug = params?.slug;

    const [business, setBusiness] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorInfo, setErrorInfo] = useState("");

    const loadBusiness = async () => {
        try {
            if (!slug) return;

            setLoading(true);
            setErrorInfo("");

            const cached = sessionStorage.getItem(`business_${slug}`);

            if (cached) {
                setBusiness(JSON.parse(cached));
            }

            const result = await getBussinesBySlug(slug);

            if (!result.ok) {
                setErrorInfo(result.message);
                setBusiness(null);
                return;
            }

            setBusiness(result.data);

        } catch (error) {
            console.error("Error cargando negocio:", error);
            setErrorInfo("No se pudo cargar la información del negocio.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadBusiness();
    }, [slug]);

    if (loading) {
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
                    Más información
                </h2>

                <div style={{ width: 24 }} />
            </div>

            {errorInfo || !business ? (
                <main
                    className="w-full h grid-center p-md"
                    style={{
                        "--h": "calc(100dvh - 45px)"
                    }}
                >
                    <p className="text-sm text-muted text-center">
                        {errorInfo || "No se encontró información."}
                    </p>
                </main>
            ) : (
                <main
                    className="w-full h p-md scroll-y flex flex-col gap-lg"
                    style={{
                        "--h": "calc(100dvh - 45px)"
                    }}
                >
                    <section className="w-full flex flex-col gap-xs">
                        <h1 className="text-xl text-semibold">
                            {business.commercial || business.title}
                        </h1>

                        <p className="text-sm text-muted">
                            {business.category || business.type || "Negocio local"}
                        </p>

                        <div className="flex items-center gap-xs">
                            <span className={`badge ${business.status?.is_open ? "badge-ready" : "badge-cancelled"}`}>
                                {business.status?.is_open ? "Abierto" : "Cerrado"}
                            </span>

                            {business.status?.accepts_orders && (
                                <span className="badge badge-accepted">
                                    Acepta pedidos
                                </span>
                            )}
                        </div>
                    </section>

                    {(business.description || business.short_description) && (
                        <Section title="Descripción">
                            <InfoRow
                                icon={<IconInfoCircle size={18} />}
                                label="Sobre el negocio"
                                value={business.description || business.short_description}
                            />
                        </Section>
                    )}

                    <Section title="Ubicación">
                        <InfoRow
                            icon={<IconMapPin size={18} />}
                            label="Dirección"
                            value={
                                [
                                    business.address,
                                    business.reference,
                                    business.location?.district,
                                    business.location?.province
                                ].filter(Boolean).join(", ")
                            }
                            href={business.contact?.maps}
                        />

                        <InfoRow
                            icon={<IconMapPin size={18} />}
                            label="Distrito"
                            value={business.location?.district}
                        />

                        <InfoRow
                            icon={<IconMapPin size={18} />}
                            label="Provincia"
                            value={business.location?.province}
                        />
                    </Section>

                    <Section title="Contacto">
                        <InfoRow
                            icon={<IconPhone size={18} />}
                            label="Teléfono"
                            value={business.contact?.phone}
                            href={business.contact?.phone ? `tel:${business.contact.phone}` : null}
                        />

                        <InfoRow
                            icon={<IconPhone size={18} />}
                            label="WhatsApp"
                            value={business.contact?.whatsapp}
                            href={
                                business.contact?.whatsapp
                                    ? `https://wa.me/51${business.contact.whatsapp.replace(/\D/g, "")}`
                                    : null
                            }
                        />

                        <InfoRow
                            icon={<IconWorldWww size={18} />}
                            label="Sitio web"
                            value={business.contact?.web}
                            href={business.contact?.web}
                        />
                    </Section>

                    <Section title="Atención y pedidos">
                        <InfoRow
                            icon={<IconShoppingBag size={18} />}
                            label="Acepta pedidos"
                            value={formatYesNo(business.status?.accepts_orders)}
                        />

                        <InfoRow
                            icon={<IconTruckDelivery size={18} />}
                            label="Delivery"
                            value={formatYesNo(business.services?.has_delivery)}
                        />

                        <InfoRow
                            icon={<IconShoppingBag size={18} />}
                            label="Recojo en local"
                            value={formatYesNo(business.services?.has_pickup)}
                        />

                        <InfoRow
                            icon={<IconClock size={18} />}
                            label="Tiempo de delivery"
                            value={
                                business.delivery?.time?.min || business.delivery?.time?.max
                                    ? `${business.delivery?.time?.min || "-"} - ${business.delivery?.time?.max || "-"} min`
                                    : null
                            }
                        />

                        <InfoRow
                            icon={<IconTruckDelivery size={18} />}
                            label="Costo de delivery"
                            value={formatMoney(
                                business.delivery?.fee,
                                business.payment?.currency
                            )}
                        />

                        <InfoRow
                            icon={<IconCash size={18} />}
                            label="Pedido mínimo"
                            value={formatMoney(
                                business.delivery?.min_order_amount,
                                business.payment?.currency
                            )}
                        />
                    </Section>

                    <Section title="Métodos de pago">
                        <div className="w-full flex flex-wrap gap-xs">
                            {business.payment?.accepts_cash && (
                                <span className="badge">
                                    Efectivo
                                </span>
                            )}

                            {business.payment?.accepts_yape && (
                                <span
                                    className="badge"
                                    style={{
                                        color: "var(--color-yape)"
                                    }}
                                >
                                    Yape
                                </span>
                            )}

                            {business.payment?.accepts_plin && (
                                <span
                                    className="badge"
                                    style={{
                                        color: "var(--color-plin)"
                                    }}
                                >
                                    Plin
                                </span>
                            )}

                            {business.payment?.accepts_card && (
                                <span className="badge">
                                    <IconCreditCard size={14} />
                                    Tarjeta
                                </span>
                            )}

                            {!business.payment?.accepts_cash &&
                                !business.payment?.accepts_yape &&
                                !business.payment?.accepts_plin &&
                                !business.payment?.accepts_card && (
                                    <p className="text-sm text-muted">
                                        No hay métodos de pago registrados.
                                    </p>
                                )}
                        </div>
                    </Section>

                    {business.opening_hours && (
                        <Section title="Horarios">
                            <ul className="w-full flex flex-col gap-xs">
                                {DAYS.map(([key, label]) => {
                                    const day = business.opening_hours?.[key];

                                    return (
                                        <li
                                            key={key}
                                            className="w-full flex items-center justify-between py-xs"
                                        >
                                            <p className="text-sm">
                                                {label}
                                            </p>

                                            <p className="text-sm text-muted">
                                                {day?.is_open
                                                    ? `${day.open || "--:--"} - ${day.close || "--:--"}`
                                                    : "Cerrado"}
                                            </p>
                                        </li>
                                    );
                                })}
                            </ul>
                        </Section>
                    )}

                    {(business.contact?.facebook ||
                        business.contact?.instagram ||
                        business.contact?.tiktok) && (
                        <Section title="Redes sociales">
                            <InfoRow
                                icon={<IconBrandFacebook size={18} />}
                                label="Facebook"
                                value={business.contact?.facebook}
                                href={business.contact?.facebook}
                            />

                            <InfoRow
                                icon={<IconBrandInstagram size={18} />}
                                label="Instagram"
                                value={business.contact?.instagram}
                                href={business.contact?.instagram}
                            />

                            <InfoRow
                                icon={<IconBrandTiktok size={18} />}
                                label="TikTok"
                                value={business.contact?.tiktok}
                                href={business.contact?.tiktok}
                            />
                        </Section>
                    )}

                    <Section title="Actividad">
                        <InfoRow
                            icon={<IconStar size={18} />}
                            label="Calificación"
                            value={
                                business.rating?.count > 0
                                    ? `${business.rating.average.toFixed(1)} (${business.rating.count} reseñas)`
                                    : "Sin reseñas todavía"
                            }
                        />

                        <InfoRow
                            icon={<IconShoppingBag size={18} />}
                            label="Pedidos registrados"
                            value={business.orders_count || 0}
                        />
                    </Section>
                </main>
            )}
        </div>
    );
}