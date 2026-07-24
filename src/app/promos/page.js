import EmptyPage from "@/components/ui/Empty/Empty";

export default function Page () {
    return (
        <div className="w-full h" style={{"--h": "calc(100dvh - 60px)"}}>
            <div className="w-full h px-md flex items-center justify-between" style={{"--h": "45px"}}>
                <div></div>
                <h2 className="text-sm text-semibold">Promociones</h2>
                <div></div>
            </div>
            <div className="w-full h py-md" style={{"--h": "calc(100% - 45px)"}}>
                <EmptyPage page={'promos'} />
            </div>
        </div>
    )
}