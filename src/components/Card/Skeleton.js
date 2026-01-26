export default function CardSkeleton () {
    return (
        <>
            {[...Array(4)].map((_, i) => (
                <li key={i} className="w h rounded-md bg-secondary" style={{"--w": "calc(100dvw - 4rem)", "--mnw": "calc(100dvw - 4rem)", "--h": "180px"}}></li>
            ))}
        </>
    )
}