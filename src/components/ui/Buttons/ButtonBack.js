'use client'
import { useRouter } from "next/navigation";
import ButtonIcon from "./ButtonIcon";
import Icons from "@/constants/icons";

export default function ButtonBack () {

    const router = useRouter();

    return (
        <ButtonIcon size={24} onClick={() => router.back()}><Icons name={'chevronLeft'} strokeWidth={1.2} size={20} /></ButtonIcon>
    )

}