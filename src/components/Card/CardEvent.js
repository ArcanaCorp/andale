import { Link } from "react-router-dom";
import Images from "../Images/Image";
import { EVENTS_IMAGE_BASE } from "@/config";

export default function CardEvent ({ data }) {
    return (
        <Link to={`/${data.slug}`} className="block w-full h rounded-md overflow-hidden" style={{"--h": "120px"}}>
            <li className="w-full h-full">
                <Images img={`${EVENTS_IMAGE_BASE}/${data.slug}/${data.cover}`} alt={data.description} />
            </li>
        </Link>
    )
}