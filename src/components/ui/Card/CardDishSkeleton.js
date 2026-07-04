import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function CardDishSkeleton () {
    return (
        <div className="w-full flex gap-md">
            <Skeleton width={80} height={80} borderRadius={8} />
            <div className="w-full flex flex-col">
                <Skeleton width={'90%'} height={20} borderRadius={8} />
                <Skeleton width={'60%'} height={20} borderRadius={8} />
                <Skeleton width={'40%'} height={20} borderRadius={8} />
            </div>
        </div>
    )
}