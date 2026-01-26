import { Link } from "react-router-dom";
import Images from "../Images/Image";

export default function Component({ data }) {
    
    return (
        <li className="w" style={{"--w": "calc(100dvw - 4rem)", "--mnw": "calc(100dvw - 4rem)"}}>
            <Link to={`/${data.sub}`}>
                <div className="w h rounded-md bg-secondary mb-xs" style={{"--w": "calc(100dvw - 4rem)", "--mnw": "calc(100dvw - 4rem)", "--h": "180px"}}>
                    <Images img={data.image} alt={data.name} />
                </div>
                <div className="w-full">
                    <h4 className="text-dark" aria-label={data.name}>{data.name}</h4>
                    <p className="text-xs text-gray" aria-label={data.text}>{data.text}</p>
                </div>
            </Link>
        </li>
    )
}