export default function Page () {
    return (
        <>
            <div className="w-full flex flex-col gap-md mb-md">
                <div className="w-full px-md">
                    <h1 className="w text-2xl fw-normal" style={{"--mxw": "80%"}}>Descubre nuevas experiencias</h1>
                    <p className="flex items-center gap-xs text-muted text-xs">Descubre nuevos points para pasar un buen rato.</p>
                </div>
            </div>
            <div className="w-full grid grid-cols-2 grid-rows-2 gap-md px-md">
                <div className="w-full row-span-2 bg-white rounded-md p-sm flex flex-col justify-end">
                    <div className="center w h bg-background rounded-sm mb-md" style={{"--w": "40px", "--mnw": "40px", "--h": "40px"}}></div>
                    <div className="w-full flex flex-col">
                        <h3>Foodies</h3>
                        <p className="text-muted text-xs">12 opciones abiertas</p>
                    </div>
                </div>
                <div className="w-full bg-white rounded-md p-sm">
                    <div className="center w h bg-background rounded-sm mb-md" style={{"--w": "40px", "--mnw": "40px", "--h": "40px"}}></div>
                    <div className="w-full flex flex-col">
                        <h3>Foodies</h3>
                        <p className="text-muted text-xs">12 opciones abiertas</p>
                    </div>
                </div>
                <div className="w-full bg-white rounded-md p-sm">
                    <div className="center w h bg-background rounded-sm mb-md" style={{"--w": "40px", "--mnw": "40px", "--h": "40px"}}></div>
                    <div className="w-full flex flex-col">
                        <h3>Foodies</h3>
                        <p className="text-muted text-xs">12 opciones abiertas</p>
                    </div>
                </div>
            </div>
        </>
    )
}