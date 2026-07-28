'use client';

import ButtonIcon from "@/components/ui/Buttons/ButtonIcon";
import EmptyPage from "@/components/ui/Empty/Empty";
import Loading from "@/components/views/Loading";

import { useAuth } from "@/context/AuthContext";
import { getCustomerNotifications, markAllNotificationsAsRead, markNotificationAsRead } from "@/services/notifications.service";

import { IconBell, IconChevronLeft, IconCircleCheck, IconClock, IconSettings2 } from "@tabler/icons-react";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

function formatNotifyDate(date) {
    if (!date) return "";

    return new Intl.DateTimeFormat("es-PE", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit"
    }).format(new Date(date));
}

export default function Page() {

    const router = useRouter();
    const { user, loadAuth } = useAuth();

    const [notifys, setNotifys] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    const unreadCount = useMemo(() => {
        return notifys.filter((item) => !item.is_read).length;
    }, [notifys]);

    const loadNotifications = async () => {
        try {
            if (!user?.id) return;

            setLoading(true);

            const data = await getCustomerNotifications(user.id);
            setNotifys(data);

        } catch (error) {
            toast.warning("No se cargaron las notificaciones", {
                description: error.message
            });
        } finally {
            setLoading(false);
        }
    };

    const handleOpenNotification = async (notify) => {
        try {
            if (!notify?.is_read) {
                await markNotificationAsRead(notify.id);

                setNotifys((prev) =>
                    prev.map((item) =>
                        item.id === notify.id
                            ? {
                                ...item,
                                is_read: true
                            }
                            : item
                    )
                );
            }

            if (notify?.url) {
                router.push(notify.url);
            }

        } catch (error) {
            toast.warning("No se pudo abrir la notificación", {
                description: error.message
            });
        }
    };

    const handleMarkAllAsRead = async () => {
        try {
            if (!user?.id) return;

            setUpdating(true);

            await markAllNotificationsAsRead(user.id);

            setNotifys((prev) =>
                prev.map((item) => ({
                    ...item,
                    is_read: true
                }))
            );

            toast.success("Notificaciones marcadas como leídas");

        } catch (error) {
            toast.warning("No se pudo actualizar", {
                description: error.message
            });
        } finally {
            setUpdating(false);
        }
    };

    useEffect(() => {
        if (!loadAuth && user?.id) {
            loadNotifications();
        }
    }, [loadAuth, user?.id]);

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

                <div className="flex flex-col items-center">
                    <h2 className="text-sm text-semibold">
                        Notificaciones
                    </h2>

                    {unreadCount > 0 && (
                        <p className="text-2xs text-muted">
                            {unreadCount} sin leer
                        </p>
                    )}
                </div>

                <ButtonIcon
                    size={24}
                    onClick={() => router.push("/account/notifications")}
                >
                    <IconSettings2 size={20} />
                </ButtonIcon>
            </div>

            <div
                className="w-full h py-md scroll-y"
                style={{
                    "--h": "calc(100% - 45px)"
                }}
            >
                {notifys.length > 0 ? (
                    <div className="w-full flex flex-col gap-md">
                        {unreadCount > 0 && (
                            <div className="w-full px-md">
                                <button
                                    type="button"
                                    className="w-full h rounded-full bg-surface text-xs text-semibold"
                                    style={{
                                        "--h": "38px"
                                    }}
                                    onClick={handleMarkAllAsRead}
                                    disabled={updating}
                                >
                                    {updating
                                        ? "Actualizando..."
                                        : "Marcar todas como leídas"}
                                </button>
                            </div>
                        )}

                        <ul className="w-full flex flex-col">
                            {notifys.map((notify) => (
                                <li
                                    key={notify.id}
                                    className={`w-full px-md py-sm pointer ${!notify.is_read ? "bg-surface" : ""}`}
                                    onClick={() => handleOpenNotification(notify)}
                                >
                                    <div className="w-full flex gap-sm">
                                        <div
                                            className="center rounded-full"
                                            style={{
                                                width: "34px",
                                                height: "34px",
                                                minWidth: "34px",
                                                background: notify.is_read
                                                    ? "var(--color-neutral-200)"
                                                    : "var(--color-brand-500)",
                                                color: notify.is_read
                                                    ? "var(--color-neutral-700)"
                                                    : "var(--color-white)"
                                            }}
                                        >
                                            {notify.is_read ? (
                                                <IconCircleCheck size={18} />
                                            ) : (
                                                <IconBell size={18} />
                                            )}
                                        </div>

                                        <div className="w-full flex flex-col gap-2xs">
                                            <div className="w-full flex items-start justify-between gap-sm">
                                                <h4 className="text-sm text-semibold">
                                                    {notify.title}
                                                </h4>

                                                {!notify.is_read && (
                                                    <span
                                                        className="rounded-full"
                                                        style={{
                                                            width: "8px",
                                                            height: "8px",
                                                            minWidth: "8px",
                                                            background: "var(--color-brand-500)"
                                                        }}
                                                    />
                                                )}
                                            </div>

                                            <p className="text-xs text-muted">
                                                {notify.body}
                                            </p>

                                            <div className="flex items-center gap-2xs text-2xs text-muted">
                                                <IconClock size={13} />
                                                {formatNotifyDate(notify.created_at)}
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <EmptyPage page="notify" />
                )}
            </div>
        </div>
    );
}