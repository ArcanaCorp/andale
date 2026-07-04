import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function CardFoodieLoad () {
    return (
        <div className="w-full">
            <div className="relative w-full h bg-white rounded-md hidden" style={{"--h": "180px"}}>
                <Skeleton height={180} borderRadius={8} />
            </div>
            <div className="w-full flex gap-md">
                <div>
                    <Skeleton width={60} height={60} borderRadius={8} />
                </div>
                <div className="w-full">
                    <Skeleton height={10} borderRadius={8} />
                    <div className="w-full flex gap-md">
                        <Skeleton width={80} height={10} borderRadius={8} />
                        <Skeleton width={80} height={10} borderRadius={8} />
                    </div>
                </div>
            </div>
        </div>
    )
}