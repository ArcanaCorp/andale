'use client';

import ButtonIcon from "@/components/ui/Buttons/ButtonIcon";
import Loading from "@/components/views/Loading";
import { useAuth } from "@/context/AuthContext";
import { getCustomerProfile, updateCustomerProfile } from "@/services/customer.service";
import { IconChevronLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Page() {
    const router = useRouter();
    const { user, loadAuth } = useAuth();

    const [loadingProfile, setLoadingProfile] = useState(true);
    const [saving, setSaving] = useState(false);

    const [form, setForm] = useState({
        fullName: "",
        phone: "",
        email: ""
    });

    const updateForm = (field, value) => {
        setForm((prev) => ({
            ...prev,
            [field]: value
        }));
    };

    const loadProfile = async () => {
        try {
            if (!user?.id) return;

            setLoadingProfile(true);

            const profile = await getCustomerProfile(user.id);

            setForm({
                fullName:
                    profile?.full_name ||
                    user?.user_metadata?.name ||
                    "",
                phone:
                    profile?.phone ||
                    user?.user_metadata?.phone ||
                    "",
                email:
                    profile?.email ||
                    user?.email ||
                    ""
            });

        } catch (error) {
            toast.warning("No se pudo cargar tu perfil", {
                description: error.message
            });
        } finally {
            setLoadingProfile(false);
        }
    };

    const handleSave = async (event) => {
        event.preventDefault();

        try {
            setSaving(true);

            await updateCustomerProfile({
                userId: user.id,
                fullName: form.fullName,
                phone: form.phone,
                email: user.email,
                avatarUrl: user?.user_metadata?.avatar_url || null
            });

            toast.success("Perfil actualizado", {
                description: "Tus datos fueron guardados correctamente."
            });

            router.refresh();

        } catch (error) {
            toast.warning("No se pudo actualizar", {
                description: error.message
            });
        } finally {
            setSaving(false);
        }
    };

    useEffect(() => {
        if (!loadAuth && user?.id) {
            loadProfile();
        }
    }, [loadAuth, user?.id]);

    if (loadAuth || loadingProfile) {
        return <Loading />;
    }

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
                    Información personal
                </h2>

                <div style={{ width: 24 }} />
            </header>

            <main
                className="w-full h p-md scroll-y"
                style={{
                    "--h": "calc(100dvh - 45px)"
                }}
            >
                <form
                    className="w-full flex flex-col gap-md"
                    onSubmit={handleSave}
                >
                    <label className="w-full flex flex-col gap-2xs">
                        <span className="text-xs text-muted">
                            Nombre completo
                        </span>

                        <input
                            className="w-full py-sm px-md bg-surface rounded-md text-sm"
                            value={form.fullName}
                            onChange={(event) =>
                                updateForm("fullName", event.target.value)
                            }
                            placeholder="Tu nombre"
                            required
                        />
                    </label>

                    <label className="w-full flex flex-col gap-2xs">
                        <span className="text-xs text-muted">
                            Teléfono
                        </span>

                        <input
                            className="w-full py-sm px-md bg-surface rounded-md text-sm"
                            value={form.phone}
                            onChange={(event) =>
                                updateForm("phone", event.target.value)
                            }
                            placeholder="Ej. 999999999"
                            inputMode="tel"
                        />
                    </label>

                    <label className="w-full flex flex-col gap-2xs">
                        <span className="text-xs text-muted">
                            Correo
                        </span>

                        <input
                            className="w-full py-sm px-md bg-surface rounded-md text-sm"
                            value={form.email}
                            disabled
                        />
                    </label>

                    <button
                        type="submit"
                        className="w-full h rounded-full bg-primary text-white text-sm text-semibold"
                        style={{
                            "--h": "42px"
                        }}
                        disabled={saving}
                    >
                        {saving ? "Guardando..." : "Guardar cambios"}
                    </button>
                </form>
            </main>
        </>
    );
}