import { data_policy_json } from "@/db/db";
import DataPage from "./DataPage";

export const metadata = {
    title: "Política de Uso de Datos",
    description: "Conoce cómo ARCANA utiliza los datos dentro de Ándale Ya! y su ecosistema de servicios digitales.",
    alternates: {
        canonical: "/terms/data-policy"
    },
    robots: {
        index: true,
        follow: true
    }
};

export default function Page () {
    return <DataPage data={data_policy_json} />
}