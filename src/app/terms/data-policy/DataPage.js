'use client';

import ButtonIcon from "@/components/ui/Buttons/ButtonIcon";
import { useRouter } from "next/navigation";
import { IconChevronLeft } from "@tabler/icons-react";

export default function DataPage ({ data }) {

    const router = useRouter();

    return (
        <>

            <header className="w-full h flex items-center gap-md px-md" style={{"--h": "50px"}}>
                <ButtonIcon bg={'bg-surface'} rounded={'rounded-md'} onClick={() => router.back()}><IconChevronLeft/></ButtonIcon>
                <p className="text-md text-medium">Volver</p>
            </header>

            <main className="w-full h scroll-y p-md flex flex-col gap-md" style={{"--h": "calc(100dvh - 50px)"}}>
            
                <div className="w-full flex flex-col gap-xs">
                    <h1>{data.title}</h1>
                    <p className="text-xs text-muted">{data.updated}</p>
                </div>
            
                {data.sections.map((section, idx) => (
                    <section key={idx} className="w-full text-muted flex flex-col gap-md">
                        <h3 className="text-dark">{section.title}</h3>
                        {section.content.map((block, index) => {
                            if (block.type === 'paragraph') {
                                return (
                                    <p key={index} className="text-xs">{block.text}</p>
                                );
                            }
            
                            if (block.type === 'list') {
                                return (
                                    <ul key={index} className="w-full flex flex-col gap-xs ml-sm">
                                        {block.items.map((item, i) => (
                                            <li key={i} className="text-xs">- {item}</li>
                                        ))}
                                    </ul>
                                );
                            }
                
                            return null;
                        })}
                    </section>
                ))}
            
            </main>
        </>
    )
}