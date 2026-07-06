import { terms_json } from "@/db/db";
import TermsPage from "./TermsPage";

export const metadata = {
    title: "Términos y Condiciones",
    description: "Consulta los Términos y Condiciones de uso de Ándale Ya! y los servicios digitales de ARCANA.",
    alternates: {
        canonical: "/terms"
    },
    robots: {
        index: true,
        follow: true
    }
};


export default function Page () {

    return <TermsPage terms={terms_json} />
}