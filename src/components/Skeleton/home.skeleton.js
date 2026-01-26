export default function HomeSkeleton () {

    return (

        [...Array(4)].map((_, i) => (
            <div className="w-full mb-md px-md" key={i}>
                <div className="w h rounded-pill bg-secondary mb-md" style={{"--w": "60%", "--h": "20px"}}></div>
                <ul className="flex gap-xs">
                    {[...Array(4)].map((_, i) => (
                        <li key={i} className="w h rounded-md bg-secondary" style={{"--w": "calc(100dvw - 4rem)", "--mnw": "calc(100dvw - 4rem)", "--h": "180px"}}></li>
                    ))}
                </ul>
            </div>
        ))

    )

}