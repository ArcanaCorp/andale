'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { trackEvent } from "@/services/events.service";
import { tabs } from "@/constants/tabs";

export default function Tabs() {
    const pathname = usePathname();
    const { user } = useAuth();

    const handleTrackTab = (tab) => {
        trackEvent({
            userId: user?.id || null,
            eventName: `${tab.key}_tab_clicked`,
            entityType: "navigation",
            entityId: null,
            metadata: {
                tab: tab.key,
                label: tab.label,
                target: tab.href,
                current_path: pathname,
                source: "bottom_tabs",
                is_active: pathname === tab.href
            }
        }).catch((error) => {
            console.warn(`No se pudo registrar tab ${tab.key}:`, error);
        });
    };

    if (pathname === "/account") return null;

    return (

        <footer className="w-full h" style={{"--h": "60px", boxShadow: "0 0 4px 4px rgb(209 209 209 / 20%)"}}>
        
            <ul className="w-full h-full px-md flex items-center justify-between">

                {tabs.map((tab) => {

                    const Icon = tab.icon;
                    const isActive = pathname === tab.href;

                    return (
                        <li key={tab.key} className="w-full">
                            
                            <Link href={tab.href} onClick={() => handleTrackTab(tab)} className={`flex flex-col items-center gap-2xs ${isActive ? "text-dark text-medium" : "text-muted"}`} >
                                <Icon style={{strokeWidth: isActive ? 1.6 : 1.2}}/>
                                <span className="text-2xs">{tab.label}</span>
                            </Link>

                        </li>
                    );

                })}

            </ul>

        </footer>

    );
    
}