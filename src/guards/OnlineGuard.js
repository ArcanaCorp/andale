import { useUI } from "@/context/UIContext";
import OfflinePage from "@/layout/OfflinePage";

export default function OnlineGuard ({ children }) {

    const { online } = useUI();

    if (!online) return <OfflinePage/>

    return children;

}