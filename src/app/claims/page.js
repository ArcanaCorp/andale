'use client';

import ButtonIcon from "@/components/ui/Buttons/ButtonIcon";
import Loading from "@/components/views/Loading";
import { useAuth } from "@/context/AuthContext";
import { createCustomerClaim } from "@/services/customer.service";
import { IconChevronLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function Page() {
    const router = useRouter();
    const { user, loadAuth } = useAuth();

    const [saving, setSaving] = useState(false);

    const [form, setForm] = useState({
        claim_type: "reclamo",
        full_name: user?.user_metadata?.name || "",
        document_type: "DNI",
        document_number: "",
        phone: "",
        email: user?.email || "",
        address: "",
        detail: "",
        requested_solution: ""
    });

    const updateForm = (field, value) => {
        setForm((prev) => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setSaving(true);

            await createCustomerClaim({
                user_id: user?.id || null,
                ...form
            });

            toast.success("Reclamo enviado", {
                description: "Hemos registrado tu solicitud correctamente."
            });

            router.push("/account");

        } catch (error) {
            toast.warning("No se pudo enviar", {
                description: error.message
            });
        } finally {
            setSaving(false);
        }
    };

    if (loadAuth) return <Loading />;

    return (
        <>
            <header className="w-full h px-md flex items-center justify-between" style={{ "--h": "45px" }}>
                <ButtonIcon size={24} onClick={() => router.back()}>
                    <IconChevronLeft size={20} />
                </ButtonIcon>
                <h2 className="text-sm text-semibold">Libro de reclamaciones</h2>
                <div style={{ width: 24 }} />
            </header>

            <main className="w-full h p-md scroll-y" style={{ "--h": "calc(100dvh - 45px)" }}>
                <form className="w-full flex flex-col gap-sm" onSubmit={handleSubmit}>
                    <select
                        className="w-full py-sm px-md bg-surface rounded-md text-sm"
                        value={form.claim_type}
                        onChange={(e) => updateForm("claim_type", e.target.value)}
                    >
                        <option value="reclamo">Reclamo</option>
                        <option value="queja">Queja</option>
                    </select>

                    <input
                        className="w-full py-sm px-md bg-surface rounded-md text-sm"
                        placeholder="Nombre completo"
                        value={form.full_name}
                        onChange={(e) => updateForm("full_name", e.target.value)}
                        required
                    />

                    <div className="w-full grid grid-cols-2 gap-sm">
                        <select
                            className="w-full py-sm px-md bg-surface rounded-md text-sm"
                            value={form.document_type}
                            onChange={(e) => updateForm("document_type", e.target.value)}
                        >
                            <option value="DNI">DNI</option>
                            <option value="CE">Carné de extranjería</option>
                            <option value="RUC">RUC</option>
                        </select>

                        <input
                            className="w-full py-sm px-md bg-surface rounded-md text-sm"
                            placeholder="Número"
                            value={form.document_number}
                            onChange={(e) => updateForm("document_number", e.target.value)}
                        />
                    </div>

                    <input
                        className="w-full py-sm px-md bg-surface rounded-md text-sm"
                        placeholder="Teléfono"
                        value={form.phone}
                        onChange={(e) => updateForm("phone", e.target.value)}
                    />

                    <input
                        className="w-full py-sm px-md bg-surface rounded-md text-sm"
                        placeholder="Correo"
                        value={form.email}
                        onChange={(e) => updateForm("email", e.target.value)}
                    />

                    <input
                        className="w-full py-sm px-md bg-surface rounded-md text-sm"
                        placeholder="Dirección"
                        value={form.address}
                        onChange={(e) => updateForm("address", e.target.value)}
                    />

                    <textarea
                        className="w-full py-sm px-md bg-surface rounded-md text-sm"
                        rows={5}
                        placeholder="Detalle del reclamo o queja"
                        value={form.detail}
                        onChange={(e) => updateForm("detail", e.target.value)}
                        required
                    />

                    <textarea
                        className="w-full py-sm px-md bg-surface rounded-md text-sm"
                        rows={4}
                        placeholder="¿Qué solución solicitas?"
                        value={form.requested_solution}
                        onChange={(e) => updateForm("requested_solution", e.target.value)}
                    />

                    <button
                        type="submit"
                        className="w-full h rounded-full bg-primary text-white text-sm text-semibold mt-sm"
                        style={{ "--h": "42px" }}
                        disabled={saving}
                    >
                        {saving ? "Enviando..." : "Enviar solicitud"}
                    </button>
                </form>
            </main>
        </>
    );
}