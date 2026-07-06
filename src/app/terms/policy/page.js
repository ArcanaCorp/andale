import { policy_json } from "@/db/db";
import PolicyPage from "./PolicyPage";

export const metadata = {
    title: "Política de Privacidad",
    description:
        "Conoce cómo Ándale Ya! y ARCANA recopilan, utilizan y protegen tus datos personales.",
    alternates: {
        canonical: "/terms/policy"
    },
    robots: {
        index: true,
        follow: true
    }
};

export default function Page () {

    return <PolicyPage policy={policy_json} />
}