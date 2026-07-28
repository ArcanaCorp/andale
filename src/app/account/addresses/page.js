'use client';

import ButtonIcon from "@/components/ui/Buttons/ButtonIcon";
import Loading from "@/components/views/Loading";
import { useAuth } from "@/context/AuthContext";
import {
    createCustomerAddress,
    deleteCustomerAddress,
    getCustomerAddresses,
    setDefaultCustomerAddress
} from "@/services/customer.service";
import { IconChevronLeft, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Page() {
    const router = useRouter();
    const { user, loadAuth } = useAuth();

    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [form, setForm] = useState({
        label: "Casa",
        address: "",
        reference: "",
        district: "Jauja",
        phone: ""
    });

    const updateForm = (field, value) => {
        setForm((prev) => ({
            ...prev,
            [field]: value
        }));
    };

    const loadAddresses = async () => {
        try {
            if (!user?.id) return;

            setLoading(true);

            const data = await getCustomerAddresses(user.id);
            setAddresses(data);

        } catch (error) {
            toast.warning("No se cargaron las direcciones", {
                description: error.message
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (event) => {
        event.preventDefault();

        try {
            setSaving(true);

            await createCustomerAddress({
                user_id: user.id,
                label: form.label,
                address: form.address,
                reference: form.reference,
                district: form.district,
                phone: form.phone,
                is_default: addresses.length === 0
            });

            setForm({
                label: "Casa",
                address: "",
                reference: "",
                district: "Jauja",
                phone: ""
            });

            toast.success("Dirección agregada");
            await loadAddresses();

        } catch (error) {
            toast.warning("No se pudo guardar", {
                description: error.message
            });
        } finally {
            setSaving(false);
        }
    };

    const handleDefault = async (addressId) => {
        try {
            await setDefaultCustomerAddress({
                userId: user.id,
                addressId
            });

            toast.success("Dirección principal actualizada");
            await loadAddresses();

        } catch (error) {
            toast.warning("No se pudo actualizar", {
                description: error.message
            });
        }
    };

    const handleDelete = async (addressId) => {
        try {
            await deleteCustomerAddress(addressId);
            toast.success("Dirección eliminada");
            await loadAddresses();

        } catch (error) {
            toast.warning("No se pudo eliminar", {
                description: error.message
            });
        }
    };

    useEffect(() => {
        if (user?.id) loadAddresses();
    }, [user?.id]);

    if (loadAuth || loading) return <Loading />;

    return (
        <>
            <header className="w-full h px-md flex items-center justify-between" style={{ "--h": "45px" }}>
                <ButtonIcon size={24} onClick={() => router.back()}>
                    <IconChevronLeft size={20} />
                </ButtonIcon>
                <h2 className="text-sm text-semibold">Mis direcciones</h2>
                <div style={{ width: 24 }} />
            </header>

            <main className="w-full h p-md scroll-y flex flex-col gap-lg" style={{ "--h": "calc(100dvh - 45px)" }}>
                <form className="w-full flex flex-col gap-sm" onSubmit={handleCreate}>
                    <h3>Agregar dirección</h3>

                    <input
                        className="w-full py-sm px-md bg-surface rounded-md text-sm"
                        placeholder="Etiqueta: Casa, Trabajo..."
                        value={form.label}
                        onChange={(e) => updateForm("label", e.target.value)}
                    />

                    <input
                        className="w-full py-sm px-md bg-surface rounded-md text-sm"
                        placeholder="Dirección"
                        value={form.address}
                        onChange={(e) => updateForm("address", e.target.value)}
                        required
                    />

                    <input
                        className="w-full py-sm px-md bg-surface rounded-md text-sm"
                        placeholder="Referencia"
                        value={form.reference}
                        onChange={(e) => updateForm("reference", e.target.value)}
                    />

                    <input
                        className="w-full py-sm px-md bg-surface rounded-md text-sm"
                        placeholder="Distrito"
                        value={form.district}
                        onChange={(e) => updateForm("district", e.target.value)}
                    />

                    <input
                        className="w-full py-sm px-md bg-surface rounded-md text-sm"
                        placeholder="Teléfono de contacto"
                        value={form.phone}
                        onChange={(e) => updateForm("phone", e.target.value)}
                    />

                    <button
                        type="submit"
                        className="w-full h rounded-full bg-primary text-white text-sm text-semibold"
                        style={{ "--h": "42px" }}
                        disabled={saving}
                    >
                        {saving ? "Guardando..." : "Agregar dirección"}
                    </button>
                </form>

                <section className="w-full flex flex-col gap-sm">
                    <h3>Guardadas</h3>

                    {addresses.length > 0 ? (
                        <ul className="w-full flex flex-col gap-sm">
                            {addresses.map((item) => (
                                <li key={item.id} className="w-full bg-surface rounded-md p-md flex flex-col gap-xs">
                                    <div className="w-full flex items-center justify-between">
                                        <strong className="text-sm">
                                            {item.label}
                                        </strong>

                                        {item.is_default && (
                                            <span className="badge">
                                                Principal
                                            </span>
                                        )}
                                    </div>

                                    <p className="text-sm">
                                        {item.address}
                                    </p>

                                    {item.reference && (
                                        <p className="text-xs text-muted">
                                            Ref: {item.reference}
                                        </p>
                                    )}

                                    <div className="w-full flex gap-sm mt-xs">
                                        {!item.is_default && (
                                            <button
                                                type="button"
                                                className="text-xs text-primary text-semibold"
                                                onClick={() => handleDefault(item.id)}
                                            >
                                                Usar como principal
                                            </button>
                                        )}

                                        <button
                                            type="button"
                                            className="text-xs text-danger text-semibold flex items-center gap-2xs"
                                            onClick={() => handleDelete(item.id)}
                                        >
                                            <IconTrash size={14} />
                                            Eliminar
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-muted">
                            Todavía no tienes direcciones guardadas.
                        </p>
                    )}
                </section>
            </main>
        </>
    );
}