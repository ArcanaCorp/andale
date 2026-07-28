'use client';

import ButtonCustomerNotifications from "@/components/ui/Buttons/ButtonCustomerNotifications";
import ButtonIcon from "@/components/ui/Buttons/ButtonIcon";
import { useAuth } from "@/context/AuthContext";
import { IconBell, IconChevronLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const router = useRouter();
    const { user } = useAuth();

    const [permission, setPermission] = useState("default");

    useEffect(() => {
        if (typeof window !== "undefined" && "Notification" in window) {
            setPermission(Notification.permission);
        }
    }, []);

    return (
        <>
            <header className="w-full h px-md flex items-center justify-between" style={{ "--h": "45px" }}>
                <ButtonIcon size={24} onClick={() => router.back()}>
                    <IconChevronLeft size={20} />
                </ButtonIcon>
                <h2 className="text-sm text-semibold">Notificaciones</h2>
                <div style={{ width: 24 }} />
            </header>

            <main className="w-full h p-md scroll-y flex flex-col gap-md" style={{ "--h": "calc(100dvh - 45px)" }}>
                <div className="w-full bg-surface rounded-md p-md flex flex-col gap-sm">
                    <div className="flex items-center gap-sm">
                        <IconBell size={22} />
                        <h3>Estado de pedidos</h3>
                    </div>

                    <p className="text-sm text-muted">
                        Te avisaremos cuando tu pedido sea confirmado, esté en preparación, listo o en camino.
                    </p>

                    <p className="text-xs text-muted">
                        Estado actual: {permission}
                    </p>

                    <ButtonCustomerNotifications user={user} />
                </div>

                {permission === "denied" && (
                    <div className="w-full bg-danger-light rounded-md p-md">
                        <p className="text-sm text-danger">
                            Las notificaciones están bloqueadas. Actívalas desde los permisos del navegador.
                        </p>
                    </div>
                )}
            </main>
        </>
    );
}